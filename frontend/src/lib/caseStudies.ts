/**
 * Case Studies Data Model
 * 
 * Supports both named and anonymized case studies.
 * Set client.name to null for anonymized studies.
 */

export interface CaseStudy {
  slug: string;
  title: string;
  client: {
    name: string | null;        // null = anonymized
    industry: string;
    size: string;               // e.g. "$5M-$10M revenue"
    location: string;
  };
  service: 'bookkeeping' | 'lending' | 'acquisitions' | 'rdti' | 'cfo';
  problem: string;
  approach: string[];
  deliverables: string[];
  outcomes: { metric: string; value: string }[];
  testimonial?: { quote: string; author: string; role: string };
  timeline: string;
  featured: boolean;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'manufacturing-facility-close',
    title: 'Manufacturing company closes $4.2M facility in 6 weeks',
    client: {
      name: null, // anonymized
      industry: 'Manufacturing',
      size: '$12M revenue',
      location: 'Sydney, Australia',
    },
    service: 'lending',
    problem: 
      'A growing manufacturing business had been chasing their bank for 4 months with no progress. Their existing accountant provided annual tax returns but couldn\'t produce the financial model and management pack the bank needed. The CFO was spending 20+ hours per week fielding document requests.',
    approach: [
      'Conducted a diagnostic to identify all gaps in their current documentation',
      'Built a 3-statement financial model aligned to lender requirements',
      'Prepared debt schedules, covenant calculations, and sensitivity analysis',
      'Created a comprehensive management presentation and data room',
      'Managed all lender Q&A through to facility close',
    ],
    deliverables: [
      '3-statement financial model (P&L, balance sheet, cash flow)',
      'Debt schedule with covenant tracking',
      'Management presentation deck',
      'Virtual data room with all supporting documents',
      'Lender Q&A support through close',
    ],
    outcomes: [
      { metric: 'Facility secured', value: '$4.2M' },
      { metric: 'Time to close', value: '6 weeks' },
      { metric: 'Follow-up questions', value: '0' },
      { metric: 'CFO time saved', value: '80+ hours' },
    ],
    testimonial: {
      quote: 'FSE got our books in order in 2 weeks. We closed our facility 6 weeks later. Our previous accountant had us waiting 4 months with no end in sight.',
      author: 'James T.',
      role: 'CFO, Manufacturing',
    },
    timeline: '6 weeks',
    featured: true,
  },
  {
    slug: 'pe-acquisition-diligence',
    title: 'PE firm avoids $340K working capital trap',
    client: {
      name: null, // anonymized
      industry: 'Private Equity',
      size: 'Mid-market fund',
      location: 'Melbourne, Australia',
    },
    service: 'acquisitions',
    problem:
      'A private equity firm was acquiring a $6M professional services business. The seller\'s accountant had prepared "clean" financials and the deal was moving fast. The PE firm needed independent financial due diligence to validate the numbers before signing.',
    approach: [
      'Conducted quality of earnings analysis focusing on revenue recognition and cost normalization',
      'Performed detailed working capital review including seasonality adjustments',
      'Analyzed customer concentration and contract terms',
      'Reviewed accounting policies and identified non-GAAP adjustments',
      'Prepared detailed report with findings and recommended price adjustments',
    ],
    deliverables: [
      'Quality of earnings report with normalized EBITDA',
      'Working capital analysis with peg recommendation',
      'Customer and revenue analysis',
      'Risk summary and deal considerations',
      'Negotiation support documentation',
    ],
    outcomes: [
      { metric: 'Issues identified', value: '$520K' },
      { metric: 'Price adjustment achieved', value: '$340K' },
      { metric: 'Turnaround time', value: '2 weeks' },
      { metric: 'Deal outcome', value: 'Closed with protections' },
    ],
    testimonial: {
      quote: 'They found issues in two weeks that our accountant missed entirely. Saved us from a very expensive mistake.',
      author: 'Sarah M.',
      role: 'Director, Private Equity',
    },
    timeline: '2 weeks',
    featured: true,
  },
  {
    slug: 'ecommerce-bookkeeping-turnaround',
    title: 'E-commerce brand goes from 6 months behind to day-5 close',
    client: {
      name: null, // anonymized
      industry: 'E-commerce / Retail',
      size: '$3M revenue',
      location: 'Brisbane, Australia',
    },
    service: 'bookkeeping',
    problem:
      'A fast-growing e-commerce brand had books 6 months behind. The founder had no visibility on cash, couldn\'t produce reports for their lender, and was making business decisions based on bank balance alone. Their part-time bookkeeper couldn\'t keep up with transaction volume.',
    approach: [
      'Assessed current state and prioritized critical cleanup items',
      'Implemented Xero best practices and automated bank feeds',
      'Cleaned up 6 months of backlog in a focused 3-week sprint',
      'Established monthly close process with day-5 deadline',
      'Built custom management dashboard for real-time visibility',
    ],
    deliverables: [
      'Full historical cleanup (6 months)',
      'Xero optimization and automation',
      'Monthly close process and checklist',
      'Management dashboard with key metrics',
      'Ongoing monthly bookkeeping service',
    ],
    outcomes: [
      { metric: 'Cleanup completed', value: '3 weeks' },
      { metric: 'Monthly close', value: 'Day 5' },
      { metric: 'Consecutive on-time closes', value: '12 months' },
      { metric: 'Founder time saved', value: '15+ hrs/month' },
    ],
    testimonial: {
      quote: 'For the first time in years, I actually know my numbers. I can make decisions with confidence instead of guessing.',
      author: 'Michael R.',
      role: 'Founder, E-commerce',
    },
    timeline: '3 weeks (cleanup) + ongoing',
    featured: false,
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}

export function getCaseStudiesByService(service: CaseStudy['service']): CaseStudy[] {
  return CASE_STUDIES.filter((cs) => cs.service === service);
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return CASE_STUDIES.filter((cs) => cs.featured);
}

