/**
 * PATH: frontend/src/app/(public)/page.tsx
 * PURPOSE: Public homepage - conversion-focused around 3 core offers
 * 
 * CORE OFFERS:
 * 1. Bookkeeping (Foundation) - Clean books, management reporting
 * 2. Lending (Capital) - Lender-ready packs, facility support
 * 3. Acquisition/Exit (Deals) - Due diligence, transaction support
 * 
 * PRIMARY CTA: "Book a Finance Triage" (15-30 min qualification call)
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const coreOffers = [
  {
    slug: 'bookkeeping',
    number: '01',
    title: 'Bookkeeping',
    subtitle: 'Foundation',
    headline: 'Close fast. Clean numbers.',
    description: 'Month-end close, management reporting, and cashflow visibility that gives you control.',
    outcomes: [
      'Books closed by day 5',
      'Management dashboard',
      'Cash position clarity',
      'Audit-ready records',
    ],
    cta: 'Fix My Books',
  },
  {
    slug: 'lending',
    number: '02',
    title: 'Lending',
    subtitle: 'Capital',
    headline: 'Bank-ready. Faster approvals.',
    description: 'Lender-ready model + pack preparation. Fewer questions, faster facility execution.',
    outcomes: [
      'Credit-ready application',
      'Financial model + pack',
      'Lender Q&A support',
      'Covenant reporting',
    ],
    cta: 'Get Lending Ready',
  },
  {
    slug: 'acquisitions',
    number: '03',
    title: 'Acquisition & Exit',
    subtitle: 'Deals',
    headline: 'Know what you're buying.',
    description: 'Due diligence, structure support, and finance-led decisioning so you don't get surprised.',
    outcomes: [
      'Financial due diligence',
      'Deal structuring',
      'Valuation support',
      'Integration planning',
    ],
    cta: 'Start Due Diligence',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Finance Triage',
    duration: '15–30 min',
    description: 'Quick diagnostic call to understand your situation and identify the right path forward.',
  },
  {
    step: '02',
    title: '14-Day Sprint',
    duration: 'Paid',
    description: 'Focused execution sprint to deliver immediate outcomes—whether fixing books, preparing for lending, or deal readiness.',
  },
  {
    step: '03',
    title: 'Ongoing Retainer',
    duration: 'Monthly',
    description: 'Continuous financial operations support with partner-level oversight and proactive reporting.',
  },
];

const proofPoints = [
  { metric: '$50M+', label: 'Facilities Structured' },
  { metric: '100+', label: 'Businesses Supported' },
  { metric: '5 Days', label: 'Average Month Close' },
];

export default function HomePage() {
  return (
    <div className="bg-background">
      {/* Hero Section - Clear Value Prop */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: '32px 32px',
            }}
          />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/8 rounded-full blur-[150px] translate-x-1/3 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-ink-600/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/4" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-800/80 border border-ink-700/50 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs text-ink-400 tracking-wide font-medium">
                Australia · Growth-Stage Focus
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream-100 leading-[1.08] tracking-tight mb-6"
            >
              Clean books.{' '}
              <span className="text-gradient">Bankable numbers.</span>
              <br />
              Deal-ready decisions.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-ink-400 leading-relaxed max-w-2xl mb-10"
            >
              We build the financial infrastructure that gets you funded, helps you acquire, 
              and prepares you to exit. From bookkeeping foundations to capital-ready execution.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link 
                href="/contact" 
                className="btn btn-primary btn-xl group"
              >
                <span>Book a Finance Triage</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/services" className="btn btn-secondary btn-xl">
                View Services
              </Link>
            </motion.div>

            {/* Quick Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-16 pt-8 border-t border-ink-800/50 flex flex-wrap gap-x-10 gap-y-4"
            >
              {proofPoints.map((point) => (
                <div key={point.label} className="flex items-baseline gap-2">
                  <span className="text-2xl font-display font-bold text-amber-400">{point.metric}</span>
                  <span className="text-sm text-ink-500">{point.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Three Core Offers */}
      <section className="section bg-ink-900/30 border-y border-ink-800/50">
        <div className="container">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-medium tracking-[0.2em] uppercase text-amber-500 mb-4"
            >
              Three Ways We Help
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl md:text-4xl lg:text-5xl text-cream-100"
            >
              Choose your starting point
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {coreOffers.map((offer, index) => (
              <motion.div
                key={offer.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/services/${offer.slug}`} className="group block h-full">
                  <div className="relative h-full p-8 lg:p-10 rounded-2xl border border-ink-700/50 bg-ink-900/50 hover:bg-ink-800/50 hover:border-amber-500/30 transition-all duration-300">
                    {/* Number */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-xs font-medium tracking-[0.15em] uppercase text-ink-500">
                        {offer.subtitle}
                      </span>
                      <span className="text-4xl font-display font-bold text-ink-800 group-hover:text-amber-500/20 transition-colors">
                        {offer.number}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl md:text-3xl text-cream-100 mb-3 group-hover:text-amber-400 transition-colors">
                      {offer.title}
                    </h3>
                    
                    {/* Headline */}
                    <p className="text-lg text-ink-300 font-medium mb-4">
                      {offer.headline}
                    </p>
                    
                    {/* Description */}
                    <p className="text-ink-400 mb-8 leading-relaxed">
                      {offer.description}
                    </p>

                    {/* Outcomes */}
                    <ul className="space-y-3 mb-10">
                      {offer.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-3 text-sm text-ink-400">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500/50 group-hover:bg-amber-500 transition-colors flex-shrink-0" />
                          {outcome}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="mt-auto pt-6 border-t border-ink-700/50 flex items-center justify-between">
                      <span className="text-sm font-medium text-ink-500 group-hover:text-amber-400 transition-colors">
                        {offer.cta}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-ink-700 flex items-center justify-center group-hover:border-amber-500 group-hover:bg-amber-500 transition-all">
                        <svg className="w-4 h-4 text-ink-500 group-hover:text-ink-950 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - The Ladder */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-amber-500 mb-4">
                How It Works
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream-100 mb-6 leading-tight">
                Start with a triage.
                <br />
                <span className="text-ink-400">Scale when ready.</span>
              </h2>
              <p className="text-lg text-ink-400 leading-relaxed mb-8 max-w-lg">
                We don't lock you into long contracts. Start with a free diagnostic call, 
                then move to a focused sprint. Only upgrade to ongoing support when you see results.
              </p>
              <Link href="/contact" className="btn btn-primary btn-lg">
                Book Free Triage Call
              </Link>
            </motion.div>

            <div className="space-y-6">
              {howItWorks.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative p-6 rounded-xl border border-ink-700/50 bg-ink-900/30 hover:border-ink-600 transition-colors"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-ink-800 border border-ink-700 flex items-center justify-center shrink-0">
                      <span className="font-display font-bold text-amber-500">{step.step}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-display text-xl text-cream-100">{step.title}</h3>
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-ink-800 text-ink-400 border border-ink-700">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-ink-400 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Connector line */}
                  {index < howItWorks.length - 1 && (
                    <div className="absolute left-[2.75rem] top-full w-px h-6 bg-gradient-to-b from-ink-700 to-transparent" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 border-y border-ink-800/50 bg-ink-900/20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-ink-500 mb-2">
              What We Deliver
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: '📊', label: 'Lender-ready packs' },
              { icon: '📈', label: 'Covenant forecasting' },
              { icon: '👥', label: 'Board reporting' },
              { icon: '🤝', label: 'M&A due diligence' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="text-sm font-medium text-ink-300">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiation Section */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-ink-700/50"
            >
              <img 
                src="https://images.unsplash.com/photo-1553484771-371a605b060b?auto=format&fit=crop&q=80&w=1200" 
                alt="Modern workspace"
                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 hover:opacity-80 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
              
              {/* Overlay Card */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-ink-900/90 backdrop-blur border border-ink-700/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-amber-500 font-medium">
                    FSE Difference
                  </span>
                </div>
                <p className="text-lg font-display text-cream-100">
                  We don't just file returns. We build bankable infrastructure.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl text-cream-100 mb-8 leading-tight">
                Traditional accounting is{' '}
                <span className="text-ink-500">backward-looking.</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  { 
                    title: 'Strategic Capital Advisory', 
                    desc: 'We structure debt facilities and manage the path to institutional capital.' 
                  },
                  { 
                    title: 'Operator-First Reporting', 
                    desc: 'Real-time dashboards tracking margins, CAC, and cash velocity—not just compliance.' 
                  },
                  { 
                    title: 'Deal-Ready Operations', 
                    desc: 'Financial infrastructure built to withstand investor scrutiny and due diligence.' 
                  }
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                      <span className="text-amber-500 font-bold text-sm">✓</span>
                    </div>
                    <div>
                      <h4 className="font-display text-lg text-cream-100 mb-1">{item.title}</h4>
                      <p className="text-ink-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-background to-ink-900" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[150px]" />
        
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream-100 mb-6 leading-tight">
              Ready to build your{' '}
              <span className="text-gradient">financial foundation?</span>
            </h2>
            
            <p className="text-lg md:text-xl text-ink-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Book a free 15-minute Finance Triage. We'll identify your biggest opportunity 
              and recommend the right next step—no commitment required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="btn btn-primary btn-xl group animate-pulse-glow"
              >
                <span>Book Your Finance Triage</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <p className="mt-8 text-sm text-ink-500">
              Free • 15 minutes • No commitment
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
