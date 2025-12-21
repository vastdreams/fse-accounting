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
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background elements for depth */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-copper-500/5 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-800/20 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-copper-400" />
              <span className="text-xs text-slate-400 tracking-widest uppercase font-semibold">
                Execution-led Advisory
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-5xl md:text-6xl lg:text-7xl text-cream-100 mb-8 leading-[1.1] tracking-tight"
            >
              Our <span className="text-gradient italic">Services</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-400 leading-relaxed font-light max-w-3xl"
            >
              Beyond compliance. We provide the financial infrastructure and strategic expertise required to build, scale, and exit high-growth businesses.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Link href={`/services/${service.slug}`} className="group block h-full">
                  <div className={`relative h-full flex flex-col p-8 md:p-10 rounded-[2rem] border transition-all duration-500 hover:duration-300 ${
                    service.slug === 'lending' || service.slug === 'cfo-services'
                      ? 'bg-slate-900/40 border-slate-700/50 hover:border-copper-500/40 hover:bg-slate-800/40'
                      : 'bg-surface/30 border-border-subtle hover:border-slate-600 hover:bg-surface/50'
                  }`}>
                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-copper-500/0 via-transparent to-copper-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-8">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-inner border transition-all duration-500 group-hover:scale-110 ${
                          service.slug === 'lending' || service.slug === 'cfo-services'
                            ? 'bg-copper-500/10 border-copper-500/20'
                            : 'bg-slate-800/50 border-slate-700/50 group-hover:border-copper-500/30'
                        }`}>
                          {service.icon}
                        </div>
                        {(service.slug === 'lending' || service.slug === 'cfo-services') && (
                          <span className="mt-1 px-3 py-1 rounded-full border border-copper-500/30 bg-copper-500/10 text-[10px] uppercase tracking-[0.2em] text-copper-300 font-bold">
                            Core Advisory
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl md:text-3xl font-serif text-cream-100 mb-4 group-hover:text-copper-400 transition-colors duration-300">
                        {service.title}
                      </h3>
                      
                      <p className="text-slate-400 mb-8 leading-relaxed font-light group-hover:text-slate-300 transition-colors duration-300">
                        {service.description}
                      </p>

                      <ul className="space-y-4 mb-10">
                        {service.features.slice(0, 4).map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-500 group-hover:text-slate-400 transition-colors duration-300">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-copper-500/30 group-hover:bg-copper-500 transition-colors duration-300 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-8 border-t border-border-subtle/50 flex items-center justify-between group-hover:border-copper-500/20 transition-colors duration-300">
                      <span className="text-sm font-medium tracking-widest uppercase text-slate-500 group-hover:text-copper-400 transition-colors duration-300">
                        View Details
                      </span>
                      <div className="w-8 h-8 rounded-full border border-border-subtle flex items-center justify-center group-hover:border-copper-400 group-hover:bg-copper-400 group-hover:text-slate-900 transition-all duration-300 transform group-hover:translate-x-1">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      {/* Footer CTA */}
      <section className="section pb-32 overflow-hidden">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 md:p-20 rounded-[3rem] border border-border-subtle bg-slate-900/40 backdrop-blur-xl text-center overflow-hidden"
          >
            {/* Inner background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-copper-500/5 blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-serif text-4xl md:text-5xl text-cream-100 mb-8 leading-tight">
                Partner with executors who know <span className="italic text-copper-400">scale</span>.
              </h2>
              <p className="text-lg md:text-xl text-slate-400 mb-12 font-light leading-relaxed">
                Whether you&apos;re raising capital, cleaning your books for an exit, or need fractional CFO support, let&apos;s discuss your path.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn btn-primary px-10 py-5 text-lg">
                  Book a Consultation
                </Link>
                <Link href="/about" className="btn btn-secondary px-10 py-5 text-lg">
                  Our Story
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

