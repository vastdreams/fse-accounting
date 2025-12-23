/**
 * PATH: frontend/src/components/Navigation.tsx
 * PURPOSE: Primary navigation - focused on conversion to 3 core offers
 * 
 * NAV STRUCTURE:
 * - Primary: Bookkeeping / Lending / Deals (Acquisition & Exit)
 * - Secondary: Services dropdown (all services)
 * - CTA: "Book Finance Triage"
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES, CORE_SERVICES, getSupportingServices } from '@/lib/services';

const primaryNavLinks = [
  { href: '/services/bookkeeping', label: 'Bookkeeping' },
  { href: '/services/lending', label: 'Lending' },
  { href: '/services/acquisitions', label: 'Deals' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const supportingServices = getSupportingServices();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-ink-800/50">
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <span className="text-sm font-display font-bold text-ink-950">F</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-base font-display font-semibold text-cream-100 leading-none">
                FSE Accounting
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Primary Links - Core Offers */}
            {primaryNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-ink-400 hover:text-cream-100 transition-colors rounded-lg hover:bg-ink-800/50"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Services Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                onMouseEnter={() => setIsServicesOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-ink-400 hover:text-cream-100 transition-colors rounded-lg hover:bg-ink-800/50"
              >
                All Services
                <svg 
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} 
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
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    onMouseLeave={() => setIsServicesOpen(false)}
                    className="absolute top-full right-0 mt-2 w-[560px] bg-ink-900 border border-ink-700/50 rounded-2xl p-6 shadow-2xl shadow-black/40"
                  >
                    {/* Core Offers Section */}
                    <div className="mb-6">
                      <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-amber-500 mb-3 px-1">
                        Core Services
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {CORE_SERVICES.map((service) => (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            onClick={() => setIsServicesOpen(false)}
                            className="group p-3 rounded-xl hover:bg-ink-800/70 transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{service.icon}</span>
                              <div>
                                <div className="text-sm font-medium text-cream-100 group-hover:text-amber-400 transition-colors">
                                  {service.shortTitle || service.title}
                                </div>
                                <div className="text-[11px] text-ink-500">
                                  {service.subtitle}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-ink-700/50 mb-4" />

                    {/* Supporting Services */}
                    <div className="grid grid-cols-3 gap-1">
                      {supportingServices.map((service) => (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}`}
                          onClick={() => setIsServicesOpen(false)}
                          className="group flex items-center gap-2 p-2.5 rounded-lg hover:bg-ink-800/50 transition-all"
                        >
                          <span className="text-base opacity-60 group-hover:opacity-100 transition-opacity">
                            {service.icon}
                          </span>
                          <span className="text-[13px] text-ink-400 group-hover:text-cream-100 transition-colors truncate">
                            {service.shortTitle || service.title}
                          </span>
                        </Link>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-4 pt-4 border-t border-ink-700/50">
                      <Link 
                        href="/services" 
                        onClick={() => setIsServicesOpen(false)}
                        className="flex items-center justify-center gap-2 text-xs font-medium text-ink-500 hover:text-amber-400 transition-colors"
                      >
                        View all services
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/about"
              className="px-4 py-2 text-sm font-medium text-ink-400 hover:text-cream-100 transition-colors rounded-lg hover:bg-ink-800/50"
            >
              About
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-ink-400 hover:text-cream-100 transition-colors"
            >
              Client Login
            </Link>
            <Link 
              href="/contact" 
              className="btn btn-primary text-sm py-2.5 px-5"
            >
              Book Finance Triage
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-ink-400 hover:text-cream-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
            className="lg:hidden bg-ink-900 border-b border-ink-800/50 overflow-hidden"
          >
            <div className="container py-6 space-y-6">
              {/* Core Offers */}
              <div className="space-y-1">
                <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-amber-500 mb-2 px-1">
                  Core Services
                </p>
                {CORE_SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-ink-800/50 transition-colors"
                  >
                    <span className="text-xl">{service.icon}</span>
                    <span className="text-base font-medium text-cream-100">{service.title}</span>
                  </Link>
                ))}
              </div>

              {/* Other Links */}
              <div className="space-y-1 pt-4 border-t border-ink-800/50">
                <Link
                  href="/services"
                  onClick={() => setIsOpen(false)}
                  className="block p-3 text-ink-400 hover:text-cream-100 transition-colors"
                >
                  All Services
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsOpen(false)}
                  className="block p-3 text-ink-400 hover:text-cream-100 transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block p-3 text-ink-400 hover:text-cream-100 transition-colors"
                >
                  Client Login
                </Link>
              </div>

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-ink-800/50">
                <Link 
                  href="/contact" 
                  onClick={() => setIsOpen(false)}
                  className="btn btn-primary w-full justify-center"
                >
                  Book Finance Triage
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
