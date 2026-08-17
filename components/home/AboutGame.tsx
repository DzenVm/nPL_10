import { REGIONS } from "@/lib/gameContent";
import styles from "./home.module.css";

export function AboutGame() {
  return (
    <section className="section" id="o-grze">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Czym jest ta gra</span>
          <h2 className="balance">Zarządzasz siecią energii, zanim zrobi to za Ciebie awaria</h2>
        </div>

        <div className={styles.aboutGrid}>
          <div className="stack" style={{ gap: "1rem" }}>
            <p>
              Akcja rozgrywa się w niedalekiej przyszłości, w której miejskie sieci energii
              zostały podzielone na małe, niezależne mikrosieci. Gracz wciela się w
              dyspozytora — osobę odpowiedzialną za to, by impuls z generatora zawsze
              dotarł do odbiornika, zanim przeciążenie odłączy cały sektor.
            </p>
            <p>
              Na każdym poziomie plansza to siatka segmentów, które można obracać o 90°.
              Zadanie brzmi prosto: połącz generator z odbiornikiem. W praktyce komplikują
              je wzmacniacze podbijające moc impulsu, tłumiki ją obniżające oraz węzły
              sabotujące, które w wyższych regionach potrafią same odwrócić segment w
              trakcie rundy.
            </p>
            <p>
              Kampania prowadzi przez sześć fikcyjnych regionów mikrosieci — każdy
              wprowadza dokładnie jedną nową zasadę, więc trudność rośnie stopniowo, a nie
              skokowo.
            </p>
          </div>

          <div className="card">
            <h3 style={{ marginBottom: "0.75rem" }}>Regiony kampanii</h3>
            <div className={styles.regionList}>
              {REGIONS.map((region, i) => (
                <div className={styles.regionRow} key={region.name}>
                  <span className={styles.regionIndex}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{region.name}</strong>
                    <span>{region.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
