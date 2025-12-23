/**
 * PATH: frontend/src/app/(public)/contact/page.tsx
 * PURPOSE: Pre-qualification contact funnel
 * 
 * FLOW:
 * 1. Select service intent (Bookkeeping / Lending / Acquisition-Exit / Not Sure)
 * 2. Add qualification info (revenue band, urgency, goal)
 * 3. Submit → Show calendar embed for booking
 * 
 * TRACKING:
 * - form_submit event on submission
 * - calendar_booked event when meeting scheduled
 */

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type ServiceIntent = 'bookkeeping' | 'lending' | 'acquisition-exit' | 'not-sure' | '';
type RevenueBand = '' | 'pre-revenue' | '0-500k' | '500k-2m' | '2m-10m' | '10m+';
type Urgency = '' | 'urgent' | 'soon' | 'exploring';

const serviceOptions = [
  {
    value: 'bookkeeping' as ServiceIntent,
    icon: '📊',
    title: 'Bookkeeping',
    subtitle: 'Clean books, reporting, month-end close',
  },
  {
    value: 'lending' as ServiceIntent,
    icon: '🏦',
    title: 'Lending',
    subtitle: 'Lender-ready packs, facility support',
  },
  {
    value: 'acquisition-exit' as ServiceIntent,
    icon: '🤝',
    title: 'Acquisition / Exit',
    subtitle: 'Due diligence, deal structuring',
  },
  {
    value: 'not-sure' as ServiceIntent,
    icon: '💬',
    title: 'Not Sure',
    subtitle: 'Let\'s discuss your situation',
  },
];

const revenueOptions = [
  { value: 'pre-revenue', label: 'Pre-revenue / Early stage' },
  { value: '0-500k', label: '$0 - $500K' },
  { value: '500k-2m', label: '$500K - $2M' },
  { value: '2m-10m', label: '$2M - $10M' },
  { value: '10m+', label: '$10M+' },
];

const urgencyOptions = [
  { value: 'urgent', label: '0-30 days — Urgent', sublabel: 'Need help now' },
  { value: 'soon', label: '30-90 days — Soon', sublabel: 'Planning ahead' },
  { value: 'exploring', label: '90+ days — Exploring', sublabel: 'Just researching' },
];

export default function ContactPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceIntent: '' as ServiceIntent,
    name: '',
    email: '',
    company: '',
    phone: '',
    revenueBand: '' as RevenueBand,
    urgency: '' as Urgency,
    goal: '',
    // Honeypot
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Read service from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const serviceFromUrl = params.get('service');
    
    if (serviceFromUrl) {
      // Map URL param to our intent values
      const intentMap: Record<string, ServiceIntent> = {
        'bookkeeping': 'bookkeeping',
        'lending': 'lending',
        'acquisitions': 'acquisition-exit',
        'exit-planning': 'acquisition-exit',
      };
      
      const mappedIntent = intentMap[serviceFromUrl];
      if (mappedIntent) {
        setFormData(prev => ({ ...prev, serviceIntent: mappedIntent }));
      }
    }
  }, []);

  const handleServiceSelect = (value: ServiceIntent) => {
    setFormData(prev => ({ ...prev, serviceIntent: value }));
    // Auto advance to step 2 after short delay
    setTimeout(() => setStep(2), 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Honeypot check
    if (formData.website) {
      console.log('Bot detected');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'website',
          page: '/contact',
          utm_source: new URLSearchParams(window.location.search).get('utm_source') || '',
          utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') || '',
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Something went wrong');
      }

      // Track conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submit', {
          event_category: 'contact',
          event_label: formData.serviceIntent,
        });
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit. Please try again.');
    } finally {
    setIsSubmitting(false);
    }
  };

  const canProceedToStep2 = formData.serviceIntent !== '';
  const canSubmit = formData.name && formData.email && formData.revenueBand && formData.urgency;

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="pt-28 pb-12">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
          <motion.div
              initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-800/80 border border-ink-700/50 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs text-ink-400 tracking-wide font-medium">
                Free 15-30 Minute Call
              </span>
          </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-3xl md:text-4xl lg:text-5xl text-cream-100 mb-4"
            >
              Book Your{' '}
              <span className="text-gradient">Finance Triage</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-ink-400"
            >
              Quick diagnostic call to identify your biggest opportunity and the right next step.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-24">
        <div className="container max-w-3xl">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              /* Success State */
            <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 rounded-2xl border border-amber-500/20 bg-ink-900/50 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-amber-500 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-ink-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h2 className="font-display text-2xl md:text-3xl text-cream-100 mb-4">
                  Thanks! We've received your request.
                </h2>
                
                <p className="text-ink-400 mb-8 max-w-md mx-auto">
                  We'll be in touch within 24 hours to schedule your Finance Triage call. 
                  Or you can book directly using the calendar below.
                </p>

                {/* Calendar Embed Placeholder */}
                <div className="p-8 rounded-xl border border-ink-700/50 bg-ink-800/30 mb-8">
                  <p className="text-ink-500 text-sm mb-4">
                    📅 Schedule your call now (Calendly integration)
                  </p>
                  <a 
                    href="https://calendly.com/fse-accounting/finance-triage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Open Scheduling Page
                  </a>
                </div>

                <Link href="/" className="text-sm text-ink-500 hover:text-amber-500 transition-colors">
                  ← Return to homepage
                </Link>
              </motion.div>
            ) : (
              /* Form Steps */
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                {/* Progress Indicator */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step >= 1 ? 'bg-amber-500 text-ink-950' : 'bg-ink-800 text-ink-500'}`}>
                    1
                  </div>
                  <div className={`w-16 h-0.5 transition-colors ${step >= 2 ? 'bg-amber-500' : 'bg-ink-800'}`} />
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step >= 2 ? 'bg-amber-500 text-ink-950' : 'bg-ink-800 text-ink-500'}`}>
                    2
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Step 1: Service Intent */}
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                      >
                        <div className="text-center mb-8">
                          <h2 className="font-display text-xl text-cream-100 mb-2">
                            What do you need help with?
                          </h2>
                          <p className="text-ink-500 text-sm">
                            Select the service that best matches your current priority
                          </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          {serviceOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => handleServiceSelect(option.value)}
                              className={`text-left p-5 rounded-xl border-2 transition-all ${
                                formData.serviceIntent === option.value
                                  ? 'border-amber-500 bg-amber-500/10'
                                  : 'border-ink-700/50 bg-ink-900/30 hover:border-ink-600 hover:bg-ink-800/50'
                              }`}
                            >
                              <div className="flex items-start gap-4">
                                <span className="text-2xl">{option.icon}</span>
                                <div>
                                  <div className="font-display font-medium text-cream-100 mb-1">
                                    {option.title}
                                  </div>
                                  <div className="text-sm text-ink-400">
                                    {option.subtitle}
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>

                        {canProceedToStep2 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-center pt-4"
                          >
                            <button
                              type="button"
                              onClick={() => setStep(2)}
                              className="btn btn-primary"
                            >
                              Continue
                            </button>
                          </motion.div>
                        )}
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                      >
                        <div className="text-center mb-8">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="text-sm text-ink-500 hover:text-amber-500 transition-colors mb-4 inline-flex items-center gap-1"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Change selection
                          </button>
                          <h2 className="font-display text-xl text-cream-100 mb-2">
                            Tell us about your business
                          </h2>
                          <p className="text-ink-500 text-sm">
                            A few quick details to help us prepare for your call
                          </p>
                        </div>

                        {/* Contact Info */}
                        <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="label">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="label">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="company" className="label">Company</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="input"
                        placeholder="Your Company Pty Ltd"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="label">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input"
                        placeholder="+61 4XX XXX XXX"
                      />
                    </div>
                  </div>

                        {/* Qualification Fields */}
                  <div>
                          <label className="label">Annual Revenue *</label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {revenueOptions.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, revenueBand: option.value as RevenueBand }))}
                                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                                  formData.revenueBand === option.value
                                    ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                                    : 'border-ink-700/50 bg-ink-900/30 text-ink-400 hover:border-ink-600'
                                }`}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="label">How soon do you need help? *</label>
                          <div className="space-y-2">
                            {urgencyOptions.map((option) => (
                              <button
                                key={option.value}
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, urgency: option.value as Urgency }))}
                                className={`w-full text-left p-4 rounded-lg border transition-all ${
                                  formData.urgency === option.value
                                    ? 'border-amber-500 bg-amber-500/10'
                                    : 'border-ink-700/50 bg-ink-900/30 hover:border-ink-600'
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-cream-100">{option.label}</span>
                                  <span className="text-sm text-ink-500">{option.sublabel}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                  </div>

                  <div>
                          <label htmlFor="goal" className="label">What's your main goal? (Optional)</label>
                    <textarea
                            id="goal"
                            name="goal"
                            value={formData.goal}
                      onChange={handleChange}
                            rows={3}
                      className="input resize-none"
                            placeholder="e.g., Get my books ready for a bank loan, clean up messy financials, prepare for an acquisition..."
                    />
                  </div>

                        {/* Honeypot - hidden from real users */}
                        <input
                          type="text"
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          className="absolute -left-[9999px]"
                          tabIndex={-1}
                          autoComplete="off"
                        />

                        {/* Error Message */}
                        {error && (
                          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                            {error}
                          </div>
                        )}

                        {/* Submit */}
                  <button
                    type="submit"
                          disabled={!canSubmit || isSubmitting}
                          className="btn btn-primary btn-lg w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Submitting...
                            </>
                          ) : (
                            'Book My Finance Triage'
                          )}
                  </button>

                        <p className="text-center text-xs text-ink-500">
                          Free • No commitment • We'll respond within 24 hours
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
                    </div>
      </section>

      {/* Trust Elements */}
      {!isSubmitted && (
        <section className="py-16 border-t border-ink-800/50">
          <div className="container max-w-3xl">
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              {[
                { icon: '⏱️', title: '15-30 minutes', desc: 'Quick, focused diagnostic' },
                { icon: '🎯', title: 'Clear next steps', desc: 'Actionable recommendations' },
                { icon: '✓', title: 'No commitment', desc: 'No pressure, just advice' },
              ].map((item) => (
                <div key={item.title}>
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <div className="font-display font-medium text-cream-100 mb-1">{item.title}</div>
                  <div className="text-sm text-ink-500">{item.desc}</div>
                </div>
              ))}
              </div>
          </div>
        </section>
      )}
        </div>
  );
}
