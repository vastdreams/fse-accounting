/**
 * PATH: frontend/src/app/(public)/lp/lending/page.tsx
 * PURPOSE: Paid traffic landing page - Lending Advisory
 */

import { Metadata } from 'next';
import LendingLandingPage from './LendingLP';

export const metadata: Metadata = {
  title: 'Get Lender-Ready in 14 Days | FSE Accounting',
  description: 'Lender-ready financial packs, models, and data rooms. Fewer bank questions, faster facility approvals.',
  robots: 'noindex, nofollow',
};

export default function Page() {
  return <LendingLandingPage />;
}

