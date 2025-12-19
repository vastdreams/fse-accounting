"""
PATH: backend/app/services/stripe.py
PURPOSE: Stripe integration for billing and invoicing
ROLE IN ARCHITECTURE: Payment processing service

MAIN EXPORTS:
    - StripeService: Service class for Stripe operations
"""

from typing import Optional, Dict, Any, List
import stripe

from app.core.config import settings


class StripeService:
    """
    Stripe service for billing and invoicing.
    
    Handles:
    - Customer creation
    - Invoice creation and sending
    - Payment tracking
    - Subscription management
    """
    
    def __init__(self):
        stripe.api_key = settings.STRIPE_SECRET_KEY
    
    async def create_customer(
        self,
        email: str,
        name: str,
        metadata: Optional[Dict[str, str]] = None,
    ) -> str:
        """
        Create a Stripe customer.
        
        Args:
            email: Customer email
            name: Customer name or company name
            metadata: Additional metadata
        
        Returns:
            Stripe customer ID
        """
        customer = stripe.Customer.create(
            email=email,
            name=name,
            metadata=metadata or {},
        )
        return customer.id
    
    async def get_customer(self, customer_id: str) -> Dict[str, Any]:
        """Get customer details."""
        return stripe.Customer.retrieve(customer_id)
    
    async def create_invoice(
        self,
        customer_id: str,
        items: List[Dict[str, Any]],
        description: Optional[str] = None,
        due_days: int = 30,
        auto_send: bool = True,
    ) -> Dict[str, Any]:
        """
        Create and optionally send an invoice.
        
        Args:
            customer_id: Stripe customer ID
            items: List of line items with description and amount (in cents)
            description: Invoice description
            due_days: Days until due
            auto_send: Whether to send immediately
        
        Returns:
            Invoice details
        """
        # Add invoice items
        for item in items:
            stripe.InvoiceItem.create(
                customer=customer_id,
                amount=item["amount"],
                currency="aud",
                description=item["description"],
            )
        
        # Create invoice
        invoice = stripe.Invoice.create(
            customer=customer_id,
            collection_method="send_invoice",
            days_until_due=due_days,
            description=description,
        )
        
        # Finalize and send
        if auto_send:
            invoice = stripe.Invoice.finalize_invoice(invoice.id)
            stripe.Invoice.send_invoice(invoice.id)
        
        return {
            "id": invoice.id,
            "number": invoice.number,
            "amount_due": invoice.amount_due,
            "status": invoice.status,
            "hosted_invoice_url": invoice.hosted_invoice_url,
            "pdf": invoice.invoice_pdf,
        }
    
    async def get_invoice(self, invoice_id: str) -> Dict[str, Any]:
        """Get invoice details."""
        invoice = stripe.Invoice.retrieve(invoice_id)
        return {
            "id": invoice.id,
            "number": invoice.number,
            "amount_due": invoice.amount_due,
            "amount_paid": invoice.amount_paid,
            "status": invoice.status,
            "hosted_invoice_url": invoice.hosted_invoice_url,
            "pdf": invoice.invoice_pdf,
            "paid": invoice.paid,
        }
    
    async def list_invoices(
        self,
        customer_id: Optional[str] = None,
        limit: int = 10,
    ) -> List[Dict[str, Any]]:
        """List invoices, optionally filtered by customer."""
        params = {"limit": limit}
        if customer_id:
            params["customer"] = customer_id
        
        invoices = stripe.Invoice.list(**params)
        
        return [
            {
                "id": inv.id,
                "number": inv.number,
                "amount_due": inv.amount_due,
                "amount_paid": inv.amount_paid,
                "status": inv.status,
                "paid": inv.paid,
                "created": inv.created,
            }
            for inv in invoices.data
        ]
    
    async def void_invoice(self, invoice_id: str) -> bool:
        """Void an invoice."""
        stripe.Invoice.void_invoice(invoice_id)
        return True
    
    async def create_payment_link(
        self,
        amount: int,
        description: str,
        client_reference: str,
    ) -> str:
        """
        Create a one-time payment link.
        
        Args:
            amount: Amount in cents
            description: Payment description
            client_reference: Internal client reference
        
        Returns:
            Payment link URL
        """
        # Create a price for this payment
        price = stripe.Price.create(
            unit_amount=amount,
            currency="aud",
            product_data={"name": description},
        )
        
        # Create payment link
        link = stripe.PaymentLink.create(
            line_items=[{"price": price.id, "quantity": 1}],
            metadata={"client_reference": client_reference},
        )
        
        return link.url
    
    async def handle_webhook(self, payload: bytes, sig_header: str) -> Dict[str, Any]:
        """
        Handle Stripe webhook events.
        
        Args:
            payload: Request body
            sig_header: Stripe-Signature header
        
        Returns:
            Event data
        """
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
            )
        except ValueError:
            raise Exception("Invalid payload")
        except stripe.error.SignatureVerificationError:
            raise Exception("Invalid signature")
        
        return {
            "type": event.type,
            "data": event.data.object,
        }

