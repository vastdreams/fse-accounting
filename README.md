# FSE Accounting and Advisory

A comprehensive accounting firm platform with public website, client portal, and admin CRM dashboard.

## Architecture

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
- **Backend**: FastAPI + PostgreSQL + Redis
- **AI**: DeepSeek 3.2 for document analysis and chat
- **Document Signing**: DocuSign API
- **Storage**: AWS S3
- **Billing**: Stripe

## Project Structure

```
fse-accounting/
├── frontend/                 # Next.js 14 App Router
│   ├── src/app/
│   │   ├── (public)/        # Public website routes
│   │   ├── (portal)/        # Client portal routes
│   │   └── (admin)/         # Admin dashboard routes
│   ├── src/components/
│   └── src/lib/
├── backend/                  # FastAPI
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   └── services/
│   └── requirements.txt
├── docker-compose.yml
└── README.md
```

## Quick Start

### Development

```bash
# Start all services
docker-compose up -d

# Frontend only
cd frontend && npm run dev

# Backend only
cd backend && uvicorn app.main:app --reload
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/fse_accounting

# AWS
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET=fse-accounting-documents

# DocuSign
DOCUSIGN_INTEGRATION_KEY=
DOCUSIGN_SECRET_KEY=
DOCUSIGN_ACCOUNT_ID=

# Stripe
STRIPE_SECRET_KEY=

# DeepSeek
DEEPSEEK_API_KEY=

# JWT
JWT_SECRET_KEY=
```

## Features

### Public Website
- Service pages (12 accounting services)
- About and team pages
- Contact form with booking

### Client Portal
- Document upload and management
- DocuSign e-signature integration
- Project tracking and milestones
- AI-powered chat assistant

### Admin Dashboard
- Client CRM with health scoring
- Project kanban board
- Invoice management (Stripe)
- Document templates
- Analytics and reporting

## Deployment

```bash
# Build and deploy
docker-compose -f docker-compose.prod.yml up -d --build
```

## License

Proprietary - FSE Accounting and Advisory

