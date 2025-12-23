/**
 * PATH: frontend/src/app/(public)/services/page.tsx
 * PURPOSE: Services overview - spotlights 3 core offers first
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CORE_SERVICES, getSupportingServices } from '@/lib/services';

export default function ServicesPage() {
  const supportingServices = getSupportingServices();

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] translate-x-1/3 -translate-y-1/4" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-800/80 border border-ink-700/50 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-xs text-ink-400 tracking-wide font-medium">
                Growth-Stage Financial Operations
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-cream-100 mb-6 leading-[1.1] tracking-tight"
            >
              Our <span className="text-gradient">Services</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-ink-400 leading-relaxed max-w-2xl"
            >
              Three core services that drive 90% of client outcomes. Plus specialized 
              support for complex situations.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Core Offers - Featured */}
      <section className="pb-20">
        <div className="container">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-amber-500">
              Core Services
            </span>
            <div className="flex-1 h-px bg-ink-800" />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {CORE_SERVICES.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/services/${service.slug}`} className="group block h-full">
                  <div className="relative h-full flex flex-col p-8 lg:p-10 rounded-2xl border-2 border-amber-500/20 bg-ink-900/50 hover:bg-ink-800/50 hover:border-amber-500/40 transition-all duration-300">
                    {/* Badge */}
                    <div className="absolute top-6 right-6">
                      <span className="badge">
                        {service.subtitle}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-3xl mb-6 group-hover:scale-105 transition-transform">
                      {service.icon}
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-2xl text-cream-100 mb-2 group-hover:text-amber-400 transition-colors">
                      {service.title}
                    </h3>
                    
                    <p className="text-lg font-medium text-ink-300 mb-4">
                      {service.headline}
                    </p>
                    
                    <p className="text-ink-400 mb-8 leading-relaxed flex-grow">
                      {service.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {service.features.slice(0, 4).map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-ink-400">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500/50 group-hover:bg-amber-500 transition-colors flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="mt-auto pt-6 border-t border-ink-700/50 flex items-center justify-between">
                      <span className="text-sm font-medium text-amber-500">
                        Learn More
                      </span>
                      <div className="w-8 h-8 rounded-full border border-amber-500/50 flex items-center justify-center group-hover:bg-amber-500 group-hover:border-amber-500 transition-all">
                        <svg className="w-4 h-4 text-amber-500 group-hover:text-ink-950 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

      {/* Supporting Services */}
      <section className="pb-24">
        <div className="container">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-xs font-medium tracking-[0.15em] uppercase text-ink-500">
              Additional Services
            </span>
            <div className="flex-1 h-px bg-ink-800" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportingServices.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={`/services/${service.slug}`} className="group block h-full">
                  <div className="h-full p-6 rounded-xl border border-ink-700/50 bg-ink-900/30 hover:bg-ink-800/40 hover:border-ink-600 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-ink-800 border border-ink-700 flex items-center justify-center text-xl shrink-0 group-hover:border-amber-500/30 transition-colors">
                        {service.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-lg text-cream-100 mb-1 group-hover:text-amber-400 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm text-ink-400 line-clamp-2 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                      <svg className="w-5 h-5 text-ink-600 group-hover:text-amber-500 transition-colors shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-ink-800/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-10 md:p-16 rounded-2xl border border-ink-700/50 bg-ink-900/40 text-center overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl text-cream-100 mb-6">
                Not sure which service you need?
              </h2>
              <p className="text-lg text-ink-400 mb-8 leading-relaxed">
                Book a free Finance Triage call. We'll assess your situation and recommend 
                the right path—whether that's bookkeeping foundations, lending prep, or deal support.
              </p>
              <Link href="/contact" className="btn btn-primary btn-lg">
                Book Free Triage Call
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
