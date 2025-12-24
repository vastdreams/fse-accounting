'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

// Pain points that resonate
const painPoints = [
  "Your books are 3 months behind and your accountant doesn't care",
  "The bank keeps asking for more documents and you're losing the deal",
  "You're about to buy a business but have no idea what's actually in the numbers",
  "You're flying blind on cash and it's costing you sleep",
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
    title: "Lender-ready pack in 2 weeks",
    description: "Financial model, cash flow, debt schedule, management deck. Everything banks ask for.",
  },
  {
    number: "03",
    title: "Due diligence in 3 weeks",
    description: "Quality of earnings, working capital, normalized EBITDA. Know what you're buying.",
  },
];

// Social proof
const results = [
  { metric: "$127M", label: "Debt facilities structured" },
  { metric: "43", label: "Transactions supported" },
  { metric: "5 days", label: "Average month-end close" },
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
  const [currentPain, setCurrentPain] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPain((prev) => (prev + 1) % painPoints.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-cream">
      {/* Hero Section - Hit the pain, show the solution */}
      <section className="min-h-[90vh] flex items-center py-20">
        <div className="container-wide">
          <div className="max-w-3xl">
            {/* Pain agitation */}
            <p className="text-accent font-semibold mb-4 text-lg">
              Sound familiar?
            </p>
            
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal mb-6 leading-tight">
              <span className="text-stone italic min-h-[1.2em] block transition-all duration-500">
                "{painPoints[currentPain]}"
              </span>
            </h1>

            <div className="h-px bg-border my-8" />

            {/* Solution */}
            <p className="text-xl md:text-2xl text-graphite mb-8 leading-relaxed">
              We fix your financial operations in <span className="font-semibold text-charcoal">weeks, not months</span>. 
              Clean books. Bank-ready numbers. Deal-ready decisions.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                Book a Free Diagnostic Call
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <p className="text-stone text-sm">
              15 minutes. No pitch. We'll tell you exactly what's broken and how to fix it.
            </p>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="py-12 border-y border-border bg-white">
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
              We work with operators who are done with excuses
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
            <Link href="/contact" className="inline-flex items-center gap-2 text-white hover:text-accent-light transition-colors font-semibold">
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
            <Link href="/contact" className="btn-primary text-lg px-8 py-4">
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
          <Link href="/contact" className="btn-primary py-3 px-6 text-sm w-full sm:w-auto text-center">
            Book Free Diagnostic
          </Link>
        </div>
      </div>
    </main>
  );
}
