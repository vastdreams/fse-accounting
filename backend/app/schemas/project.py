"""
PATH: backend/app/schemas/project.py
PURPOSE: Pydantic schemas for project operations
"""

from datetime import datetime, date
from typing import Optional
from pydantic import BaseModel

from app.models.project import ProjectStatus, ProjectType


class ProjectBase(BaseModel):
    """Base project schema."""
    name: str
    type: ProjectType = ProjectType.OTHER
    description: Optional[str] = None
    start_date: Optional[date] = None
    due_date: Optional[date] = None
    estimated_hours: Optional[int] = None
    hourly_rate: Optional[int] = None
    fixed_fee: Optional[int] = None


class ProjectCreate(ProjectBase):
    """Schema for project creation."""
    client_id: int


class ProjectUpdate(BaseModel):
    """Schema for project updates."""
    name: Optional[str] = None
    type: Optional[ProjectType] = None
    status: Optional[ProjectStatus] = None
    description: Optional[str] = None
    start_date: Optional[date] = None
    due_date: Optional[date] = None
    estimated_hours: Optional[int] = None
    actual_hours: Optional[int] = None
    hourly_rate: Optional[int] = None
    fixed_fee: Optional[int] = None


class ProjectResponse(ProjectBase):
    """Schema for project responses."""
    id: int
    client_id: int
    status: ProjectStatus
    actual_hours: Optional[int]
    completed_at: Optional[datetime]
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True

