/**
 * Acquisitions Landing Page - Conversion-focused for paid traffic
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const painPoints = [
  'Can't trust the seller's numbers',
  'Hidden liabilities in the financials',
  'No clarity on real earnings quality',
  'Deal structure that costs you later',
];

const outcomes = [
  { metric: 'Complete', label: 'DD report' },
  { metric: 'Clear', label: 'Risk assessment' },
  { metric: 'Optimal', label: 'Deal structure' },
];

const features = [
  {
    title: 'Financial Due Diligence',
    description: 'Deep dive into the numbers—revenue quality, working capital, normalized earnings, and hidden risks.',
  },
  {
    title: 'Quality of Earnings Analysis',
    description: 'Separate real, sustainable earnings from one-offs and accounting adjustments.',
  },
  {
    title: 'Deal Structure Advisory',
    description: 'Structure the transaction to protect your downside and optimize tax outcomes.',
  },
  {
    title: 'Integration Planning',
    description: 'Day-one finance integration plan to capture value from the start.',
  },
];

const buyerChecklist = [
  'Revenue and customer concentration',
  'Normalized EBITDA and add-backs',
  'Working capital requirements',
  'Off-balance sheet liabilities',
  'Tax position and risks',
  'Management accounts quality',
];

export default function AcquisitionsLandingPage() {
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
                  Buy-Side & Sell-Side Support
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="font-display text-4xl md:text-5xl text-cream-100 mb-6 leading-[1.1]"
              >
                Know what you're buying.
                <br />
                <span className="text-gradient">Don't get surprised.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-ink-400 mb-8 leading-relaxed"
              >
                Financial due diligence that uncovers the truth. We identify hidden 
                risks, validate earnings quality, and help you structure deals that 
                protect your investment.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link 
                  href="/contact?service=acquisitions" 
                  className="btn btn-primary btn-xl group"
                >
                  <span>Start Due Diligence</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <p className="mt-3 text-sm text-ink-500">Free triage call • Confidential • No commitment</p>
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
                Common Buyer Concerns
              </p>
              <ul className="space-y-3">
                {painPoints.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm text-ink-400">
                    <span className="w-4 h-4 rounded bg-red-500/10 flex items-center justify-center text-red-400 text-xs">!</span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DD Checklist */}
      <section className="py-16 border-t border-ink-800/50 bg-ink-900/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl text-cream-100 mb-4">
                What We Analyze
              </h2>
              <p className="text-ink-400 mb-8">
                Comprehensive financial due diligence that covers every critical area
              </p>
              <ul className="grid grid-cols-2 gap-4">
                {buyerChecklist.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-cream-100">
                    <span className="mt-0.5 w-5 h-5 rounded bg-amber-500/10 flex items-center justify-center text-amber-500 text-xs shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-8 rounded-2xl border border-amber-500/20 bg-amber-500/5">
              <h3 className="font-display text-xl text-cream-100 mb-3">
                Selling your business?
              </h3>
              <p className="text-ink-400 mb-6">
                We also help prepare businesses for sale—cleaning up financials, 
                building data rooms, and maximizing value before you go to market.
              </p>
              <Link 
                href="/services/exit-planning" 
                className="text-amber-500 hover:text-amber-400 text-sm font-medium inline-flex items-center gap-2"
              >
                Learn about exit planning
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-ink-800/50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl text-cream-100 mb-4">
              Full Transaction Support
            </h2>
            <p className="text-ink-400">
              From initial diligence to post-deal integration
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
            Got a deal in progress?
          </h2>
          <p className="text-ink-400 mb-8">
            Book a confidential Finance Triage call. We'll discuss your transaction, 
            timeline, and outline exactly what diligence you need.
          </p>
          <Link 
            href="/contact?service=acquisitions" 
            className="btn btn-primary btn-xl"
          >
            Book Free Triage Call
          </Link>
        </div>
      </section>
    </div>
  );
}

