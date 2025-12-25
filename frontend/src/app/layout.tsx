/**
 * PATH: frontend/src/app/layout.tsx
 * PURPOSE: Root Next.js App Router layout with SEO metadata and analytics
 */

import type { Metadata } from 'next'
import { Bricolage_Grotesque, Geist } from 'next/font/google'
import './globals.css'
import Analytics from '@/components/Analytics'

// Self-hosted fonts for performance
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
})

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://fseaccounting.com'),
  title: {
    default: 'FSE Accounting | Clean Books. Bankable Numbers. Deal-Ready.',
    template: '%s | FSE Accounting',
  },
  description:
    'Growth-stage accounting and advisory. Bookkeeping foundations, lending-ready packs, and acquisition/exit support for Australian businesses.',
  keywords: [
    'FSE Accounting',
    'accounting',
    'bookkeeping',
    'lending advisory',
    'acquisition due diligence',
    'CFO services',
    'financial modelling',
    'Australia',
    'growth stage',
    'lender ready',
  ],
  authors: [{ name: 'FSE Accounting' }],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://fseaccounting.com',
    siteName: 'FSE Accounting',
    title: 'FSE Accounting | Clean Books. Bankable Numbers. Deal-Ready.',
    description: 'Growth-stage accounting and advisory. Bookkeeping, lending prep, and M&A support.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FSE Accounting | Clean Books. Bankable Numbers. Deal-Ready.',
    description: 'Growth-stage accounting and advisory. Bookkeeping, lending prep, and M&A support.',
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
    <html lang="en" className={`${bricolage.variable} ${geist.variable}`}>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
