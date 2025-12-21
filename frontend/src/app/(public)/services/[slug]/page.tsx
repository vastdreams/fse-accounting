/**
 * PATH: frontend/src/app/(public)/services/[slug]/page.tsx
 * PURPOSE:
 *   - Service detail page (one per service slug).
 *
 * ROLE IN ARCHITECTURE:
 *   - Marketing / conversion layer (public web).
 *
 * MAIN EXPORTS:
 *   - generateStaticParams(): Pre-renders known service slugs.
 *   - ServiceDetailPage(): Route component.
 *
 * NON-RESPONSIBILITIES:
 *   - This file does NOT handle:
 *     - Pricing or quoting logic
 *     - Auth/session logic
 *
 * NOTES FOR FUTURE AI:
 *   - Service content is sourced from `frontend/src/lib/services.ts`.
 *   - Keep slugs stable; adding/removing slugs affects SEO and inbound links.
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SERVICES, getServiceBySlug } from '@/lib/services';

const steps = [
  { title: 'Discovery', desc: 'A 30-minute deep dive into your current operations and goals.' },
  { title: 'Scoping', desc: 'We build a clear, transparent scope of work with no hidden fees.' },
  { title: 'Execution', desc: 'Our executors integrate with your team to deliver high-impact results.' },
];

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const service = getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const isTaxFilings = service.slug === 'tax-filings';
  const isLending = service.slug === 'lending';

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background Image with Deep Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
            alt="Corporate architecture" 
            className="w-full h-full object-cover opacity-[0.07] grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/95 to-background" />
        </div>
        
        {/* Animated Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-copper-500/5 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/3" />
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/services"
              className="inline-flex items-center text-sm font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-copper-400 transition-all mb-12 group"
            >
              <span className="mr-3 group-hover:-translate-x-2 transition-transform duration-300">←</span>
              Back to all services
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-16 items-end">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-start gap-8"
              >
                <div className="w-20 h-20 rounded-[2rem] bg-copper-500/10 border border-copper-500/20 flex items-center justify-center text-5xl shadow-2xl shrink-0 hidden md:flex">
                  {service.icon}
                </div>
                <div>
                  <h1 className="font-serif text-5xl md:text-6xl lg:text-8xl text-cream-100 leading-[1.05] tracking-tight mb-8">
                    {service.title.split(' ').map((word, i, arr) => (
                      <span key={i}>
                        {i === arr.length - 1 ? <span className="text-gradient italic">{word}</span> : word}{' '}
                      </span>
                    ))}
                  </h1>
                  <p className="text-xl md:text-2xl text-slate-400 leading-relaxed font-light max-w-2xl">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="pb-32">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-24">
              
              {/* Features Grid */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-serif text-3xl md:text-4xl text-cream-100 mb-12 flex items-center gap-6">
                  <span className="w-12 h-px bg-copper-500/30" />
                  What&apos;s included
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {service.features.map((feature, index) => (
                    <div 
                      key={feature} 
                      className="group p-8 rounded-3xl border border-border-subtle bg-surface/30 hover:bg-slate-800/40 hover:border-copper-500/20 transition-all duration-500"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/50 flex items-center justify-center group-hover:bg-copper-500 transition-all duration-500">
                          <span className="text-copper-400 group-hover:text-background font-bold">✓</span>
                        </div>
                        <span className="text-lg text-cream-200/80 font-light group-hover:text-cream-100 transition-colors duration-500">
                          {feature}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Special Disclosures for Lending/Tax */}
              {(isLending || isTaxFilings) && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative p-10 rounded-[3rem] border border-copper-500/20 bg-slate-900/40 backdrop-blur-xl overflow-hidden shadow-2xl"
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 scale-150">
                    {service.icon}
                  </div>
                  
                  <h3 className="font-serif text-2xl md:text-3xl text-copper-400 mb-6">
                    {isLending ? 'Strategic Lending Infrastructure' : 'Compliance & Lodgement Protocol'}
                  </h3>
                  
                  <div className="text-slate-400 leading-relaxed text-lg font-light space-y-6">
                    {isLending ? (
                      <p>
                        We build lender-ready financial packs that meet institutional credit requirements. Our executors manage the entire cycle: facility structuring, lender Q&A, and post-settlement covenant reporting. 
                        <span className="block mt-4 pt-4 border-t border-white/5 text-sm uppercase tracking-widest font-bold">
                          * FSE Accounting is an advisory firm, not a direct lender.
                        </span>
                      </p>
                    ) : (
                      <p>
                        For work requiring a Registered Tax/BAS Agent, we partner with specialized executors. FSE Accounting remains your primary point of contact, managing all workflow and communications through your dedicated secure portal.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Process Section */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-12"
              >
                <h2 className="font-serif text-3xl md:text-4xl text-cream-100 flex items-center gap-6">
                  <span className="w-12 h-px bg-copper-500/30" />
                  The Execution Path
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {steps.map((step, i) => (
                    <div key={i} className="relative group">
                      <div className="text-6xl font-serif text-white/5 absolute -top-10 -left-2 group-hover:text-copper-500/10 transition-colors duration-700">
                        0{i + 1}
                      </div>
                      <h4 className="text-xl font-bold text-cream-100 mb-3 relative z-10">{step.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-light">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sticky Sidebar CTA */}
            <aside className="lg:col-span-4 sticky top-32">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative p-10 rounded-[3rem] border border-white/10 bg-slate-900/40 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-copper-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <h3 className="font-serif text-3xl text-cream-100 mb-6">Ready to scale?</h3>
                <p className="text-slate-400 mb-10 font-light leading-relaxed">
                  Discuss your business stage with an executor. We&apos;ll recommend the precise scope required for your next phase of growth.
                </p>
                
                <div className="space-y-8">
                  <Link
                    href={isLending ? '/contact?service=lending' : `/contact?service=${service.slug}`}
                    className="btn btn-primary w-full py-6 text-center text-lg font-bold shadow-xl shadow-copper-500/10 hover:shadow-copper-500/20 active:scale-95 transition-all"
                  >
                    {isLending ? 'Discuss Lending' : 'Request Consultation'}
                  </Link>
                  
                  <div className="pt-8 border-t border-white/5 space-y-4">
                    {[
                      '30-minute discovery deep-dive',
                      'No commitment discovery',
                      'Transparent executor-led scoping'
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-xs text-slate-500 font-medium uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-copper-500/40" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>

      {/* Trust Quote Footer */}
      <section className="py-32 bg-surface/20 border-t border-white/5">
        <div className="container text-center">
          <p className="font-serif text-3xl md:text-4xl text-cream-100 max-w-4xl mx-auto italic leading-tight">
            &quot;FSE Accounting is built for high-growth teams who value clarity, speed, and precision in their financial operations.&quot;
          </p>
        </div>
      </section>
    </div>
  );
}
