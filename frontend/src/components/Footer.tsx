/**
 * PATH: frontend/src/components/Footer.tsx
 * PURPOSE:
 *   - Global site footer for public, portal, and admin routes.
 *
 * ROLE IN ARCHITECTURE:
 *   - UI shell component (navigation/footer layer).
 *
 * MAIN EXPORTS:
 *   - Footer(): React component.
 *
 * NON-RESPONSIBILITIES:
 *   - This file does NOT handle:
 *     - Routing logic beyond rendering links
 *     - Auth / session checks
 *
 * NOTES FOR FUTURE AI:
 *   - Keep footer links aligned with real routes (avoid 404s).
 *   - Avoid unverifiable marketing claims.
 */

import Link from 'next/link';

const footerLinks = {
  services: [
    { href: '/services/lending', label: 'Lending Advisory' },
    { href: '/services/bookkeeping', label: 'Bookkeeping' },
    { href: '/services/tax-filings', label: 'Tax Filings' },
    { href: '/services/cfo-services', label: 'CFO Services' },
    { href: '/services/financial-modelling', label: 'Financial Modelling' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ],
  legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border-subtle">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-copper-500 flex items-center justify-center">
                <span className="text-xl font-serif font-bold text-background">F</span>
              </div>
              <div>
                <span className="text-lg font-medium text-cream-100">FSE Accounting</span>
                <span className="text-xs text-slate-400 block -mt-1">Accounting &amp; Advisory</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Accounting, tax and CFO advisory for growing businesses.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-cream-100 uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-copper-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-cream-100 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-copper-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-cream-100 uppercase tracking-wider mb-4">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <p>Australia</p>
              <p>
                <a href="mailto:hello@fseaccounting.com" className="hover:text-copper-400 transition-colors">
                  hello@fseaccounting.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} FSE Accounting and Advisory. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-500 hover:text-slate-400 transition-colors"
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

