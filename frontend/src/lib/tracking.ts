/**
 * Comprehensive Campaign Tracking
 * 
 * Captures the complete user journey:
 * - Session tracking
 * - Page views & time on page
 * - Click tracking
 * - Scroll depth
 * - Form interactions
 * - UTM attribution
 * - Device & browser info
 */

// Session ID
let sessionId: string | null = null;

// Session start time
let sessionStart: number = 0;

// Pages visited in this session
let pagesVisited: string[] = [];

// Current page start time (for time on page)
let pageStartTime: number = 0;

// Scroll depth tracking
let maxScrollDepth: number = 0;

// UTM Parameters
export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

// Session Data
export interface SessionData {
  session_id: string;
  started_at: string;
  landing_page: string;
  referrer: string;
  utm: UTMParams;
  device: string;
  browser: string;
  screen_size: string;
  pages_visited: string[];
  total_time: number;
}

// Event Data
export interface EventData {
  event_type: string;
  page_path: string;
  timestamp: string;
  session_id: string;
  properties: Record<string, any>;
  utm: UTMParams;
}

// Generate session ID
function generateSessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Get or create session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  if (!sessionId) {
    sessionId = sessionStorage.getItem('fse_session_id');
    if (!sessionId) {
      sessionId = generateSessionId();
      sessionStorage.setItem('fse_session_id', sessionId);
      sessionStart = Date.now();
      sessionStorage.setItem('fse_session_start', sessionStart.toString());
    } else {
      sessionStart = parseInt(sessionStorage.getItem('fse_session_start') || Date.now().toString());
    }
  }
  return sessionId;
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
    sessionStorage.setItem('fse_utm_params', JSON.stringify(params));
  }
}

// Retrieve stored UTM params
export function getStoredUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};
  
  const stored = sessionStorage.getItem('fse_utm_params');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return {};
    }
  }
  return getUTMParams();
}

// Get first landing page
export function getFirstLandingPage(): string {
  if (typeof window === 'undefined') return '';
  return sessionStorage.getItem('fse_landing_page') || '';
}

// Store first landing page
function storeFirstLandingPage(): void {
  if (typeof window === 'undefined') return;
  
  if (!sessionStorage.getItem('fse_landing_page')) {
    sessionStorage.setItem('fse_landing_page', window.location.pathname);
  }
}

// Get referrer
export function getReferrer(): string {
  if (typeof window === 'undefined') return '';
  return sessionStorage.getItem('fse_referrer') || '';
}

// Store referrer
function storeReferrer(): void {
  if (typeof window === 'undefined') return;
  
  if (!sessionStorage.getItem('fse_referrer') && document.referrer) {
    sessionStorage.setItem('fse_referrer', document.referrer);
  }
}

// Get device info
function getDeviceInfo(): { device: string; browser: string; screen_size: string } {
  if (typeof window === 'undefined') {
    return { device: 'Unknown', browser: 'Unknown', screen_size: 'Unknown' };
  }
  
  const ua = navigator.userAgent;
  const isMobile = /Mobile|Android|iPhone|iPad/.test(ua);
  const isTablet = /iPad|Tablet/.test(ua);
  
  let browser = 'Unknown';
  if (ua.includes('Chrome') && !ua.includes('Edge')) browser = 'Chrome';
  else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edge')) browser = 'Edge';
  
  return {
    device: isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop',
    browser,
    screen_size: `${window.screen.width}x${window.screen.height}`,
  };
}

// Get pages visited
export function getPagesVisited(): string[] {
  if (typeof window === 'undefined') return [];
  
  const stored = sessionStorage.getItem('fse_pages_visited');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

// Add page to visited
function addPageVisited(path: string): void {
  if (typeof window === 'undefined') return;
  
  pagesVisited = getPagesVisited();
  if (!pagesVisited.includes(path)) {
    pagesVisited.push(path);
    sessionStorage.setItem('fse_pages_visited', JSON.stringify(pagesVisited));
  }
}

// Get total time on site (seconds)
export function getTimeOnSite(): number {
  if (typeof window === 'undefined') return 0;
  
  const start = parseInt(sessionStorage.getItem('fse_session_start') || Date.now().toString());
  return Math.round((Date.now() - start) / 1000);
}

// Get page view count
export function getPageViewCount(): number {
  return getPagesVisited().length;
}

// Initialize tracking on page load
export function initTracking(): void {
  if (typeof window === 'undefined') return;
  
  getSessionId();
  storeUTMParams();
  storeFirstLandingPage();
  storeReferrer();
  
  pageStartTime = Date.now();
  maxScrollDepth = 0;
  
  // Add current page to visited
  addPageVisited(window.location.pathname);
  
  // Track scroll depth
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);
    if (scrollPercent > maxScrollDepth) {
      maxScrollDepth = scrollPercent;
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Track page exit
  const handleBeforeUnload = () => {
    const timeOnPage = Math.round((Date.now() - pageStartTime) / 1000);
    
    // Send beacon with page stats
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/track', JSON.stringify({
        event_type: 'page_exit',
        page_path: window.location.pathname,
        session_id: getSessionId(),
        properties: {
          time_on_page: timeOnPage,
          scroll_depth: maxScrollDepth,
        },
        utm: getStoredUTMParams(),
      }));
    }
  };
  
  window.addEventListener('beforeunload', handleBeforeUnload);
}

// Send event to server
async function sendEvent(eventData: EventData): Promise<void> {
  try {
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData),
    });
  } catch (e) {
    console.log('Failed to send event:', e);
  }
}

// Track event to GA4 and server
export function trackEvent(eventType: string, properties?: Record<string, any>): void {
  if (typeof window === 'undefined') return;
  
  const utmParams = getStoredUTMParams();
  const deviceInfo = getDeviceInfo();
  
  const eventData: EventData = {
    event_type: eventType,
    page_path: window.location.pathname,
    timestamp: new Date().toISOString(),
    session_id: getSessionId(),
    properties: {
      ...properties,
      ...deviceInfo,
      time_on_site: getTimeOnSite(),
      page_views: getPageViewCount(),
    },
    utm: utmParams,
  };
  
  // Send to server
  sendEvent(eventData);
  
  // Send to GA4
  if ((window as any).gtag) {
    (window as any).gtag('event', eventType, {
      ...eventData.properties,
      ...utmParams,
    });
  }
  
  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Track] ${eventType}`, eventData);
  }
}

// Track page view
export function trackPageView(pagePath?: string): void {
  const path = pagePath || (typeof window !== 'undefined' ? window.location.pathname : '');
  
  trackEvent('page_view', {
    page_path: path,
    page_title: typeof document !== 'undefined' ? document.title : '',
    referrer: getReferrer(),
    landing_page: getFirstLandingPage(),
  });
}

// Track landing page view (with LP-specific data)
export function trackLPView(lpName: string): void {
  trackEvent('lp_view', {
    lp_name: lpName,
    landing_page: getFirstLandingPage(),
  });
}

// Track CTA click
export function trackCTAClick(location: string, text: string, destination?: string): void {
  trackEvent('cta_click', {
    cta_location: location,
    cta_text: text,
    cta_destination: destination,
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

// Track form field focus
export function trackFormFieldFocus(fieldName: string, formName: string): void {
  trackEvent('form_field_focus', {
    field_name: fieldName,
    form_name: formName,
  });
}

// Track form submission
export function trackFormSubmit(formData: Record<string, any>): void {
  trackEvent('form_submit', {
    ...formData,
    total_time_on_site: getTimeOnSite(),
    pages_viewed: getPageViewCount(),
  });
}

// Track calendar open
export function trackCalendarOpen(source?: string): void {
  trackEvent('calendar_open', {
    source,
  });
}

// Track calendar booked
export function trackCalendarBooked(bookingTime?: string): void {
  trackEvent('calendar_booked', {
    booking_time: bookingTime,
  });
}

// Track outbound link click
export function trackOutboundClick(url: string, linkText: string): void {
  trackEvent('outbound_click', {
    url,
    link_text: linkText,
  });
}

// Track video play
export function trackVideoPlay(videoId: string, videoTitle: string): void {
  trackEvent('video_play', {
    video_id: videoId,
    video_title: videoTitle,
  });
}

// Track conversion (GA4 + LinkedIn + server)
export function trackConversion(value?: number, currency: string = 'AUD'): void {
  if (typeof window === 'undefined') return;
  
  trackEvent('conversion', {
    value: value || 50,
    currency,
  });
  
  // GA4 conversion
  if ((window as any).gtag) {
    (window as any).gtag('event', 'generate_lead', {
      currency,
      value: value || 50,
    });
    
    // Google Ads conversion
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

// Get full session data for form submission
export function getSessionData(): Partial<SessionData> {
  if (typeof window === 'undefined') return {};
  
  const deviceInfo = getDeviceInfo();
  
  return {
    session_id: getSessionId(),
    started_at: new Date(sessionStart).toISOString(),
    landing_page: getFirstLandingPage(),
    referrer: getReferrer(),
    utm: getStoredUTMParams(),
    ...deviceInfo,
    pages_visited: getPagesVisited(),
    total_time: getTimeOnSite(),
  };
}
