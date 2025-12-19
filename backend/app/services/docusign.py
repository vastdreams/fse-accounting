"""
PATH: backend/app/services/docusign.py
PURPOSE: DocuSign integration for e-signatures
ROLE IN ARCHITECTURE: External e-signature service integration

MAIN EXPORTS:
    - DocuSignService: Service class for DocuSign operations
"""

import base64
from typing import Optional
import httpx

from app.core.config import settings


class DocuSignService:
    """
    DocuSign service for document e-signatures.
    
    Handles:
    - Envelope creation
    - Signature status checking
    - Signed document retrieval
    """
    
    def __init__(self):
        self.base_url = settings.DOCUSIGN_BASE_URL
        self.account_id = settings.DOCUSIGN_ACCOUNT_ID
        self.integration_key = settings.DOCUSIGN_INTEGRATION_KEY
        self._access_token: Optional[str] = None
    
    async def _get_access_token(self) -> str:
        """Get OAuth access token from DocuSign."""
        # In production, implement proper JWT grant flow
        # For now, return the configured token
        if self._access_token:
            return self._access_token
        
        # Placeholder for OAuth implementation
        # DocuSign requires JWT Grant or Authorization Code Grant
        raise NotImplementedError(
            "DocuSign OAuth not yet configured. "
            "Please set up JWT Grant authentication."
        )
    
    async def create_envelope(
        self,
        document_content: bytes,
        document_name: str,
        signer_email: str,
        signer_name: str,
        subject: Optional[str] = None,
        message: Optional[str] = None,
    ) -> str:
        """
        Create a DocuSign envelope for signing.
        
        Args:
            document_content: PDF document bytes
            document_name: Document filename
            signer_email: Signer's email address
            signer_name: Signer's full name
            subject: Email subject
            message: Email message body
        
        Returns:
            Envelope ID
        """
        access_token = await self._get_access_token()
        
        # Base64 encode document
        doc_base64 = base64.b64encode(document_content).decode("utf-8")
        
        envelope_data = {
            "emailSubject": subject or f"Please sign: {document_name}",
            "emailBlurb": message or "Please review and sign this document.",
            "documents": [
                {
                    "documentBase64": doc_base64,
                    "name": document_name,
                    "fileExtension": document_name.split(".")[-1] if "." in document_name else "pdf",
                    "documentId": "1",
                }
            ],
            "recipients": {
                "signers": [
                    {
                        "email": signer_email,
                        "name": signer_name,
                        "recipientId": "1",
                        "routingOrder": "1",
                        "tabs": {
                            "signHereTabs": [
                                {
                                    "documentId": "1",
                                    "pageNumber": "1",
                                    "xPosition": "200",
                                    "yPosition": "700",
                                }
                            ],
                            "dateSignedTabs": [
                                {
                                    "documentId": "1",
                                    "pageNumber": "1",
                                    "xPosition": "200",
                                    "yPosition": "750",
                                }
                            ],
                        },
                    }
                ]
            },
            "status": "sent",
        }
        
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{self.base_url}/v2.1/accounts/{self.account_id}/envelopes",
                json=envelope_data,
                headers={
                    "Authorization": f"Bearer {access_token}",
                    "Content-Type": "application/json",
                },
            )
            
            if response.status_code != 201:
                raise Exception(f"DocuSign envelope creation failed: {response.text}")
            
            return response.json()["envelopeId"]
    
    async def get_envelope_status(self, envelope_id: str) -> dict:
        """Get envelope signing status."""
        access_token = await self._get_access_token()
        
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.base_url}/v2.1/accounts/{self.account_id}/envelopes/{envelope_id}",
                headers={"Authorization": f"Bearer {access_token}"},
            )
            
            if response.status_code != 200:
                raise Exception(f"Failed to get envelope status: {response.text}")
            
            return response.json()
    
    async def get_signed_document(self, envelope_id: str) -> bytes:
        """Download signed document from envelope."""
        access_token = await self._get_access_token()
        
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{self.base_url}/v2.1/accounts/{self.account_id}/envelopes/{envelope_id}/documents/combined",
                headers={"Authorization": f"Bearer {access_token}"},
            )
            
            if response.status_code != 200:
                raise Exception(f"Failed to get signed document: {response.text}")
            
            return response.content

