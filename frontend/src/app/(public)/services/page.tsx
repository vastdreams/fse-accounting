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
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-900 via-slate-950 to-background overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-copper-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream-100 mb-6 tracking-tight">
              Our Services
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed font-light">
              Comprehensive accounting and advisory services designed for growing businesses.
              From daily bookkeeping to lending advisory and strategic CFO guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section bg-background">
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
                <Link href={`/services/${service.slug}`} className="group block h-full">
                  <div
                    className={`card h-full p-8 transition-all duration-300 group-hover:-translate-y-1 ${
                      service.slug === 'lending' 
                        ? 'border-copper-500/30 bg-copper-500/[0.03] shadow-lg shadow-copper-500/5' 
                        : 'border-border-subtle bg-surface/50 hover:border-copper-500/20 hover:bg-surface'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="text-4xl transition-transform duration-300 group-hover:scale-110">
                        {service.icon}
                      </div>
                      {service.slug === 'lending' && (
                        <span className="mt-1 inline-flex items-center rounded-full border border-copper-500/30 bg-copper-500/10 px-3 py-1 text-[10px] uppercase tracking-widest text-copper-300 font-semibold">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-serif text-cream-100 mb-4 group-hover:text-copper-400 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-sm text-slate-400 mb-8 leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                    
                    <div className="mt-auto space-y-3">
                      {service.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="w-1 h-1 rounded-full bg-copper-500/40" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-border-subtle flex items-center justify-between">
                      <span className="text-sm font-medium text-copper-400 group-hover:text-copper-300 transition-colors">
                        View details
                      </span>
                      <span className="text-copper-400 transition-transform duration-300 group-hover:translate-x-1">
                        →
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
      <section className="section bg-surface/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto p-12 rounded-3xl border border-border-subtle bg-slate-900/50 backdrop-blur-sm"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-cream-100 mb-6">
              Not sure which service you need?
            </h2>
            <p className="text-lg text-slate-400 mb-10 font-light">
              Book a free consultation and we&apos;ll help you identify the right solutions 
              for your business stage and growth goals.
            </p>
            <Link href="/contact" className="btn btn-primary px-10 py-4 text-lg">
              Book Free Consultation
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}

