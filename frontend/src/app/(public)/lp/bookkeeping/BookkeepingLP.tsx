'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const painPoints = [
  'Books are months behind',
  'No idea of your real cash position',
  "Can't get reports to lenders when they ask",
  'Spending hours on reconciliations',
];

const deliverables = [
  { title: 'Month-end close by day 5', description: 'Reconciled, reviewed, and ready—every single month' },
  { title: 'Management dashboard', description: 'Real-time visibility into P&L, cash, and key metrics' },
  { title: 'Bank & card reconciliations', description: 'Every transaction categorized and matched' },
  { title: 'Cash flow tracking', description: 'Know exactly where you stand, always' },
];

const process = [
  { step: '1', title: 'Cleanup sprint', description: 'We get your books current in 2-3 weeks. Fixed scope, fixed price.' },
  { step: '2', title: 'Monthly cadence', description: 'Ongoing close, reconciliation, and reporting by day 5.' },
  { step: '3', title: 'Scale when ready', description: 'Add CFO advisory, modelling, or lending prep as you grow.' },
];

const faqs = [
  {
    q: 'How far behind can my books be?',
    a: "We've cleaned up books that were 18+ months behind. We'll assess in the diagnostic call and give you a fixed-scope quote.",
  },
  {
    q: 'What accounting software do you use?',
    a: 'We work with Xero, QuickBooks, and MYOB. We can also migrate you if needed.',
  },
  {
    q: 'Do you replace my existing accountant?',
    a: 'Usually we complement them. We handle the operational bookkeeping; they handle tax and compliance.',
  },
  {
    q: 'What does it cost?',
    a: 'Cleanup sprints: $3–8k depending on complexity. Ongoing: $1,500–4,000/month based on volume.',
  },
];

const proofMetrics = [
  { value: '5 days', label: 'Average month-end close' },
  { value: '100+', label: 'Businesses supported' },
  { value: '100%', label: 'Client retention (2024)' },
];

export default function BookkeepingLP() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="bg-cream">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-accent font-semibold mb-4">Bookkeeping & Month-End Close</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6 leading-tight">
              Your books closed.<br />
              <span className="text-stone">By day 5. Every month.</span>
            </h1>
            <p className="text-xl text-stone mb-8 leading-relaxed">
              Stop chasing your accountant. We handle month-end close, reconciliations, 
              and management reporting—so you always know your numbers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Book a Free Diagnostic
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <p className="text-stone text-sm">
              15 minutes. No pitch. We'll tell you exactly what needs fixing.
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
              You're flying blind on your numbers.
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
              Clean books. Clear numbers. Every month.
            </h2>
            <p className="text-warm-gray">
              We treat your books like a product, not an afterthought. You'll always know where you stand.
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
        </div>
      </section>

      {/* Case study snippet */}
      <section className="py-16 bg-warm-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl border border-border p-8">
              <p className="text-accent font-semibold text-sm mb-4">CASE STUDY</p>
              <h3 className="font-serif text-2xl text-charcoal mb-4">
                E-commerce business goes from 6 months behind to day-5 close
              </h3>
              <p className="text-stone mb-6">
                A $3M e-commerce brand had books 6 months behind and no visibility on cash. 
                We cleaned up in 3 weeks and implemented a day-5 close cadence. 
                They now have real-time dashboards and haven't missed a close since.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
                <div>
                  <p className="font-serif text-2xl text-charcoal">3 weeks</p>
                  <p className="text-stone text-sm">Cleanup complete</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-charcoal">Day 5</p>
                  <p className="text-stone text-sm">Monthly close</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-charcoal">12 months</p>
                  <p className="text-stone text-sm">Zero missed closes</p>
                </div>
              </div>
              <blockquote className="italic text-graphite">
                "For the first time in years, I actually know my numbers. I can make decisions 
                with confidence instead of guessing."
              </blockquote>
              <p className="text-stone text-sm mt-2">— Founder, E-commerce ($3M revenue)</p>
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
              Clean up. Lock in. Scale up.
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
              Stop flying blind.
            </h2>
            <p className="text-stone text-lg mb-8">
              Book a free diagnostic call. We'll look at your books and tell you exactly 
              what it takes to get to a day-5 close.
            </p>
            <Link href="/contact" className="btn-primary inline-flex text-lg px-8 py-4">
              Book Your Free Diagnostic
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-stone text-sm mt-4">
              15 minutes. No commitment. Just clarity.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className={`sticky-cta ${showStickyCTA ? 'visible' : ''}`}>
        <div className="container-wide flex items-center justify-between">
          <p className="text-charcoal font-medium hidden sm:block">
            Get your books closed by day 5
          </p>
          <Link href="/contact" className="btn-primary py-3 px-6 text-sm w-full sm:w-auto text-center">
            Book Free Diagnostic
          </Link>
        </div>
      </div>
    </main>
  );
}
