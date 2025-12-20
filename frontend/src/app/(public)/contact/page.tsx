/**
 * PATH: frontend/src/app/(public)/contact/page.tsx
 * PURPOSE:
 *   - Public contact page with a basic enquiry form.
 *
 * ROLE IN ARCHITECTURE:
 *   - Marketing / conversion layer (public web).
 *
 * MAIN EXPORTS:
 *   - ContactPage(): React component.
 *
 * NON-RESPONSIBILITIES:
 *   - This file does NOT handle:
 *     - Persisting enquiries (currently simulated)
 *     - Any tax-agent engagement terms (handled in engagement documentation)
 *
 * NOTES FOR FUTURE AI:
 *   - If you wire this to the backend, add server-side validation + spam protection.
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-slate-900 via-slate-950 to-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="font-serif text-4xl md:text-5xl text-cream-100 mb-6">
              Get in Touch
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              Ready to elevate your financial operations? Book a free consultation 
              or send us a message. We&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {isSubmitted ? (
                <div className="card text-center py-12">
                  <div className="text-5xl mb-4">✓</div>
                  <h3 className="font-serif text-2xl text-cream-100 mb-2">
                    Thank you!
                  </h3>
                  <p className="text-slate-400">
                    We&apos;ve received your message and will be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="label">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="label">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="label">Company</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="input"
                        placeholder="Your Company Pty Ltd"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="label">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input"
                        placeholder="+61 4XX XXX XXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="label">Service of Interest</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="input"
                    >
                      <option value="">Select a service...</option>
                      <option value="bookkeeping">Bookkeeping</option>
                      <option value="tax">Tax Filings</option>
                      <option value="cfo">CFO Services</option>
                      <option value="modelling">Financial Modelling</option>
                      <option value="structuring">Corporate Structuring</option>
                      <option value="other">Other / Not Sure</option>
                    </select>

                    <p className="mt-2 text-xs text-slate-500">
                      Note: For tax/BAS lodgements, the tax agent service is performed by a partner
                      Registered Tax/BAS Agent. We manage the workflow and portal.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="message" className="label">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="input resize-none"
                      placeholder="Tell us about your business and how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="card">
                <h3 className="font-serif text-xl text-cream-100 mb-4">Contact Details</h3>
                <div className="space-y-4 text-slate-400">
                  <div className="flex items-start gap-3">
                    <span className="text-copper-400">📍</span>
                    <div>
                      <p className="font-medium text-cream-100">Location</p>
                      <p>Australia</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-copper-400">✉️</span>
                    <div>
                      <p className="font-medium text-cream-100">Email</p>
                      <a href="mailto:hello@fseaccounting.com" className="hover:text-copper-400 transition-colors">
                        hello@fseaccounting.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-copper-400">🕐</span>
                    <div>
                      <p className="font-medium text-cream-100">Business Hours</p>
                      <p>Monday - Friday: 9:00 AM - 6:00 PM AEST</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="font-serif text-xl text-cream-100 mb-4">What to Expect</h3>
                <ul className="space-y-3 text-slate-400">
                  <li className="flex items-start gap-3">
                    <span className="text-copper-400">1.</span>
                    <p>We&apos;ll respond within 24 hours to schedule a call</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-copper-400">2.</span>
                    <p>30-minute discovery call to understand your needs</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-copper-400">3.</span>
                    <p>Customized proposal with clear pricing</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-copper-400">4.</span>
                    <p>Seamless onboarding to our client portal</p>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

