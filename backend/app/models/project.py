"""
PATH: backend/app/models/project.py
PURPOSE: Project model for client engagements
ROLE IN ARCHITECTURE: Work tracking entity

MAIN EXPORTS:
    - Project: SQLAlchemy model for projects
    - ProjectStatus: Enum for project status
    - ProjectType: Enum for service types
"""

from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey, Text, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.core.database import Base


class ProjectStatus(str, enum.Enum):
    """Project lifecycle status."""
    DRAFT = "draft"
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    REVIEW = "review"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class ProjectType(str, enum.Enum):
    """Project type matching service offerings."""
    BOOKKEEPING = "bookkeeping"
    COST_ACCOUNTING = "cost_accounting"
    FINANCIAL_OS = "financial_os"
    FINANCIAL_MODELLING = "financial_modelling"
    LENDING = "lending"
    TAX_FILING = "tax_filing"
    CORPORATE_GROWTH = "corporate_growth"
    ACQUISITIONS = "acquisitions"
    EXIT_PLANNING = "exit_planning"
    HNWI_INVESTMENTS = "hnwi_investments"
    GLOBAL_STRUCTURING = "global_structuring"
    CFO_SERVICES = "cfo_services"
    OTHER = "other"


class Project(Base):
    """
    Project model for client work engagements.
    
    Attributes:
        id: Primary key
        client_id: Link to client
        name: Project title
        type: Service type
        status: Current status
        description: Project description
        due_date: Target completion date
        completed_at: Actual completion timestamp
    """
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=False)
    name = Column(String(255), nullable=False)
    type = Column(Enum(ProjectType), default=ProjectType.OTHER, nullable=False)
    status = Column(Enum(ProjectStatus), default=ProjectStatus.DRAFT, nullable=False)
    description = Column(Text, nullable=True)
    
    # Dates
    start_date = Column(Date, nullable=True)
    due_date = Column(Date, nullable=True)
    completed_at = Column(DateTime(timezone=True), nullable=True)
    
    # Billing
    estimated_hours = Column(Integer, nullable=True)
    actual_hours = Column(Integer, nullable=True)
    hourly_rate = Column(Integer, nullable=True)  # In cents
    fixed_fee = Column(Integer, nullable=True)  # In cents
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    client = relationship("Client", back_populates="projects")
    documents = relationship("Document", back_populates="project")
    tasks = relationship("Task", back_populates="project")
    messages = relationship("Message", back_populates="project")

