"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import {
  applyConsent,
  getConsentServerSnapshot,
  readStoredConsent,
  subscribeConsent,
} from "@/lib/consent";
import styles from "./CookieConsent.module.css";

export function CookieConsent() {
  const storedConsent = useSyncExternalStore(subscribeConsent, readStoredConsent, getConsentServerSnapshot);
  const [dismissed, setDismissed] = useState(false);
  const visible = storedConsent === null && !dismissed;

  if (!visible) return null;

  function decide(choice: "granted" | "denied") {
    applyConsent(choice);
    setDismissed(true);
  }

  return (
    <div className={styles.banner} role="dialog" aria-label="Ustawienia plików cookie" aria-live="polite">
      <div className={styles.card}>
        <p className={styles.text}>
          Używamy plików cookie niezbędnych do działania gry oraz — po Twojej zgodzie —
          analitycznych i reklamowych, zgodnie z{" "}
          <Link href="/polityka-cookie">polityką cookie</Link> i{" "}
          <Link href="/polityka-prywatnosci">polityką prywatności</Link>. Zgodę możesz
          wycofać w każdej chwili.
        </p>
        <div className={styles.buttons}>
          <button type="button" className="btn btn-ghost" onClick={() => decide("denied")}>
            Tylko niezbędne
          </button>
          <button type="button" className="btn btn-primary" onClick={() => decide("granted")}>
            Akceptuj wszystkie
          </button>
        </div>
      </div>
    </div>
  );
}
