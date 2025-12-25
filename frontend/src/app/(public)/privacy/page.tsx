import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | FSE Accounting',
  description: 'How FSE Accounting collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
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

          <h1 className="font-serif text-4xl text-charcoal mb-4">Privacy Policy</h1>
          <p className="text-stone mb-8">Last updated: December 2024</p>

          <div className="prose prose-stone max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="font-serif text-2xl text-charcoal mb-3">Information we collect</h2>
                <p className="text-stone leading-relaxed">
                  We collect information you provide directly, such as your name, email address, 
                  phone number, and company details when you contact us or use our services. 
                  We also automatically collect certain technical information when you visit our website.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-charcoal mb-3">How we use your information</h2>
                <p className="text-stone leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-stone space-y-2">
                  <li>Provide and improve our services</li>
                  <li>Communicate with you about our services</li>
                  <li>Send you relevant updates and marketing communications (with your consent)</li>
                  <li>Analyze website usage and improve user experience</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-charcoal mb-3">Information sharing</h2>
                <p className="text-stone leading-relaxed">
                  We do not sell your personal information. We may share your information with 
                  trusted service providers who assist us in operating our business, and with 
                  professional advisors as necessary. We may also disclose information when 
                  required by law.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-charcoal mb-3">Data security</h2>
                <p className="text-stone leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your 
                  personal information against unauthorized access, alteration, disclosure, or 
                  destruction.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-charcoal mb-3">Your rights</h2>
                <p className="text-stone leading-relaxed">
                  You have the right to access, correct, or delete your personal information. 
                  You may also opt out of marketing communications at any time. To exercise 
                  these rights, please contact us using the details below.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-2xl text-charcoal mb-3">Contact us</h2>
                <p className="text-stone leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us at{' '}
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
