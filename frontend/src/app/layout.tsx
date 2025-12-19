/**
 * PATH: src/app/layout.tsx
 * PURPOSE: Root layout for FSE Accounting
 * ROLE IN ARCHITECTURE: Application shell with metadata
 */

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'FSE Accounting and Advisory | Business Accounting Services',
    template: '%s | FSE Accounting',
  },
  description: 'Premium accounting and advisory services for business clients. Bookkeeping, tax, CFO services, financial modelling, and corporate structuring.',
  keywords: [
    'accounting',
    'advisory',
    'bookkeeping',
    'tax',
    'CFO services',
    'financial modelling',
    'corporate structuring',
    'Sydney',
    'Australia',
  ],
  authors: [{ name: 'FSE Accounting' }],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://fseaccounting.com',
    siteName: 'FSE Accounting',
    title: 'FSE Accounting and Advisory',
    description: 'Premium accounting and advisory services for business clients.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FSE Accounting and Advisory',
    description: 'Premium accounting and advisory services for business clients.',
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

