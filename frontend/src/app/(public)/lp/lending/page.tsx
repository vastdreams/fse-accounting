import { Metadata } from 'next';
import LendingLP from './LendingLP';

export const metadata: Metadata = {
  title: 'Bank-Ready Pack in 14 Days | FSE Accounting',
  description: 'Stop chasing documents. We build the lender-ready financial model, debt schedules, and management pack that gets your facility approved faster.',
};

export default function LendingLandingPage() {
  return <LendingLP />;
}
