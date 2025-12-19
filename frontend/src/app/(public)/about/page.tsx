/**
 * PATH: src/app/(public)/about/page.tsx
 * PURPOSE: About page
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
              About FSE Accounting
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              We&apos;re a modern accounting firm built for ambitious businesses. 
              Part of the Finsoeasy Group, we combine deep technical expertise 
              with strategic advisory to help you grow.
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
                  FSE Accounting was founded with a simple belief: businesses deserve 
                  better from their accountants. Not just compliance and tax returns, 
                  but genuine strategic partnership.
                </p>
                <p>
                  As part of the Finsoeasy Group, we bring a unique perspective to 
                  accounting—combining capital markets experience with hands-on 
                  operational expertise.
                </p>
                <p>
                  Today, we work with over 100 clients across Australia and internationally, 
                  from early-stage startups to established enterprises. Our team of qualified 
                  professionals is dedicated to helping each client achieve their financial goals.
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

      {/* Finsoeasy Connection */}
      <section className="section bg-surface">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="font-serif text-3xl text-cream-100 mb-6">
              Part of Finsoeasy Group
            </h2>
            <p className="text-slate-400 mb-8">
              FSE Accounting is a proud member of the Finsoeasy Group, a research-led 
              capital and advisory firm operating across banking, construction, medical, 
              and AI sectors. This connection gives our clients access to broader capital 
              markets expertise and strategic advisory capabilities.
            </p>
            <Link
              href="https://finsoeasy.com"
              target="_blank"
              className="btn btn-secondary"
            >
              Visit Finsoeasy →
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

