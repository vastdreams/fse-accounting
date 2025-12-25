import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white py-16">
      <div className="container-wide">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 bg-white text-charcoal rounded flex items-center justify-center font-serif text-lg">
                F
              </span>
              <span className="font-semibold">FSE</span>
            </Link>
            <p className="text-warm-gray max-w-sm mb-6">
              Financial operations for growth-stage businesses. Clean books, bank-ready numbers, deal-ready decisions.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-white hover:text-accent-light transition-colors font-medium"
            >
              Book a Free Diagnostic Call
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-3 text-warm-gray">
              <li>
                <Link href="/services/bookkeeping" className="hover:text-white transition-colors">
                  Bookkeeping
                </Link>
              </li>
              <li>
                <Link href="/services/lending" className="hover:text-white transition-colors">
                  Lending Advisory
                </Link>
              </li>
              <li>
                <Link href="/services/acquisitions" className="hover:text-white transition-colors">
                  Acquisitions & Exits
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-warm-gray">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Client Login
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-sm text-warm-gray mb-1">Email</p>
              <a href="mailto:hello@fseaccounting.com" className="hover:text-accent-light transition-colors">
                hello@fseaccounting.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-warm-gray">
          <p>© {new Date().getFullYear()} FSE Accounting. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
