"""
PATH: backend/app/api/v1/endpoints/documents.py
PURPOSE: Document management endpoints
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.api.deps import get_current_user
from app.models.user import User, UserRole
from app.models.client import Client
from app.models.project import Project
from app.models.document import Document, DocumentStatus
from app.schemas.document import DocumentCreate, DocumentResponse, DocumentSignRequest
from app.services.s3 import S3Service
from app.services.docusign import DocuSignService

router = APIRouter()


@router.get("/", response_model=List[DocumentResponse])
async def list_documents(
    skip: int = 0,
    limit: int = 50,
    project_id: Optional[int] = None,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """List documents (filtered by user role)."""
    query = select(Document)
    
    if project_id:
        query = query.where(Document.project_id == project_id)
    
    # Clients can only see their own documents
    if current_user.role == UserRole.CLIENT:
        result = await db.execute(
            select(Client).where(Client.user_id == current_user.id)
        )
        client = result.scalar_one_or_none()
        if client:
            # Get client's project IDs
            proj_result = await db.execute(
                select(Project.id).where(Project.client_id == client.id)
            )
            project_ids = [r[0] for r in proj_result.all()]
            if project_ids:
                query = query.where(Document.project_id.in_(project_ids))
            else:
                return []
        else:
            return []
    
    query = query.offset(skip).limit(limit).order_by(Document.created_at.desc())
    result = await db.execute(query)
    
    return result.scalars().all()


@router.post("/upload", response_model=DocumentResponse, status_code=status.HTTP_201_CREATED)
async def upload_document(
    file: UploadFile = File(...),
    project_id: Optional[int] = None,
    category: str = "other",
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Upload a document to S3."""
    # Read file content
    content = await file.read()
    
    # Upload to S3
    s3_service = S3Service()
    s3_key = await s3_service.upload_file(
        content=content,
        filename=file.filename,
        content_type=file.content_type,
    )
    
    # Create document record
    document = Document(
        project_id=project_id,
        uploaded_by_id=current_user.id,
        name=file.filename,
        s3_key=s3_key,
        mime_type=file.content_type,
        size_bytes=len(content),
        category=category,
    )
    db.add(document)
    await db.flush()
    await db.refresh(document)
    
    return document


@router.get("/{document_id}", response_model=DocumentResponse)
async def get_document(
    document_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get document metadata."""
    result = await db.execute(select(Document).where(Document.id == document_id))
    document = result.scalar_one_or_none()
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )
    
    return document


@router.get("/{document_id}/download")
async def download_document(
    document_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get presigned download URL."""
    result = await db.execute(select(Document).where(Document.id == document_id))
    document = result.scalar_one_or_none()
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )
    
    s3_service = S3Service()
    download_url = await s3_service.get_download_url(document.s3_key)
    
    return {"download_url": download_url, "expires_in": 3600}


@router.post("/{document_id}/sign")
async def send_for_signature(
    document_id: int,
    sign_request: DocumentSignRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Send document to DocuSign for signature."""
    result = await db.execute(select(Document).where(Document.id == document_id))
    document = result.scalar_one_or_none()
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )
    
    # Get file from S3
    s3_service = S3Service()
    file_content = await s3_service.get_file(document.s3_key)
    
    # Send to DocuSign
    docusign_service = DocuSignService()
    envelope_id = await docusign_service.create_envelope(
        document_content=file_content,
        document_name=document.name,
        signer_email=sign_request.signer_email,
        signer_name=sign_request.signer_name,
        subject=sign_request.subject,
        message=sign_request.message,
    )
    
    # Update document status
    document.docusign_envelope_id = envelope_id
    document.status = DocumentStatus.PENDING_SIGNATURE
    await db.flush()
    
    return {"envelope_id": envelope_id, "status": "sent"}

