import { Metadata } from 'next';
import AcquisitionsLP from './AcquisitionsLP';

export const metadata: Metadata = {
  title: 'Know What You\'re Buying | FSE Accounting',
  description: 'Financial due diligence that catches what audits miss. Quality of earnings, working capital analysis, and deal structuring support.',
};

export default function AcquisitionsLandingPage() {
  return <AcquisitionsLP />;
}
