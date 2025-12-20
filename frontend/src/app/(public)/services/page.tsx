/**
 * PATH: frontend/src/app/(public)/services/page.tsx
 * PURPOSE:
 *   - Public services overview page listing all offerings.
 *
 * ROLE IN ARCHITECTURE:
 *   - Marketing / conversion layer (public web).
 *
 * MAIN EXPORTS:
 *   - ServicesPage(): React component.
 *
 * NON-RESPONSIBILITIES:
 *   - This file does NOT handle:
 *     - Service pricing or quotes
 *     - Auth-protected portal features
 *
 * NOTES FOR FUTURE AI:
 *   - Service content lives in `frontend/src/lib/services.ts`.
 *   - Keep slugs stable (SEO + deep links).
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SERVICES } from '@/lib/services';

export default function ServicesPage() {
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
              Our Services
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              Comprehensive accounting and advisory services designed for growing businesses. 
              From daily bookkeeping to strategic CFO guidance, we&apos;re your complete financial partner.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/services/${service.slug}`}>
                  <div className="card h-full group">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-serif text-cream-100 mb-3 group-hover:text-copper-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="text-xs text-slate-500 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-copper-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-border-subtle">
                      <span className="text-sm text-copper-400 group-hover:text-copper-300 transition-colors">
                        Learn more →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-surface">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-3xl text-cream-100 mb-4">
              Not sure which service you need?
            </h2>
            <p className="text-slate-400 mb-8">
              Book a free consultation and we&apos;ll help you identify the right solutions 
              for your business needs.
            </p>
            <Link href="/contact" className="btn btn-primary">
              Book Free Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

