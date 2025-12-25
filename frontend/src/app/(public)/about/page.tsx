import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | FSE Accounting',
  description: 'A modern accounting firm built by operators, for operators. Clean books, bank-ready numbers, deal-ready decisions.',
};

const principles = [
  {
    title: 'Fix it fast',
    description: "We don't do 6-month engagements to tell you what you already know. We diagnose quickly, act decisively, and deliver results in weeks.",
  },
  {
    title: 'Tell the truth',
    description: "We'll tell you what's broken, even if it's uncomfortable. No sugarcoating, no billable busywork. Just honest answers.",
  },
  {
    title: 'Operators first',
    description: "We've built businesses. We know what it's like to stare at a bank balance at 2am. Our advice comes from experience, not textbooks.",
  },
  {
    title: 'Bank-ready or bust',
    description: "Every piece of work we deliver is built to withstand scrutiny—from lenders, investors, acquirers, or your board.",
  },
];

const stats = [
  { value: 'Day 5', label: 'Close cadence (target)' },
  { value: '14 days', label: 'Lender pack sprint' },
  { value: '2–4 wks', label: 'Diligence sprint' },
  { value: '15 min', label: 'Diagnostic call' },
];

export default function AboutPage() {
  return (
    <main className="bg-cream">
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-accent font-semibold mb-3">About FSE</p>
            <h1 className="font-serif text-4xl md:text-5xl text-charcoal mb-6 leading-tight">
              We fix broken financial operations.
            </h1>
            <p className="text-stone text-xl leading-relaxed">
              No fluff. No 100-page reports. Just clean books, bank-ready numbers, 
              and the financial infrastructure you need to grow, raise, or exit.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-white border-y border-border">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6">
                Built by operators, for operators.
              </h2>
              <div className="space-y-4 text-stone">
                <p>
                  FSE Accounting exists because we got tired of the same story: 
                  business owners waiting months for financials, scrambling before 
                  bank meetings, and flying blind on cash.
                </p>
                <p>
                  We've been on the other side of the table. We've built businesses, 
                  raised capital, and navigated acquisitions. We know what good financial 
                  operations look like—and we know most accounting firms don't deliver it.
                </p>
                <p>
                  So we built something different. A firm that treats your books like 
                  a product, not an afterthought. That closes month-end in days, not weeks. 
                  That prepares you for the bank before you need to ask.
                </p>
              </div>
            </div>
            <div className="bg-cream rounded-xl p-8 border border-border">
              <p className="font-serif text-2xl text-charcoal mb-4 leading-relaxed">
                "Most accounting firms are reactive. We're proactive. 
                By the time you need something, it should already be done."
              </p>
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-charcoal text-white flex items-center justify-center font-serif text-lg">
                  F
                </div>
                <div>
                  <p className="font-semibold text-charcoal">FSE Accounting</p>
                  <p className="text-stone text-sm">Sydney, Australia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-serif text-3xl md:text-4xl text-charcoal mb-1">{stat.value}</p>
                <p className="text-stone text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-16 bg-charcoal text-white">
        <div className="container-wide">
          <div className="max-w-2xl mb-12">
            <p className="text-accent-light font-semibold mb-3">How we operate</p>
            <h2 className="font-serif text-3xl md:text-4xl mb-4">
              Four principles. Zero exceptions.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {principles.map((principle, i) => (
              <div key={i} className="border-t border-white/20 pt-6">
                <h3 className="font-serif text-xl mb-3">{principle.title}</h3>
                <p className="text-warm-gray">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="py-16">
        <div className="container-wide">
          <div className="max-w-2xl mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              Who we work with
            </h2>
            <p className="text-stone">
              We're not for everyone. Here's who gets the most value from working with us.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Growth-stage businesses',
                description: "Doing $1M-$20M revenue, outgrowing the bookkeeper but not ready for a full-time CFO.",
              },
              {
                title: 'Founders raising capital',
                description: "Need bank-ready financials and someone who speaks lender. No more back-and-forth.",
              },
              {
                title: 'Operators buying or selling',
                description: "Need financial due diligence you can trust, not just an audit tick-box.",
              },
            ].map((item, i) => (
              <div key={i} className="card">
                <div className="w-10 h-10 rounded-full bg-cream flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-charcoal mb-2">{item.title}</h3>
                <p className="text-stone">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-warm-white">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6">
              Ready to fix your financials?
            </h2>
            <p className="text-stone text-lg mb-8">
              Book a free diagnostic call. 15 minutes, no pitch. We'll tell you exactly 
              what's broken and what it takes to fix it.
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
