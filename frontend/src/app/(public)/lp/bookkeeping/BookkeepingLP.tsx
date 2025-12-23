/**
 * Bookkeeping Landing Page - Conversion-focused for paid traffic
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const painPoints = [
  'Books are months behind',
  'No idea of real cash position',
  "Can't get reports to lenders",
  'Spending hours on reconciliations',
];

const outcomes = [
  { metric: 'Day 5', label: 'Month-end close' },
  { metric: '100%', label: 'Reconciliation accuracy' },
  { metric: 'Real-time', label: 'Cash visibility' },
];

const features = [
  {
    title: 'Month-End Close by Day 5',
    description: 'No more waiting weeks for numbers. Get closed, accurate books within 5 business days.',
  },
  {
    title: 'Management Dashboard',
    description: 'Real-time visibility into revenue, costs, margins, and cash position.',
  },
  {
    title: 'Lender-Ready Records',
    description: 'Clean, audit-ready documentation that banks and investors trust.',
  },
  {
    title: 'AP/AR Automation',
    description: 'Streamlined workflows that save you hours every week.',
  },
];

export default function BookkeepingLandingPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero - Above the fold conversion focus */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4" />
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Message */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="text-xs text-amber-400 font-medium">
                  14-Day Bookkeeping Sprint Available
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl md:text-5xl text-cream-100 mb-6 leading-[1.1]"
              >
                Your books closed.
                <br />
                <span className="text-gradient">By day 5. Every month.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-ink-400 mb-8 leading-relaxed"
              >
                Stop chasing messy financials. Get management-ready reporting, 
                real-time cash visibility, and books that are ready for lenders, 
                investors, or that acquisition you're planning.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link 
                  href="/contact?service=bookkeeping" 
                  className="btn btn-primary btn-xl group"
                >
                  <span>Book Free Triage Call</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <p className="mt-3 text-sm text-ink-500">Free • 15 min • No commitment</p>
              </motion.div>
            </div>

            {/* Right - Social Proof / Outcomes */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-2xl border border-ink-700/50 bg-ink-900/50"
            >
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-ink-500 mb-6">
                What You Get
              </p>
              <div className="grid grid-cols-3 gap-6 mb-8">
                {outcomes.map((outcome) => (
                  <div key={outcome.label} className="text-center">
                    <div className="text-2xl font-display font-bold text-amber-400 mb-1">
                      {outcome.metric}
                    </div>
                    <div className="text-xs text-ink-500">{outcome.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="h-px bg-ink-700/50 mb-6" />
              
              <p className="text-xs font-medium tracking-[0.15em] uppercase text-ink-500 mb-4">
                Sound Familiar?
              </p>
              <ul className="space-y-3">
                {painPoints.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm text-ink-400">
                    <span className="w-4 h-4 rounded bg-red-500/10 flex items-center justify-center text-red-400 text-xs">✗</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-ink-800/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl text-cream-100 mb-4">
              What's Included
            </h2>
            <p className="text-ink-400">
              Everything you need for clean, decision-ready financials
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl border border-ink-700/50 bg-ink-900/30"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                  <span className="text-amber-500 font-bold">✓</span>
                </div>
                <h3 className="font-display text-lg text-cream-100 mb-2">{feature.title}</h3>
                <p className="text-sm text-ink-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 border-t border-ink-800/50">
        <div className="container max-w-2xl text-center">
          <h2 className="font-display text-3xl text-cream-100 mb-4">
            Ready to fix your books?
          </h2>
          <p className="text-ink-400 mb-8">
            Start with a free Finance Triage call. We'll assess your current state 
            and recommend the right approach—whether that's a 14-day sprint or ongoing support.
          </p>
          <Link 
            href="/contact?service=bookkeeping" 
            className="btn btn-primary btn-xl"
          >
            Book Free Triage Call
          </Link>
        </div>
      </section>
    </div>
  );
}

