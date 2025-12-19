/**
 * PATH: src/app/(public)/services/page.tsx
 * PURPOSE: Services overview page
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    slug: 'bookkeeping',
    icon: '📊',
    title: 'Bookkeeping',
    description: 'Accurate, real-time financial records that give you complete visibility into your business performance.',
    features: ['Daily transaction recording', 'Bank reconciliation', 'Accounts payable/receivable', 'Financial reporting'],
  },
  {
    slug: 'cost-accounting',
    icon: '🎯',
    title: 'Premium Cost Accounting',
    description: 'Implementation of sophisticated cost accounting systems for manufacturing and service businesses.',
    features: ['Activity-based costing', 'Job costing systems', 'Variance analysis', 'Profitability analysis'],
  },
  {
    slug: 'financial-os',
    icon: '⚙️',
    title: 'Financial Operating System',
    description: 'Build a modern financial technology stack with integrated systems and automation.',
    features: ['System selection & implementation', 'Workflow automation', 'Integration setup', 'Training & support'],
  },
  {
    slug: 'financial-modelling',
    icon: '📈',
    title: 'Financial Modelling',
    description: 'Sophisticated models for fundraising, strategic planning, and business decision-making.',
    features: ['3-statement models', 'Valuation models', 'Scenario analysis', 'Investor-ready outputs'],
  },
  {
    slug: 'lending',
    icon: '🏦',
    title: 'Lending Advisory',
    description: 'Navigate the lending landscape with expert guidance on financing options and applications.',
    features: ['Loan structuring', 'Bank relationship management', 'Application preparation', 'Covenant monitoring'],
  },
  {
    slug: 'tax-filings',
    icon: '💰',
    title: 'Tax Filings',
    description: 'Strategic tax planning and compliance for businesses of all sizes and structures.',
    features: ['Company tax returns', 'BAS/GST lodgement', 'Tax planning strategies', 'ATO audit support'],
  },
  {
    slug: 'corporate-growth',
    icon: '🌱',
    title: 'Corporate Growth & Structuring',
    description: 'Optimize your corporate structure for growth, tax efficiency, and asset protection.',
    features: ['Entity structuring', 'Holding company setup', 'Trust structures', 'Restructuring advice'],
  },
  {
    slug: 'acquisitions',
    icon: '🤝',
    title: 'Acquisitions & Planning',
    description: 'End-to-end support for buying businesses, from due diligence to integration.',
    features: ['Target identification', 'Financial due diligence', 'Deal structuring', 'Post-acquisition integration'],
  },
  {
    slug: 'exit-planning',
    icon: '🚀',
    title: 'Exit Planning',
    description: 'Maximize value and prepare your business for a successful sale or transition.',
    features: ['Valuation analysis', 'Value enhancement', 'Succession planning', 'Transaction support'],
  },
  {
    slug: 'hnwi-investments',
    icon: '💎',
    title: 'HNWI Investments',
    description: 'Investment structuring and administration for high-net-worth individuals.',
    features: ['Investment entity setup', 'Portfolio administration', 'Tax optimization', 'Reporting & compliance'],
  },
  {
    slug: 'global-structuring',
    icon: '🌏',
    title: 'Global Structuring',
    description: 'International tax planning and multi-jurisdictional compliance for global businesses.',
    features: ['Cross-border structuring', 'Transfer pricing', 'International tax compliance', 'Treaty planning'],
  },
  {
    slug: 'cfo-services',
    icon: '👔',
    title: 'CFO Services',
    description: 'Fractional CFO expertise without the full-time commitment. Strategic financial leadership.',
    features: ['Strategic planning', 'Cash flow management', 'Board reporting', 'Investor relations'],
  },
];

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
            {services.map((service, index) => (
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

