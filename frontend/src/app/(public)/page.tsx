'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { trackCTAClick, trackLPView } from '@/lib/tracking';

const credibilityPoints = [
  'Confidential and discreet',
  'Fixed scope, fixed price sprints',
  'Built to lender / investor scrutiny',
];

// Who this is for
const idealClients = [
  {
    title: "Growing businesses doing $1M-$20M revenue",
    description: "You've outgrown your bookkeeper but aren't ready for a full-time CFO",
  },
  {
    title: "Founders raising debt or equity",
    description: "You need bank-ready financials and someone who speaks lender",
  },
  {
    title: "Operators buying or selling businesses",
    description: "You need financial due diligence you can trust, not just an audit tick",
  },
];

// What you get
const deliverables = [
  {
    number: "01",
    title: "Books closed by day 5",
    description: "Month-end close, reconciliations, management reports. Every month. On time.",
  },
  {
    number: "02", 
    title: "Lender-ready pack in 14 days",
    description: "Financial model, cash flow, debt schedule, management deck. Everything banks ask for.",
  },
  {
    number: "03",
    title: "Due diligence in 2–4 weeks",
    description: "Quality of earnings, working capital, normalized EBITDA. Know what you're buying.",
  },
];

const results = [
  { metric: "Day 5", label: "Month-end close cadence" },
  { metric: "14 days", label: "Lender pack sprint" },
  { metric: "2–4 wks", label: "Diligence sprint" },
];

const offerTracks = [
  {
    label: 'Books',
    title: 'Bookkeeping & Month-End Close',
    description:
      'Get to a day‑5 close with clean reconciliations and reporting that management can trust.',
    href: '/lp/bookkeeping',
    contactHref: '/contact?service=bookkeeping&challenge=books-behind',
  },
  {
    label: 'Capital',
    title: 'Lending Readiness Sprint',
    description:
      'Build the model + pack lenders expect, so you stop the back-and-forth and move faster.',
    href: '/lp/lending',
    contactHref: '/contact?service=lending&challenge=raising-capital',
  },
  {
    label: 'Deals',
    title: 'Acquisitions & Exits',
    description:
      'QoE + working capital + deal risk. Know what you’re buying (or what you’re worth).',
    href: '/lp/acquisitions',
    contactHref: '/contact?service=acquisitions&challenge=buying-business',
  },
];

const testimonials = [
  {
    quote: "FSE got our books in order in 2 weeks. We closed our facility 6 weeks later. Our previous accountant had us waiting 4 months.",
    name: "James T.",
    role: "CEO, Manufacturing ($8M revenue)",
  },
  {
    quote: "They found $340K in working capital issues during due diligence that the seller hadn't disclosed. Saved us from a bad deal.",
    name: "Sarah M.",
    role: "Director, Private Equity",
  },
  {
    quote: "First accountant I've worked with who actually understands what banks need. No more back-and-forth.",
    name: "Michael R.",
    role: "Founder, Logistics ($14M revenue)",
  },
];

export default function HomePage() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  // Track homepage view
  useEffect(() => {
    trackLPView('homepage');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // CTA tracking helper
  const handleCTAClick = (location: string, text: string, destination: string = '/contact') => {
    trackCTAClick(location, text, destination);
  };

  return (
    <main className="bg-cream">
      {/* Hero (first-principles): clarity, premium positioning, next step */}
      <section className="pt-12 md:pt-16 pb-16">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Left: positioning + promise */}
            <div className="lg:col-span-7">
              <p className="text-accent font-semibold mb-4 text-lg">
                Finance operations for growth-stage operators (typically $1M–$50M revenue)
              </p>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6 leading-tight">
                Bank-ready numbers.
                <br />
                <span className="text-stone">Delivered in weeks.</span>
              </h1>

              <p className="text-xl md:text-2xl text-graphite leading-relaxed">
                Day‑5 close. 14‑day lender pack. 2–4 week diligence.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="btn-primary text-lg px-8 py-4"
                  onClick={() => handleCTAClick('hero', 'Book a 15-Minute Diagnostic')}
                >
                  Book a 15‑Minute Diagnostic
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/case-studies"
                  className="btn-secondary text-lg px-8 py-4 text-center"
                  onClick={() => handleCTAClick('hero', 'View case studies', '/case-studies')}
                >
                  View case studies
                </Link>
              </div>

              <div className="mt-6 grid sm:grid-cols-3 gap-3">
                {credibilityPoints.map((p) => (
                  <div key={p} className="flex items-center gap-2 text-sm text-stone">
                    <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{p}</span>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-stone text-sm">
                Confidential. No pitch. You leave with clear next steps.
              </p>

              {/* Hero image */}
              <div className="mt-8 relative">
                <div className="aspect-[16/9] rounded-xl overflow-hidden bg-stone/10">
                  <img
                    src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80"
                    alt="Financial analysis and reporting"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-stone">Trusted by</p>
                      <p className="font-semibold text-charcoal">8+ Growth Companies</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: choose track */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-border rounded-xl p-6">
                <p className="text-xs font-semibold text-stone uppercase tracking-wide mb-4">
                  Choose your track
                </p>
                <div className="space-y-4">
                  {offerTracks.map((t) => (
                    <div key={t.label} className="bg-cream border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold text-stone uppercase tracking-wide">{t.label}</p>
                          <p className="font-semibold text-charcoal">{t.title}</p>
                          <p className="text-stone text-sm mt-1">{t.description}</p>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <Link
                          href={t.contactHref}
                          className="btn-primary justify-center"
                          onClick={() => handleCTAClick('hero_track', `Book diagnostic: ${t.label}`, t.contactHref)}
                        >
                          Book
                        </Link>
                        <Link
                          href={t.href}
                          className="btn-secondary justify-center text-center"
                          onClick={() => handleCTAClick('hero_track', `View details: ${t.label}`, t.href)}
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-3 text-xs text-stone">
                If you only need compliance or a tax return, we’ll point you to a partner. We focus on operational finance for growth-stage decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-12 border-b border-border bg-white">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            {results.map((item, i) => (
              <div key={i} className="text-center">
                <p className="font-serif text-4xl md:text-5xl text-charcoal">{item.metric}</p>
                <p className="text-stone mt-1">{item.label}</p>
              </div>
            ))}
          </div>
                          </div>
      </section>

      {/* Who this is for - Qualification */}
      <section className="section">
        <div className="container-wide">
          <div className="max-w-2xl mb-12">
            <p className="text-accent font-semibold mb-3">Is this you?</p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              We work with operators who value speed and precision
            </h2>
            <p className="text-stone text-lg">
              Not everyone is a fit. Here's who gets the most value from working with us.
                            </p>
                          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {idealClients.map((client, i) => (
              <div key={i} className="card">
                <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                <h3 className="font-semibold text-lg text-charcoal mb-2">{client.title}</h3>
                <p className="text-stone">{client.description}</p>
              </div>
            ))}
                        </div>
                      </div>
      </section>

      {/* What you get - Deliverables */}
      <section className="section bg-charcoal text-white">
        <div className="container-wide">
          <div className="max-w-2xl mb-12">
            <p className="text-accent-light font-semibold mb-3">What you get</p>
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Specific outcomes. Specific timelines.
            </h2>
            <p className="text-warm-gray text-lg">
              No vague promises. Here's exactly what we deliver and when.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {deliverables.map((item, i) => (
              <div key={i} className="border-t border-white/20 pt-6">
                <span className="text-accent-light font-mono text-sm">{item.number}</span>
                <h3 className="font-serif text-2xl mt-2 mb-3">{item.title}</h3>
                <p className="text-warm-gray">{item.description}</p>
              </div>
            ))}
            </div>

          <div className="mt-12 pt-8 border-t border-white/20">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 text-white hover:text-accent-light transition-colors font-semibold"
              onClick={() => handleCTAClick('deliverables', 'See if you qualify')}
            >
              See if you qualify for our diagnostic call
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof - Testimonials */}
      <section className="section">
        <div className="container-wide">
          <div className="max-w-2xl mb-12">
            <p className="text-accent font-semibold mb-3">From operators like you</p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal">
              They had the same problems. Here's what changed.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card">
                <svg className="w-8 h-8 text-accent mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-graphite mb-6 text-lg leading-relaxed">
                  {t.quote}
                </p>
                <div>
                  <p className="font-semibold text-charcoal">{t.name}</p>
                  <p className="text-stone text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works - Process */}
      <section className="section bg-warm-white">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-accent font-semibold mb-3">How it works</p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              Three steps. No surprises.
              </h2>
          </div>
              
          <div className="max-w-3xl mx-auto">
              <div className="space-y-8">
                {[
                {
                  step: "1",
                  title: "Free Diagnostic Call (15 min)",
                  description: "We look at your situation, identify what's broken, and tell you exactly what needs to happen. No pitch, no pressure.",
                },
                {
                  step: "2",
                  title: "Focused Sprint (2-4 weeks)",
                  description: "We fix the immediate problem—whether that's cleaning up books, building a lender pack, or running due diligence. Fixed scope, fixed price.",
                },
                {
                  step: "3",
                  title: "Ongoing Support (optional)",
                  description: "If you want us to stay on for monthly close, reporting, or advisory—great. If not, you walk away with clean numbers and clear next steps.",
                },
              ].map((item, i) => (
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

      {/* Final CTA */}
      <section className="section">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6">
              Stop losing sleep over your numbers.
            </h2>
            <p className="text-stone text-lg mb-8">
              Book a free 15-minute diagnostic. We'll tell you exactly what's wrong and what it takes to fix it. 
              If we're not the right fit, we'll point you to someone who is.
            </p>
              <Link 
                href="/contact" 
              className="btn-primary text-lg px-8 py-4"
              onClick={() => handleCTAClick('footer', 'Book Your Free Diagnostic Call')}
            >
              Book Your Free Diagnostic Call
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              </Link>
            <p className="text-stone text-sm mt-4">
              No credit card. No commitment. Just answers.
            </p>
            </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className={`sticky-cta ${showStickyCTA ? 'visible' : ''}`}>
        <div className="container-wide flex items-center justify-between">
          <p className="text-charcoal font-medium hidden sm:block">
            Ready to fix your financial operations?
          </p>
          <Link 
            href="/contact" 
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
