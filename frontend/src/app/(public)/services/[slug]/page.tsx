import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getServiceBySlug, SERVICES } from '@/lib/services';

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = getServiceBySlug(params.slug);
  if (!service) return { title: 'Service Not Found' };
  
  return {
    title: `${service.title} | FSE Accounting`,
    description: service.description,
  };
}

const processSteps = [
  { 
    step: '1', 
    title: 'Free Diagnostic', 
    description: '15-minute call to assess your situation and confirm the right approach.',
  },
  { 
    step: '2', 
    title: 'Focused Sprint', 
    description: '2-4 weeks of focused execution to deliver tangible outcomes.',
  },
  { 
    step: '3', 
    title: 'Ongoing Support', 
    description: 'Monthly retainer for continuous operations—only if you need it.',
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

  const relatedServices = SERVICES.filter(
    (s) => s.slug !== service.slug && s.isCoreOffer
  ).slice(0, 2);

  return (
    <main className="bg-cream">
      {/* Hero */}
      <section className="py-16 md:py-20">
        <div className="container-wide">
          {/* Breadcrumb */}
            <Link
              href="/services"
            className="inline-flex items-center text-sm text-stone hover:text-charcoal transition-colors mb-8"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Services
            </Link>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="flex items-start gap-4 mb-6">
                <span className="text-4xl">{service.icon}</span>
                <div>
                  {service.isCoreOffer && (
                    <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full mb-2">
                      Core Service
              </span>
                  )}
                  <h1 className="font-serif text-3xl md:text-4xl text-charcoal">
                    {service.title}
            </h1>
          </div>
        </div>

              {service.headline && (
                <p className="text-xl text-graphite font-medium mb-4">
                  {service.headline}
                </p>
              )}

              <p className="text-stone text-lg leading-relaxed mb-8">
                {service.description}
              </p>

              {/* What's Included */}
              <div className="mb-12">
                <h2 className="font-serif text-2xl text-charcoal mb-6">What&apos;s included</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {service.features.map((feature) => (
                    <div 
                      key={feature} 
                      className="flex items-start gap-3 p-4 bg-white rounded-lg border border-border"
                    >
                      <svg className="w-5 h-5 text-success flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-graphite">{feature}</span>
                    </div>
                  ))}
                </div>
                  </div>
                  
              {/* Outcomes */}
              {service.outcomes && service.outcomes.length > 0 && (
                <div className="mb-12">
                  <h2 className="font-serif text-2xl text-charcoal mb-6">What you&apos;ll achieve</h2>
                  <div className="bg-warm-white rounded-xl p-6 border border-border">
                    <ul className="space-y-4">
                      {service.outcomes.map((outcome) => (
                        <li key={outcome} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-graphite">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Process */}
              <div className="mb-12">
                <h2 className="font-serif text-2xl text-charcoal mb-6">How it works</h2>
                <div className="space-y-4">
                  {processSteps.map((step) => (
                    <div
                      key={step.step}
                      className="flex gap-4 p-5 bg-white rounded-lg border border-border"
                    >
                      <div className="w-10 h-10 rounded-full bg-charcoal text-white flex items-center justify-center font-serif flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-charcoal mb-1">{step.title}</h3>
                        <p className="text-stone text-sm">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Disclosures */}
              {(service.slug === 'lending' || service.slug === 'tax-filings') && (
                <div className="p-4 bg-warm-white rounded-lg border border-border">
                  <p className="text-sm text-stone">
                    {service.slug === 'lending' ? (
                      <>
                        <strong className="text-graphite">Note:</strong> FSE Accounting provides 
                        lender-ready financial pack preparation and coordination services. We are not 
                        a licensed credit provider or mortgage broker.
                      </>
                    ) : (
                      <>
                        <strong className="text-graphite">Note:</strong> Tax agent and BAS agent 
                        services are provided by a partner Registered Tax/BAS Agent.
                      </>
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* CTA Card */}
                <div className="bg-white rounded-xl border border-border p-6">
                  <h3 className="font-serif text-xl text-charcoal mb-3">
                    Ready to get started?
                  </h3>
                  <p className="text-stone text-sm mb-6">
                    Book a free diagnostic call. We&apos;ll assess your needs and recommend 
                    the right approach—no commitment required.
                  </p>
                  <Link
                    href={`/contact?service=${service.slug}`}
                    className="btn-primary w-full justify-center mb-4"
                  >
                    Book Free Diagnostic
              </Link>
                  <ul className="space-y-2">
                    {['15-minute call', 'No commitment', 'Clear next steps'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-stone">
                        <span className="w-1 h-1 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Related Services */}
                {relatedServices.length > 0 && (
                  <div className="bg-cream rounded-xl border border-border p-6">
                    <p className="text-xs font-semibold text-stone uppercase tracking-wide mb-4">
                      Related Services
                    </p>
                    <div className="space-y-3">
                      {relatedServices.map((related) => (
                        <Link
                          key={related.slug}
                          href={`/services/${related.slug}`}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition-colors"
                        >
                          <span className="text-xl">{related.icon}</span>
                          <div>
                            <p className="text-sm font-medium text-charcoal">{related.title}</p>
                            <p className="text-xs text-stone">{related.subtitle}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-charcoal text-white">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl mb-4">
              Not sure if this is right for you?
            </h2>
            <p className="text-warm-gray mb-8">
              Book a free diagnostic. We&apos;ll look at your situation and tell you exactly 
              what you need—even if it&apos;s not us.
            </p>
            <Link href="/contact" className="btn-primary inline-flex bg-white text-charcoal hover:bg-cream">
              Book Your Free Diagnostic
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
