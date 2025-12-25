/**
 * Dashboard API
 * 
 * Returns real-time metrics for the campaign dashboard.
 * All data comes from actual leads and events - no mock data.
 */

import { NextRequest, NextResponse } from 'next/server';
import { 
  getFunnelMetrics, 
  getSourceBreakdown, 
  getCampaignPerformance,
  getLeadQualityBreakdown, 
  getSpeedMetrics,
  getLeadsWaiting,
  getLeads,
  getTotalStats,
} from '@/lib/leadStorage';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const daysParam = searchParams.get('days');
    const days = daysParam ? parseInt(daysParam) : 7;
    
    // Get all metrics
    const funnel = getFunnelMetrics(days);
    const sources = getSourceBreakdown(days);
    const campaigns = getCampaignPerformance(days);
    const quality = getLeadQualityBreakdown(days);
    const speed = getSpeedMetrics(days);
    const waiting = getLeadsWaiting();
    const leads = getLeads(days);
    const totals = getTotalStats();
    
    // Calculate conversion rates
    const viewToCTA = funnel.lp_views > 0 
      ? ((funnel.cta_clicks / funnel.lp_views) * 100).toFixed(1) 
      : '0.0';
    const ctaToForm = funnel.cta_clicks > 0 
      ? ((funnel.form_starts / funnel.cta_clicks) * 100).toFixed(1) 
      : '0.0';
    const formToSubmit = funnel.form_starts > 0 
      ? ((funnel.form_submits / funnel.form_starts) * 100).toFixed(1) 
      : '0.0';
    const submitToCall = funnel.form_submits > 0 
      ? ((funnel.calls_booked / funnel.form_submits) * 100).toFixed(1) 
      : '0.0';
    const callToClose = funnel.calls_completed > 0 
      ? ((funnel.closed / funnel.calls_completed) * 100).toFixed(1) 
      : '0.0';
    
    // Calculate CPL if we have source data with spend
    const totalSpend = sources.reduce((sum, s) => sum + s.spend, 0);
    const cpl = funnel.form_submits > 0 && totalSpend > 0 
      ? Math.round(totalSpend / funnel.form_submits) 
      : 0;
    
    return NextResponse.json({
      success: true,
      data: {
        funnel: {
          ...funnel,
          rates: {
            viewToCTA,
            ctaToForm,
            formToSubmit,
            submitToCall,
            callToClose,
          },
        },
        sources,
        campaigns,
        quality,
        speed,
        waiting: {
          count: waiting.length,
          leads: waiting.slice(0, 10).map(l => ({
            id: l.id,
            name: l.name,
            email: l.email,
            challenge: l.challenge,
            urgency: l.urgency,
            timestamp: l.timestamp,
          })),
        },
        totals: {
          ...totals,
          totalSpend,
          cpl,
          totalLeadsInPeriod: leads.length,
        },
        period: {
          days,
          from: new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString(),
          to: new Date().toISOString(),
        },
      },
    });
    
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}

