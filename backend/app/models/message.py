"""
PATH: backend/app/models/message.py
PURPOSE: Message model for project communications
ROLE IN ARCHITECTURE: Communication tracking

MAIN EXPORTS:
    - Message: SQLAlchemy model for messages
"""

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.core.database import Base


class Message(Base):
    """
    Message model for project discussion threads.
    
    Attributes:
        id: Primary key
        project_id: Link to project
        sender_id: User who sent the message
        content: Message content
        is_read: Whether recipient has read
        is_from_ai: Whether message is from AI assistant
    """
    __tablename__ = "messages"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    sender_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    
    content = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    is_from_ai = Column(Boolean, default=False)
    
    # Optional attachment
    attachment_document_id = Column(Integer, ForeignKey("documents.id"), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    project = relationship("Project", back_populates="messages")
    sender = relationship("User", back_populates="sent_messages")
    attachment = relationship("Document", foreign_keys=[attachment_document_id])

