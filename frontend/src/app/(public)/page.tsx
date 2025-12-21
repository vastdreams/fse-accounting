/**
 * PATH: frontend/src/app/(public)/page.tsx
 * PURPOSE:
 *   - Public homepage for FSE Accounting and Advisory.
 *
 * ROLE IN ARCHITECTURE:
 *   - Marketing / acquisition layer (public web).
 *
 * MAIN EXPORTS:
 *   - HomePage(): React component for the homepage.
 *
 * NON-RESPONSIBILITIES:
 *   - This file does NOT handle:
 *     - Authentication/session logic
 *     - API calls or data persistence
 *     - Portal/admin functionality
 *
 * NOTES FOR FUTURE AI:
 *   - Keep copy concrete (avoid vague terms like “premium” unless defined).
 *   - Avoid unverifiable numeric claims above-the-fold without a source.
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    slug: 'lending',
    icon: '🏦',
    title: 'Lending Advisory',
    description:
      'Bank-ready finance support: facility structuring, application packaging, and covenant reporting.',
  },
  {
    slug: 'bookkeeping',
    icon: '📊',
    title: 'Bookkeeping',
    description: 'Accurate, real-time financial records that give you complete visibility.',
  },
  {
    slug: 'cfo-services',
    icon: '👔',
    title: 'CFO Services',
    description: 'Budgets, forecasts, and decision support when you need it.',
  },
  {
    slug: 'tax-filings',
    icon: '💰',
    title: 'Tax Filings',
    description:
      'Tax returns and BAS/GST lodgements delivered with a partner Registered Tax/BAS Agent.',
  },
  {
    slug: 'financial-modelling',
    icon: '📈',
    title: 'Financial Modelling',
    description: 'Models for fundraising, planning, and better decisions.',
  },
  {
    slug: 'corporate-growth',
    icon: '🌱',
    title: 'Corporate Structuring',
    description: 'Entity and holding structures to support growth and asset protection.',
  },
];


const heroServices = [
  { 
    slug: 'cfo-services', 
    title: 'CFO Advisory', 
    description: 'Strategic guidance and financial planning.',
    icon: '👔'
  },
  { 
    slug: 'bookkeeping', 
    title: 'Bookkeeping', 
    description: 'Clean, real-time records and reporting.',
    icon: '📊'
  },
  { 
    slug: 'lending', 
    title: 'Lending Advisory', 
    description: 'Lender-ready packs and facility support.',
    icon: '🏦'
  },
  { 
    slug: 'acquisitions', 
    title: 'Acquisitions and Exits', 
    description: 'Due diligence and transaction support.',
    icon: '🤝'
  },
  { 
    slug: 'corporate-growth', 
    title: 'Growth Control', 
    description: 'Cost systems and operational efficiency.',
    icon: '🌱'
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-background" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-copper-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-800/20 rounded-full blur-[100px]" />

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-copper-400 animate-pulse" />
                <span className="text-xs text-slate-400 tracking-wide uppercase font-medium">
                  Australia · FSE Accounting &amp; Advisory
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-cream-100 text-4xl md:text-5xl lg:text-7xl leading-[1.1] tracking-tight"
              >
                Accounting and CFO advisory for{' '}
                <span className="text-gradient italic">growing</span> businesses
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-8 text-xl text-slate-400 leading-relaxed max-w-2xl font-light"
              >
                Best-in-class advisory and services from experienced executors who know how to build businesses. 
                Beyond accounting, we provide CFO-level support and specialized lending advisory.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-12 flex flex-col sm:flex-row gap-4"
              >
                <Link href="/contact" className="btn btn-primary px-8 py-4 text-center">
                  Book a Consultation
                </Link>
                <Link href="/services" className="btn btn-secondary px-8 py-4 text-center">
                  Explore Services
                </Link>
              </motion.div>
            </div>

            {/* Right Side - Clickable Sections */}
            <div className="lg:col-span-5 space-y-4">
              {heroServices.map((service, index) => (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <Link href={`/services/${service.slug}`} className="group block">
                    <div className="relative p-5 rounded-2xl border border-slate-800/60 bg-slate-900/40 backdrop-blur-sm hover:bg-slate-800/40 hover:border-copper-500/30 transition-all duration-300">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-2xl shadow-inner group-hover:border-copper-500/30 transition-colors">
                          <span className="group-hover:scale-110 transition-transform duration-300">
                            {service.icon}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-serif text-cream-100 group-hover:text-copper-400 transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-sm text-slate-500 mt-1 line-clamp-1 font-light tracking-wide">
                            {service.description}
                          </p>
                        </div>
                        <div className="text-slate-700 group-hover:text-copper-400 transition-all duration-300 transform group-hover:translate-x-1">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section bg-surface">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="font-serif text-cream-100">Our Services</h2>
            <p>
              Comprehensive accounting and advisory services tailored for growing businesses.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/services/${service.slug}`} className="block h-full">
                  <div
                    className={`card group h-full ${
                      service.slug === 'lending' ? 'border-copper-500/40 bg-copper-500/5' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-3xl mb-4">{service.icon}</div>
                      {service.slug === 'lending' && (
                        <span className="mt-1 inline-flex items-center rounded-full border border-copper-500/30 bg-copper-500/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-copper-300">
                          Core
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-medium text-cream-100 mb-2 group-hover:text-copper-400 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-400">{service.description}</p>
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

          <div className="text-center mt-12">
            <Link href="/services" className="btn btn-secondary">
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* Why FSE Section */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-cream-100 mb-6">
                Why businesses choose FSE Accounting
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-copper-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-copper-400">✓</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-cream-100 mb-1">Modern Technology Stack</h4>
                    <p className="text-sm text-slate-400">
                      Cloud-first approach with Xero, MYOB, and custom integrations. 
                      Real-time visibility into your finances.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-copper-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-copper-400">✓</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-cream-100 mb-1">Strategic Advisory</h4>
                    <p className="text-sm text-slate-400">
                      Beyond compliance—we provide insights that drive growth, 
                      optimize taxes, and prepare you for the future.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-copper-500/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-copper-400">✓</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-cream-100 mb-1">Dedicated Client Portal</h4>
                    <p className="text-sm text-slate-400">
                      Upload documents, track projects, sign contracts—all in one 
                      secure client portal.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-surface rounded-2xl border border-border-subtle p-8"
            >
              <h3 className="font-serif text-2xl text-cream-100 mb-4">
                Ready to elevate your finances?
              </h3>
              <p className="text-slate-400 mb-6">
                Book a free consultation to discuss your business needs and 
                discover how we can help you grow.
              </p>
              <Link href="/contact" className="btn btn-primary w-full">
                Book Free Consultation
              </Link>
              <p className="text-xs text-slate-500 text-center mt-4">
                No commitment required. 30-minute discovery call.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-surface">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-cream-100 mb-4">
              Let&apos;s build your financial future
            </h2>
            <p className="text-slate-400 mb-8">
              Join businesses who trust FSE Accounting with their accounting and advisory needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn btn-primary">
                Get Started Today
              </Link>
              <Link href="/login" className="btn btn-secondary">
                Existing Client? Login
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

