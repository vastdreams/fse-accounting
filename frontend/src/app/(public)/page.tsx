/**
 * PATH: src/app/(public)/page.tsx
 * PURPOSE: Homepage for FSE Accounting
 * ROLE IN ARCHITECTURE: Main landing page
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    icon: '📊',
    title: 'Bookkeeping',
    description: 'Accurate, real-time financial records that give you complete visibility.',
  },
  {
    icon: '💰',
    title: 'Tax Filings',
    description: 'Strategic tax planning and compliance for businesses of all sizes.',
  },
  {
    icon: '📈',
    title: 'CFO Services',
    description: 'Fractional CFO expertise without the full-time commitment.',
  },
  {
    icon: '🏗️',
    title: 'Financial Modelling',
    description: 'Sophisticated models for fundraising, planning, and decision-making.',
  },
  {
    icon: '🌏',
    title: 'Global Structuring',
    description: 'International tax planning and multi-jurisdictional compliance.',
  },
  {
    icon: '🚀',
    title: 'Exit Planning',
    description: 'Maximize value and prepare your business for a successful exit.',
  },
];

const stats = [
  { value: '$50M+', label: 'Client Assets Managed' },
  { value: '100+', label: 'Active Clients' },
  { value: '15+', label: 'Years Experience' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-background" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-copper-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-800/30 rounded-full blur-[100px]" />

        <div className="container relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-copper-400 animate-pulse" />
              <span className="text-xs text-slate-400 tracking-wide uppercase">
                Part of Finsoeasy Group
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-cream-100 text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight"
            >
              Premium accounting for{' '}
              <span className="text-gradient">ambitious</span> businesses
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl"
            >
              From bookkeeping to CFO services, we provide the financial infrastructure 
              that growing businesses need. Strategic advisory backed by deep technical expertise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact" className="btn btn-primary text-center">
                Book a Consultation
              </Link>
              <Link href="/services" className="btn btn-secondary text-center">
                Explore Services
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16 pt-8 border-t border-border-subtle grid grid-cols-3 gap-8"
            >
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-2xl md:text-3xl font-serif text-cream-100">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
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
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card group cursor-pointer"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-medium text-cream-100 mb-2 group-hover:text-copper-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-400">{service.description}</p>
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
                Why businesses choose FSE
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
                      secure, AI-powered platform.
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
              Join 100+ businesses who trust FSE with their accounting and advisory needs.
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

