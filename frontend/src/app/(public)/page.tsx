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

const partners = [
  "Lender-ready packs",
  "Covenant forecasting",
  "Board reporting",
  "M\u0026A due diligence",
  "Multi-entity setup",
  "Xero Automation",
];

const stats = [
  { label: 'Asset Support', value: '$250M+' },
  { label: 'Annual Revenue Managed', value: '$1B+' },
  { label: 'Specialized Executors', value: '15+' },
  { label: 'Hours Saved Monthly', value: '400+' },
];

export default function HomePage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden">
        {/* Advanced Background Texture */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/90 to-background" />
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-[0.15]" 
               style={{ backgroundImage: 'radial-gradient(#243040 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          {/* Animated Glows */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-copper-500/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/4" 
          />
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
            className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/4" 
          />
        </div>

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/10 mb-10 backdrop-blur-xl shadow-2xl"
              >
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-copper-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-copper-500"></span>
                </span>
                <span className="text-xs text-cream-200 tracking-[0.2em] uppercase font-bold">
                  Australia · Global Execution
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-cream-100 text-5xl md:text-6xl lg:text-8xl leading-[1.2] tracking-tight mb-10 pb-4"
              >
                Accounting and CFO advisory for{' '}
                <span className="text-gradient italic inline-block py-1">growing</span> businesses
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-2xl font-light mb-12"
              >
                We build the financial architecture for scale. From bank-ready lending packs to complex multi-entity CFO support, we bridge the gap between compliance and capital.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-6"
              >
                <Link href="/contact" className="btn btn-primary px-12 py-6 text-lg font-bold shadow-[0_0_40px_rgba(212,130,58,0.2)] hover:shadow-[0_0_60px_rgba(212,130,58,0.3)] transition-all">
                  Book a Consultation
                </Link>
                <Link href="/services" className="btn btn-secondary px-12 py-6 text-lg font-bold backdrop-blur-md border-white/10 hover:bg-white/5 transition-all">
                  Explore Services
                </Link>
              </motion.div>

              {/* Stats/Social Proof Bar */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-20 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8"
              >
                {stats.slice(0, 4).map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl font-serif text-cream-100 mb-1">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right Side - Premium Vertical Stack */}
            <div className="lg:col-span-5 relative">
              {/* Background accent for the stack */}
              <div className="absolute inset-0 bg-copper-500/5 blur-[100px] -z-10" />
              
              <div className="space-y-5">
                {heroServices.map((service, index) => (
                  <motion.div
                    key={service.slug}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <Link href={`/services/${service.slug}`} className="group block">
                      <div className="relative p-6 rounded-[2rem] border border-white/[0.05] bg-white/[0.02] backdrop-blur-2xl hover:bg-white/[0.05] hover:border-copper-500/30 transition-all duration-500 shadow-2xl">
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-white/10 flex items-center justify-center text-3xl shadow-inner group-hover:border-copper-500/40 group-hover:bg-copper-500/10 transition-all duration-500">
                            <span className="group-hover:scale-110 transition-transform duration-500">
                              {service.icon}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-bold text-cream-100 tracking-tight group-hover:text-copper-400 transition-colors">
                              {service.title}
                            </h3>
                            <p className="text-[13px] text-slate-400 mt-1 line-clamp-1 font-light tracking-wide opacity-60 group-hover:opacity-100 transition-opacity">
                              {service.description}
                            </p>
                          </div>
                          <div className="text-slate-700 group-hover:text-copper-400 transition-all duration-500 transform group-hover:translate-x-1">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
        </div>
      </section>

      {/* Capabilities / Trust Bar */}
      <section className="py-20 border-y border-white/[0.05] bg-surface/20">
        <div className="container">
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-10 opacity-40 hover:opacity-100 transition-opacity duration-700">
            {partners.map((partner) => (
              <span key={partner} className="text-sm font-bold uppercase tracking-[0.3em] text-cream-200">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* The "Why" Section - High Visual Weight */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-copper-500/5 rounded-full blur-[120px] -translate-x-1/2" />
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-5xl md:text-6xl text-cream-100 mb-10 leading-tight">
                Traditional accounting is <br />
                <span className="text-gradient italic">backward-looking.</span>
              </h2>
              <p className="text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-xl">
                Most firms stop at the tax return. We start there. FSE Accounting is built to handle the heavy lifting of high-growth operations: lender coordination, multi-jurisdictional structuring, and complex CFO modelling.
              </p>
              
              <div className="space-y-8">
                {[
                  { title: 'Lender-Ready Infrastructure', desc: 'We build your books to pass rigorous credit due diligence.' },
                  { title: 'Operator-First Reporting', desc: 'Custom dashboards that track unit economics, not just tax lines.' },
                  { title: 'Strategic Capital Advisory', desc: 'Structuring facilities and equity rounds from a finance perspective.' }
                ].map((item) => (
                  <div key={item.title} className="flex gap-6 group">
                    <div className="w-12 h-12 rounded-xl bg-copper-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-copper-500 transition-colors duration-500">
                      <span className="text-copper-400 group-hover:text-background font-bold text-xl">✓</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-cream-100 mb-2">{item.title}</h4>
                      <p className="text-slate-400 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                alt="High-end execution environment" 
                className="w-full h-full object-cover grayscale opacity-40 hover:grayscale-0 hover:opacity-80 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              
              {/* Floating Feature Card */}
              <div className="absolute bottom-12 left-12 right-12 p-8 rounded-[2rem] bg-slate-900/80 backdrop-blur-2xl border border-white/10 shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-3 h-3 rounded-full bg-copper-500" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-copper-400 font-bold">FSE Protocol</span>
                </div>
                <h4 className="text-2xl font-serif text-cream-100 mb-3">Clean books, clear decisions.</h4>
                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  Every month, we deliver a partner-level review of your performance, cash position, and forward-looking risks.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final "Executive" CTA */}
      <section className="py-32 bg-surface/40">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="font-serif text-6xl md:text-8xl text-cream-100 mb-10 tracking-tighter">
              Build your <span className="text-gradient italic">foundation.</span>
            </h2>
            <p className="text-2xl text-slate-400 font-light mb-16 max-w-2xl mx-auto">
              Ready to professionalize your financial operations? Book a partner discovery call today.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
              <Link href="/contact" className="btn btn-primary px-16 py-8 text-xl font-bold rounded-full shadow-2xl hover:scale-105 transition-all">
                Book Consultation
              </Link>
              <Link href="/login" className="text-cream-200 hover:text-copper-400 transition-colors font-bold tracking-widest uppercase text-sm">
                Client Access Portal →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

