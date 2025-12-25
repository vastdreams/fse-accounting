'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface FunnelData {
  lp_views: number;
  cta_clicks: number;
  form_starts: number;
  form_submits: number;
  calls_booked: number;
  calls_completed: number;
  closed: number;
  rates: {
    viewToCTA: string;
    ctaToForm: string;
    formToSubmit: string;
    submitToCall: string;
    callToClose: string;
  };
}

interface SourceData {
  source: string;
  campaign: string;
  leads: number;
  spend: number;
  cpl: number;
}

interface CampaignRow {
  source: string;
  campaign: string;
  landing_page: string;
  lp_views: number;
  cta_clicks: number;
  form_starts: number;
  form_submits: number;
  calendar_opens: number;
  conversions: number;
  high_intent_leads: number;
  calls_booked: number;
  closed_won: number;
  spend: number;
}

interface QualityData {
  byUrgency: { urgency: string; count: number; percentage: number }[];
  byChallenge: { challenge: string; count: number; percentage: number }[];
  byRevenue: { revenue: string; count: number; percentage: number }[];
}

interface SpeedData {
  avgResponseTime: string;
  leadsWaiting: number;
  oldestWaitingTime: string;
  bookRate: string;
  totalWaiting: number;
}

interface WaitingLead {
  id: string;
  name: string;
  email: string;
  challenge: string;
  urgency: string;
  timestamp: string;
}

interface LeadRow {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  urgency: string;
  challenge: string;
  revenue: string;
  status: string;
  utm_source: string;
  utm_campaign: string;
  landing_page: string;
}

interface DashboardData {
  funnel: FunnelData;
  sources: SourceData[];
  campaigns: CampaignRow[];
  quality: QualityData;
  speed: SpeedData;
  waiting: {
    count: number;
    leads: WaitingLead[];
  };
  totals: {
    totalLeads: number;
    closedWon: number;
    closeRate: number;
    totalSpend: number;
    cpl: number;
    totalLeadsInPeriod: number;
  };
}

const urgencyLabels: Record<string, string> = {
  'urgent': '🔥 Urgent',
  'soon': '⏰ Soon',
  'planning': '📅 Planning',
};

const challengeLabels: Record<string, string> = {
  'books-behind': 'Books behind',
  'raising-capital': 'Raising capital',
  'buying-business': 'Buying business',
  'selling-business': 'Selling/exit',
  'rdti-compliance': 'RDTI',
  'other': 'Other',
};

const revenueLabels: Record<string, string> = {
  'under-1m': 'Under $1M',
  '1m-5m': '$1M-$5M',
  '5m-20m': '$5M-$20M',
  'over-20m': 'Over $20M',
};

export default function CampaignDashboard() {
  const [dateRange, setDateRange] = useState('7');
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leads, setLeads] = useState<LeadRow[]>([]);
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');

  const [spendSource, setSpendSource] = useState('');
  const [spendCampaign, setSpendCampaign] = useState('');
  const [spendAmount, setSpendAmount] = useState('');
  const [spendNotes, setSpendNotes] = useState('');
  const [spendSaving, setSpendSaving] = useState(false);
  const [spendFeedback, setSpendFeedback] = useState<string | null>(null);

  // Fetch dashboard data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [dashRes, leadsRes] = await Promise.all([
        fetch(`/api/dashboard?days=${dateRange}`),
        fetch(`/api/leads?days=${dateRange}`),
      ]);

      const dashJson = await dashRes.json();
      const leadsJson = await leadsRes.json().catch(() => null);

      if (dashJson?.success) {
        setData(dashJson.data);
      } else {
        setError(dashJson?.message || 'Failed to fetch dashboard data');
      }

      if (leadsJson?.success) {
        setLeads(leadsJson.data.leads || []);
      } else {
        setLeads([]);
      }
    } catch (err) {
      setError('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [dateRange]);

  // Update lead status
  const updateLeadStatus = async (id: string, status: string) => {
    try {
      await fetch('/api/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      fetchData();
    } catch (err) {
      console.error('Failed to update lead:', err);
    }
  };

  const addSpend = async (prefill?: { source?: string; campaign?: string }) => {
    if (prefill?.source) setSpendSource(prefill.source);
    if (prefill?.campaign) setSpendCampaign(prefill.campaign);

    const amount = Number(spendAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      setSpendFeedback('Enter a valid spend amount (e.g. 250).');
      return;
    }

    try {
      setSpendSaving(true);
      setSpendFeedback(null);

      const response = await fetch('/api/spend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: spendSource,
          campaign: spendCampaign,
          amount,
          currency: 'AUD',
          notes: spendNotes,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setSpendFeedback(result?.message || 'Failed to save spend');
        return;
      }

      setSpendAmount('');
      setSpendNotes('');
      setSpendFeedback('Spend saved. Dashboard updated.');
      fetchData();
    } catch (e) {
      setSpendFeedback('Failed to save spend.');
    } finally {
      setSpendSaving(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-charcoal mx-auto mb-4"></div>
          <p className="text-stone">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={fetchData} className="btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  const funnel = data?.funnel || {
    lp_views: 0, cta_clicks: 0, form_starts: 0, form_submits: 0,
    calls_booked: 0, calls_completed: 0, closed: 0,
    rates: { viewToCTA: '0', ctaToForm: '0', formToSubmit: '0', submitToCall: '0', callToClose: '0' }
  };
  const sources = data?.sources || [];
  const campaigns = data?.campaigns || [];
  const quality = data?.quality || { byUrgency: [], byChallenge: [], byRevenue: [] };
  const speed = data?.speed || { avgResponseTime: 'N/A', leadsWaiting: 0, oldestWaitingTime: '', bookRate: '0%', totalWaiting: 0 };
  const waiting = data?.waiting || { count: 0, leads: [] };
  const totals = data?.totals || { totalLeads: 0, closedWon: 0, closeRate: 0, totalSpend: 0, cpl: 0, totalLeadsInPeriod: 0 };
  const filteredLeads = leadStatusFilter === 'all' ? leads : leads.filter((l) => l.status === leadStatusFilter);

  return (
    <div className="min-h-screen bg-cream p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl text-charcoal">Campaign Dashboard</h1>
            <p className="text-stone">Real-time campaign performance metrics</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-white text-charcoal"
            >
              <option value="1">Today</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
            <button onClick={fetchData} className="px-4 py-2 border border-border rounded-lg bg-white text-charcoal hover:bg-cream transition-colors">
              ↻ Refresh
            </button>
            <Link href="/admin" className="text-stone hover:text-charcoal">
              ← Back to Admin
            </Link>
          </div>
        </div>

        {/* Leads Waiting Alert */}
        {waiting.count > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <p className="font-semibold text-amber-800">
                    {waiting.count} lead{waiting.count > 1 ? 's' : ''} waiting for response
                  </p>
                  {speed.oldestWaitingTime && (
                    <p className="text-sm text-amber-600">
                      Oldest: {speed.oldestWaitingTime} | Target: &lt;15 min
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Waiting leads list */}
            {waiting.leads.length > 0 && (
              <div className="mt-4 space-y-2">
                {waiting.leads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between bg-white p-3 rounded-lg">
                    <div>
                      <p className="font-medium text-charcoal">{lead.name}</p>
                      <p className="text-sm text-stone">{lead.email} • {challengeLabels[lead.challenge] || lead.challenge}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <a 
                        href={`mailto:${lead.email}`}
                        className="px-3 py-1 bg-charcoal text-white rounded text-sm hover:bg-graphite transition-colors"
                      >
                        Email
                      </a>
                      <button
                        onClick={() => updateLeadStatus(lead.id, 'contacted')}
                        className="px-3 py-1 bg-success text-white rounded text-sm hover:bg-green-700 transition-colors"
                      >
                        Mark Contacted
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Funnel Section */}
        <div className="bg-white rounded-xl border border-border p-6 mb-6">
          <h2 className="font-serif text-xl text-charcoal mb-6">Conversion Funnel</h2>
          
          <div className="grid grid-cols-7 gap-4">
            {[
              { label: 'LP Views', value: funnel.lp_views, rate: null },
              { label: 'CTA Clicks', value: funnel.cta_clicks, rate: funnel.rates.viewToCTA },
              { label: 'Form Starts', value: funnel.form_starts, rate: funnel.rates.ctaToForm },
              { label: 'Submits', value: funnel.form_submits, rate: funnel.rates.formToSubmit },
              { label: 'Calls Booked', value: funnel.calls_booked, rate: funnel.rates.submitToCall },
              { label: 'Calls Done', value: funnel.calls_completed, rate: null },
              { label: 'Closed', value: funnel.closed, rate: funnel.rates.callToClose },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="bg-cream rounded-lg p-4 mb-2">
                  <p className="font-serif text-2xl text-charcoal">{step.value.toLocaleString()}</p>
                </div>
                <p className="text-sm text-stone mb-1">{step.label}</p>
                {step.rate && parseFloat(step.rate) > 0 && (
                  <p className="text-xs text-accent font-semibold">{step.rate}%</p>
                )}
              </div>
            ))}
          </div>

          {/* Funnel arrows */}
          <div className="mt-6 flex items-center justify-between px-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center">
                <svg className="w-6 h-6 text-stone" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Campaign Performance */}
        <div className="bg-white rounded-xl border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl text-charcoal">Campaign Performance</h2>
            <p className="text-sm text-stone">Grouped by UTM campaign + landing page</p>
          </div>

          {/* Manual spend input */}
          <div className="mb-6 bg-cream border border-border rounded-lg p-4">
            <p className="text-sm font-semibold text-charcoal mb-3">Add spend (manual)</p>
            <div className="grid md:grid-cols-5 gap-3 items-end">
              <div>
                <label className="text-xs font-medium text-stone">Source</label>
                <input
                  value={spendSource}
                  onChange={(e) => setSpendSource(e.target.value)}
                  placeholder="linkedin / google / direct"
                  className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-white text-charcoal text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-stone">Campaign</label>
                <input
                  value={spendCampaign}
                  onChange={(e) => setSpendCampaign(e.target.value)}
                  placeholder="lending_14day_pack_v1"
                  className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-white text-charcoal text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-stone">Amount (AUD)</label>
                <input
                  value={spendAmount}
                  onChange={(e) => setSpendAmount(e.target.value)}
                  inputMode="decimal"
                  placeholder="250"
                  className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-white text-charcoal text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-stone">Notes (optional)</label>
                <input
                  value={spendNotes}
                  onChange={(e) => setSpendNotes(e.target.value)}
                  placeholder="Week 1 budget"
                  className="mt-1 w-full px-3 py-2 border border-border rounded-lg bg-white text-charcoal text-sm"
                />
              </div>
              <button
                onClick={() => addSpend()}
                disabled={spendSaving}
                className="btn-primary py-2 px-4 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {spendSaving ? 'Saving…' : 'Add spend'}
              </button>
            </div>
            {spendFeedback && (
              <p className="mt-3 text-sm text-stone">{spendFeedback}</p>
            )}
          </div>

          {campaigns.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-sm font-semibold text-stone">Source</th>
                    <th className="text-left py-2 text-sm font-semibold text-stone">Campaign</th>
                    <th className="text-left py-2 text-sm font-semibold text-stone">Landing</th>
                    <th className="text-right py-2 text-sm font-semibold text-stone">Spend</th>
                    <th className="text-right py-2 text-sm font-semibold text-stone">Leads</th>
                    <th className="text-right py-2 text-sm font-semibold text-stone">High intent</th>
                    <th className="text-right py-2 text-sm font-semibold text-stone">CPL</th>
                    <th className="text-right py-2 text-sm font-semibold text-stone">CP‑HI</th>
                    <th className="text-right py-2 text-sm font-semibold text-stone">LP→CTA</th>
                    <th className="text-right py-2 text-sm font-semibold text-stone">CTA→Form</th>
                    <th className="text-right py-2 text-sm font-semibold text-stone">Form→Lead</th>
                    <th className="text-right py-2 text-sm font-semibold text-stone">Prefill</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.slice(0, 12).map((row, i) => {
                    const lpToCTA = row.lp_views > 0 ? ((row.cta_clicks / row.lp_views) * 100).toFixed(1) : '—';
                    const ctaToForm = row.cta_clicks > 0 ? ((row.form_starts / row.cta_clicks) * 100).toFixed(1) : '—';
                    const formToLead = row.form_starts > 0 ? ((row.form_submits / row.form_starts) * 100).toFixed(1) : '—';
                    const highIntentPct = row.form_submits > 0 ? ((row.high_intent_leads / row.form_submits) * 100).toFixed(0) : '—';
                    const cpl = row.form_submits > 0 && row.spend > 0 ? Math.round(row.spend / row.form_submits) : 0;
                    const cphi = row.high_intent_leads > 0 && row.spend > 0 ? Math.round(row.spend / row.high_intent_leads) : 0;

                    return (
                      <tr key={`${row.source}:${row.campaign}:${row.landing_page}:${i}`} className="border-b border-border last:border-0">
                        <td className="py-3 text-charcoal capitalize">{row.source}</td>
                        <td className="py-3 text-stone text-sm">{row.campaign}</td>
                        <td className="py-3 text-stone text-sm">{row.landing_page}</td>
                        <td className="py-3 text-right text-charcoal">{row.spend > 0 ? `$${row.spend.toLocaleString()}` : '—'}</td>
                        <td className="py-3 text-right font-semibold text-charcoal">{row.form_submits}</td>
                        <td className="py-3 text-right text-charcoal">
                          {row.high_intent_leads} <span className="text-stone text-xs">({highIntentPct}%)</span>
                        </td>
                        <td className="py-3 text-right text-charcoal">{cpl > 0 ? `$${cpl}` : '—'}</td>
                        <td className="py-3 text-right text-charcoal">{cphi > 0 ? `$${cphi}` : '—'}</td>
                        <td className="py-3 text-right text-charcoal">{lpToCTA}{lpToCTA !== '—' ? '%' : ''}</td>
                        <td className="py-3 text-right text-charcoal">{ctaToForm}{ctaToForm !== '—' ? '%' : ''}</td>
                        <td className="py-3 text-right text-charcoal">{formToLead}{formToLead !== '—' ? '%' : ''}</td>
                        <td className="py-3 text-right">
                          <button
                            onClick={() => {
                              setSpendSource(row.source);
                              setSpendCampaign(row.campaign);
                              setSpendFeedback(null);
                            }}
                            className="px-2 py-1 border border-border rounded bg-white text-xs text-charcoal hover:bg-cream transition-colors"
                          >
                            Use
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-stone text-center py-8">No campaign-attributed traffic yet (UTMs will appear here).</p>
          )}
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Source Breakdown */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-serif text-xl text-charcoal mb-6">Source Breakdown</h2>
            {sources.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-sm font-semibold text-stone">Source</th>
                    <th className="text-left py-2 text-sm font-semibold text-stone">Campaign</th>
                    <th className="text-right py-2 text-sm font-semibold text-stone">Spend</th>
                    <th className="text-right py-2 text-sm font-semibold text-stone">CPL</th>
                    <th className="text-right py-2 text-sm font-semibold text-stone">Leads</th>
                  </tr>
                </thead>
                <tbody>
                  {sources.map((row, i) => (
                    <tr key={i} className="border-b border-border last:border-0">
                      <td className="py-3 text-charcoal capitalize">{row.source}</td>
                      <td className="py-3 text-stone text-sm">{row.campaign}</td>
                      <td className="py-3 text-right text-charcoal">{row.spend > 0 ? `$${row.spend.toLocaleString()}` : '—'}</td>
                      <td className="py-3 text-right text-charcoal">{row.cpl > 0 ? `$${row.cpl}` : '—'}</td>
                      <td className="py-3 text-right font-semibold text-charcoal">{row.leads}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-stone text-center py-8">No leads yet in this period</p>
            )}
          </div>

          {/* Speed Metrics */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-serif text-xl text-charcoal mb-6">Speed Metrics</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-cream rounded-lg p-4 text-center">
                <p className="font-serif text-2xl text-charcoal">{speed.avgResponseTime}</p>
                <p className="text-sm text-stone">Avg Response</p>
              </div>
              <div className="bg-cream rounded-lg p-4 text-center">
                <p className="font-serif text-2xl text-charcoal">{speed.totalWaiting}</p>
                <p className="text-sm text-stone">Waiting</p>
                {speed.leadsWaiting > 0 && (
                  <p className="text-xs text-amber-600 mt-1">⚠ {speed.leadsWaiting} over 1hr</p>
                )}
              </div>
              <div className="bg-cream rounded-lg p-4 text-center">
                <p className="font-serif text-2xl text-charcoal">{speed.bookRate}</p>
                <p className="text-sm text-stone">Book Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Quality */}
        {(quality.byUrgency.length > 0 || quality.byChallenge.length > 0 || quality.byRevenue.length > 0) && (
          <div className="bg-white rounded-xl border border-border p-6 mb-6">
            <h2 className="font-serif text-xl text-charcoal mb-6">Lead Quality</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* By Urgency */}
              {quality.byUrgency.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-stone mb-4">By Urgency</h3>
                  <div className="space-y-3">
                    {quality.byUrgency.map((item) => (
                      <div key={item.urgency}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-charcoal">{urgencyLabels[item.urgency] || item.urgency}</span>
                          <span className="text-stone">{item.count} ({item.percentage}%)</span>
                        </div>
                        <div className="h-2 bg-cream rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.urgency === 'urgent' ? 'bg-red-500' :
                              item.urgency === 'soon' ? 'bg-amber-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* By Challenge */}
              {quality.byChallenge.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-stone mb-4">By Challenge</h3>
                  <div className="space-y-3">
                    {quality.byChallenge.map((item) => (
                      <div key={item.challenge}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-charcoal">{challengeLabels[item.challenge] || item.challenge}</span>
                          <span className="text-stone">{item.count} ({item.percentage}%)</span>
                        </div>
                        <div className="h-2 bg-cream rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* By Revenue */}
              {quality.byRevenue.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-stone mb-4">By Revenue Band</h3>
                  <div className="space-y-3">
                    {quality.byRevenue.map((item) => (
                      <div key={item.revenue}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-charcoal">{revenueLabels[item.revenue] || item.revenue}</span>
                          <span className="text-stone">{item.count} ({item.percentage}%)</span>
                        </div>
                        <div className="h-2 bg-cream rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.revenue === 'over-20m' ? 'bg-purple-500' :
                              item.revenue === '5m-20m' ? 'bg-blue-500' :
                              item.revenue === '1m-5m' ? 'bg-teal-500' : 'bg-gray-400'
                            }`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Leads table */}
        <div className="bg-white rounded-xl border border-border p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="font-serif text-xl text-charcoal">Leads</h2>
              <p className="text-sm text-stone">Latest leads with status tracking</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <select
                value={leadStatusFilter}
                onChange={(e) => setLeadStatusFilter(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg bg-white text-charcoal text-sm"
              >
                <option value="all">All statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="call_booked">Call booked</option>
                <option value="call_completed">Call completed</option>
                <option value="proposal_sent">Proposal sent</option>
                <option value="closed_won">Closed won</option>
                <option value="closed_lost">Closed lost</option>
              </select>
              <button
                onClick={fetchData}
                className="px-4 py-2 border border-border rounded-lg bg-white text-charcoal hover:bg-cream transition-colors text-sm"
              >
                Refresh
              </button>
            </div>
          </div>

          {filteredLeads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px]">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-xs font-semibold text-stone uppercase tracking-wide">Time</th>
                    <th className="text-left py-2 text-xs font-semibold text-stone uppercase tracking-wide">Lead</th>
                    <th className="text-left py-2 text-xs font-semibold text-stone uppercase tracking-wide">Challenge</th>
                    <th className="text-left py-2 text-xs font-semibold text-stone uppercase tracking-wide">Revenue</th>
                    <th className="text-left py-2 text-xs font-semibold text-stone uppercase tracking-wide">Source</th>
                    <th className="text-left py-2 text-xs font-semibold text-stone uppercase tracking-wide">Campaign</th>
                    <th className="text-left py-2 text-xs font-semibold text-stone uppercase tracking-wide">Status</th>
                    <th className="text-right py-2 text-xs font-semibold text-stone uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.slice(0, 50).map((lead) => (
                    <tr key={lead.id} className="border-b border-border last:border-0">
                      <td className="py-3 text-sm text-stone">
                        {new Date(lead.timestamp).toLocaleString()}
                      </td>
                      <td className="py-3">
                        <p className="font-medium text-charcoal">{lead.name}</p>
                        <p className="text-sm text-stone">
                          <a className="hover:text-charcoal" href={`mailto:${lead.email}`}>{lead.email}</a>
                          {lead.company ? <span className="text-stone"> • {lead.company}</span> : null}
                        </p>
                      </td>
                      <td className="py-3 text-sm text-charcoal">
                        {challengeLabels[lead.challenge] || lead.challenge}
                        <span className="text-stone"> • {urgencyLabels[lead.urgency] || lead.urgency}</span>
                      </td>
                      <td className="py-3 text-sm text-charcoal">
                        {revenueLabels[lead.revenue] || lead.revenue}
                      </td>
                      <td className="py-3 text-sm text-charcoal capitalize">{lead.utm_source || 'direct'}</td>
                      <td className="py-3 text-sm text-stone">{lead.utm_campaign || '-'}</td>
                      <td className="py-3">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                          className="px-3 py-2 border border-border rounded-lg bg-white text-charcoal text-sm"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="call_booked">Call booked</option>
                          <option value="call_completed">Call completed</option>
                          <option value="proposal_sent">Proposal sent</option>
                          <option value="closed_won">Closed won</option>
                          <option value="closed_lost">Closed lost</option>
                        </select>
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`mailto:${lead.email}`}
                            className="px-3 py-1 border border-border rounded bg-white text-sm text-charcoal hover:bg-cream transition-colors"
                          >
                            Email
                          </a>
                          {lead.status === 'new' && (
                            <button
                              onClick={() => updateLeadStatus(lead.id, 'contacted')}
                              className="px-3 py-1 bg-success text-white rounded text-sm hover:bg-green-700 transition-colors"
                            >
                              Mark contacted
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-stone text-center py-8">No leads found for this period/filter.</p>
          )}
        </div>

        {/* Key Metrics Summary */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="bg-charcoal text-white rounded-xl p-6 text-center">
            <p className="font-serif text-3xl">{totals.totalLeadsInPeriod}</p>
            <p className="text-warm-gray text-sm">Leads (period)</p>
          </div>
          <div className="bg-charcoal text-white rounded-xl p-6 text-center">
            <p className="font-serif text-3xl">{totals.totalSpend > 0 ? `$${totals.totalSpend.toLocaleString()}` : '—'}</p>
            <p className="text-warm-gray text-sm">Spend (period)</p>
          </div>
          <div className="bg-charcoal text-white rounded-xl p-6 text-center">
            <p className="font-serif text-3xl">{totals.cpl > 0 ? `$${totals.cpl}` : '—'}</p>
            <p className="text-warm-gray text-sm">CPL (period)</p>
          </div>
          <div className="bg-charcoal text-white rounded-xl p-6 text-center">
            <p className="font-serif text-3xl">{totals.closedWon}</p>
            <p className="text-warm-gray text-sm">Closed Won</p>
          </div>
          <div className="bg-charcoal text-white rounded-xl p-6 text-center">
            <p className="font-serif text-3xl">{totals.closeRate}%</p>
            <p className="text-warm-gray text-sm">Close Rate</p>
          </div>
          <div className="bg-charcoal text-white rounded-xl p-6 text-center">
            <p className="font-serif text-3xl">{totals.totalLeads}</p>
            <p className="text-warm-gray text-sm">Total Leads</p>
          </div>
        </div>

        {/* Empty state */}
        {totals.totalLeads === 0 && (
          <div className="mt-8 p-8 bg-warm-white rounded-xl border border-border text-center">
            <h3 className="font-serif text-2xl text-charcoal mb-4">No leads yet</h3>
            <p className="text-stone mb-6">
              Once you launch your campaign and start receiving leads, they'll appear here in real-time.
            </p>
            <div className="space-y-2 text-sm text-stone">
              <p>✅ Tracking is configured and ready</p>
              <p>✅ Lead storage is active</p>
              <p>✅ Notifications are configured</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
