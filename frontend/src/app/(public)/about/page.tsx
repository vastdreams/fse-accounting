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
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 via-slate-950 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="font-serif text-4xl md:text-5xl text-cream-100 mb-6">
              About FSEgrowth
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              We&apos;re a modern accounting and advisory firm built for founders and operators.
              We combine tidy bookkeeping with practical CFO support so you can make decisions with confidence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl text-cream-100 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-slate-400">
                <p>
                  FSEgrowth was founded with a simple belief: businesses deserve 
                  better from their accountants. Not just compliance and tax returns, 
                  but genuine strategic partnership.
                </p>
                <p>
                  We focus on the fundamentals first: clean books, a repeatable close process,
                  and reporting that actually helps you run the business.
                </p>
                <p>
                  We work with businesses across Australia and internationally, from early-stage teams
                  to established operators. Expect clear scope, proactive communication, and secure
                  document workflows via our client portal.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              {values.map((value, index) => (
                <div key={value.title} className="card">
                  <h4 className="font-medium text-cream-100 mb-2">{value.title}</h4>
                  <p className="text-sm text-slate-400">{value.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

            {/* How we work */}
      <section className="section bg-surface">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-serif text-3xl text-cream-100 mb-6">How we work</h2>
            <p className="text-slate-400 mb-8">
              We start by getting the foundations right (systems, accounts, reconciliations), then run a
              disciplined monthly close. As you grow, we add forecasting, modelling and CFO-level support.
            </p>
            <Link href="/services" className="btn btn-secondary">
              Explore services →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-3xl text-cream-100 mb-4">
              Ready to work with us?
            </h2>
            <p className="text-slate-400 mb-8">
              Let&apos;s discuss how we can support your business growth.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

