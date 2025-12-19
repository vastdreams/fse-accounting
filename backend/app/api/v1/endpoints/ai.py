"""
PATH: backend/app/api/v1/endpoints/ai.py
PURPOSE: AI assistant endpoints using DeepSeek
"""

from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.api.deps import get_current_user
from app.models.user import User
from app.services.ai import AIService

router = APIRouter()


class ChatMessage(BaseModel):
    """Chat message schema."""
    role: str  # "user" or "assistant"
    content: str


class ChatRequest(BaseModel):
    """Chat request schema."""
    message: str
    context: Optional[str] = None
    history: Optional[List[ChatMessage]] = None


class ChatResponse(BaseModel):
    """Chat response schema."""
    response: str
    tokens_used: int


class DocumentAnalysisRequest(BaseModel):
    """Document analysis request."""
    document_id: int
    question: Optional[str] = None


class DocumentAnalysisResponse(BaseModel):
    """Document analysis response."""
    summary: Optional[str] = None
    answer: Optional[str] = None
    key_points: Optional[List[str]] = None
    category_suggestion: Optional[str] = None


@router.post("/chat", response_model=ChatResponse)
async def chat_with_assistant(
    request: ChatRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Chat with AI assistant.
    
    The assistant can help with:
    - General accounting questions
    - Document explanations
    - Tax guidance
    - Business advice
    """
    ai_service = AIService()
    
    response, tokens = await ai_service.chat(
        message=request.message,
        context=request.context,
        history=request.history,
        user_name=current_user.full_name,
    )
    
    return ChatResponse(response=response, tokens_used=tokens)


@router.post("/analyze-document", response_model=DocumentAnalysisResponse)
async def analyze_document(
    request: DocumentAnalysisRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Analyze a document using AI.
    
    Provides:
    - Document summary
    - Key point extraction
    - Category suggestion
    - Answer to specific questions
    """
    from app.models.document import Document
    from app.services.s3 import S3Service
    from sqlalchemy import select
    
    # Get document
    result = await db.execute(
        select(Document).where(Document.id == request.document_id)
    )
    document = result.scalar_one_or_none()
    
    if not document:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Document not found",
        )
    
    # Get file content
    s3_service = S3Service()
    content = await s3_service.get_file(document.s3_key)
    
    # Analyze with AI
    ai_service = AIService()
    analysis = await ai_service.analyze_document(
        content=content,
        filename=document.name,
        mime_type=document.mime_type,
        question=request.question,
    )
    
    return DocumentAnalysisResponse(**analysis)

