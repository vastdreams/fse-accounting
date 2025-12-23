/**
 * PATH: frontend/src/components/Footer.tsx
 * PURPOSE: Global site footer - updated for new design system
 */

import Link from 'next/link';

const footerLinks = {
  coreServices: [
    { href: '/services/bookkeeping', label: 'Bookkeeping' },
    { href: '/services/lending', label: 'Lending Advisory' },
    { href: '/services/acquisitions', label: 'Acquisitions & Exits' },
  ],
  moreServices: [
    { href: '/services/cfo-services', label: 'CFO Advisory' },
    { href: '/services/financial-modelling', label: 'Financial Modelling' },
    { href: '/services/tax-filings', label: 'Tax Filings' },
    { href: '/services', label: 'All Services →' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Book a Triage Call' },
    { href: '/login', label: 'Client Login' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-ink-900 border-t border-ink-800/50">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                <span className="text-sm font-display font-bold text-ink-950">F</span>
              </div>
              <span className="text-base font-display font-semibold text-cream-100">
                FSE Accounting
              </span>
            </Link>
            <p className="text-sm text-ink-400 leading-relaxed mb-6 max-w-xs">
              Growth-stage accounting and advisory. Clean books, bankable numbers, 
              deal-ready decisions.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 text-sm font-medium text-amber-500 hover:text-amber-400 transition-colors"
            >
              Book a Finance Triage
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-xs font-semibold text-cream-100 uppercase tracking-[0.15em] mb-4">
              Core Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.coreServices.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Services */}
          <div>
            <h4 className="text-xs font-semibold text-cream-100 uppercase tracking-[0.15em] mb-4">
              More Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.moreServices.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-cream-100 uppercase tracking-[0.15em] mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-4 border-t border-ink-800/50">
              <p className="text-xs text-ink-500 mb-1">Email</p>
              <a 
                href="mailto:hello@fseaccounting.com" 
                className="text-sm text-ink-400 hover:text-amber-400 transition-colors"
              >
                hello@fseaccounting.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-ink-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-ink-500">
            © {new Date().getFullYear()} FSE Accounting and Advisory. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ink-500 hover:text-ink-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
