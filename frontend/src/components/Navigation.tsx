/**
 * PATH: frontend/src/components/Navigation.tsx
 * PURPOSE:
 *   - Primary navigation for the FSE Accounting frontend.
 *
 * ROLE IN ARCHITECTURE:
 *   - UI shell component (navigation layer).
 *
 * MAIN EXPORTS:
 *   - Navigation(): React component.
 *
 * NON-RESPONSIBILITIES:
 *   - This file does NOT handle:
 *     - Auth decisions (it only renders links)
 *
 * NOTES FOR FUTURE AI:
 *   - Keep top-nav focused on revenue-driving routes.
 *   - Avoid adding links to non-existent pages.
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES } from '@/lib/services';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services/cfo-services', label: 'CFO' },
  { href: '/services/bookkeeping', label: 'Bookkeeping' },
  { href: '/services/lending', label: 'Lending' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border-subtle">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-copper-500 flex items-center justify-center">
              <span className="text-xl font-serif font-bold text-background">F</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-medium text-cream-100 block leading-none">FSE Accounting</span>
              <span className="text-[10px] text-slate-400 block mt-1 uppercase tracking-wider">Accounting &amp; Advisory</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-400 hover:text-cream-100 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                onMouseEnter={() => setIsServicesOpen(true)}
                className="flex items-center gap-1 text-sm text-slate-400 hover:text-cream-100 transition-colors"
              >
                Services
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseLeave={() => setIsServicesOpen(false)}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] bg-slate-900 border border-border-subtle rounded-2xl p-6 shadow-2xl backdrop-blur-xl"
                  >
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                      {SERVICES.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          onClick={() => setIsServicesOpen(false)}
                          className="group flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <span className="text-xl">{service.icon}</span>
                          <div>
                            <div className="text-sm font-medium text-cream-100 group-hover:text-copper-400 transition-colors">
                              {service.title}
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                              {service.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t border-border-subtle">
                      <Link 
                        href="/services" 
                        onClick={() => setIsServicesOpen(false)}
                        className="text-xs text-copper-400 hover:text-copper-300 transition-colors font-medium uppercase tracking-wider"
                      >
                        View all services →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/about" className="text-sm text-slate-400 hover:text-cream-100 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm text-slate-400 hover:text-cream-100 transition-colors">
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden xl:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm text-slate-400 hover:text-cream-100 transition-colors"
            >
              Client Login
            </Link>
            <Link href="/contact" className="btn btn-primary text-sm py-2.5 px-5 whitespace-nowrap">
              Book a Free Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 text-slate-400 hover:text-cream-100"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-surface border-b border-border-subtle overflow-y-auto max-h-[80vh]"
          >
            <div className="container py-6 space-y-6">
              <div className="space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-lg text-slate-400 hover:text-cream-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                
                {/* Mobile Services */}
                <div className="space-y-3 pt-2">
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Services</p>
                  <div className="grid grid-cols-1 gap-3">
                    {SERVICES.map((service) => (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 text-slate-400 hover:text-cream-100 transition-colors"
                      >
                        <span className="text-lg">{service.icon}</span>
                        <span className="text-sm">{service.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className="block text-lg text-slate-400 hover:text-cream-100 transition-colors pt-2"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block text-lg text-slate-400 hover:text-cream-100 transition-colors"
                >
                  Contact
                </Link>
              </div>

              <div className="pt-6 border-t border-border-subtle space-y-4">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-slate-400 hover:text-cream-100 transition-colors"
                >
                  Client Login
                </Link>
                <Link href="/contact" onClick={() => setIsOpen(false)} className="btn btn-primary w-full">
                  Book a Free Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

