"""
PATH: backend/app/api/v1/router.py
PURPOSE: API v1 route aggregation
ROLE IN ARCHITECTURE: Central router for all v1 endpoints

NOTES FOR FUTURE AI:
    - Add new endpoint routers here
    - Keep consistent prefix naming
"""

from fastapi import APIRouter

from app.api.v1.endpoints import auth, users, clients, projects, documents, ai

api_router = APIRouter()

# Authentication
api_router.include_router(
    auth.router,
    prefix="/auth",
    tags=["Authentication"],
)

# Users
api_router.include_router(
    users.router,
    prefix="/users",
    tags=["Users"],
)

# Clients
api_router.include_router(
    clients.router,
    prefix="/clients",
    tags=["Clients"],
)

# Projects
api_router.include_router(
    projects.router,
    prefix="/projects",
    tags=["Projects"],
)

# Documents
api_router.include_router(
    documents.router,
    prefix="/documents",
    tags=["Documents"],
)

# AI
api_router.include_router(
    ai.router,
    prefix="/ai",
    tags=["AI Assistant"],
)

