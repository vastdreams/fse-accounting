'use client';

import { useState } from 'react';
import Link from 'next/link';

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
  { value: 'other', label: 'Something else', description: "Let's discuss" },
];

const revenueOptions = [
  { value: 'under-1m', label: 'Under $1M' },
  { value: '1m-5m', label: '$1M - $5M' },
  { value: '5m-20m', label: '$5M - $20M' },
  { value: 'over-20m', label: 'Over $20M' },
];

export default function ContactPage() {
  const [step, setStep] = useState<FormStep>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    urgency: '',
    challenge: '',
    revenue: '',
    name: '',
    email: '',
    phone: '',
    company: '',
    details: '',
  });

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceedStep1 = formData.urgency && formData.challenge;
  const canProceedStep2 = formData.revenue;
  const canSubmit = formData.name && formData.email;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
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
            You're on the list.
          </h1>
          <p className="text-stone text-lg mb-8">
            We'll be in touch within 24 hours (usually much sooner) to schedule your diagnostic call.
          </p>
          <div className="bg-white border border-border rounded-lg p-6 max-w-md mx-auto">
            <p className="font-semibold text-charcoal mb-2">What happens next?</p>
            <ol className="text-left text-stone space-y-2">
              <li className="flex gap-2">
                <span className="text-accent font-semibold">1.</span>
                We review your situation
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-semibold">2.</span>
                You get a calendar link to book your call
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-semibold">3.</span>
                We diagnose what's broken and how to fix it
              </li>
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
                We'll email you within 24 hours with a link to book your call.
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
              'Clear next steps (even if we\'re not the right fit)',
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
