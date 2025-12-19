"""
PATH: backend/app/schemas/__init__.py
PURPOSE: Pydantic schema exports
"""

from app.schemas.user import UserCreate, UserUpdate, UserResponse, UserLogin, TokenResponse
from app.schemas.client import ClientCreate, ClientUpdate, ClientResponse
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse
from app.schemas.document import DocumentCreate, DocumentResponse, DocumentUploadResponse

__all__ = [
    "UserCreate", "UserUpdate", "UserResponse", "UserLogin", "TokenResponse",
    "ClientCreate", "ClientUpdate", "ClientResponse",
    "ProjectCreate", "ProjectUpdate", "ProjectResponse",
    "DocumentCreate", "DocumentResponse", "DocumentUploadResponse",
]

