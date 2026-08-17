import styles from "./home.module.css";

const STEPS = [
  {
    title: "Obróć segment",
    text: "Kliknij lub naciśnij Enter na segmencie, aby obrócić go o 90°. Każdy klik zmienia jego orientację.",
  },
  {
    title: "Połącz generator z odbiornikiem",
    text: "Bursztynowy generator musi połączyć się nieprzerwanym torem z błękitnym odbiornikiem.",
  },
  {
    title: "Obserwuj aktywny tor na żywo",
    text: "Segmenty połączone z generatorem świecą gradientem — od razu widać, która część sieci już działa.",
  },
  {
    title: "Zdąż przed upływem czasu",
    text: "Każdy poziom ma własny limit czasu. W kampanii rośnie presja, w wyzwaniu dnia liczy się też szybkość.",
  },
  {
    title: "Myśl o mocy, nie tylko o połączeniu",
    text: "Wzmacniacze i tłumiki zmieniają wynik końcowy, nawet jeśli tor już łączy generator z odbiornikiem — czasem opłaca się poprowadzić trasę okrężną.",
  },
];

export function HowToPlay() {
  return (
    <section className="section" id="jak-grac">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Zasady krok po kroku</span>
          <h2 className="balance">Jak grać</h2>
        </div>

        <div className={styles.stepList}>
          {STEPS.map((step, i) => (
            <div className={styles.step} key={step.title}>
              <span className={styles.stepNum} aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p className="mt-0">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
