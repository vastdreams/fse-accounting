/**
 * Contact Form API
 * 
 * Handles lead submissions with:
 * - Full attribution tracking
 * - Real-time notifications (Slack, Email)
 * - Lead storage
 * - Google Sheets integration
 */

import { NextRequest, NextResponse } from 'next/server';
import { addLead } from '@/lib/leadStorage';

// Rate limiting
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

  if (now - record.firstRequest > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  record.count++;
  return record.count > MAX_REQUESTS_PER_WINDOW;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactFormData {
  urgency: string;
  challenge: string;
  revenue: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  details?: string;
  honeypot?: string;
  // Attribution
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  landing_page?: string;
  referrer?: string;
  // Session data
  session_id?: string;
  page_views?: number;
  time_on_site?: number;
  pages_visited?: string[];
}

// Label mappings
const urgencyLabels: Record<string, string> = {
  'urgent': '🔥 Urgent (this week)',
  'soon': '⏰ Soon (2-4 weeks)',
  'planning': '📅 Planning ahead',
};

const challengeLabels: Record<string, string> = {
  'books-behind': 'Books are behind / messy',
  'raising-capital': 'Raising debt or equity',
  'buying-business': 'Buying a business',
  'selling-business': 'Selling / exiting',
  'rdti-compliance': 'RDTI / R&D Tax compliance',
  'other': 'Something else',
};

const revenueLabels: Record<string, string> = {
  'under-1m': 'Under $1M',
  '1m-5m': '$1M - $5M',
  '5m-20m': '$5M - $20M',
  'over-20m': 'Over $20M',
};

async function sendSlackNotification(data: ContactFormData, leadId: string): Promise<void> {
  const slackWebhook = process.env.SLACK_WEBHOOK_URL;
  if (!slackWebhook) return;

  try {
    await fetch(slackWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        blocks: [
          {
            type: 'header',
            text: { type: 'plain_text', text: '🚨 New Lead - FSE Accounting', emoji: true }
          },
          {
            type: 'section',
            fields: [
              { type: 'mrkdwn', text: `*Name:*\n${data.name}` },
              { type: 'mrkdwn', text: `*Email:*\n${data.email}` },
              { type: 'mrkdwn', text: `*Phone:*\n${data.phone || 'N/A'}` },
              { type: 'mrkdwn', text: `*Company:*\n${data.company || 'N/A'}` },
            ]
          },
          {
            type: 'section',
            fields: [
              { type: 'mrkdwn', text: `*Urgency:*\n${urgencyLabels[data.urgency] || data.urgency}` },
              { type: 'mrkdwn', text: `*Challenge:*\n${challengeLabels[data.challenge] || data.challenge}` },
              { type: 'mrkdwn', text: `*Revenue:*\n${revenueLabels[data.revenue] || data.revenue}` },
            ]
          },
          {
            type: 'section',
            fields: [
              { type: 'mrkdwn', text: `*Source:*\n${data.utm_source || 'direct'}` },
              { type: 'mrkdwn', text: `*Campaign:*\n${data.utm_campaign || 'N/A'}` },
            ]
          },
          ...(data.details ? [{
            type: 'section',
            text: { type: 'mrkdwn', text: `*Details:*\n${data.details}` }
          }] : []),
          {
            type: 'context',
            elements: [
              { type: 'mrkdwn', text: `Lead ID: ${leadId} | Landing: ${data.landing_page || 'N/A'} | Pages: ${data.page_views || 0} | Time: ${Math.round((data.time_on_site || 0) / 60)}min` }
            ]
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: { type: 'plain_text', text: '📧 Email Lead', emoji: true },
                url: `mailto:${data.email}?subject=Re: Your FSE Accounting Inquiry&body=Hi ${data.name.split(' ')[0]},%0A%0AThanks for reaching out...`,
                style: 'primary'
              },
              {
                type: 'button',
                text: { type: 'plain_text', text: '📞 Call Lead', emoji: true },
                url: `tel:${data.phone || ''}`,
              }
            ]
          }
        ]
      }),
    });
    console.log('✅ Slack notification sent');
  } catch (err) {
    console.error('Slack notification failed:', err);
  }
}

async function sendEmailNotification(data: ContactFormData, leadId: string): Promise<void> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const notificationEmail = process.env.NOTIFICATION_EMAIL || 'hello@fseaccounting.com';
  
  if (!resendApiKey) return;

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'FSE Accounting <leads@fseaccounting.com>',
        to: [notificationEmail],
        subject: `🚨 New Lead: ${data.name} - ${challengeLabels[data.challenge] || data.challenge}`,
        html: `
          <div style="font-family: -apple-system, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1C1917; margin-bottom: 24px;">🚨 New Lead - FSE Accounting</h2>
            
            <div style="background: #FDFBF7; padding: 20px; border-radius: 8px; margin-bottom: 16px;">
              <h3 style="margin-top: 0; color: #1C1917;">Contact Info</h3>
              <p style="margin: 8px 0;"><strong>Name:</strong> ${data.name}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              <p style="margin: 8px 0;"><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
              <p style="margin: 8px 0;"><strong>Company:</strong> ${data.company || 'Not provided'}</p>
            </div>
            
            <div style="background: #F5F5F4; padding: 20px; border-radius: 8px; margin-bottom: 16px;">
              <h3 style="margin-top: 0; color: #1C1917;">Qualification</h3>
              <p style="margin: 8px 0;"><strong>Urgency:</strong> ${urgencyLabels[data.urgency] || data.urgency}</p>
              <p style="margin: 8px 0;"><strong>Challenge:</strong> ${challengeLabels[data.challenge] || data.challenge}</p>
              <p style="margin: 8px 0;"><strong>Revenue:</strong> ${revenueLabels[data.revenue] || data.revenue}</p>
            </div>
            
            <div style="background: #FEF3C7; padding: 20px; border-radius: 8px; margin-bottom: 16px;">
              <h3 style="margin-top: 0; color: #1C1917;">Attribution</h3>
              <p style="margin: 8px 0;"><strong>Source:</strong> ${data.utm_source || 'direct'}</p>
              <p style="margin: 8px 0;"><strong>Campaign:</strong> ${data.utm_campaign || 'N/A'}</p>
              <p style="margin: 8px 0;"><strong>Landing Page:</strong> ${data.landing_page || 'N/A'}</p>
              <p style="margin: 8px 0;"><strong>Referrer:</strong> ${data.referrer || 'N/A'}</p>
            </div>
            
            ${data.details ? `
            <div style="background: #FFF9F0; padding: 20px; border-radius: 8px; margin-bottom: 16px;">
              <h3 style="margin-top: 0; color: #1C1917;">Additional Details</h3>
              <p style="margin: 0;">${data.details}</p>
            </div>
            ` : ''}
            
            <div style="margin-top: 24px;">
              <a href="mailto:${data.email}?subject=Re: Your FSE Accounting Inquiry" 
                 style="display: inline-block; background: #1C1917; color: white; padding: 12px 24px; 
                        text-decoration: none; border-radius: 6px; font-weight: 600;">
                Reply to Lead →
              </a>
            </div>
            
            <p style="color: #78716C; font-size: 12px; margin-top: 24px;">
              Lead ID: ${leadId} | Pages viewed: ${data.page_views || 0} | Time on site: ${Math.round((data.time_on_site || 0) / 60)} min<br>
              Submitted: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}
            </p>
          </div>
        `,
      }),
    });
    console.log('✅ Email notification sent via Resend');
  } catch (err) {
    console.error('Email notification failed:', err);
  }
}

async function sendToGoogleSheets(data: ContactFormData, leadId: string): Promise<void> {
  const sheetsWebhook = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!sheetsWebhook) return;

  try {
    await fetch(sheetsWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lead_id: leadId,
        timestamp: new Date().toISOString(),
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        company: data.company || '',
        urgency: data.urgency,
        urgency_label: urgencyLabels[data.urgency] || data.urgency,
        challenge: data.challenge,
        challenge_label: challengeLabels[data.challenge] || data.challenge,
        revenue: data.revenue,
        revenue_label: revenueLabels[data.revenue] || data.revenue,
        details: data.details || '',
        utm_source: data.utm_source || 'direct',
        utm_medium: data.utm_medium || '',
        utm_campaign: data.utm_campaign || '',
        utm_term: data.utm_term || '',
        utm_content: data.utm_content || '',
        landing_page: data.landing_page || '',
        referrer: data.referrer || '',
        page_views: data.page_views || 0,
        time_on_site: data.time_on_site || 0,
        status: 'new',
      }),
    });
    console.log('✅ Lead sent to Google Sheets');
  } catch (err) {
    console.error('Google Sheets webhook failed:', err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body: ContactFormData = await request.json();

    // Honeypot check
    if (body.honeypot) {
      console.log('🤖 Bot detected via honeypot');
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

    if (!body.urgency) {
      errors.push('Please select urgency');
    }

    if (!body.challenge) {
      errors.push('Please select your challenge');
    }

    if (!body.revenue) {
      errors.push('Please select revenue band');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, message: errors.join('. ') },
        { status: 400 }
      );
    }

    // Store lead with full attribution
    const lead = addLead({
      name: body.name.trim(),
      email: body.email.toLowerCase().trim(),
      phone: body.phone?.trim() || '',
      company: body.company?.trim() || '',
      urgency: body.urgency,
      challenge: body.challenge,
      revenue: body.revenue,
      details: body.details?.trim() || '',
      utm_source: body.utm_source || '',
      utm_medium: body.utm_medium || '',
      utm_campaign: body.utm_campaign || '',
      utm_term: body.utm_term || '',
      utm_content: body.utm_content || '',
      landing_page: body.landing_page || '',
      referrer: body.referrer || '',
      session_id: body.session_id || '',
      page_views: body.page_views || 0,
      time_on_site: body.time_on_site || 0,
      pages_visited: body.pages_visited || [],
    }, ip, request.headers.get('user-agent') || 'unknown');

    console.log('✅ Lead stored:', lead.id, lead.email);

    // Send notifications in parallel
    await Promise.all([
      sendSlackNotification(body, lead.id),
      sendEmailNotification(body, lead.id),
      sendToGoogleSheets(body, lead.id),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Thank you! We will be in touch within 24 hours.',
      lead_id: lead.id,
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
