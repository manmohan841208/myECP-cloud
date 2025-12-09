
'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { trackPageView, gtagEvent } from '@/lib/analytics';

/**
 * Client component that tracks route changes and sends page_view + sample events
 */
export default function AnalyticsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    const url = window.location.href;
    trackPageView(url);
  }, [pathname]);

  // Example: fire a custom event on first mount
  useEffect(() => {
    gtagEvent('tutorial_begin', { source: 'sample-app' });
  }, []);

  return null;
}
