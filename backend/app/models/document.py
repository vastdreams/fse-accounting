"""
PATH: backend/app/models/document.py
PURPOSE: Document model for file storage and e-signatures
ROLE IN ARCHITECTURE: Document management entity

MAIN EXPORTS:
    - Document: SQLAlchemy model for documents
    - DocumentStatus: Enum for document status
    - DocumentCategory: Enum for document categories
"""

from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey, Text, BigInteger
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.core.database import Base


class DocumentStatus(str, enum.Enum):
    """Document lifecycle status."""
    UPLOADED = "uploaded"
    PENDING_SIGNATURE = "pending_signature"
    SIGNED = "signed"
    REJECTED = "rejected"
    ARCHIVED = "archived"


class DocumentCategory(str, enum.Enum):
    """Document categorization."""
    TAX = "tax"
    FINANCIAL = "financial"
    LEGAL = "legal"
    IDENTITY = "identity"
    CONTRACT = "contract"
    INVOICE = "invoice"
    RECEIPT = "receipt"
    REPORT = "report"
    OTHER = "other"


class Document(Base):
    """
    Document model for file management and e-signatures.
    
    Attributes:
        id: Primary key
        project_id: Link to project (optional)
        name: Original filename
        s3_key: AWS S3 object key
        mime_type: File MIME type
        size_bytes: File size
        category: Document category
        status: Current status
        docusign_envelope_id: DocuSign envelope ID if sent for signing
    """
    __tablename__ = "documents"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=True)
    uploaded_by_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    # File info
    name = Column(String(255), nullable=False)
    s3_key = Column(String(500), nullable=False)
    mime_type = Column(String(100), nullable=False)
    size_bytes = Column(BigInteger, nullable=False)
    sha256_hash = Column(String(64), nullable=True)  # Deduplication
    
    # Categorization
    category = Column(Enum(DocumentCategory), default=DocumentCategory.OTHER)
    status = Column(Enum(DocumentStatus), default=DocumentStatus.UPLOADED)
    description = Column(Text, nullable=True)
    
    # DocuSign integration
    docusign_envelope_id = Column(String(100), nullable=True)
    signed_at = Column(DateTime(timezone=True), nullable=True)
    signed_s3_key = Column(String(500), nullable=True)  # Signed copy location
    
    # Versioning
    version = Column(Integer, default=1)
    parent_document_id = Column(Integer, ForeignKey("documents.id"), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    project = relationship("Project", back_populates="documents")
    uploaded_by = relationship("User", foreign_keys=[uploaded_by_id])
    parent_document = relationship("Document", remote_side=[id])

