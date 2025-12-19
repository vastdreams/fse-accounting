"""
PATH: backend/app/models/user.py
PURPOSE: User model for authentication and authorization
ROLE IN ARCHITECTURE: Core identity model

MAIN EXPORTS:
    - User: SQLAlchemy model for users
    - UserRole: Enum for user roles
"""

from sqlalchemy import Column, Integer, String, DateTime, Enum, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from app.core.database import Base


class UserRole(str, enum.Enum):
    """User role enumeration."""
    ADMIN = "admin"
    STAFF = "staff"
    CLIENT = "client"


class User(Base):
    """
    User model for all platform users.
    
    Attributes:
        id: Primary key
        email: Unique email address
        password_hash: Bcrypt hashed password
        first_name: User's first name
        last_name: User's last name
        role: User role (admin, staff, client)
        is_active: Account status
        created_at: Creation timestamp
        updated_at: Last update timestamp
    """
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    role = Column(Enum(UserRole), default=UserRole.CLIENT, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)
    phone = Column(String(20), nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    client = relationship("Client", back_populates="user", uselist=False)
    assigned_clients = relationship(
        "Client",
        back_populates="assigned_manager",
        foreign_keys="Client.assigned_manager_id",
    )
    sent_messages = relationship("Message", back_populates="sender")
    assigned_tasks = relationship("Task", back_populates="assignee")
    
    @property
    def full_name(self) -> str:
        """Return user's full name."""
        return f"{self.first_name} {self.last_name}"

