import { CheckIcon, ShieldIcon } from "@/components/Icons";
import styles from "./home.module.css";

const POINTS = [
  {
    title: "Bez hazardu i zakładów",
    text: "Żaden element gry nie jest wymienialny na prawdziwe pieniądze ani inną wartość materialną.",
  },
  {
    title: "Wynik zależy od umiejętności",
    text: "Ranking i progresja opierają się na czasie rozwiązania oraz efektywności trasy, nie na losowości.",
  },
  {
    title: "Nagrody wyłącznie kosmetyczne",
    text: "Sezonowe i turniejowe nagrody to warianty kolorystyczne siatki oraz skórki węzłów.",
  },
  {
    title: "Klasyfikacja PEGI 3",
    text: "Gra nie zawiera przemocy ani treści nieodpowiednich dla młodszych odbiorców.",
  },
  {
    title: "Zgodność z RODO",
    text: "Dane analityczne i reklamowe przetwarzamy wyłącznie po uzyskaniu zgody — patrz polityka prywatności.",
  },
  {
    title: "Przejrzysty model finansowania",
    text: "Gra jest darmowa; rozwój finansują nieinwazyjne reklamy i opcjonalne dodatki kosmetyczne.",
  },
];

export function Compliance() {
  return (
    <section className="section" id="fair-play">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">
            <ShieldIcon size={14} /> Fair play i zgodność
          </span>
          <h2 className="balance">Gra bez hazardu, oparta na umiejętnościach</h2>
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
