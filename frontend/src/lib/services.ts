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
    slug: 'lending',
    icon: '🏦',
    title: 'Lending Advisory',
    description:
      'Lender-ready financial architecture. We structure facilities and manage the execution path for institutional capital.',
    features: [
      'Credit-ready application packs',
      'Debt facility structuring',
      'Lender coordination & Q&A',
      'Covenant-led reporting',
    ],
  },
  {
    slug: 'bookkeeping',
    icon: '📊',
    title: 'Bookkeeping',
    description:
      'High-integrity financial records built for scale. Reliable month-end closes that serve as the foundation for clear decisions.',
    features: [
      'Daily transaction execution',
      'Disciplined month-end close',
      'Automated AP/AR workflows',
      'Audit-ready financial hygiene',
    ],
  },
  {
    slug: 'cost-accounting',
    icon: '🎯',
    title: 'Advanced Cost Accounting',
    description:
      'Granular cost systems that identify profit leaks and optimize absolute operational efficiency.',
    features: [
      'Activity-based unit economics',
      'Granular margin analysis',
      'Operational variance tracking',
      'Direct-to-operator insights',
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
    slug: 'tax-filings',
    icon: '💰',
    title: 'Tax Filings',
    description: 'Tax returns and BAS/GST lodgements delivered with a partner Registered Tax/BAS Agent.',
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
    title: 'CFO Advisory',
    description: 'Executive-level financial leadership designed for high-growth operators. We bridge the gap between compliance and strategic capital.',
    features: [
      'Strategic capital structuring',
      'Advanced unit economics',
      'Board & investor relations',
      'Performance-led forecasting',
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
