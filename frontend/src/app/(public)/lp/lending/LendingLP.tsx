'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { trackLPView, trackCTAClick } from '@/lib/tracking';

const painPoints = [
  'Banks keep asking for more documents',
  'Your model doesn\'t match what lenders need',
  'No clear data room or information pack',
  'Process taking months instead of weeks',
];

const deliverables = [
  { title: '3-statement financial model', description: 'P&L, balance sheet, cash flow—built to lender specs' },
  { title: 'Debt schedule & covenants', description: 'Clear visibility on facility terms and compliance' },
  { title: 'Management presentation', description: 'The deck that answers questions before they\'re asked' },
  { title: 'Lender Q&A support', description: 'We handle the back-and-forth so you can focus on the business' },
];

const process = [
  { step: '1', title: 'Diagnostic call', description: 'We review your situation, identify gaps, and scope the work.' },
  { step: '2', title: '14-day sprint', description: 'We build your model, pack, and data room. Fixed scope, fixed price.' },
  { step: '3', title: 'Lender ready', description: 'You submit with confidence. We support Q&A until close.' },
];

const faqs = [
  {
    q: 'How long does this actually take?',
    a: '14 days for the core pack. Complex facilities or multiple lenders may take longer—we\'ll tell you upfront.',
  },
  {
    q: 'What if my books are messy?',
    a: 'We can clean them up first. Many clients start with a bookkeeping sprint, then move to lending.',
  },
  {
    q: 'Do you work with my existing accountant?',
    a: 'Yes. We complement (not replace) your accountant. We focus on lender-ready outputs they may not do.',
  },
  {
    q: 'What does it cost?',
    a: 'Fixed-price sprints typically $8–15k depending on complexity. No hourly surprises.',
  },
];

const proofMetrics = [
  { value: '14 days', label: 'Lender pack sprint' },
  { value: 'Fixed scope', label: 'Fixed price' },
  { value: 'Q&A', label: 'Handled end-to-end' },
];

export default function LendingLP() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Track LP view
  useEffect(() => {
    trackLPView('lending');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // CTA tracking helper
  const handleCTAClick = (location: string, text: string) => {
    trackCTAClick(location, text, '/contact');
  };

  return (
    <main className="bg-cream">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-accent font-semibold mb-4">Capital Readiness Sprint</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6 leading-tight">
              Bank-ready pack.<br />
              <span className="text-stone">In 14 days.</span>
            </h1>
            <p className="text-xl text-stone mb-8 leading-relaxed">
              Stop chasing documents. We build the lender-ready financial model, 
              debt schedules, and management pack that gets your facility approved faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link 
                href="/contact?service=lending&challenge=raising-capital" 
                className="btn-primary text-lg px-8 py-4"
                onClick={() => handleCTAClick('hero', 'Book a Free Diagnostic')}
              >
                Book a Free Diagnostic
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <p className="text-stone text-sm">
              15 minutes. No pitch. We'll tell you exactly what's missing.
            </p>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-12 bg-white border-y border-border">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {proofMetrics.map((item, i) => (
              <div key={i} className="text-center">
                <p className="font-serif text-4xl text-charcoal">{item.value}</p>
                <p className="text-stone mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16">
        <div className="container-wide">
          <div className="max-w-2xl mb-12">
            <p className="text-accent font-semibold mb-3">Sound familiar?</p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
              The lending process is broken.
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {painPoints.map((pain, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-xl border border-border">
                <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-graphite font-medium">{pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 bg-charcoal text-white">
        <div className="container-wide">
          <div className="max-w-2xl mb-12">
            <p className="text-accent-light font-semibold mb-3">What you get</p>
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Everything lenders need. Nothing they don't.
            </h2>
            <p className="text-warm-gray">
              We've structured $127M+ in facilities. We know exactly what banks ask for—and we build it before they ask.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {deliverables.map((item, i) => (
              <div key={i} className="border-t border-white/20 pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-accent-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-warm-gray">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-white font-semibold">Timeline: 14 days</p>
              <p className="text-warm-gray text-sm">Fixed scope. Fixed price. No surprises.</p>
            </div>
            <Link
              href="/contact?service=lending&challenge=raising-capital"
              className="inline-flex items-center gap-2 text-white hover:text-accent-light transition-colors font-semibold"
              onClick={() => handleCTAClick('solution', 'Start your sprint')}
            >
              Start your sprint
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Case study snippet */}
      <section className="py-16 bg-warm-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl border border-border p-8">
              <p className="text-accent font-semibold text-sm mb-4">CASE STUDY</p>
              <h3 className="font-serif text-2xl text-charcoal mb-4">
                Manufacturing company closes $4.2M facility in 6 weeks
              </h3>
              <p className="text-stone mb-6">
                A $12M revenue manufacturing business had been chasing their bank for 4 months with no progress. 
                We rebuilt their model, prepared a complete lender pack, and they closed 6 weeks later.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
                <div>
                  <p className="font-serif text-2xl text-charcoal">$4.2M</p>
                  <p className="text-stone text-sm">Facility secured</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-charcoal">6 weeks</p>
                  <p className="text-stone text-sm">To close</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-charcoal">0</p>
                  <p className="text-stone text-sm">Follow-up questions</p>
                </div>
              </div>
              <blockquote className="italic text-graphite">
                "FSE got our books in order in 2 weeks. We closed our facility 6 weeks later. 
                Our previous accountant had us waiting 4 months."
              </blockquote>
              <p className="text-stone text-sm mt-2">— CFO, Manufacturing ($12M revenue)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-accent font-semibold mb-3">How it works</p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
              Three steps. Two weeks. Done.
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {process.map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-charcoal text-white flex items-center justify-center font-serif text-xl">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-charcoal mb-2">{item.title}</h3>
                    <p className="text-stone">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white border-y border-border">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl text-charcoal mb-8 text-center">
              Common questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border border-border rounded-lg">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between"
                  >
                    <span className="font-medium text-charcoal">{faq.q}</span>
                    <svg
                      className={`w-5 h-5 text-stone transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4">
                      <p className="text-stone">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6">
              Stop waiting on your bank.
            </h2>
            <p className="text-stone text-lg mb-8">
              Book a free diagnostic call. We'll review your situation and tell you exactly 
              what's needed to get your facility approved—fast.
            </p>
            <Link
              href="/contact?service=lending&challenge=raising-capital"
              className="btn-primary inline-flex text-lg px-8 py-4"
              onClick={() => handleCTAClick('final', 'Book Your Free Diagnostic')}
            >
              Book Your Free Diagnostic
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-stone text-sm mt-4">
              15 minutes. No commitment. Just answers.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className={`sticky-cta ${showStickyCTA ? 'visible' : ''}`}>
        <div className="container-wide flex items-center justify-between">
          <p className="text-charcoal font-medium hidden sm:block">
            Get your bank-ready pack in 14 days
          </p>
          <Link
            href="/contact?service=lending&challenge=raising-capital"
            className="btn-primary py-3 px-6 text-sm w-full sm:w-auto text-center"
            onClick={() => handleCTAClick('sticky', 'Book Free Diagnostic')}
          >
            Book Free Diagnostic
          </Link>
        </div>
      </div>
    </main>
  );
}
