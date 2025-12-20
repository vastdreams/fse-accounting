/**
 * PATH: frontend/src/lib/services.ts
 * PURPOSE:
 *   - Single source of truth for public Services content (slugs, titles, features).
 *
 * ROLE IN ARCHITECTURE:
 *   - Public content layer (shared constants for (public)/services routes).
 *
 * MAIN EXPORTS:
 *   - ServiceDefinition: Type for a service entry.
 *   - SERVICES: Ordered list of services.
 *   - getServiceBySlug(): Helper lookup by slug.
 *
 * NON-RESPONSIBILITIES:
 *   - This file does NOT handle:
 *     - Pricing
 *     - Legal/regulated claims
 *     - API calls
 *
 * NOTES FOR FUTURE AI:
 *   - Keep claims factual and avoid hard numbers unless verified.
 *   - When adding a service, ensure slug stability (SEO + deep links).
 */

export type ServiceDefinition = {
  slug: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
};

export const SERVICES: ServiceDefinition[] = [
  {
    slug: 'bookkeeping',
    icon: '📊',
    title: 'Bookkeeping',
    description:
      'Accurate, real-time financial records that give you complete visibility into your business performance.',
    features: [
      'Daily transaction recording',
      'Bank reconciliation',
      'Accounts payable/receivable',
      'Financial reporting',
    ],
  },
  {
    slug: 'cost-accounting',
    icon: '🎯',
    title: 'Cost Accounting Systems',
    description:
      'Implementation of cost accounting systems for manufacturing and service businesses.',
    features: [
      'Activity-based costing',
      'Job costing systems',
      'Variance analysis',
      'Profitability analysis',
    ],
  },
  {
    slug: 'financial-os',
    icon: '⚙️',
    title: 'Financial Operating System',
    description: 'Build a modern finance stack with integrated systems and automation.',
    features: [
      'System selection & implementation',
      'Workflow automation',
      'Integration setup',
      'Training & support',
    ],
  },
  {
    slug: 'financial-modelling',
    icon: '📈',
    title: 'Financial Modelling',
    description: 'Models for fundraising, strategic planning, and business decision-making.',
    features: [
      '3-statement models',
      'Valuation models',
      'Scenario analysis',
      'Investor-ready outputs',
    ],
  },
  {
    slug: 'lending',
    icon: '🏦',
    title: 'Lending Advisory',
    description: 'Guidance on financing options, applications, and covenant monitoring.',
    features: [
      'Loan structuring',
      'Bank relationship management',
      'Application preparation',
      'Covenant monitoring',
    ],
  },
  {
    slug: 'tax-filings',
    icon: '💰',
    title: 'Tax Filings',
    description: 'Tax planning and compliance for businesses of all sizes and structures.',
    features: [
      'Company tax returns',
      'BAS/GST lodgement',
      'Tax planning strategies',
      'ATO audit support',
    ],
  },
  {
    slug: 'corporate-growth',
    icon: '🌱',
    title: 'Corporate Growth & Structuring',
    description: 'Optimise your structure for growth, tax efficiency, and asset protection.',
    features: [
      'Entity structuring',
      'Holding company setup',
      'Trust structures',
      'Restructuring advice',
    ],
  },
  {
    slug: 'acquisitions',
    icon: '🤝',
    title: 'Acquisitions & Planning',
    description: 'Support for buying businesses, from due diligence to integration.',
    features: [
      'Target identification',
      'Financial due diligence',
      'Deal structuring',
      'Post-acquisition integration',
    ],
  },
  {
    slug: 'exit-planning',
    icon: '🚀',
    title: 'Exit Planning',
    description: 'Prepare for a sale or transition with structured, finance-led planning.',
    features: [
      'Valuation analysis',
      'Value enhancement',
      'Succession planning',
      'Transaction support',
    ],
  },
  {
    slug: 'hnwi-investments',
    icon: '💎',
    title: 'HNWI Investments',
    description: 'Investment structuring and administration for high-net-worth individuals.',
    features: [
      'Investment entity setup',
      'Portfolio administration',
      'Tax optimisation',
      'Reporting & compliance',
    ],
  },
  {
    slug: 'global-structuring',
    icon: '🌏',
    title: 'Global Structuring',
    description:
      'International planning and multi-jurisdictional compliance for global businesses.',
    features: [
      'Cross-border structuring',
      'Transfer pricing',
      'International tax compliance',
      'Treaty planning',
    ],
  },
  {
    slug: 'cfo-services',
    icon: '👔',
    title: 'CFO Services',
    description: 'Fractional CFO expertise without the full-time commitment.',
    features: [
      'Strategic planning',
      'Cash flow management',
      'Board reporting',
      'Investor relations',
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
