/**
 * Lending Landing Page - Conversion-focused for paid traffic
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const painPoints = [
  'Banks keep asking for more information',
  "Model doesn't match what lenders need",
  'No clear data room or pack',
  'Process taking months instead of weeks',
];

const outcomes = [
  { metric: '14 Days', label: 'To lender-ready' },
  { metric: '50%', label: 'Fewer bank questions' },
  { metric: 'Complete', label: 'Credit pack + model' },
];

const features = [
  {
    title: 'Credit-Ready Application Pack',
    description: 'Everything lenders need in one professional package—financials, projections, and supporting docs.',
  },
  {
    title: 'Financial Model + Projections',
    description: 'Detailed 3-way model with scenarios that banks trust and understand.',
  },
  {
    title: 'Data Room Preparation',
    description: 'Organized, indexed documentation ready for due diligence.',
  },
  {
    title: 'Lender Q&A Support',
    description: 'We handle the back-and-forth so you can focus on your business.',
  },
];

export default function LendingLandingPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4" />
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="text-xs text-amber-400 font-medium">
                  14-Day Lending Readiness Sprint
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl md:text-5xl text-cream-100 mb-6 leading-[1.1]"
              >
                Bank-ready pack.
                <br />
                <span className="text-gradient">Faster facility approval.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-ink-400 mb-8 leading-relaxed"
              >
                Stop the endless back-and-forth with lenders. We build complete, 
                credit-ready application packs with models that banks actually trust.
                Get funded faster.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link 
                  href="/contact?service=lending" 
                  className="btn btn-primary btn-xl group"
                >
                  <span>Get Lender-Ready</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <p className="mt-3 text-sm text-ink-500">Free triage call • 15 min • No commitment</p>
              </motion.div>
            </div>

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

      {/* Disclaimer */}
      <section className="py-6 border-t border-ink-800/50">
        <div className="container">
          <p className="text-xs text-ink-500 text-center max-w-2xl mx-auto">
            FSE Accounting provides lender-ready pack preparation and coordination services. 
            We are not a licensed credit provider or mortgage broker. Your chosen lender handles 
            the actual facility.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-ink-800/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl text-cream-100 mb-4">
              What's In Your Pack
            </h2>
            <p className="text-ink-400">
              Everything lenders need to say yes, faster
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
            Ready to get funded faster?
          </h2>
          <p className="text-ink-400 mb-8">
            Book a free Finance Triage call. We'll assess your lending readiness and 
            outline exactly what you need to get bank-ready in 14 days.
          </p>
          <Link 
            href="/contact?service=lending" 
            className="btn btn-primary btn-xl"
          >
            Book Free Triage Call
          </Link>
        </div>
      </section>
    </div>
  );
}

