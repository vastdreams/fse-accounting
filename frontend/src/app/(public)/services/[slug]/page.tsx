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

import Link from 'next/link';
import { notFound } from 'next/navigation';

import { SERVICES, getServiceBySlug } from '@/lib/services';

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

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
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-900 via-slate-950 to-background overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-copper-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl">
            <Link
              href="/services"
              className="inline-flex items-center text-sm text-slate-400 hover:text-copper-400 transition-colors mb-8 group"
            >
              <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
              Back to services
            </Link>
            
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-copper-500/10 border border-copper-500/20 flex items-center justify-center text-4xl shadow-lg shadow-copper-500/5">
                {service.icon}
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream-100 tracking-tight">
                {service.title}
              </h1>
            </div>
            
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl font-light">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-12">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl text-cream-100 mb-8 flex items-center gap-3">
                  <span className="w-8 h-px bg-copper-500/50" />
                  What’s included
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {service.features.map((feature) => (
                    <div 
                      key={feature} 
                      className="flex items-start gap-4 p-4 rounded-xl border border-border-subtle bg-surface/50 hover:bg-surface transition-colors group"
                    >
                      <div className="mt-1 w-5 h-5 rounded-full bg-copper-500/10 border border-copper-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-copper-500/20 transition-colors">
                        <span className="text-[10px] text-copper-400">✓</span>
                      </div>
                      <span className="text-slate-300 font-medium leading-tight">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {(isLending || isTaxFilings) && (
                <div className="relative p-8 rounded-2xl border border-copper-500/20 bg-gradient-to-br from-copper-500/[0.03] to-transparent overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    {service.icon}
                  </div>
                  
                  <h3 className="font-serif text-xl text-cream-100 mb-4">
                    {isLending ? 'How lending support works' : 'How lodgement works'}
                  </h3>
                  
                  <p className="text-slate-400 leading-relaxed max-w-3xl">
                    {isLending ? (
                      <>
                        We help you prepare lender-ready financials, package an application, coordinate lender Q&A, and
                        set up covenant reporting post-settlement. <strong>Note: We are not a lender.</strong> We bridge the gap between 
                        your business operations and institutional credit requirements.
                      </>
                    ) : (
                      <>
                        For work that requires a Registered Tax/BAS Agent (including lodgement), the tax agent
                        service is performed by a partner Registered Tax/BAS Agent. FSE Accounting manages the workflow,
                        communications, and client portal. The responsible agent will be identified in your
                        engagement documentation.
                      </>
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar CTA */}
            <aside className="lg:col-span-4 sticky top-32">
              <div className="card p-8 border-copper-500/20 bg-slate-900/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-copper-500/5 rounded-full blur-3xl" />
                
                <h3 className="font-serif text-2xl text-cream-100 mb-4 relative z-10">Get started</h3>
                <p className="text-slate-400 mb-8 relative z-10 leading-relaxed">
                  Tell us what you&apos;re trying to achieve and we&apos;ll recommend the right scope for your business.
                </p>
                
                <div className="space-y-4 relative z-10">
                  <Link
                    href={isLending ? '/contact?service=lending' : `/contact?service=${service.slug}`}
                    className="btn btn-primary w-full py-4 text-center text-lg shadow-lg shadow-copper-500/10"
                  >
                    {isLending ? 'Discuss lending' : 'Request Consultation'}
                  </Link>
                  
                  <div className="pt-4 border-t border-border-subtle flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="w-1 h-1 rounded-full bg-copper-500" />
                      30-minute discovery call
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="w-1 h-1 rounded-full bg-copper-500" />
                      No commitment required
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="w-1 h-1 rounded-full bg-copper-500" />
                      Clear, transparent scope
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
