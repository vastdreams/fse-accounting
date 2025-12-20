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
      <section className="pt-32 pb-12 bg-gradient-to-br from-slate-900 via-slate-950 to-background">
        <div className="container">
          <div className="max-w-3xl">
            <Link
              href="/services"
              className="text-sm text-slate-400 hover:text-cream-100 transition-colors"
            >
              ← Back to services
            </Link>
            <h1 className="mt-6 font-serif text-4xl md:text-5xl text-cream-100 mb-6">
              <span className="mr-3" aria-hidden>
                {service.icon}
              </span>
              {service.title}
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">{service.description}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2">
              <h2 className="font-serif text-2xl md:text-3xl text-cream-100 mb-4">What’s included</h2>
              <ul className="space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-slate-400">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-copper-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {isLending && (
                <div className="mt-8 rounded-2xl border border-copper-500/30 bg-copper-500/5 p-6">
                  <h3 className="font-serif text-xl text-cream-100 mb-2">How lending support works</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    We help you prepare lender-ready financials, package an application, coordinate lender Q&A, and
                    set up covenant reporting post-settlement. We are not a lender.
                  </p>
                  <div className="mt-4">
                    <Link href="/contact?service=lending" className="btn btn-primary">
                      Discuss lending
                    </Link>
                  </div>
                </div>
              )}

              {isTaxFilings && (
                <div className="mt-8 rounded-2xl border border-border-subtle bg-surface p-6">
                  <h3 className="font-serif text-xl text-cream-100 mb-2">How lodgement works</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    For work that requires a Registered Tax/BAS Agent (including lodgement), the tax agent
                    service is performed by a partner Registered Tax/BAS Agent. FSE manages the workflow,
                    communications, and client portal. The responsible agent will be identified in your
                    engagement documentation.
                  </p>
                </div>
              )}
            </div>

            <aside className="bg-surface rounded-2xl border border-border-subtle p-6">
              <h3 className="font-serif text-xl text-cream-100 mb-3">Talk to us</h3>
              <p className="text-sm text-slate-400 mb-5">
                Tell us what you&apos;re trying to achieve and we&apos;ll recommend the right scope.
              </p>
              <Link
                href={isLending ? '/contact?service=lending' : '/contact'}
                className="btn btn-primary w-full"
              >
                {isLending ? 'Discuss lending' : 'Book a consultation'}
              </Link>
              <p className="text-xs text-slate-500 mt-3 text-center">30-minute discovery call · No commitment</p>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
