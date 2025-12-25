/**
 * Lead Storage System
 * 
 * In production, replace with:
 * - PostgreSQL/MongoDB database
 * - Airtable/Notion API
 * - HubSpot/Pipedrive CRM
 * 
 * For now: In-memory + file-based for persistence across restarts
 */

export interface Lead {
  id: string;
  timestamp: string;
  
  // Contact info
  name: string;
  email: string;
  phone: string;
  company: string;
  
  // Qualification
  urgency: string;
  challenge: string;
  revenue: string;
  details: string;
  
  // Attribution
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  landing_page: string;
  referrer: string;
  
  // Session data
  session_id: string;
  page_views: number;
  time_on_site: number;
  pages_visited: string[];
  
  // Status
  status: 'new' | 'contacted' | 'qualified' | 'call_booked' | 'call_completed' | 'proposal_sent' | 'closed_won' | 'closed_lost';
  first_response_at: string | null;
  call_booked_at: string | null;
  closed_at: string | null;
  
  // Metadata
  ip: string;
  user_agent: string;
  device: string;
  browser: string;
}

export interface Event {
  id: string;
  timestamp: string;
  session_id: string;
  event_type: string;
  page_path: string;
  properties: Record<string, any>;
  utm_source: string;
  utm_campaign: string;
}

export interface SpendRecord {
  id: string;
  timestamp: string;
  source: string;
  campaign: string;
  amount: number;
  currency: string;
  notes?: string;
}

export interface FunnelMetrics {
  lp_views: number;
  cta_clicks: number;
  form_starts: number;
  form_submits: number;
  calls_booked: number;
  calls_completed: number;
  closed: number;
}

export interface SourceMetrics {
  source: string;
  campaign: string;
  leads: number;
  spend: number;
  cpl: number;
}

export interface CampaignPerformanceRow {
  source: string;
  campaign: string;
  landing_page: string;
  lp_views: number;
  cta_clicks: number;
  form_starts: number;
  form_submits: number; // leads
  calendar_opens: number;
  conversions: number;
  high_intent_leads: number;
  calls_booked: number;
  closed_won: number;
  spend: number;
}

// In-memory storage (persisted to file on writes)
let leads: Lead[] = [];
let events: Event[] = [];
let spend: SpendRecord[] = [];

// Load from file on startup (server-side only)
if (typeof window === 'undefined') {
  try {
    const fs = require('fs');
    const path = require('path');
    const dataDir = path.join(process.cwd(), 'data');
    
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const leadsFile = path.join(dataDir, 'leads.json');
    const eventsFile = path.join(dataDir, 'events.json');
    const spendFile = path.join(dataDir, 'spend.json');
    
    if (fs.existsSync(leadsFile)) {
      leads = JSON.parse(fs.readFileSync(leadsFile, 'utf-8'));
    }
    
    if (fs.existsSync(eventsFile)) {
      events = JSON.parse(fs.readFileSync(eventsFile, 'utf-8'));
    }

    if (fs.existsSync(spendFile)) {
      spend = JSON.parse(fs.readFileSync(spendFile, 'utf-8'));
    }
  } catch (e) {
    console.log('Could not load persisted data:', e);
  }
}

// Save to file
function persist() {
  if (typeof window === 'undefined') {
    try {
      const fs = require('fs');
      const path = require('path');
      const dataDir = path.join(process.cwd(), 'data');
      
      fs.writeFileSync(path.join(dataDir, 'leads.json'), JSON.stringify(leads, null, 2));
      fs.writeFileSync(path.join(dataDir, 'events.json'), JSON.stringify(events, null, 2));
      fs.writeFileSync(path.join(dataDir, 'spend.json'), JSON.stringify(spend, null, 2));
    } catch (e) {
      console.log('Could not persist data:', e);
    }
  }
}

// Generate unique ID
function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function normalizeKeyPart(value: string | undefined | null, fallback: string): string {
  const v = (value || '').trim();
  return (v.length > 0 ? v : fallback).toLowerCase();
}

// Add an ad spend record (manual input; sum these to compute CPL)
export function addSpendRecord(data: {
  source?: string;
  campaign?: string;
  amount: number;
  currency?: string;
  timestamp?: string;
  notes?: string;
}): SpendRecord {
  const record: SpendRecord = {
    id: generateId(),
    timestamp: data.timestamp || new Date().toISOString(),
    source: normalizeKeyPart(data.source, 'direct'),
    campaign: normalizeKeyPart(data.campaign, 'direct'),
    amount: Number.isFinite(data.amount) ? data.amount : 0,
    currency: (data.currency || 'AUD').toUpperCase(),
    notes: data.notes,
  };

  spend.push(record);
  persist();
  return record;
}

export function getSpendRecords(days: number = 30): SpendRecord[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  return spend.filter((s) => new Date(s.timestamp) >= cutoff);
}

function getSpendMap(days: number = 7): Map<string, number> {
  const map = new Map<string, number>();
  const recent = getSpendRecords(days);

  recent.forEach((s) => {
    const key = `${s.source}:${s.campaign}`;
    map.set(key, (map.get(key) || 0) + (s.amount || 0));
  });

  return map;
}

// Parse user agent
function parseUserAgent(ua: string): { device: string; browser: string } {
  const isMobile = /Mobile|Android|iPhone|iPad/.test(ua);
  const isTablet = /iPad|Tablet/.test(ua);
  
  let browser = 'Unknown';
  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edge')) browser = 'Edge';
  
  return {
    device: isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop',
    browser,
  };
}

// Add a new lead
export function addLead(data: Partial<Lead>, ip: string, userAgent: string): Lead {
  const { device, browser } = parseUserAgent(userAgent);
  
  const lead: Lead = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    
    name: data.name || '',
    email: data.email || '',
    phone: data.phone || '',
    company: data.company || '',
    
    urgency: data.urgency || '',
    challenge: data.challenge || '',
    revenue: data.revenue || '',
    details: data.details || '',
    
    utm_source: data.utm_source || 'direct',
    utm_medium: data.utm_medium || '',
    utm_campaign: data.utm_campaign || '',
    utm_term: data.utm_term || '',
    utm_content: data.utm_content || '',
    landing_page: data.landing_page || '',
    referrer: data.referrer || '',
    
    session_id: data.session_id || '',
    page_views: data.page_views || 0,
    time_on_site: data.time_on_site || 0,
    pages_visited: data.pages_visited || [],
    
    status: 'new',
    first_response_at: null,
    call_booked_at: null,
    closed_at: null,
    
    ip,
    user_agent: userAgent,
    device,
    browser,
  };
  
  leads.push(lead);
  persist();
  
  return lead;
}

// Update lead status
export function updateLeadStatus(id: string, status: Lead['status']): Lead | null {
  const lead = leads.find(l => l.id === id);
  if (!lead) return null;
  
  lead.status = status;
  
  if (status === 'contacted' && !lead.first_response_at) {
    lead.first_response_at = new Date().toISOString();
  }
  if (status === 'call_booked' && !lead.call_booked_at) {
    lead.call_booked_at = new Date().toISOString();
  }
  if ((status === 'closed_won' || status === 'closed_lost') && !lead.closed_at) {
    lead.closed_at = new Date().toISOString();
  }
  
  persist();
  return lead;
}

// Add an event
export function addEvent(data: Partial<Event>): Event {
  const event: Event = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    session_id: data.session_id || '',
    event_type: data.event_type || '',
    page_path: data.page_path || '',
    properties: data.properties || {},
    utm_source: data.utm_source || '',
    utm_campaign: data.utm_campaign || '',
  };
  
  events.push(event);
  
  // Only persist events periodically to avoid too many writes
  if (events.length % 10 === 0) {
    persist();
  }
  
  return event;
}

// Get all leads
export function getLeads(days: number = 7): Lead[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  
  return leads.filter(l => new Date(l.timestamp) >= cutoff);
}

// Get leads waiting for response
export function getLeadsWaiting(): Lead[] {
  return leads.filter(l => l.status === 'new');
}

// Get funnel metrics
export function getFunnelMetrics(days: number = 7): FunnelMetrics {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  
  const recentEvents = events.filter(e => new Date(e.timestamp) >= cutoff);
  const recentLeads = leads.filter(l => new Date(l.timestamp) >= cutoff);
  
  return {
    lp_views: recentEvents.filter(e => e.event_type === 'lp_view').length,
    cta_clicks: recentEvents.filter(e => e.event_type === 'cta_click').length,
    form_starts: recentEvents.filter(e => e.event_type === 'form_start').length,
    form_submits: recentLeads.length,
    calls_booked: recentLeads.filter(l => l.call_booked_at).length,
    calls_completed: recentLeads.filter(l => l.status === 'call_completed' || l.status === 'proposal_sent' || l.status === 'closed_won' || l.status === 'closed_lost').length,
    closed: recentLeads.filter(l => l.status === 'closed_won').length,
  };
}

// Get source breakdown
export function getSourceBreakdown(days: number = 7): SourceMetrics[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  
  const recentLeads = leads.filter(l => new Date(l.timestamp) >= cutoff);
  const spendMap = getSpendMap(days);
  
  const sourceMap = new Map<string, { source: string; campaign: string; leads: number }>();
  
  recentLeads.forEach(lead => {
    const source = normalizeKeyPart(lead.utm_source, 'direct');
    const campaign = normalizeKeyPart(lead.utm_campaign, 'direct');
    const key = `${source}:${campaign}`;
    const existing = sourceMap.get(key);
    
    if (existing) {
      existing.leads++;
    } else {
      sourceMap.set(key, {
        source,
        campaign,
        leads: 1,
      });
    }
  });
  
  return Array.from(sourceMap.values())
    .map((s) => {
      const spendAmount = spendMap.get(`${s.source}:${s.campaign}`) || 0;
      const cpl = s.leads > 0 && spendAmount > 0 ? Math.round(spendAmount / s.leads) : 0;
      return {
        ...s,
        spend: Math.round(spendAmount),
        cpl,
      };
    })
    .sort((a, b) => b.leads - a.leads);
}

// Campaign performance table (UTM campaign + landing page)
export function getCampaignPerformance(days: number = 7): CampaignPerformanceRow[] {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);

  const recentEvents = events.filter((e) => new Date(e.timestamp) >= cutoff);
  const recentLeads = leads.filter((l) => new Date(l.timestamp) >= cutoff);
  const spendMap = getSpendMap(days);

  const norm = (value: string | undefined | null, fallback: string) => {
    const v = (value || '').trim();
    return v.length > 0 ? v : fallback;
  };

  const keyFor = (source: string, campaign: string, landing: string) =>
    `${source}||${campaign}||${landing}`;

  const rows = new Map<string, CampaignPerformanceRow>();

  const ensureRow = (source: string, campaign: string, landing_page: string) => {
    const key = keyFor(source, campaign, landing_page);
    const existing = rows.get(key);
    if (existing) return existing;

    const row: CampaignPerformanceRow = {
      source,
      campaign,
      landing_page,
      lp_views: 0,
      cta_clicks: 0,
      form_starts: 0,
      form_submits: 0,
      calendar_opens: 0,
      conversions: 0,
      high_intent_leads: 0,
      calls_booked: 0,
      closed_won: 0,
      spend: 0,
    };
    rows.set(key, row);
    return row;
  };

  // Aggregate events (top-of-funnel)
  recentEvents.forEach((e) => {
    const source = normalizeKeyPart(e.utm_source, 'direct');
    const campaign = normalizeKeyPart(e.utm_campaign, 'direct');
    const landingFromProps =
      (e.properties?.landing_page as string | undefined) || '';
    const landing = norm(landingFromProps || e.page_path, '(unknown)');

    const row = ensureRow(source, campaign, landing);

    switch (e.event_type) {
      case 'lp_view':
        row.lp_views += 1;
        break;
      case 'cta_click':
        row.cta_clicks += 1;
        break;
      case 'form_start':
        row.form_starts += 1;
        break;
      case 'calendar_open':
        row.calendar_opens += 1;
        break;
      case 'conversion':
        row.conversions += 1;
        break;
      default:
        break;
    }
  });

  // Aggregate leads (bottom-of-funnel)
  recentLeads.forEach((lead) => {
    const source = normalizeKeyPart(lead.utm_source, 'direct');
    const campaign = normalizeKeyPart(lead.utm_campaign, 'direct');
    const landing = norm(lead.landing_page, '(unknown)');

    const row = ensureRow(source, campaign, landing);
    row.form_submits += 1;

    const isHighIntent =
      (lead.urgency === 'urgent' || lead.urgency === 'soon') &&
      lead.revenue !== 'under-1m';
    if (isHighIntent) row.high_intent_leads += 1;

    if (lead.call_booked_at) row.calls_booked += 1;
    if (lead.status === 'closed_won') row.closed_won += 1;
  });

  // Attach spend (by source + campaign) to each row
  Array.from(rows.values()).forEach((row) => {
    row.spend = Math.round(spendMap.get(`${row.source}:${row.campaign}`) || 0);
  });

  return Array.from(rows.values()).sort((a, b) => {
    if (b.form_submits !== a.form_submits) return b.form_submits - a.form_submits;
    if (b.lp_views !== a.lp_views) return b.lp_views - a.lp_views;
    return b.cta_clicks - a.cta_clicks;
  });
}

// Get lead quality breakdown
export function getLeadQualityBreakdown(days: number = 7) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  
  const recentLeads = leads.filter(l => new Date(l.timestamp) >= cutoff);
  const total = recentLeads.length || 1;
  
  const urgencyCount = new Map<string, number>();
  const challengeCount = new Map<string, number>();
  const revenueCount = new Map<string, number>();
  
  recentLeads.forEach(lead => {
    urgencyCount.set(lead.urgency, (urgencyCount.get(lead.urgency) || 0) + 1);
    challengeCount.set(lead.challenge, (challengeCount.get(lead.challenge) || 0) + 1);
    revenueCount.set(lead.revenue, (revenueCount.get(lead.revenue) || 0) + 1);
  });
  
  return {
    byUrgency: Array.from(urgencyCount.entries()).map(([urgency, count]) => ({
      urgency,
      count,
      percentage: Math.round((count / total) * 100),
    })),
    byChallenge: Array.from(challengeCount.entries()).map(([challenge, count]) => ({
      challenge,
      count,
      percentage: Math.round((count / total) * 100),
    })),
    byRevenue: Array.from(revenueCount.entries()).map(([revenue, count]) => ({
      revenue,
      count,
      percentage: Math.round((count / total) * 100),
    })),
  };
}

// Get speed metrics
export function getSpeedMetrics(days: number = 7) {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - days);
  
  const recentLeads = leads.filter(l => new Date(l.timestamp) >= cutoff);
  const leadsWithResponse = recentLeads.filter(l => l.first_response_at);
  
  // Calculate average response time in minutes
  let avgResponseTime = 0;
  if (leadsWithResponse.length > 0) {
    const totalResponseTime = leadsWithResponse.reduce((sum, lead) => {
      const submitted = new Date(lead.timestamp).getTime();
      const responded = new Date(lead.first_response_at!).getTime();
      return sum + (responded - submitted);
    }, 0);
    avgResponseTime = Math.round(totalResponseTime / leadsWithResponse.length / 1000 / 60);
  }
  
  // Leads waiting over 1 hour
  const oneHourAgo = new Date();
  oneHourAgo.setHours(oneHourAgo.getHours() - 1);
  const leadsWaitingOverHour = leads.filter(l => 
    l.status === 'new' && 
    new Date(l.timestamp) < oneHourAgo
  );
  
  // Book rate
  const bookRate = recentLeads.length > 0 
    ? Math.round((recentLeads.filter(l => l.call_booked_at).length / recentLeads.length) * 100)
    : 0;
  
  // Oldest waiting lead
  const waitingLeads = leads.filter(l => l.status === 'new');
  const oldestWaiting = waitingLeads.length > 0
    ? waitingLeads.reduce((oldest, lead) => 
        new Date(lead.timestamp) < new Date(oldest.timestamp) ? lead : oldest
      )
    : null;
  
  let oldestWaitingTime = '';
  if (oldestWaiting) {
    const minutes = Math.round((Date.now() - new Date(oldestWaiting.timestamp).getTime()) / 1000 / 60);
    if (minutes < 60) {
      oldestWaitingTime = `${minutes} min ago`;
    } else {
      oldestWaitingTime = `${Math.round(minutes / 60)} hr ago`;
    }
  }
  
  return {
    avgResponseTime: avgResponseTime > 0 ? `${avgResponseTime} min` : 'N/A',
    leadsWaiting: leadsWaitingOverHour.length,
    oldestWaitingTime,
    bookRate: `${bookRate}%`,
    totalWaiting: waitingLeads.length,
  };
}

// Get total stats
export function getTotalStats() {
  const totalLeads = leads.length;
  const closedWon = leads.filter(l => l.status === 'closed_won').length;
  
  return {
    totalLeads,
    closedWon,
    closeRate: totalLeads > 0 ? Math.round((closedWon / totalLeads) * 100) : 0,
  };
}

