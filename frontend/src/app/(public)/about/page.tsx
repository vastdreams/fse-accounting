/**
 * PATH: frontend/src/app/(public)/about/page.tsx
 * PURPOSE:
 *   - About page describing the firm, values, and operating approach.
 *
 * ROLE IN ARCHITECTURE:
 *   - Marketing / credibility layer (public web).
 *
 * MAIN EXPORTS:
 *   - AboutPage(): React component.
 *
 * NON-RESPONSIBILITIES:
 *   - This file does NOT handle:
 *     - Hiring/team bios (use a dedicated team page when ready)
 *     - Legal/regulated claims (avoid certification/registration claims without proof)
 *
 * NOTES FOR FUTURE AI:
 *   - Avoid referencing other brands unless explicitly required.
 *   - Prefer specific, operational language over marketing adjectives.
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const values = [
  {
    title: 'Excellence',
    description: 'We deliver work that exceeds expectations, every time.',
  },
  {
    title: 'Integrity',
    description: 'Transparent, honest advice—even when it\'s not what you want to hear.',
  },
  {
    title: 'Innovation',
    description: 'Embracing technology to deliver smarter, faster solutions.',
  },
  {
    title: 'Partnership',
    description: 'Your success is our success. We\'re invested in your growth.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-900 via-slate-950 to-background overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-copper-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream-100 mb-6 tracking-tight">
              About FSE Accounting
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed font-light">
              We&apos;re a modern accounting and advisory firm built by founders, for founders. 
              We bridge the gap between tidy compliance and genuine strategic execution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7"
            >
              <h2 className="font-serif text-3xl md:text-4xl text-cream-100 mb-8">
                Built by executors
              </h2>
              <div className="space-y-6 text-lg text-slate-400 font-light leading-relaxed">
                <p>
                  FSE Accounting was founded with a simple belief: businesses deserve 
                  better from their financial partners. Not just backward-looking tax returns, 
                  but forward-looking strategic support that drives growth.
                </p>
                <p>
                  We focus on the fundamentals first: clean books, a disciplined monthly close,
                  and reporting that actually helps you run the business. Once the foundation is solid,
                  we layer on capital advisory, modelling, and CFO support.
                </p>
                <p>
                  Based in Australia but operating globally, we serve high-growth teams who value 
                  clarity, speed, and precision.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 grid grid-cols-1 gap-4"
            >
              {values.map((value, index) => (
                <div key={value.title} className="card p-6 border-border-subtle bg-surface/30 hover:border-copper-500/20 transition-colors">
                  <h4 className="text-lg font-serif text-cream-100 mb-2">{value.title}</h4>
                  <p className="text-sm text-slate-500">{value.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="section bg-surface/30">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-cream-100 mb-8">One platform, one partner</h2>
            <p className="text-lg text-slate-400 mb-12 font-light">
              We leverage a modern technology stack and our dedicated client portal to provide 
              real-time visibility. No more waiting for quarter-end to know your numbers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services" className="btn btn-secondary px-8 py-4">
                Explore our services
              </Link>
              <Link href="/contact" className="btn btn-primary px-8 py-4">
                Book a consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

