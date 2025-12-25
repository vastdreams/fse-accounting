/**
 * Campaign Tracking Utilities
 * 
 * Handles:
 * - UTM parameter capture and storage
 * - Event tracking (GA4, LinkedIn)
 * - Conversion tracking
 */

// UTM Parameters
export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

// Get UTM params from URL
export function getUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  const utmParams: UTMParams = {};
  
  const utmKeys: (keyof UTMParams)[] = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  
  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });
  
  return utmParams;
}

// Store UTM params in sessionStorage
export function storeUTMParams(): void {
  if (typeof window === 'undefined') return;
  
  const params = getUTMParams();
  if (Object.keys(params).length > 0) {
    sessionStorage.setItem('utm_params', JSON.stringify(params));
  }
}

// Retrieve stored UTM params
export function getStoredUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};
  
  const stored = sessionStorage.getItem('utm_params');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return {};
    }
  }
  return {};
}

// Get landing page from sessionStorage
export function getFirstLandingPage(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('first_landing_page');
}

// Store first landing page
export function storeFirstLandingPage(): void {
  if (typeof window === 'undefined') return;
  
  if (!sessionStorage.getItem('first_landing_page')) {
    sessionStorage.setItem('first_landing_page', window.location.pathname);
  }
}

// Initialize tracking on page load
export function initTracking(): void {
  if (typeof window === 'undefined') return;
  
  storeUTMParams();
  storeFirstLandingPage();
}

// Event Types
export type TrackingEvent = 
  | 'page_view'
  | 'lp_view'
  | 'cta_click'
  | 'form_start'
  | 'form_step'
  | 'form_submit'
  | 'calendar_open'
  | 'calendar_booked';

export interface EventParams {
  page_path?: string;
  page_title?: string;
  lp_name?: string;
  cta_location?: string;
  cta_text?: string;
  form_name?: string;
  step_number?: number;
  selections?: Record<string, string>;
  [key: string]: any;
}

// Track event to GA4
export function trackEvent(event: TrackingEvent, params?: EventParams): void {
  if (typeof window === 'undefined') return;
  
  const utmParams = getStoredUTMParams();
  const enrichedParams = {
    ...params,
    ...utmParams,
    first_landing_page: getFirstLandingPage(),
  };
  
  // GA4
  if ((window as any).gtag) {
    (window as any).gtag('event', event, enrichedParams);
  }
  
  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Track] ${event}`, enrichedParams);
  }
}

// Track page view
export function trackPageView(pagePath?: string): void {
  trackEvent('page_view', {
    page_path: pagePath || (typeof window !== 'undefined' ? window.location.pathname : ''),
    page_title: typeof document !== 'undefined' ? document.title : '',
  });
}

// Track landing page view
export function trackLPView(lpName: string): void {
  trackEvent('lp_view', {
    lp_name: lpName,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}

// Track CTA click
export function trackCTAClick(location: string, text: string): void {
  trackEvent('cta_click', {
    cta_location: location,
    cta_text: text,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}

// Track form start
export function trackFormStart(formName: string): void {
  trackEvent('form_start', {
    form_name: formName,
  });
}

// Track form step
export function trackFormStep(stepNumber: number, selections?: Record<string, string>): void {
  trackEvent('form_step', {
    step_number: stepNumber,
    selections,
  });
}

// Track form submission
export function trackFormSubmit(formData: Record<string, any>): void {
  trackEvent('form_submit', {
    ...formData,
  });
}

// Track calendar open
export function trackCalendarOpen(): void {
  trackEvent('calendar_open', {
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}

// Track calendar booked
export function trackCalendarBooked(): void {
  trackEvent('calendar_booked', {
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}

// Track conversion (GA4 + LinkedIn)
export function trackConversion(value?: number, currency: string = 'AUD'): void {
  if (typeof window === 'undefined') return;
  
  // GA4 conversion
  if ((window as any).gtag) {
    (window as any).gtag('event', 'generate_lead', {
      currency,
      value: value || 50,
    });
    
    // Google Ads conversion (if configured)
    const adsConversionId = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_ID;
    if (adsConversionId) {
      (window as any).gtag('event', 'conversion', {
        send_to: adsConversionId,
        value: value || 50,
        currency,
      });
    }
  }
  
  // LinkedIn conversion
  if ((window as any).lintrk) {
    const linkedinConversionId = process.env.NEXT_PUBLIC_LINKEDIN_CONVERSION_ID;
    if (linkedinConversionId) {
      (window as any).lintrk('track', { conversion_id: linkedinConversionId });
    }
  }
}

