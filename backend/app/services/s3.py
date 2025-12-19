"""
PATH: backend/app/services/s3.py
PURPOSE: AWS S3 service for document storage
ROLE IN ARCHITECTURE: External storage integration

MAIN EXPORTS:
    - S3Service: Service class for S3 operations
"""

import uuid
from datetime import datetime
from typing import Optional
import boto3
from botocore.exceptions import ClientError

from app.core.config import settings


class S3Service:
    """
    AWS S3 service for document upload/download.
    
    Handles:
    - File uploads with unique keys
    - Presigned URL generation for downloads
    - File retrieval
    """
    
    def __init__(self):
        self.s3_client = boto3.client(
            "s3",
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.AWS_REGION,
        )
        self.bucket_name = settings.AWS_S3_BUCKET
    
    def _generate_key(self, filename: str) -> str:
        """Generate unique S3 key for file."""
        ext = filename.split(".")[-1] if "." in filename else ""
        date_prefix = datetime.utcnow().strftime("%Y/%m/%d")
        unique_id = uuid.uuid4().hex[:12]
        
        if ext:
            return f"documents/{date_prefix}/{unique_id}.{ext}"
        return f"documents/{date_prefix}/{unique_id}"
    
    async def upload_file(
        self,
        content: bytes,
        filename: str,
        content_type: Optional[str] = None,
    ) -> str:
        """
        Upload file to S3.
        
        Args:
            content: File content as bytes
            filename: Original filename
            content_type: MIME type
        
        Returns:
            S3 object key
        """
        key = self._generate_key(filename)
        
        extra_args = {}
        if content_type:
            extra_args["ContentType"] = content_type
        
        try:
            self.s3_client.put_object(
                Bucket=self.bucket_name,
                Key=key,
                Body=content,
                **extra_args,
            )
            return key
        except ClientError as e:
            raise Exception(f"S3 upload failed: {e}")
    
    async def get_download_url(
        self,
        key: str,
        expires_in: int = 3600,
    ) -> str:
        """
        Generate presigned download URL.
        
        Args:
            key: S3 object key
            expires_in: URL expiration in seconds
        
        Returns:
            Presigned URL string
        """
        try:
            url = self.s3_client.generate_presigned_url(
                "get_object",
                Params={"Bucket": self.bucket_name, "Key": key},
                ExpiresIn=expires_in,
            )
            return url
        except ClientError as e:
            raise Exception(f"Failed to generate download URL: {e}")
    
    async def get_file(self, key: str) -> bytes:
        """
        Download file from S3.
        
        Args:
            key: S3 object key
        
        Returns:
            File content as bytes
        """
        try:
            response = self.s3_client.get_object(
                Bucket=self.bucket_name,
                Key=key,
            )
            return response["Body"].read()
        except ClientError as e:
            raise Exception(f"S3 download failed: {e}")
    
    async def delete_file(self, key: str) -> bool:
        """
        Delete file from S3.
        
        Args:
            key: S3 object key
        
        Returns:
            True if successful
        """
        try:
            self.s3_client.delete_object(
                Bucket=self.bucket_name,
                Key=key,
            )
            return True
        except ClientError as e:
            raise Exception(f"S3 delete failed: {e}")

