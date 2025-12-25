'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data - in production this would come from your analytics/database
const mockFunnelData = {
  lpViews: 1250,
  ctaClicks: 312,
  formStarts: 186,
  formSubmits: 94,
  callsBooked: 67,
  callsCompleted: 52,
  closed: 12,
};

const mockSourceData = [
  { source: 'linkedin', campaign: 'lending-capital-q1', leads: 42, cpl: 127.50 },
  { source: 'linkedin', campaign: 'bookkeeping-cleanup', leads: 28, cpl: 98.20 },
  { source: 'google', campaign: 'brand', leads: 15, cpl: 45.00 },
  { source: 'direct', campaign: '-', leads: 9, cpl: 0 },
];

const mockLeadQuality = {
  byUrgency: [
    { urgency: 'urgent', count: 28, percentage: 30 },
    { urgency: 'soon', count: 45, percentage: 48 },
    { urgency: 'planning', count: 21, percentage: 22 },
  ],
  byChallenge: [
    { challenge: 'raising-capital', count: 35, percentage: 37 },
    { challenge: 'books-behind', count: 28, percentage: 30 },
    { challenge: 'buying-business', count: 18, percentage: 19 },
    { challenge: 'selling-business', count: 8, percentage: 9 },
    { challenge: 'other', count: 5, percentage: 5 },
  ],
  byRevenue: [
    { revenue: 'over-20m', count: 12, percentage: 13 },
    { revenue: '5m-20m', count: 38, percentage: 40 },
    { revenue: '1m-5m', count: 32, percentage: 34 },
    { revenue: 'under-1m', count: 12, percentage: 13 },
  ],
};

const mockSpeedMetrics = {
  avgResponseTime: '12 min',
  leadsWaiting: 2,
  oldestLead: '45 min ago',
};

export default function CampaignDashboard() {
  const [dateRange, setDateRange] = useState('7d');

  // Calculate conversion rates
  const viewToCTA = ((mockFunnelData.ctaClicks / mockFunnelData.lpViews) * 100).toFixed(1);
  const ctaToForm = ((mockFunnelData.formStarts / mockFunnelData.ctaClicks) * 100).toFixed(1);
  const formToSubmit = ((mockFunnelData.formSubmits / mockFunnelData.formStarts) * 100).toFixed(1);
  const submitToCall = ((mockFunnelData.callsBooked / mockFunnelData.formSubmits) * 100).toFixed(1);
  const callToClose = ((mockFunnelData.closed / mockFunnelData.callsCompleted) * 100).toFixed(1);

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
              <option value="today">Today</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            <Link href="/admin" className="text-stone hover:text-charcoal">
              ← Back to Admin
            </Link>
          </div>
        </div>

        {/* Speed Metrics Alert */}
        {mockSpeedMetrics.leadsWaiting > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <p className="font-semibold text-amber-800">
                  {mockSpeedMetrics.leadsWaiting} leads waiting for response
                </p>
                <p className="text-sm text-amber-600">
                  Oldest: {mockSpeedMetrics.oldestLead} | Target: &lt;15 min
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
              View Leads
            </button>
          </div>
        )}

        {/* Funnel Section */}
        <div className="bg-white rounded-xl border border-border p-6 mb-6">
          <h2 className="font-serif text-xl text-charcoal mb-6">Conversion Funnel</h2>
          
          <div className="grid grid-cols-7 gap-4">
            {[
              { label: 'LP Views', value: mockFunnelData.lpViews, rate: null },
              { label: 'CTA Clicks', value: mockFunnelData.ctaClicks, rate: viewToCTA },
              { label: 'Form Starts', value: mockFunnelData.formStarts, rate: ctaToForm },
              { label: 'Submits', value: mockFunnelData.formSubmits, rate: formToSubmit },
              { label: 'Calls Booked', value: mockFunnelData.callsBooked, rate: submitToCall },
              { label: 'Calls Done', value: mockFunnelData.callsCompleted, rate: null },
              { label: 'Closed', value: mockFunnelData.closed, rate: callToClose },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="bg-cream rounded-lg p-4 mb-2">
                  <p className="font-serif text-2xl text-charcoal">{step.value.toLocaleString()}</p>
                </div>
                <p className="text-sm text-stone mb-1">{step.label}</p>
                {step.rate && (
                  <p className="text-xs text-accent font-semibold">{step.rate}%</p>
                )}
              </div>
            ))}
          </div>

          {/* Funnel visualization */}
          <div className="mt-6 flex items-center justify-between">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center">
                <svg className="w-6 h-6 text-stone" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Two column layout */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Source Breakdown */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-serif text-xl text-charcoal mb-6">Source Breakdown</h2>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-sm font-semibold text-stone">Source</th>
                  <th className="text-left py-2 text-sm font-semibold text-stone">Campaign</th>
                  <th className="text-right py-2 text-sm font-semibold text-stone">Leads</th>
                  <th className="text-right py-2 text-sm font-semibold text-stone">CPL</th>
                </tr>
              </thead>
              <tbody>
                {mockSourceData.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="py-3 text-charcoal capitalize">{row.source}</td>
                    <td className="py-3 text-stone text-sm">{row.campaign}</td>
                    <td className="py-3 text-right font-semibold text-charcoal">{row.leads}</td>
                    <td className="py-3 text-right text-stone">
                      {row.cpl > 0 ? `$${row.cpl.toFixed(2)}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Speed Metrics */}
          <div className="bg-white rounded-xl border border-border p-6">
            <h2 className="font-serif text-xl text-charcoal mb-6">Speed Metrics</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-cream rounded-lg p-4 text-center">
                <p className="font-serif text-2xl text-charcoal">{mockSpeedMetrics.avgResponseTime}</p>
                <p className="text-sm text-stone">Avg Response Time</p>
                <p className="text-xs text-success mt-1">✓ Under target</p>
              </div>
              <div className="bg-cream rounded-lg p-4 text-center">
                <p className="font-serif text-2xl text-charcoal">{mockSpeedMetrics.leadsWaiting}</p>
                <p className="text-sm text-stone">Waiting &gt;1 hour</p>
                {mockSpeedMetrics.leadsWaiting > 0 && (
                  <p className="text-xs text-amber-600 mt-1">⚠ Needs attention</p>
                )}
              </div>
              <div className="bg-cream rounded-lg p-4 text-center">
                <p className="font-serif text-2xl text-charcoal">
                  {((mockFunnelData.callsBooked / mockFunnelData.formSubmits) * 100).toFixed(0)}%
                </p>
                <p className="text-sm text-stone">Book Rate</p>
                <p className="text-xs text-success mt-1">✓ Above target</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Quality */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="font-serif text-xl text-charcoal mb-6">Lead Quality</h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* By Urgency */}
            <div>
              <h3 className="text-sm font-semibold text-stone mb-4">By Urgency</h3>
              <div className="space-y-3">
                {mockLeadQuality.byUrgency.map((item) => (
                  <div key={item.urgency}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-charcoal capitalize">{item.urgency}</span>
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

            {/* By Challenge */}
            <div>
              <h3 className="text-sm font-semibold text-stone mb-4">By Challenge</h3>
              <div className="space-y-3">
                {mockLeadQuality.byChallenge.map((item) => (
                  <div key={item.challenge}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-charcoal capitalize">{item.challenge.replace(/-/g, ' ')}</span>
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

            {/* By Revenue */}
            <div>
              <h3 className="text-sm font-semibold text-stone mb-4">By Revenue Band</h3>
              <div className="space-y-3">
                {mockLeadQuality.byRevenue.map((item) => (
                  <div key={item.revenue}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-charcoal">{item.revenue.replace(/-/g, ' ')}</span>
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
          </div>
        </div>

        {/* Key Metrics Summary */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-charcoal text-white rounded-xl p-6 text-center">
            <p className="font-serif text-3xl">${(mockSourceData.reduce((sum, s) => sum + s.leads * s.cpl, 0) / mockFunnelData.formSubmits).toFixed(0)}</p>
            <p className="text-warm-gray text-sm">Cost per Lead</p>
          </div>
          <div className="bg-charcoal text-white rounded-xl p-6 text-center">
            <p className="font-serif text-3xl">{mockFunnelData.closed}</p>
            <p className="text-warm-gray text-sm">Deals Closed</p>
          </div>
          <div className="bg-charcoal text-white rounded-xl p-6 text-center">
            <p className="font-serif text-3xl">{callToClose}%</p>
            <p className="text-warm-gray text-sm">Close Rate</p>
          </div>
          <div className="bg-charcoal text-white rounded-xl p-6 text-center">
            <p className="font-serif text-3xl">${((mockFunnelData.closed * 12500) / (mockSourceData.reduce((sum, s) => sum + s.leads * s.cpl, 0))).toFixed(0)}x</p>
            <p className="text-warm-gray text-sm">ROAS</p>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-warm-white rounded-xl border border-border">
          <h3 className="font-semibold text-charcoal mb-2">Setup Instructions</h3>
          <p className="text-stone text-sm mb-4">
            This dashboard shows mock data. To connect real data:
          </p>
          <ol className="list-decimal list-inside text-sm text-stone space-y-2">
            <li>Set up Google Analytics 4 with the events defined in <code className="bg-cream px-1 rounded">lib/tracking.ts</code></li>
            <li>Connect leads to a database or Google Sheets via the contact API webhook</li>
            <li>Update this dashboard to fetch from your data source</li>
            <li>Add authentication to protect this admin route</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

