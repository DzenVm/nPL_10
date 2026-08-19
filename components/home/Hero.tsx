import Link from "next/link";
import styles from "./home.module.css";

export function Hero() {
  return (
    <section className={`section ${styles.hero}`}>
      <div className={`wrap ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <span className="eyebrow">Gra przeglądarkowa · Polska · bez pobierania</span>
          <h1 className="balance">Steruj siecią impulsów, zanim siatka się przeciąży.</h1>
          <p>
            Obracaj segmenty sieci, prowadź impuls energii od generatora do odbiornika i
            reaguj na wzmacniacze, tłumiki oraz węzły sabotujące, zanim skończy się czas.
            Każdy układ siatki jest inny, a rozwiązanie zależy wyłącznie od tego, jak
            szybko rozpoznasz właściwą trasę.
          </p>
          <div className={styles.heroActions}>
            <Link href="#demo" className="btn btn-primary">
              Zagraj teraz
            </Link>
            <Link href="/o-grze" className="btn btn-ghost">
              Zobacz zasady
            </Link>
          </div>
          <div className={styles.trustRow}>
            <span className="pill">Działa w przeglądarce</span>
            <span className="pill">Bez pobierania</span>
            <span className="pill">Codziennie nowy układ</span>
            <span className="pill">Obsługa klawiaturą</span>
            <span className="pill">RODO</span>
          </div>
        </div>

        <figure className={styles.heroArt}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/siatka-glowna.svg"
            alt="Siatka węzłów energii z aktywnymi ścieżkami impulsów"
            width={1600}
            height={1000}
            loading="eager"
          />
        </figure>
      </div>
    </section>
  );
}
