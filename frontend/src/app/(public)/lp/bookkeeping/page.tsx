import { Metadata } from 'next';
import BookkeepingLP from './BookkeepingLP';

export const metadata: Metadata = {
  title: 'Books Closed by Day 5 | FSE Accounting',
  description: 'Stop chasing your accountant. We handle month-end close, reconciliations, and management reporting—delivered by day 5, every month.',
};

export default function BookkeepingLandingPage() {
  return <BookkeepingLP />;
}
