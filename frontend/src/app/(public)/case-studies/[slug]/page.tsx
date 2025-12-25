import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCaseStudyBySlug, CASE_STUDIES, CaseStudy } from '@/lib/caseStudies';

export async function generateStaticParams() {
  return CASE_STUDIES.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const cs = getCaseStudyBySlug(params.slug);
  if (!cs) return { title: 'Case Study Not Found' };
  
  return {
    title: `${cs.title} | FSE Accounting`,
    description: cs.problem.substring(0, 160),
  };
}

const serviceLabels: Record<CaseStudy['service'], string> = {
  bookkeeping: 'Bookkeeping',
  lending: 'Lending Advisory',
  acquisitions: 'M&A / Due Diligence',
  rdti: 'RDTI Compliance',
  cfo: 'CFO Advisory',
};

export default function CaseStudyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const cs = getCaseStudyBySlug(params.slug);

  if (!cs) {
    notFound();
  }

  return (
    <main className="bg-cream">
      {/* Hero */}
      <section className="py-16 md:py-20">
        <div className="container-wide">
          {/* Breadcrumb */}
          <Link
            href="/case-studies"
            className="inline-flex items-center text-sm text-stone hover:text-charcoal transition-colors mb-8"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Case Studies
          </Link>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full">
                {serviceLabels[cs.service]}
              </span>
              <span className="text-stone text-sm">{cs.timeline}</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal mb-6">
              {cs.title}
            </h1>
            
            {/* Client snapshot */}
            <div className="flex flex-wrap gap-4 text-sm text-stone">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {cs.client.industry}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {cs.client.size}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {cs.client.location}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes highlight */}
      <section className="py-12 bg-white border-y border-border">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {cs.outcomes.map((outcome, i) => (
              <div key={i} className="text-center">
                <p className="font-serif text-3xl md:text-4xl text-charcoal mb-1">{outcome.value}</p>
                <p className="text-stone text-sm">{outcome.metric}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-wide">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main content */}
            <div className="lg:col-span-8 space-y-12">
              {/* The Problem */}
              <div>
                <h2 className="font-serif text-2xl text-charcoal mb-4">The Challenge</h2>
                <p className="text-stone leading-relaxed">{cs.problem}</p>
              </div>

              {/* Our Approach */}
              <div>
                <h2 className="font-serif text-2xl text-charcoal mb-4">Our Approach</h2>
                <ul className="space-y-3">
                  {cs.approach.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-charcoal text-white flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-stone">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables */}
              <div>
                <h2 className="font-serif text-2xl text-charcoal mb-4">What We Delivered</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {cs.deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-border">
                      <svg className="w-5 h-5 text-success flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-graphite text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial */}
              {cs.testimonial && (
                <div className="bg-warm-white rounded-xl p-8 border border-border">
                  <svg className="w-8 h-8 text-accent mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <blockquote className="font-serif text-xl text-charcoal mb-6 leading-relaxed">
                    "{cs.testimonial.quote}"
                  </blockquote>
                  <div>
                    <p className="font-semibold text-charcoal">{cs.testimonial.author}</p>
                    <p className="text-stone text-sm">{cs.testimonial.role}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* CTA Card */}
                <div className="bg-white rounded-xl border border-border p-6">
                  <h3 className="font-serif text-xl text-charcoal mb-3">
                    Want similar results?
                  </h3>
                  <p className="text-stone text-sm mb-6">
                    Book a free diagnostic call. We'll assess your situation and tell you 
                    exactly what we can achieve together.
                  </p>
                  <Link
                    href={`/contact?service=${cs.service}`}
                    className="btn-primary w-full justify-center"
                  >
                    Book Free Diagnostic
                  </Link>
                </div>

                {/* Related case studies */}
                <div className="bg-cream rounded-xl border border-border p-6">
                  <p className="text-xs font-semibold text-stone uppercase tracking-wide mb-4">
                    More Case Studies
                  </p>
                  <div className="space-y-3">
                    {CASE_STUDIES.filter((c) => c.slug !== cs.slug)
                      .slice(0, 2)
                      .map((related) => (
                        <Link
                          key={related.slug}
                          href={`/case-studies/${related.slug}`}
                          className="block p-3 rounded-lg hover:bg-white transition-colors"
                        >
                          <p className="text-sm font-medium text-charcoal mb-1 line-clamp-2">
                            {related.title}
                          </p>
                          <p className="text-xs text-stone">
                            {serviceLabels[related.service]} • {related.client.industry}
                          </p>
                        </Link>
                      ))}
                  </div>
                </div>
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
              Ready to fix your financial operations?
            </h2>
            <p className="text-warm-gray mb-8">
              Book a free diagnostic call. 15 minutes, no pitch. We'll tell you exactly 
              what's broken and what it takes to fix it.
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

