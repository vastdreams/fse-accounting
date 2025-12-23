/**
 * PATH: frontend/src/app/api/contact/route.ts
 * PURPOSE: Lead delivery API with validation and spam protection
 * 
 * FEATURES:
 * - Honeypot spam detection
 * - Server-side validation
 * - Rate limiting (simple in-memory)
 * - Email notification (placeholder)
 * - UTM tracking capture
 */

import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; firstRequest: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  // Reset if window expired
  if (now - record.firstRequest > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  // Increment and check
  record.count++;
  return record.count > MAX_REQUESTS_PER_WINDOW;
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Blocked domains (common spam/temp email providers)
const BLOCKED_DOMAINS = [
  'tempmail.com',
  'throwaway.email',
  'mailinator.com',
  'guerrillamail.com',
  'sharklasers.com',
  'grr.la',
  'temp-mail.org',
];

function isBlockedEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  return BLOCKED_DOMAINS.some(blocked => domain?.includes(blocked));
}

// Types
interface ContactFormData {
  serviceIntent: string;
  name: string;
  email: string;
  company?: string;
  phone?: string;
  revenueBand: string;
  urgency: string;
  goal?: string;
  website?: string; // Honeypot
  source?: string;
  page?: string;
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  utm_term?: string;
}

interface LeadRecord {
  id: string;
  timestamp: string;
  data: ContactFormData;
  ip: string;
  userAgent: string;
}

// In production, this would go to a database or CRM
const leads: LeadRecord[] = [];

async function sendNotificationEmail(lead: LeadRecord): Promise<void> {
  // Placeholder for email sending
  // In production, use Resend, SendGrid, or similar
  console.log('📧 New lead notification would be sent:', {
    to: 'hello@fseaccounting.com',
    subject: `New Lead: ${lead.data.name} - ${lead.data.serviceIntent}`,
    body: `
      Name: ${lead.data.name}
      Email: ${lead.data.email}
      Company: ${lead.data.company || 'N/A'}
      Phone: ${lead.data.phone || 'N/A'}
      Service: ${lead.data.serviceIntent}
      Revenue: ${lead.data.revenueBand}
      Urgency: ${lead.data.urgency}
      Goal: ${lead.data.goal || 'N/A'}
      Source: ${lead.data.utm_source || 'direct'}
      Campaign: ${lead.data.utm_campaign || 'N/A'}
    `
  });
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Rate limit check
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body: ContactFormData = await request.json();

    // Honeypot check - if 'website' field is filled, it's a bot
    if (body.website) {
      // Silently reject but return success to confuse bots
      console.log('🤖 Bot detected via honeypot:', ip);
      return NextResponse.json({ success: true });
    }

    // Validation
    const errors: string[] = [];

    if (!body.name || body.name.trim().length < 2) {
      errors.push('Name is required');
    }

    if (!body.email || !EMAIL_REGEX.test(body.email)) {
      errors.push('Valid email is required');
    }

    if (body.email && isBlockedEmail(body.email)) {
      errors.push('Please use a business email address');
    }

    if (!body.serviceIntent) {
      errors.push('Please select a service');
    }

    if (!body.revenueBand) {
      errors.push('Please select your revenue band');
    }

    if (!body.urgency) {
      errors.push('Please select your timeline');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, message: errors.join('. ') },
        { status: 400 }
      );
    }

    // Create lead record
    const lead: LeadRecord = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      data: {
        serviceIntent: body.serviceIntent,
        name: body.name.trim(),
        email: body.email.toLowerCase().trim(),
        company: body.company?.trim(),
        phone: body.phone?.trim(),
        revenueBand: body.revenueBand,
        urgency: body.urgency,
        goal: body.goal?.trim(),
        source: body.source,
        page: body.page,
        utm_source: body.utm_source,
        utm_campaign: body.utm_campaign,
        utm_medium: body.utm_medium,
        utm_term: body.utm_term,
      },
      ip,
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    // Store lead (in production, this goes to database/CRM)
    leads.push(lead);
    console.log('✅ New lead stored:', lead.id, lead.data.email);

    // Send notification email
    await sendNotificationEmail(lead);

    return NextResponse.json({
      success: true,
      message: 'Thank you! We will be in touch within 24 hours.',
      leadId: lead.id,
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// For debugging - list leads (would be removed in production)
export async function GET(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({
    count: leads.length,
    leads: leads.slice(-10), // Last 10 leads
  });
}

