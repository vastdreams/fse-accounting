import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | FSE Accounting',
  description: 'Terms and conditions for using FSE Accounting services and website.',
};

export default function TermsPage() {
  return (
    <main className="bg-cream min-h-screen">
      <section className="py-16 md:py-20">
        <div className="container-narrow">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-stone hover:text-charcoal transition-colors mb-8"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>

          <h1 className="font-serif text-4xl text-charcoal mb-4">Terms of Service</h1>
          <p className="text-stone mb-8">Last updated: December 2024</p>

          <div className="prose prose-stone max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="font-serif text-2xl text-charcoal mb-3">Use of the website</h2>
                <p className="text-stone leading-relaxed">
                  By accessing and using this website, you agree to be bound by these terms. 
                  The content on this website is for general information purposes only and does 
                  not constitute professional advice. You should seek independent professional 
                  advice before making any financial decisions.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-charcoal mb-3">No professional advice</h2>
                <p className="text-stone leading-relaxed">
                  The information provided on this website and through our services is general 
                  in nature. It does not take into account your personal objectives, financial 
                  situation, or needs. Before acting on any information, you should consider 
                  its appropriateness and seek independent professional advice.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-charcoal mb-3">Service engagements</h2>
                <p className="text-stone leading-relaxed">
                  All service engagements are governed by a separate engagement letter or 
                  service agreement. The terms of that agreement will prevail in the event 
                  of any inconsistency with these terms.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-charcoal mb-3">Intellectual property</h2>
                <p className="text-stone leading-relaxed">
                  All content on this website, including text, graphics, logos, and software, 
                  is the property of FSE Accounting or its licensors and is protected by 
                  intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-charcoal mb-3">Limitation of liability</h2>
                <p className="text-stone leading-relaxed">
                  To the maximum extent permitted by law, FSE Accounting excludes all liability 
                  for any loss or damage arising from your use of this website or reliance on 
                  any information contained on it.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-charcoal mb-3">Third-party links</h2>
                <p className="text-stone leading-relaxed">
                  This website may contain links to third-party websites. We are not responsible 
                  for the content or privacy practices of those websites.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-charcoal mb-3">Contact</h2>
                <p className="text-stone leading-relaxed">
                  If you have any questions about these Terms, please contact us at{' '}
                  <a href="mailto:hello@fseaccounting.com" className="text-accent hover:underline">
                    hello@fseaccounting.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
