import asyncio
import sys
import os

# Add the current directory to sys.path so we can import 'app'
sys.path.append(os.path.join(os.getcwd(), "app"))
# Also add the backend directory to sys.path
sys.path.append(os.getcwd())

from app.core.database import AsyncSessionLocal
from app.models.user import User, UserRole
from app.models.client import Client, ClientStatus
from app.core.security import hash_password
from sqlalchemy import select

async def create_user():
    email = "ranjeet@test.com"
    password = "test123"
    first_name = "Ranjeet"
    last_name = "Test"
    company_name = "Ranjeet Test Company"

    async with AsyncSessionLocal() as session:
        # Check if user already exists
        result = await session.execute(select(User).where(User.email == email))
        user = result.scalar_one_or_none()
        
        if user:
            print(f"User {email} already exists.")
            return

        # Create user
        new_user = User(
            email=email,
            password_hash=hash_password(password),
            first_name=first_name,
            last_name=last_name,
            role=UserRole.CLIENT,
            is_active=True
        )
        session.add(new_user)
        await session.flush()  # To get the user ID

        # Create client record
        new_client = Client(
            user_id=new_user.id,
            company_name=company_name,
            status=ClientStatus.ACTIVE
        )
        session.add(new_client)
        
        await session.commit()
        print(f"Successfully created user {email} and associated client record.")

if __name__ == "__main__":
    asyncio.run(create_user())

