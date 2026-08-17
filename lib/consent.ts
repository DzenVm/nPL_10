// Cienka warstwa nad Google Consent Mode v2. Nie ładujemy tu żadnego
// rzeczywistego identyfikatora GA/Ads (patrz GoogleTag.tsx) — funkcje są
// bezpieczne do wywołania niezależnie od tego, czy tag jest podłączony.

export type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const STORAGE_KEY = "kw-consent-v1";

export function readStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

// Do użytku z useSyncExternalStore — pozwala bezpiecznie odczytać localStorage
// po stronie klienta bez niezgodności z renderowaniem serwerowym (SSR).
export function subscribeConsent(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function getConsentServerSnapshot(): ConsentChoice | null {
  return null;
}

export function applyConsent(choice: ConsentChoice) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, choice);
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
  window.gtag("consent", "update", {
    ad_storage: choice,
    ad_user_data: choice,
    ad_personalization: choice,
    analytics_storage: choice,
  });
}
