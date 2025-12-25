import Link from 'next/link';
import { Metadata } from 'next';
import { CASE_STUDIES, CaseStudy } from '@/lib/caseStudies';

export const metadata: Metadata = {
  title: 'Case Studies | FSE Accounting',
  description: 'Real results from real clients. See how we help businesses fix their financial operations.',
};

const serviceLabels: Record<CaseStudy['service'], string> = {
  bookkeeping: 'Bookkeeping',
  lending: 'Lending',
  acquisitions: 'M&A',
  rdti: 'RDTI',
  cfo: 'CFO Advisory',
};

const serviceColors: Record<CaseStudy['service'], string> = {
  bookkeeping: 'bg-blue-50 text-blue-700',
  lending: 'bg-amber-50 text-amber-700',
  acquisitions: 'bg-purple-50 text-purple-700',
  rdti: 'bg-green-50 text-green-700',
  cfo: 'bg-rose-50 text-rose-700',
};

export default function CaseStudiesPage() {
  return (
    <main className="bg-cream">
      {/* Hero */}
      <section className="py-16 md:py-20">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="text-accent font-semibold mb-3">Case Studies</p>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6">
              Real results. Real clients.
            </h1>
            <p className="text-stone text-xl">
              See how we help businesses fix their financial operations—from cleaning up 
              messy books to closing multi-million dollar facilities.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="pb-20">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CASE_STUDIES.map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group bg-white rounded-xl border border-border overflow-hidden hover:border-charcoal transition-colors"
              >
                {/* Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${serviceColors[cs.service]}`}>
                      {serviceLabels[cs.service]}
                    </span>
                    {cs.featured && (
                      <span className="px-2 py-1 text-xs font-medium rounded bg-charcoal text-white">
                        Featured
                      </span>
                    )}
                  </div>
                  <h2 className="font-serif text-xl text-charcoal mb-3 group-hover:text-accent transition-colors">
                    {cs.title}
                  </h2>
                  <p className="text-stone text-sm line-clamp-3">
                    {cs.problem.substring(0, 150)}...
                  </p>
                </div>

                {/* Metrics */}
                <div className="px-6 py-4 bg-cream border-t border-border">
                  <div className="flex items-center justify-between">
                    {cs.outcomes.slice(0, 2).map((outcome, i) => (
                      <div key={i}>
                        <p className="font-serif text-lg text-charcoal">{outcome.value}</p>
                        <p className="text-xs text-stone">{outcome.metric}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Client info */}
                <div className="px-6 py-4 border-t border-border">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-charcoal">
                        {cs.client.name || cs.client.industry}
                      </p>
                      <p className="text-xs text-stone">{cs.client.size}</p>
                    </div>
                    <svg 
                      className="w-5 h-5 text-stone group-hover:text-accent group-hover:translate-x-1 transition-all" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-charcoal text-white">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl mb-4">
              Ready to become our next success story?
            </h2>
            <p className="text-warm-gray mb-8">
              Book a free diagnostic call. We'll look at your situation and tell you exactly 
              what we can achieve together.
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

