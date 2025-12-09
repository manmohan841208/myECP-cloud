
/** GA4 event helper */
export function gtagEvent(action: string, params: Record<string, any> = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, params);
  }
}

/** Fires a GA4 page_view */
export function trackPageView(url: string) {
  if (typeof window !== 'undefined') {
    // Using both allows flexibility; guard to avoid double count if GTM handles GA4
    const useGtmOnly = process.env.NEXT_PUBLIC_USE_GTM_ONLY === 'true';
    if (!useGtmOnly && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', { page_location: url });
    }
    // Also push a GTM event that can be used as a trigger
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'page_view', page_location: url });
  }
}
