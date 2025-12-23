/**
 * PATH: frontend/src/app/(public)/services/[slug]/page.tsx
 * PURPOSE: Service detail page - conversion-focused with clear outcomes
 * 
 * KEY ELEMENTS:
 * - Clear "What you get in the first 14 days"
 * - When to use this vs other services
 * - Specific outcomes
 * - Finance Triage CTA
 */

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getServiceBySlug, CORE_SERVICES } from '@/lib/services';

const processSteps = [
  { 
    step: '01', 
    title: 'Finance Triage', 
    desc: 'Free 15-30 min call to assess your situation and confirm the right approach.',
    duration: 'Day 0'
  },
  { 
    step: '02', 
    title: '14-Day Sprint', 
    desc: 'Focused execution to deliver immediate, tangible outcomes.',
    duration: 'Days 1-14'
  },
  { 
    step: '03', 
    title: 'Ongoing Support', 
    desc: 'Monthly retainer for continuous financial operations and reporting.',
    duration: 'Ongoing'
  },
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

  const isCoreOffer = service.isCoreOffer;
  const isTaxFilings = service.slug === 'tax-filings';
  const isLending = service.slug === 'lending';

  // Determine related core services to show
  const relatedCoreServices = CORE_SERVICES.filter(s => s.slug !== service.slug);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4" />
        
        <div className="container relative z-10">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/services"
              className="inline-flex items-center text-sm font-medium text-ink-500 hover:text-amber-500 transition-colors mb-10 group"
            >
              <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              All Services
            </Link>
          </motion.div>

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-start gap-6 mb-8"
            >
              <div className="w-16 h-16 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-4xl shrink-0">
                {service.icon}
              </div>
              <div>
                {isCoreOffer && (
                  <span className="badge mb-3">
                    Core Service • {service.subtitle}
                  </span>
                )}
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream-100 leading-[1.1] tracking-tight">
                  {service.title}
                </h1>
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl md:text-2xl text-ink-300 font-medium mb-4"
            >
              {service.headline || service.description}
            </motion.p>

            {service.headline && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-ink-400 leading-relaxed max-w-3xl"
              >
                {service.description}
              </motion.p>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-24">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-16">
              
              {/* What's Included */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-2xl md:text-3xl text-cream-100 mb-8 flex items-center gap-4">
                  <span className="w-8 h-px bg-amber-500/50" />
                  What's Included
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.features.map((feature, index) => (
                    <div 
                      key={feature} 
                      className="group p-5 rounded-xl border border-ink-700/50 bg-ink-900/30 hover:bg-ink-800/40 hover:border-amber-500/20 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-ink-800 border border-ink-700 flex items-center justify-center group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-all">
                          <span className="text-amber-500 font-bold text-sm">✓</span>
                        </div>
                        <span className="text-cream-100 font-medium">{feature}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Outcomes - For Core Offers */}
              {service.outcomes && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-display text-2xl md:text-3xl text-cream-100 mb-8 flex items-center gap-4">
                    <span className="w-8 h-px bg-amber-500/50" />
                    What You'll Achieve
                  </h2>
                  <div className="p-8 rounded-2xl border border-amber-500/20 bg-amber-500/5">
                    <ul className="space-y-4">
                      {service.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-4">
                          <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                            <svg className="w-3.5 h-3.5 text-ink-950" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-lg text-cream-100">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {/* Sprint Info - For Core Offers */}
              {service.sprintName && (
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl border border-ink-700/50 bg-ink-900/40"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold tracking-wider uppercase text-amber-400">
                      14-Day Sprint
                    </span>
                  </div>
                  <h3 className="font-display text-2xl text-cream-100 mb-3">
                    {service.sprintName}
                  </h3>
                  <p className="text-ink-400 leading-relaxed mb-6">
                    Get tangible results in 14 days. We'll focus intensively on delivering 
                    immediate outcomes, then discuss ongoing support based on what you actually need.
                  </p>
                  <Link href="/contact" className="btn btn-primary">
                    Start with a Sprint
                  </Link>
                </motion.div>
              )}

              {/* Disclosures */}
              {(isLending || isTaxFilings) && (
                <motion.div 
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl border border-ink-700/50 bg-ink-900/30"
                >
                  <p className="text-sm text-ink-400 leading-relaxed">
                    {isLending ? (
                      <>
                        <strong className="text-ink-300">Important:</strong> FSE Accounting provides 
                        lender-ready financial pack preparation and coordination services. We are not 
                        a licensed credit provider or mortgage broker. We help you prepare numbers 
                        and manage lender Q&A—your chosen lender/broker handles the actual facility.
                      </>
                    ) : (
                      <>
                        <strong className="text-ink-300">Note:</strong> Tax agent and BAS agent 
                        services are provided by a partner Registered Tax/BAS Agent. FSE Accounting 
                        manages the workflow and client portal.
                      </>
                    )}
                  </p>
                </motion.div>
              )}

              {/* The Process */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-2xl md:text-3xl text-cream-100 mb-8 flex items-center gap-4">
                  <span className="w-8 h-px bg-amber-500/50" />
                  How It Works
                </h2>
                <div className="space-y-4">
                  {processSteps.map((step, index) => (
                    <div 
                      key={step.step} 
                      className="relative p-6 rounded-xl border border-ink-700/50 bg-ink-900/30 hover:border-ink-600 transition-colors"
                    >
                      <div className="flex items-start gap-5">
                        <div className="w-12 h-12 rounded-xl bg-ink-800 border border-ink-700 flex items-center justify-center shrink-0">
                          <span className="font-display font-bold text-amber-500">{step.step}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-display text-lg text-cream-100">{step.title}</h3>
                            <span className="px-2 py-0.5 rounded text-xs font-medium bg-ink-800 text-ink-400 border border-ink-700">
                              {step.duration}
                            </span>
                          </div>
                          <p className="text-ink-400">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Sidebar - Sticky CTA */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* Main CTA Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="p-8 rounded-2xl border border-ink-700/50 bg-ink-900/50 backdrop-blur"
                >
                  <h3 className="font-display text-xl text-cream-100 mb-4">
                    Ready to get started?
                  </h3>
                  <p className="text-ink-400 mb-6 leading-relaxed">
                    Book a free Finance Triage call. We'll assess your needs and recommend 
                    the right approach—no commitment required.
                  </p>
                  
                  <Link
                    href={`/contact?service=${service.slug}`}
                    className="btn btn-primary w-full justify-center mb-4"
                  >
                    Book Free Triage Call
                  </Link>
                  
                  <div className="space-y-3 pt-4 border-t border-ink-700/50">
                    {[
                      '15-30 minute call',
                      'No commitment',
                      'Clear next steps',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-ink-500">
                        <span className="w-1 h-1 rounded-full bg-amber-500/50" />
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Related Core Services */}
                {relatedCoreServices.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="p-6 rounded-xl border border-ink-800/50 bg-ink-900/30"
                  >
                    <p className="text-xs font-medium tracking-wide uppercase text-ink-500 mb-4">
                      Related Services
                    </p>
                    <div className="space-y-3">
                      {relatedCoreServices.slice(0, 2).map((related) => (
                        <Link
                          key={related.slug}
                          href={`/services/${related.slug}`}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-ink-800/50 transition-colors group"
                        >
                          <span className="text-xl">{related.icon}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-cream-100 group-hover:text-amber-400 transition-colors">
                              {related.title}
                            </div>
                            <div className="text-xs text-ink-500 truncate">
                              {related.subtitle}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
