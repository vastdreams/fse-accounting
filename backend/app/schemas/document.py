"""
PATH: backend/app/schemas/document.py
PURPOSE: Pydantic schemas for document operations
"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel

from app.models.document import DocumentStatus, DocumentCategory


class DocumentCreate(BaseModel):
    """Schema for document creation (metadata only)."""
    name: str
    category: DocumentCategory = DocumentCategory.OTHER
    description: Optional[str] = None
    project_id: Optional[int] = None


class DocumentResponse(BaseModel):
    """Schema for document responses."""
    id: int
    project_id: Optional[int]
    uploaded_by_id: int
    name: str
    mime_type: str
    size_bytes: int
    category: DocumentCategory
    status: DocumentStatus
    description: Optional[str]
    version: int
    docusign_envelope_id: Optional[str]
    signed_at: Optional[datetime]
    created_at: datetime
    
    class Config:
        from_attributes = True


class DocumentUploadResponse(BaseModel):
    """Schema for upload URL response."""
    document_id: int
    upload_url: str
    expires_in: int


class DocumentSignRequest(BaseModel):
    """Schema for DocuSign signing request."""
    signer_email: str
    signer_name: str
    subject: Optional[str] = None
    message: Optional[str] = None

