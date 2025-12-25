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

### Public Website & Marketing
- **Landing Pages**: Dedicated pages for core offers (Bookkeeping, Lending, Acquisitions)
- **Case Studies**: Proof of results with real client stories
- **Conversion-Optimized Contact Form**: Multi-step qualification funnel
- **Cal.com Integration**: Direct calendar booking for diagnostic calls

### Campaign Tracking & Analytics
- **Comprehensive Event Tracking**: Page views, CTA clicks, form interactions, scroll depth
- **UTM Attribution**: Full campaign attribution from first touch to conversion
- **Session Data**: Device, browser, pages visited, time on site
- **Lead Storage**: File-based persistence with full attribution data
- **Real-time Dashboard**: `/admin/campaign` with funnel metrics, source breakdown, lead quality
- **Multi-channel Notifications**: Slack, email (Resend), Google Sheets webhooks

### Required Environment Variables (Marketing)

```bash
# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=      # Google Analytics 4
NEXT_PUBLIC_GOOGLE_ADS_ID=          # Google Ads
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=    # LinkedIn Insight Tag

# Notifications  
SLACK_WEBHOOK_URL=                  # Slack lead alerts
RESEND_API_KEY=                     # Email notifications
NOTIFICATION_EMAIL=                 # Where to send lead emails
GOOGLE_SHEETS_WEBHOOK_URL=          # Spreadsheet logging

# Booking
NEXT_PUBLIC_CALCOM_URL=             # Cal.com booking URL
```

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

