'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { useSearchParams } from 'next/navigation';
import { 
  trackFormStart, 
  trackFormStep, 
  trackFormSubmit, 
  trackConversion, 
  trackCalendarOpen,
  getStoredUTMParams,
  getFirstLandingPage,
  getSessionData,
  getReferrer,
  getPagesVisited,
  getTimeOnSite,
  getPageViewCount
} from '@/lib/tracking';

type FormStep = 1 | 2 | 3;

interface FormData {
  urgency: string;
  challenge: string;
  revenue: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  details: string;
  honeypot: string;
}

const urgencyOptions = [
  { value: 'urgent', label: 'Urgent (need help this week)', icon: '🔥' },
  { value: 'soon', label: 'Soon (next 2-4 weeks)', icon: '⏰' },
  { value: 'planning', label: 'Planning ahead', icon: '📅' },
];

const challengeOptions = [
  { value: 'books-behind', label: 'Books are behind / messy', description: 'Need to get financials in order' },
  { value: 'raising-capital', label: 'Raising debt or equity', description: 'Need lender-ready financials' },
  { value: 'buying-business', label: 'Buying a business', description: 'Need due diligence support' },
  { value: 'selling-business', label: 'Selling / exiting', description: 'Need to prepare for sale' },
  { value: 'rdti-compliance', label: 'RDTI / R&D Tax compliance', description: 'Need documentation & audit support' },
  { value: 'other', label: 'Something else', description: "Let's discuss" },
];

const revenueOptions = [
  { value: 'under-1m', label: 'Under $1M' },
  { value: '1m-5m', label: '$1M - $5M' },
  { value: '5m-20m', label: '$5M - $20M' },
  { value: 'over-20m', label: 'Over $20M' },
];

// Cal.com booking URL - replace with your actual Cal.com link
const CALCOM_URL = process.env.NEXT_PUBLIC_CALCOM_URL || 'https://cal.com/fseaccounting/diagnostic';

function ContactPageInner() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<FormStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    urgency: '',
    challenge: '',
    revenue: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    details: '',
    honeypot: '',
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceedStep1 = formData.urgency && formData.challenge;
  const canProceedStep2 = formData.revenue;
  const canSubmit = formData.name && formData.email;

  // Prefill from URL params (reduces friction for campaign LPs / service pages)
  useEffect(() => {
    const requestedChallenge = searchParams.get('challenge');
    const requestedService = (searchParams.get('service') || '').toLowerCase();

    const validChallenges = new Set(challengeOptions.map((o) => o.value));

    let desiredChallenge: string | null = null;

    if (requestedChallenge && validChallenges.has(requestedChallenge)) {
      desiredChallenge = requestedChallenge;
    } else if (requestedService) {
      if (requestedService === 'bookkeeping') desiredChallenge = 'books-behind';
      if (requestedService === 'lending') desiredChallenge = 'raising-capital';
      if (requestedService === 'acquisitions') desiredChallenge = 'buying-business';
      if (requestedService === 'acquisitions-exits') desiredChallenge = 'buying-business';
      if (requestedService === 'rdti' || requestedService === 'rdti-compliance') desiredChallenge = 'rdti-compliance';
    }

    if (!desiredChallenge) return;

    setFormData((prev) => {
      // Don't override if user has already picked a challenge.
      if (prev.challenge) return prev;
      return { ...prev, challenge: desiredChallenge };
    });
  }, [searchParams]);

  // Track form start on mount
  useEffect(() => {
    trackFormStart('contact');
  }, []);

  // Track form progress
  useEffect(() => {
    trackFormStep(step, {
      urgency: formData.urgency,
      challenge: formData.challenge,
      revenue: formData.revenue,
    });
  }, [step, formData.urgency, formData.challenge, formData.revenue]);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Include complete session and attribution data
      const utmParams = getStoredUTMParams();
      const sessionData = getSessionData();
      
      const submissionData = {
        ...formData,
        // UTM Attribution
        ...utmParams,
        // Session data
        landing_page: getFirstLandingPage(),
        referrer: getReferrer(),
        session_id: sessionData.session_id,
        page_views: getPageViewCount(),
        time_on_site: getTimeOnSite(),
        pages_visited: getPagesVisited(),
      };
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSubmitted(true);
        
        // Track form submission and conversion with lead ID
        trackFormSubmit({
          challenge: formData.challenge,
          revenue: formData.revenue,
          urgency: formData.urgency,
          lead_id: result.lead_id,
        });
        
        // Calculate lead value for conversion tracking
        const leadValue = formData.revenue === 'over-20m' ? 150 : 
                         formData.revenue === '5m-20m' ? 100 : 
                         formData.revenue === '1m-5m' ? 50 : 25;
        trackConversion(leadValue);
      } else {
        console.error('Form submission failed:', result.message);
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
  return (
      <main className="bg-cream min-h-screen flex items-center justify-center py-20">
        <div className="container-narrow text-center">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
            You're on the list, {formData.name.split(' ')[0]}!
            </h1>
          <p className="text-stone text-lg mb-8">
            We'll review your situation and reach out within 24 hours.
          </p>

          {/* Calendar Booking CTA */}
          <div className="bg-white border-2 border-charcoal rounded-xl p-8 max-w-md mx-auto mb-8">
            <p className="font-semibold text-charcoal text-lg mb-2">
              Want to skip the wait?
            </p>
            <p className="text-stone mb-6">
              Book your diagnostic call now and lock in a time that works for you.
            </p>
            
            {!showCalendar ? (
              <button
                onClick={() => {
                  setShowCalendar(true);
                  trackCalendarOpen();
                }}
                className="btn-primary w-full"
              >
                Book My Call Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            ) : (
              <div className="mt-4">
                {/* Cal.com inline embed */}
                <div 
                  data-cal-link="fseaccounting/diagnostic"
                  data-cal-config='{"layout":"month_view"}'
                  style={{ width: '100%', height: '100%', overflow: 'scroll' }}
                />
                <Script
                  id="cal-embed"
                  strategy="lazyOnload"
                  dangerouslySetInnerHTML={{
                    __html: `
                      (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar); return; } p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
                      Cal("init", {origin:"https://cal.com"});
                      Cal("inline", {
                        elementOrSelector: '[data-cal-link="fseaccounting/diagnostic"]',
                        calLink: "fseaccounting/diagnostic",
                        config: {"layout":"month_view"}
                      });
                      Cal("ui", {"styles":{"branding":{"brandColor":"#1C1917"}},"hideEventTypeDetails":false,"layout":"month_view"});
                    `
                  }}
                />
              </div>
            )}
          </div>

          <div className="text-sm text-stone">
            <p className="mb-2">What happens next?</p>
            <ol className="space-y-1">
              <li>1. We review your situation</li>
              <li>2. 15-min diagnostic call (no pitch)</li>
              <li>3. Clear next steps, even if we're not the right fit</li>
            </ol>
          </div>

          <Link href="/" className="inline-block mt-8 text-stone hover:text-charcoal transition-colors">
            ← Back to homepage
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-cream min-h-screen py-12 md:py-20">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-accent font-semibold mb-3">Free Diagnostic Call</p>
          <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
            Let's figure out what's broken.
          </h1>
          <p className="text-stone text-lg">
            15 minutes. No pitch. Just honest answers about your financial situation.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-3 h-3 rounded-full transition-colors ${
                s === step ? 'bg-charcoal' : s < step ? 'bg-accent' : 'bg-border'
              }`}
            />
          ))}
        </div>

            {/* Form */}
        <div className="bg-white border border-border rounded-xl p-6 md:p-8">
          {/* Honeypot */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={(e) => updateField('honeypot', e.target.value)}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          {/* Step 1: Urgency & Challenge */}
          {step === 1 && (
            <div className="space-y-8">
              <div>
                <label className="text-lg font-semibold text-charcoal mb-4 block">
                  How urgent is this?
                </label>
                <div className="grid gap-3">
                  {urgencyOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField('urgency', option.value)}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 text-left transition-all ${
                        formData.urgency === option.value
                          ? 'border-charcoal bg-cream'
                          : 'border-border hover:border-stone'
                      }`}
                    >
                      <span className="text-2xl">{option.icon}</span>
                      <span className="font-medium text-charcoal">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-lg font-semibold text-charcoal mb-4 block">
                  What's your main challenge?
                </label>
                <div className="grid gap-3">
                  {challengeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField('challenge', option.value)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        formData.challenge === option.value
                          ? 'border-charcoal bg-cream'
                          : 'border-border hover:border-stone'
                      }`}
                    >
                      <span className="font-medium text-charcoal block">{option.label}</span>
                      <span className="text-stone text-sm">{option.description}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          )}

          {/* Step 2: Revenue */}
          {step === 2 && (
            <div className="space-y-8">
              <div>
                <label className="text-lg font-semibold text-charcoal mb-4 block">
                  What's your approximate annual revenue?
                </label>
                <p className="text-stone mb-4 text-sm">
                  This helps us understand your situation and prepare for the call.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {revenueOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateField('revenue', option.value)}
                      className={`p-4 rounded-lg border-2 text-center transition-all ${
                        formData.revenue === option.value
                          ? 'border-charcoal bg-cream'
                          : 'border-border hover:border-stone'
                      }`}
                    >
                      <span className="font-medium text-charcoal">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="btn-secondary flex-1"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact details */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="text-lg font-semibold text-charcoal mb-4 block">
                  Last step — how do we reach you?
                </label>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                    <div>
                  <label htmlFor="name">Your name *</label>
                      <input
                    id="name"
                        type="text"
                        value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="John Smith"
                        required
                      />
                    </div>
                    <div>
                  <label htmlFor="company">Company</label>
                      <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => updateField('company', e.target.value)}
                    placeholder="Acme Corp"
                      />
                    </div>
                  </div>

              <div className="grid md:grid-cols-2 gap-4">
                    <div>
                  <label htmlFor="email">Email *</label>
                      <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="john@company.com"
                    required
                      />
                    </div>
                    <div>
                  <label htmlFor="phone">Phone (optional)</label>
                      <input
                    id="phone"
                        type="tel"
                        value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="+61 4XX XXX XXX"
                      />
                    </div>
                  </div>

                  <div>
                <label htmlFor="details">Anything else we should know? (optional)</label>
                    <textarea
                  id="details"
                  value={formData.details}
                  onChange={(e) => updateField('details', e.target.value)}
                  placeholder="Tell us more about your situation..."
                  rows={3}
                    />
                  </div>

              <div className="flex gap-3">
                  <button
                  onClick={() => setStep(2)}
                  className="btn-secondary flex-1"
                  >
                  Back
                  </button>
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || isSubmitting}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Book My Diagnostic Call'}
                </button>
              </div>

              <p className="text-center text-stone text-sm">
                We'll email you within 24 hours with next steps.
              </p>
            </div>
          )}
              </div>

        {/* Trust elements */}
        <div className="mt-8 text-center">
          <p className="text-stone text-sm mb-4">What you'll get on the call:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              'Honest assessment of your situation',
              "Clear next steps (even if we're not the right fit)",
              'No sales pitch or pressure',
            ].map((item, i) => (
              <span key={i} className="flex items-center gap-2 text-charcoal">
                <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <main className="bg-cream min-h-screen flex items-center justify-center py-20">
          <div className="container-narrow text-center">
            <p className="text-stone">Loading…</p>
          </div>
        </main>
      }
    >
      <ContactPageInner />
    </Suspense>
  );
}
