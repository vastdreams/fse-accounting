/**
 * PATH: frontend/src/components/Analytics.tsx
 * PURPOSE: Analytics and conversion tracking
 * 
 * INCLUDES:
 * - Google Analytics 4 (GA4)
 * - Google Ads conversion tracking
 * - LinkedIn Insight Tag
 * 
 * EVENTS TRACKED:
 * - page_view (automatic)
 * - form_submit
 * - calendar_booked
 * - qualified_lead
 */

'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

// Replace these with actual IDs
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-XXXXXXXXX';
const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || 'XXXXXX';

// Type declarations for gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    lintrk: (action: string, data: any) => void;
  }
}

// Track page views
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      });

      // Also send to Google Ads for remarketing
      window.gtag('config', GOOGLE_ADS_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

// Helper functions for tracking events
export function trackEvent(
  eventName: string,
  eventParams?: Record<string, any>
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
}

export function trackFormSubmit(
  formType: string,
  serviceIntent?: string
) {
  // GA4 event
  trackEvent('form_submit', {
    event_category: 'engagement',
    event_label: formType,
    service_intent: serviceIntent,
  });

  // Google Ads conversion
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/CONVERSION_LABEL`, // Replace with actual conversion label
      value: 1.0,
      currency: 'AUD',
    });
  }

  // LinkedIn conversion
  if (typeof window !== 'undefined' && window.lintrk) {
    window.lintrk('track', { conversion_id: 'LINKEDIN_CONVERSION_ID' }); // Replace with actual ID
  }
}

export function trackCalendarBooked(
  serviceIntent?: string
) {
  trackEvent('calendar_booked', {
    event_category: 'conversion',
    event_label: serviceIntent,
  });

  // Higher value conversion for Google Ads
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${GOOGLE_ADS_ID}/CALENDAR_CONVERSION_LABEL`,
      value: 5.0,
      currency: 'AUD',
    });
  }
}

export function trackQualifiedLead(
  serviceIntent: string,
  revenueBand: string
) {
  trackEvent('qualified_lead', {
    event_category: 'conversion',
    event_label: serviceIntent,
    revenue_band: revenueBand,
  });
}

export default function Analytics() {
  // Skip analytics in development
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>

      {/* LinkedIn Insight Tag */}
      <Script id="linkedin-insight" strategy="afterInteractive">
        {`
          _linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          (function(l) {
            if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
            window.lintrk.q=[]}
            var s = document.getElementsByTagName("script")[0];
            var b = document.createElement("script");
            b.type = "text/javascript";b.async = true;
            b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
            s.parentNode.insertBefore(b, s);
          })(window.lintrk);
        `}
      </Script>
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{ display: 'none' }} 
          alt="" 
          src={`https://px.ads.linkedin.com/collect/?pid=${LINKEDIN_PARTNER_ID}&fmt=gif`} 
        />
      </noscript>

      {/* Page View Tracker */}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}

