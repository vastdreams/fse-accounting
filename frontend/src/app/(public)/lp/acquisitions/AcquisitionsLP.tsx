'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { trackLPView, trackCTAClick } from '@/lib/tracking';

const painPoints = [
  "Can't trust the seller's numbers",
  'Hidden liabilities in the financials',
  'No clarity on real earnings quality',
  'Deal structure that costs you later',
];

const deliverables = [
  { title: 'Quality of earnings analysis', description: 'Normalized EBITDA, one-offs identified, sustainable earnings isolated' },
  { title: 'Working capital review', description: 'Peg, adjustments, and seasonality—before it becomes a problem' },
  { title: 'Deal structure support', description: 'Earnouts, holdbacks, and reps that protect you' },
  { title: 'Integration readiness', description: 'Day-1 finance integration plan and risk mapping' },
];

const process = [
  { step: '1', title: 'Diagnostic call', description: 'We review the deal, assess complexity, and scope the engagement.' },
  { step: '2', title: 'Diligence sprint', description: '2-4 weeks of focused financial due diligence. You get a clear report.' },
  { step: '3', title: 'Deal support', description: 'We stay through close—negotiation support, Q&A, and integration planning.' },
];

const faqs = [
  {
    q: 'How is this different from an audit?',
    a: "Audits verify compliance. We dig into what's actually happening—normalized earnings, hidden costs, working capital traps. We're looking for deal-breakers and value adjustments.",
  },
  {
    q: 'When should I engage you?',
    a: "As early as possible—ideally before LOI. But we've parachuted in at all stages. The earlier, the better for structuring.",
  },
  {
    q: 'Do you work on the sell-side?',
    a: 'Yes. We help sellers prepare for diligence so there are no surprises. Clean vendor due diligence often accelerates deals.',
  },
  {
    q: 'What does it cost?',
    a: 'Depends on deal size and complexity. Typical QoE engagement: $15–40k. Often saves multiples of that in price adjustments.',
  },
];

const proofMetrics = [
  { value: '2–4 wks', label: 'Diligence sprint' },
  { value: 'QoE', label: 'Earnings quality + normalization' },
  { value: 'WC', label: 'Working capital analysis' },
];

export default function AcquisitionsLP() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Track LP view
  useEffect(() => {
    trackLPView('acquisitions');
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
            <p className="text-accent font-semibold mb-4">Acquisitions & Exits</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6 leading-tight">
              Know what you're buying.<br />
              <span className="text-stone">Don't get surprised.</span>
            </h1>
            <p className="text-xl text-stone mb-8 leading-relaxed">
              Financial due diligence that catches what audits miss. Quality of earnings, 
              working capital analysis, and deal structuring—so you buy with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Link 
                href="/contact?service=acquisitions&challenge=buying-business" 
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
              15 minutes. No pitch. We'll tell you what to look for.
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
              Most deals have hidden problems.
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
              The full picture. Before you sign.
            </h2>
            <p className="text-warm-gray">
              We've supported 43 transactions and identified an average of $2.1M in issues per deal. 
              We know where to look.
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
              <p className="text-white font-semibold">Typical timeline: 2-4 weeks</p>
              <p className="text-warm-gray text-sm">We move fast because deals don't wait.</p>
            </div>
            <Link
              href="/contact?service=acquisitions&challenge=buying-business"
              className="inline-flex items-center gap-2 text-white hover:text-accent-light transition-colors font-semibold"
              onClick={() => handleCTAClick('solution', 'Start your diligence')}
            >
              Start your diligence
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
                PE firm avoids $340K working capital trap
              </h3>
              <p className="text-stone mb-6">
                A private equity firm was acquiring a $6M services business. The seller's accountant 
                had prepared "clean" financials. Our QoE found $340K in working capital adjustments 
                the seller hadn't disclosed—and a revenue recognition issue that would have cost another $180K post-close.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
                <div>
                  <p className="font-serif text-2xl text-charcoal">$520K</p>
                  <p className="text-stone text-sm">Issues identified</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-charcoal">$340K</p>
                  <p className="text-stone text-sm">Price adjustment</p>
                </div>
                <div>
                  <p className="font-serif text-2xl text-charcoal">2 weeks</p>
                  <p className="text-stone text-sm">Turnaround</p>
                </div>
              </div>
              <blockquote className="italic text-graphite">
                "They found issues in two weeks that our accountant missed entirely. 
                Saved us from a very expensive mistake."
              </blockquote>
              <p className="text-stone text-sm mt-2">— Director, Private Equity</p>
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
              Fast. Thorough. Deal-focused.
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
              Don't buy blind.
            </h2>
            <p className="text-stone text-lg mb-8">
              Book a free diagnostic call. We'll review your deal and tell you exactly 
              what due diligence you need—and what to watch out for.
            </p>
            <Link
              href="/contact?service=acquisitions&challenge=buying-business"
              className="btn-primary inline-flex text-lg px-8 py-4"
              onClick={() => handleCTAClick('final', 'Book Your Free Diagnostic')}
            >
              Book Your Free Diagnostic
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <p className="text-stone text-sm mt-4">
              15 minutes. Confidential. No commitment.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className={`sticky-cta ${showStickyCTA ? 'visible' : ''}`}>
        <div className="container-wide flex items-center justify-between">
          <p className="text-charcoal font-medium hidden sm:block">
            Know what you're buying
          </p>
          <Link
            href="/contact?service=acquisitions&challenge=buying-business"
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
