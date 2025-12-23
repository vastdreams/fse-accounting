/**
 * PATH: frontend/src/lib/services.ts
 * PURPOSE:
 *   - Single source of truth for public Services content
 *   - Ordered to spotlight the 3 CORE OFFERS first:
 *     1. Bookkeeping (Foundation)
 *     2. Lending (Capital)
 *     3. Acquisition/Exit (Deals)
 *
 * NOTES:
 *   - The top 3 are the primary revenue drivers
 *   - Other services support these or serve specific client needs
 *   - Slugs are stable for SEO
 */

export type ServiceDefinition = {
  slug: string;
  icon: string;
  title: string;
  shortTitle?: string;
  subtitle?: string;
  description: string;
  headline?: string;
  features: string[];
  isCoreOffer?: boolean;
  sprintName?: string;
  outcomes?: string[];
};

// ============================================
// CORE OFFERS (Primary Revenue Drivers)
// ============================================
const CORE_OFFERS: ServiceDefinition[] = [
  {
    slug: 'bookkeeping',
    icon: '📊',
    title: 'Bookkeeping',
    shortTitle: 'Bookkeeping',
    subtitle: 'Foundation',
    headline: 'Close fast. Clean numbers. Management reporting.',
    description:
      'High-integrity financial records built for scale. Reliable month-end closes that serve as the foundation for clear decisions and investor-ready operations.',
    features: [
      'Month-end close by day 5',
      'Management reporting dashboard',
      'Cashflow visibility & forecasting',
      'AP/AR workflow automation',
      'Bank & card reconciliations',
      'Audit-ready documentation',
    ],
    isCoreOffer: true,
    sprintName: 'Bookkeeping Fix Sprint',
    outcomes: [
      'Books closed within 5 business days',
      'Clear management dashboard',
      'Real-time cash position',
      'Clean audit trail',
    ],
  },
  {
    slug: 'lending',
    icon: '🏦',
    title: 'Lending Advisory',
    shortTitle: 'Lending',
    subtitle: 'Capital',
    headline: 'Bank-ready model + pack. Fewer questions, faster approvals.',
    description:
      'Lender-ready financial architecture. We prepare credit-ready application packs, build financial models, and manage lender Q&A so you get funded faster.',
    features: [
      'Credit-ready application packs',
      'Financial model + projections',
      'Data room preparation',
      'Lender Q&A coordination',
      'Covenant reporting setup',
      'Facility structuring support',
    ],
    isCoreOffer: true,
    sprintName: 'Lending Readiness Sprint',
    outcomes: [
      'Complete lender-ready pack',
      'Financial model approved',
      'Faster facility approval',
      'Ongoing covenant compliance',
    ],
  },
  {
    slug: 'acquisitions',
    icon: '🤝',
    title: 'Acquisitions & Exits',
    shortTitle: 'Deals',
    subtitle: 'Deals',
    headline: 'Know what you're buying. Structure it right. Don't get surprised.',
    description:
      'Finance-led transaction support. From due diligence to deal structuring to integration—we ensure you make decisions with complete financial clarity.',
    features: [
      'Financial due diligence',
      'Quality of earnings analysis',
      'Deal structure advisory',
      'Valuation support',
      'Integration planning',
      'Exit preparation',
    ],
    isCoreOffer: true,
    sprintName: 'Acquisition Readiness Sprint',
    outcomes: [
      'Complete due diligence report',
      'Risk-adjusted valuation',
      'Optimal deal structure',
      'Smooth integration plan',
    ],
  },
];

// ============================================
// SUPPORTING SERVICES
// ============================================
const SUPPORTING_SERVICES: ServiceDefinition[] = [
  {
    slug: 'cfo-services',
    icon: '👔',
    title: 'CFO Advisory',
    shortTitle: 'CFO',
    description:
      'Executive-level financial leadership for growth-stage businesses. We bridge the gap between compliance and strategic capital.',
    features: [
      'Strategic capital structuring',
      'Board & investor relations',
      'Performance-led forecasting',
      'Unit economics analysis',
    ],
  },
  {
    slug: 'financial-modelling',
    icon: '📈',
    title: 'Financial Modelling',
    description:
      'Models for fundraising, strategic planning, and business decision-making.',
    features: [
      '3-statement models',
      'Valuation models',
      'Scenario analysis',
      'Investor-ready outputs',
    ],
  },
  {
    slug: 'cost-accounting',
    icon: '🎯',
    title: 'Cost Accounting',
    description:
      'Granular cost systems that identify profit leaks and optimize operational efficiency.',
    features: [
      'Activity-based costing',
      'Margin analysis',
      'Variance tracking',
      'Unit economics',
    ],
  },
  {
    slug: 'tax-filings',
    icon: '💰',
    title: 'Tax Filings',
    description:
      'Tax returns and BAS/GST lodgements delivered with a partner Registered Tax/BAS Agent.',
    features: [
      'Company tax returns',
      'BAS/GST lodgement',
      'Tax planning',
      'ATO audit support',
    ],
  },
  {
    slug: 'corporate-growth',
    icon: '🌱',
    title: 'Corporate Structuring',
    description:
      'Optimise your structure for growth, tax efficiency, and asset protection.',
    features: [
      'Entity structuring',
      'Holding company setup',
      'Trust structures',
      'Restructuring advice',
    ],
  },
  {
    slug: 'exit-planning',
    icon: '🚀',
    title: 'Exit Planning',
    description:
      'Prepare for a sale or transition with structured, finance-led planning.',
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
    description:
      'Investment structuring and administration for high-net-worth individuals.',
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
      'International compliance',
      'Treaty planning',
    ],
  },
  {
    slug: 'financial-os',
    icon: '⚙️',
    title: 'Financial Operating System',
    description:
      'Build a modern finance stack with integrated systems and automation.',
    features: [
      'System selection',
      'Workflow automation',
      'Integration setup',
      'Training & support',
    ],
  },
];

// Combined list - core offers first
export const SERVICES: ServiceDefinition[] = [
  ...CORE_OFFERS,
  ...SUPPORTING_SERVICES,
];

// Just the core 3 offers
export const CORE_SERVICES: ServiceDefinition[] = CORE_OFFERS;

export function getServiceBySlug(slug: string): ServiceDefinition | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getCoreOffers(): ServiceDefinition[] {
  return CORE_OFFERS;
}

export function getSupportingServices(): ServiceDefinition[] {
  return SUPPORTING_SERVICES;
}
