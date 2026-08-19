import Link from "next/link";
import { LEGAL_LINKS, NAV_LINKS } from "@/lib/site";
import { ShieldIcon } from "./Icons";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.grid}>
          <div className={styles.col}>
            <h4>Nawigacja</h4>
            <ul>
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4>Dokumenty</h4>
            <ul>
              {LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4>O grze</h4>
            <p>
              Rozgrywka oparta wyłącznie na umiejętnościach — planujesz trasę i reagujesz
              na zmiany siatki w czasie rzeczywistym. Działa w każdej nowoczesnej
              przeglądarce, bez instalacji.
            </p>
          </div>

          <div className={styles.col}>
            <h4>Kontakt</h4>
            <ul>
              <li>
                <Link href="/kontakt">Formularz kontaktowy</Link>
              </li>
              <li>
                <a href="mailto:kontakt@kewabort.online">kontakt@kewabort.online</a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="divider" />

        <div className={styles.bottom}>
          <span>© {year} kewabort.online · Wszelkie prawa zastrzeżone</span>
          <span className={styles.badges}>
            <span className="pill">
              <ShieldIcon size={14} /> Fair play
            </span>
            <span className="pill">RODO</span>
            <span className="pill">Dostępność klawiaturowa</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
