/**
 * PATH: frontend/src/app/(public)/privacy/page.tsx
 * PURPOSE:
 *   - Basic privacy policy page for the public website.
 *
 * ROLE IN ARCHITECTURE:
 *   - Trust / compliance layer (public web).
 *
 * MAIN EXPORTS:
 *   - PrivacyPage(): Route component.
 *
 * NON-RESPONSIBILITIES:
 *   - This file does NOT provide legal advice.
 *
 * NOTES FOR FUTURE AI:
 *   - Replace this draft with reviewed legal copy before major marketing spend.
 */

export default function PrivacyPage() {
  return (
    <>
      <section className="pt-32 pb-12 bg-gradient-to-br from-slate-900 via-slate-950 to-background">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl text-cream-100 mb-6">Privacy Policy</h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              This page explains how we collect and use information when you use the FSE Accounting website.
            </p>
            <p className="mt-3 text-sm text-slate-500">Last updated: {new Date().toISOString().slice(0, 10)}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="max-w-3xl space-y-8 text-slate-400">
            <div>
              <h2 className="font-serif text-2xl text-cream-100 mb-3">Information we collect</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>Contact details you submit via forms (name, email, message).</li>
                <li>Basic technical data (IP address, browser type, pages visited) for security and analytics.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-cream-100 mb-3">How we use it</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>To respond to enquiries and provide services you request.</li>
                <li>To operate, secure, and improve the website and client portal.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-cream-100 mb-3">Contact</h2>
              <p>
                If you have questions, email{' '}
                <a className="text-copper-400 hover:text-copper-300" href="mailto:hello@fseaccounting.com">
                  hello@fseaccounting.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
