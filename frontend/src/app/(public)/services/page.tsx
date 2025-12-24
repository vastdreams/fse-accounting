import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | FSE Accounting',
  description: 'Financial operations services for growth-stage businesses. Bookkeeping, lending advisory, M&A support, and more.',
};

const coreServices = [
  {
    title: 'Bookkeeping & Month-End Close',
    slug: 'bookkeeping',
    outcome: 'Books closed by day 5. Every month.',
    description: 'Stop chasing your accountant. We handle reconciliations, month-end close, management reporting, and cash flow tracking. You get clean numbers on time.',
    deliverables: [
      'Monthly close by day 5',
      'Bank & card reconciliations',
      'Management dashboard',
      'Cash position tracking',
    ],
    timeline: '2 weeks to onboard',
  },
  {
    title: 'Lending & Capital Advisory',
    slug: 'lending-advisory',
    outcome: 'Bank-ready pack in 2 weeks.',
    description: 'Banks keep asking for more documents? We build the financial model, debt schedules, and management pack that lenders actually need. Fewer questions, faster approval.',
    deliverables: [
      'Financial model (3-statement)',
      'Debt schedule & covenants',
      'Management presentation',
      'Lender Q&A support',
    ],
    timeline: '2-3 weeks',
  },
  {
    title: 'Acquisitions & Exits',
    slug: 'acquisitions-exits',
    outcome: 'Know what you\'re buying. Know what you\'re worth.',
    description: 'Financial due diligence that catches what audits miss. Quality of earnings, working capital analysis, normalized EBITDA. Whether buying or selling.',
    deliverables: [
      'Quality of earnings analysis',
      'Working capital review',
      'Normalized EBITDA',
      'Deal structure support',
    ],
    timeline: '2-4 weeks',
  },
];

const additionalServices = [
  {
    title: 'CFO Advisory',
    slug: 'cfo-advisory',
    description: 'Strategic finance support without the full-time cost. Board reporting, investor relations, financial strategy.',
  },
  {
    title: 'Financial Modelling',
    slug: 'financial-modelling',
    description: 'Custom models for fundraising, M&A, budgeting, or scenario planning. Built to your specs.',
  },
  {
    title: 'Tax Compliance',
    slug: 'tax-filing',
    description: 'BAS, IAS, annual returns, and tax planning. We handle the compliance so you can focus on growth.',
  },
];

export default function ServicesPage() {
  return (
    <main className="bg-cream">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-2xl">
            <p className="text-accent font-semibold mb-3">What we do</p>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6">
              Financial operations that actually move the needle.
            </h1>
            <p className="text-stone text-xl">
              We don't do annual audits or compliance-only work. We fix broken financial operations and build the infrastructure you need to grow, raise, or exit.
            </p>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="pb-16">
        <div className="container-wide">
          <div className="space-y-8">
            {coreServices.map((service, i) => (
              <div key={i} className="bg-white border border-border rounded-xl p-8 md:p-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-accent font-semibold mb-2">{service.outcome}</p>
                    <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-4">
                      {service.title}
                    </h2>
                    <p className="text-stone mb-6">
                      {service.description}
                    </p>
                    <Link
                      href="/contact"
                      className="btn-primary inline-flex"
                    >
                      Get started
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                  <div className="bg-cream rounded-lg p-6">
                    <p className="font-semibold text-charcoal mb-4">What you get:</p>
                    <ul className="space-y-3">
                      {service.deliverables.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-success flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-graphite">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 pt-4 border-t border-border">
                      <p className="text-sm text-stone">
                        <span className="font-medium text-charcoal">Timeline:</span> {service.timeline}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-warm-white">
        <div className="container-wide">
          <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-8">
            Additional services
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {additionalServices.map((service, i) => (
              <div key={i} className="card">
                <h3 className="font-semibold text-lg text-charcoal mb-2">
                  {service.title}
                </h3>
                <p className="text-stone mb-4">
                  {service.description}
                </p>
                <Link
                  href="/contact"
                  className="text-accent font-medium hover:text-accent-light transition-colors inline-flex items-center gap-1"
                >
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6">
              Not sure what you need?
            </h2>
            <p className="text-stone text-lg mb-8">
              Book a free diagnostic call. We'll look at your situation and tell you exactly what's needed — even if that means pointing you elsewhere.
            </p>
            <Link href="/contact" className="btn-primary inline-flex text-lg px-8 py-4">
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
