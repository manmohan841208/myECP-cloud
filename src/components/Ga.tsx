
import Script from 'next/script';

/**
 * Direct GA4 integration. If you are using GTM to deploy GA4, set NEXT_PUBLIC_USE_GTM_ONLY=true
 */
export default function GA() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const useGtmOnly = process.env.NEXT_PUBLIC_USE_GTM_ONLY === 'true';
  if (!measurementId || useGtmOnly) return null;

  return (
    <>
      {/* GA4 - Load gtag.js */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      {/* GA4 - Initialize */}
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
