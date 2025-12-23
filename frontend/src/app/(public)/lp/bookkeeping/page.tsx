/**
 * PATH: frontend/src/app/(public)/lp/bookkeeping/page.tsx
 * PURPOSE: Paid traffic landing page - Bookkeeping service
 * 
 * MESSAGE MATCH:
 * - "Management reporting bookkeeping"
 * - "Month end close service"
 * - "CFO reporting Xero"
 * 
 * CONVERSION FOCUS: Single CTA to Finance Triage
 */

import { Metadata } from 'next';
import BookkeepingLandingPage from './BookkeepingLP';

export const metadata: Metadata = {
  title: 'Bookkeeping That Closes by Day 5 | FSE Accounting',
  description: 'Month-end close, management reporting, and cashflow visibility for growth-stage businesses. Get your books under control.',
  robots: 'noindex, nofollow', // Landing pages shouldn't be indexed
};

export default function Page() {
  return <BookkeepingLandingPage />;
}

