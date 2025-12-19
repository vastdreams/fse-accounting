"""
PATH: backend/app/models/client.py
PURPOSE: Client model for business client records
ROLE IN ARCHITECTURE: Core business entity

MAIN EXPORTS:
    - Client: SQLAlchemy model for clients
    - ClientStatus: Enum for client lifecycle status
"""

from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.core.database import Base


class ClientStatus(str, enum.Enum):
    """Client lifecycle status."""
    LEAD = "lead"
    ONBOARDING = "onboarding"
    ACTIVE = "active"
    PAUSED = "paused"
    CHURNED = "churned"


class Client(Base):
    """
    Client model representing a business client.
    
    Attributes:
        id: Primary key
        user_id: Link to user account
        company_name: Business name
        abn: Australian Business Number
        acn: Australian Company Number (optional)
        industry: Business industry
        status: Client lifecycle status
        assigned_manager_id: Staff member managing this client
        notes: Internal notes
    """
    __tablename__ = "clients"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    company_name = Column(String(255), nullable=False)
    abn = Column(String(11), nullable=True)
    acn = Column(String(9), nullable=True)
    industry = Column(String(100), nullable=True)
    status = Column(Enum(ClientStatus), default=ClientStatus.LEAD, nullable=False)
    assigned_manager_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    
    # Contact details
    address_line1 = Column(String(255), nullable=True)
    address_line2 = Column(String(255), nullable=True)
    city = Column(String(100), nullable=True)
    state = Column(String(50), nullable=True)
    postcode = Column(String(10), nullable=True)
    country = Column(String(100), default="Australia")
    
    # Internal
    notes = Column(Text, nullable=True)
    health_score = Column(Integer, nullable=True)  # AI-generated 0-100
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    user = relationship("User", back_populates="client", foreign_keys=[user_id])
    assigned_manager = relationship(
        "User",
        back_populates="assigned_clients",
        foreign_keys=[assigned_manager_id],
    )
    projects = relationship("Project", back_populates="client")

