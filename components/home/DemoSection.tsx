import { PulseGridDemo } from "@/components/PulseGridDemo";
import styles from "./home.module.css";

export function DemoSection() {
  return (
    <section className="section" id="demo">
      <div className="wrap">
        <div className={`section-head ${styles.demoIntro}`}>
          <span className="eyebrow">Podgląd rozgrywki</span>
          <h2 className="balance">Wypróbuj jeden układ siatki bezpośrednio tutaj</h2>
          <p>
            To w pełni działający, uproszczony fragment mechaniki gry — nie nagranie ani
            zrzut ekranu. Kliknij segment, aby go obrócić, i połącz bursztynowy generator
            z błękitnym odbiornikiem, zanim skończy się czas.
          </p>
        </div>

        <PulseGridDemo />

        <p className={styles.demoNote}>
          Pełna wersja gry rozszerza tę mechanikę o wzmacniacze, tłumiki i losowe węzły
          sabotujące — opisane w sekcjach niżej — oraz o kampanię, wyzwanie dnia, pojedynki
          rankingowe i turnieje tygodniowe.
        </p>
      </div>
    </section>
  );
}
