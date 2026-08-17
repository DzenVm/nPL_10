import Script from "next/script";
import { GTAG_ID } from "@/lib/site";

// Ładuje gtag.js tylko, gdy w środowisku wdrożenia ustawiono NEXT_PUBLIC_GTAG_ID
// (patrz README-DEPLOY.md). Bez identyfikatora ten komponent nic nie renderuje —
// żaden identyfikator nie jest tu na sztywno wpisany.
export function GoogleTag() {
  if (!GTAG_ID) return null;

  return (
    <>
      {/* beforeInteractive w app/layout.tsx (root layout) jest zgodne z dokumentacją
          Next.js dla App Routera — sygnał zgody musi być ustawiony zanim wystartuje gtag.js. */}
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script id="consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          window.gtag = gtag;
        `}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GTAG_ID}');
        `}
      </Script>
    </>
  );
}
