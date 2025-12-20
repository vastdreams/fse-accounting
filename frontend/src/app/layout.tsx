/**
 * PATH: frontend/src/app/layout.tsx
 * PURPOSE:
 *   - Root Next.js App Router layout and SEO metadata for the FSE Accounting frontend.
 *
 * ROLE IN ARCHITECTURE:
 *   - UI shell + SEO layer (shared across all routes).
 *
 * MAIN EXPORTS:
 *   - metadata: Next.js Metadata config.
 *   - RootLayout(): React Server Component wrapper.
 *
 * NON-RESPONSIBILITIES:
 *   - This file does NOT handle:
 *     - Navigation/footer rendering (handled by route group layouts)
 *     - API client configuration
 *
 * NOTES FOR FUTURE AI:
 *   - Keep descriptions concrete and consistent with on-page copy.
 */

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'FSE Accounting | Accounting and Advisory',
    template: '%s | FSE Accounting',
  },
  description:
    'Business accounting, bookkeeping and tax support — plus CFO advisory, forecasting and financial modelling.',
  keywords: [
    'FSE Accounting',
    'accounting',
    'advisory',
    'bookkeeping',
    'tax',
    'CFO services',
    'financial modelling',
    'corporate structuring',
    'Australia',
  ],
  authors: [{ name: 'FSE Accounting' }],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://fseaccounting.com',
    siteName: 'FSE Accounting',
    title: 'FSE Accounting | Accounting and Advisory',
    description: 'Business accounting, bookkeeping and tax support — plus CFO advisory and modelling.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FSE Accounting | Accounting and Advisory',
    description: 'Business accounting, bookkeeping and tax support — plus CFO advisory and modelling.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

