/**
 * PATH: frontend/src/app/(public)/lp/acquisitions/page.tsx
 * PURPOSE: Paid traffic landing page - Acquisition/Exit Advisory
 */

import { Metadata } from 'next';
import AcquisitionsLandingPage from './AcquisitionsLP';

export const metadata: Metadata = {
  title: 'Acquisition Due Diligence That Protects You | FSE Accounting',
  description: 'Financial due diligence, deal structuring, and exit preparation for SME acquisitions and exits.',
  robots: 'noindex, nofollow',
};

export default function Page() {
  return <AcquisitionsLandingPage />;
}

