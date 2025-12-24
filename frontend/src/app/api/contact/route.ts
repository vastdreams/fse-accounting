/**
 * Contact form API with email notifications
 */

import { NextRequest, NextResponse } from 'next/server';

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
}

async function sendEmailNotification(data: ContactFormData, ip: string): Promise<void> {
  const notificationEmail = process.env.NOTIFICATION_EMAIL || 'hello@fseaccounting.com';
  const slackWebhook = process.env.SLACK_WEBHOOK_URL;

  // Format the lead info
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
    'other': 'Something else',
  };

  const revenueLabels: Record<string, string> = {
    'under-1m': 'Under $1M',
    '1m-5m': '$1M - $5M',
    '5m-20m': '$5M - $20M',
    'over-20m': 'Over $20M',
  };

  const leadSummary = `
🚨 NEW LEAD - FSE Accounting

📋 Contact Info:
• Name: ${data.name}
• Email: ${data.email}
• Phone: ${data.phone || 'Not provided'}
• Company: ${data.company || 'Not provided'}

🎯 Qualification:
• Urgency: ${urgencyLabels[data.urgency] || data.urgency}
• Challenge: ${challengeLabels[data.challenge] || data.challenge}
• Revenue: ${revenueLabels[data.revenue] || data.revenue}

💬 Additional Details:
${data.details || 'None provided'}

---
Submitted: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}
  `.trim();

  // Send to Slack if webhook is configured
  if (slackWebhook) {
    try {
      await fetch(slackWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: leadSummary,
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
            ...(data.details ? [{
              type: 'section',
              text: { type: 'mrkdwn', text: `*Details:*\n${data.details}` }
            }] : []),
            {
              type: 'actions',
              elements: [
                {
                  type: 'button',
                  text: { type: 'plain_text', text: '📧 Email Lead', emoji: true },
                  url: `mailto:${data.email}?subject=Re: Your FSE Accounting Inquiry&body=Hi ${data.name.split(' ')[0]},%0A%0AThanks for reaching out...`
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

  // Send email via Resend API if configured
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
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
          text: leadSummary,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #1C1917;">🚨 New Lead - FSE Accounting</h2>
              
              <div style="background: #FDFBF7; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Contact Info</h3>
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
                <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
              </div>
              
              <div style="background: #F5F5F4; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Qualification</h3>
                <p><strong>Urgency:</strong> ${urgencyLabels[data.urgency] || data.urgency}</p>
                <p><strong>Challenge:</strong> ${challengeLabels[data.challenge] || data.challenge}</p>
                <p><strong>Revenue:</strong> ${revenueLabels[data.revenue] || data.revenue}</p>
              </div>
              
              ${data.details ? `
              <div style="background: #FFF9F0; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin-top: 0;">Additional Details</h3>
                <p>${data.details}</p>
              </div>
              ` : ''}
              
              <p style="color: #78716C; font-size: 14px;">
                Submitted: ${new Date().toLocaleString('en-AU', { timeZone: 'Australia/Sydney' })}
              </p>
              
              <a href="mailto:${data.email}?subject=Re: Your FSE Accounting Inquiry" 
                 style="display: inline-block; background: #1C1917; color: white; padding: 12px 24px; 
                        text-decoration: none; border-radius: 6px; margin-top: 20px;">
                Reply to Lead →
              </a>
            </div>
          `,
        }),
      });
      console.log('✅ Email notification sent via Resend');
    } catch (err) {
      console.error('Email notification failed:', err);
    }
  }

  // Always log to console as backup
  console.log('📧 Lead received:', leadSummary);
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

    // Send notifications
    await sendEmailNotification(body, ip);

    return NextResponse.json({
      success: true,
      message: 'Thank you! We will be in touch within 24 hours.',
    });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred. Please try again.' },
      { status: 500 }
    );
  }
}
