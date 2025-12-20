/**
 * PATH: frontend/src/app/(public)/terms/page.tsx
 * PURPOSE:
 *   - Basic terms of service page for the public website.
 *
 * ROLE IN ARCHITECTURE:
 *   - Trust / compliance layer (public web).
 *
 * MAIN EXPORTS:
 *   - TermsPage(): Route component.
 *
 * NON-RESPONSIBILITIES:
 *   - This file does NOT provide legal advice.
 *
 * NOTES FOR FUTURE AI:
 *   - Replace this draft with reviewed legal copy before major marketing spend.
 */

export default function TermsPage() {
  return (
    <>
      <section className="pt-32 pb-12 bg-gradient-to-br from-slate-900 via-slate-950 to-background">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-5xl text-cream-100 mb-6">Terms of Service</h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              These terms govern use of the FSE Accounting website. For service engagements, separate written
              agreements may apply.
            </p>
            <p className="mt-3 text-sm text-slate-500">Last updated: {new Date().toISOString().slice(0, 10)}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="max-w-3xl space-y-8 text-slate-400">
            <div>
              <h2 className="font-serif text-2xl text-cream-100 mb-3">Use of the website</h2>
              <p>
                You agree not to misuse the site, attempt unauthorised access, or interfere with normal operation.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-cream-100 mb-3">No professional advice</h2>
              <p>
                Website content is general information only and may not be appropriate for your circumstances.
                Contact us for tailored advice.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-cream-100 mb-3">Contact</h2>
              <p>
                Questions? Email{' '}
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
