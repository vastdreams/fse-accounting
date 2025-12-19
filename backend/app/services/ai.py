"""
PATH: backend/app/services/ai.py
PURPOSE: DeepSeek AI integration for chat and document analysis
ROLE IN ARCHITECTURE: AI service layer

MAIN EXPORTS:
    - AIService: Service class for AI operations
"""

from typing import Optional, List, Dict, Any, Tuple
import httpx

from app.core.config import settings


class AIService:
    """
    DeepSeek AI service for intelligent features.
    
    Handles:
    - Chat assistant (Ask FSE)
    - Document summarization
    - Document Q&A
    - Category suggestion
    """
    
    def __init__(self):
        self.api_key = settings.DEEPSEEK_API_KEY
        self.base_url = settings.DEEPSEEK_BASE_URL
        self.model = "deepseek-reasoner"  # DeepSeek 3.2 reasoning model
    
    async def _call_api(
        self,
        messages: List[Dict[str, str]],
        max_tokens: int = 2000,
        temperature: float = 0.7,
    ) -> Tuple[str, int]:
        """
        Call DeepSeek API.
        
        Returns:
            Tuple of (response text, tokens used)
        """
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{self.base_url}/v1/chat/completions",
                json={
                    "model": self.model,
                    "messages": messages,
                    "max_tokens": max_tokens,
                    "temperature": temperature,
                },
                headers={
                    "Authorization": f"Bearer {self.api_key}",
                    "Content-Type": "application/json",
                },
            )
            
            if response.status_code != 200:
                raise Exception(f"DeepSeek API error: {response.text}")
            
            data = response.json()
            content = data["choices"][0]["message"]["content"]
            tokens = data.get("usage", {}).get("total_tokens", 0)
            
            return content, tokens
    
    async def chat(
        self,
        message: str,
        context: Optional[str] = None,
        history: Optional[List[Dict[str, str]]] = None,
        user_name: Optional[str] = None,
    ) -> Tuple[str, int]:
        """
        Chat with AI assistant.
        
        Args:
            message: User's message
            context: Additional context
            history: Previous conversation messages
            user_name: User's name for personalization
        
        Returns:
            Tuple of (response, tokens_used)
        """
        system_prompt = """You are FSE Assistant, a helpful AI for FSE Accounting and Advisory.
You help clients with:
- General accounting and tax questions
- Business structuring advice
- Document explanations
- Deadline reminders
- Financial guidance

Always be professional, accurate, and helpful. If you're unsure about something, 
acknowledge it and suggest consulting with an FSE accountant for specific advice.

Important: Never provide specific tax or legal advice - always recommend professional consultation."""

        if user_name:
            system_prompt += f"\n\nYou're speaking with {user_name}."
        
        messages = [{"role": "system", "content": system_prompt}]
        
        if history:
            for msg in history:
                messages.append({
                    "role": msg.get("role", "user"),
                    "content": msg.get("content", ""),
                })
        
        if context:
            messages.append({
                "role": "user",
                "content": f"Context: {context}\n\nQuestion: {message}",
            })
        else:
            messages.append({"role": "user", "content": message})
        
        return await self._call_api(messages)
    
    async def analyze_document(
        self,
        content: bytes,
        filename: str,
        mime_type: str,
        question: Optional[str] = None,
    ) -> Dict[str, Any]:
        """
        Analyze a document using AI.
        
        Args:
            content: Document content (text or PDF bytes)
            filename: Document filename
            mime_type: Document MIME type
            question: Optional specific question
        
        Returns:
            Analysis result dictionary
        """
        # Extract text from content
        if mime_type == "application/pdf":
            # In production, use PyPDF2 or similar
            text_content = "[PDF content - text extraction would go here]"
        else:
            try:
                text_content = content.decode("utf-8")
            except:
                text_content = "[Binary content - cannot extract text]"
        
        # Limit content length
        max_chars = 10000
        if len(text_content) > max_chars:
            text_content = text_content[:max_chars] + "\n[... content truncated ...]"
        
        system_prompt = """You are an expert document analyzer for FSE Accounting.
Analyze documents and provide:
1. A brief summary (2-3 sentences)
2. Key points (bullet list)
3. Suggested category (tax, financial, legal, identity, contract, invoice, receipt, report, other)
4. If a question is asked, answer it based on the document

Respond in JSON format with keys: summary, key_points (array), category_suggestion, answer (if question asked)"""

        user_content = f"Document: {filename}\n\n{text_content}"
        if question:
            user_content += f"\n\nQuestion: {question}"
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_content},
        ]
        
        response, _ = await self._call_api(messages, temperature=0.3)
        
        # Parse JSON response
        import json
        try:
            # Try to extract JSON from response
            if "```json" in response:
                json_str = response.split("```json")[1].split("```")[0]
            elif "{" in response:
                start = response.index("{")
                end = response.rindex("}") + 1
                json_str = response[start:end]
            else:
                json_str = response
            
            result = json.loads(json_str)
        except:
            # Fallback if JSON parsing fails
            result = {
                "summary": response[:500],
                "key_points": [],
                "category_suggestion": "other",
            }
        
        return result

