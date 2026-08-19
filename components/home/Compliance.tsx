import { CheckIcon, ShieldIcon } from "@/components/Icons";
import styles from "./home.module.css";

const POINTS = [
  {
    title: "Wynik zależy wyłącznie od umiejętności",
    text: "Ranking i progresja opierają się na czasie rozwiązania oraz efektywności trasy, nie na losowości.",
  },
  {
    title: "Ochrona przed nieuczciwą grą",
    text: "Automatyzacja rozgrywki i wielokrotne konta w trybach rankingowych są wykrywane i usuwane z tabel wyników.",
  },
  {
    title: "Pełna obsługa klawiatury",
    text: "Każdy segment siatki to zwykły przycisk — sterujesz nim też przez Tab i Enter, bez potrzeby używania myszy.",
  },
  {
    title: "Zgodność z RODO",
    text: "Dane przetwarzamy wyłącznie w zakresie potrzebnym do działania gry i — po Twojej zgodzie — do statystyk. Szczegóły opisuje polityka prywatności.",
  },
  {
    title: "Trwały postęp",
    text: "Wynik w kampanii, ranga sezonowa i historia Pojedynków zapisują się na koncie między sesjami.",
  },
  {
    title: "Codziennie nowa siatka",
    text: "Wyzwanie dnia generuje się od nowa co 24 godziny — nie da się go rozegrać dwa razy na tym samym układzie.",
  },
];

export function Compliance() {
  return (
    <section className="section" id="fair-play">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">
            <ShieldIcon size={14} /> Zasady rywalizacji
          </span>
          <h2 className="balance">Rywalizacja oparta wyłącznie na umiejętnościach</h2>
        </div>

        <div className={styles.complianceGrid}>
          {POINTS.map((point) => (
            <div className={`card ${styles.complianceCard}`} key={point.title}>
              <CheckIcon />
              <div>
                <h3 style={{ fontSize: "1.05rem" }}>{point.title}</h3>
                <p className="mt-0">{point.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
