"""
PATH: backend/app/schemas/client.py
PURPOSE: Pydantic schemas for client operations
"""

from datetime import datetime
from typing import Optional
from pydantic import BaseModel

from app.models.client import ClientStatus


class ClientBase(BaseModel):
    """Base client schema."""
    company_name: str
    abn: Optional[str] = None
    acn: Optional[str] = None
    industry: Optional[str] = None
    address_line1: Optional[str] = None
    address_line2: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    postcode: Optional[str] = None
    country: str = "Australia"


class ClientCreate(ClientBase):
    """Schema for client creation."""
    pass


class ClientUpdate(BaseModel):
    """Schema for client updates."""
    company_name: Optional[str] = None
    abn: Optional[str] = None
    acn: Optional[str] = None
    industry: Optional[str] = None
    status: Optional[ClientStatus] = None
    assigned_manager_id: Optional[int] = None
    address_line1: Optional[str] = None
    address_line2: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    postcode: Optional[str] = None
    country: Optional[str] = None
    notes: Optional[str] = None


class ClientResponse(ClientBase):
    """Schema for client responses."""
    id: int
    user_id: int
    status: ClientStatus
    assigned_manager_id: Optional[int]
    health_score: Optional[int]
    notes: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True

