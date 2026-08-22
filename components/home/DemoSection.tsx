import { PulseGridDemo } from "@/components/PulseGridDemo";
import { generatePuzzle, randomSeed } from "@/lib/pulseGrid";
import styles from "./home.module.css";

export function DemoSection() {
  // Plansza jest wygenerowana tu, na serwerze, przy każdym żądaniu (strona
  // jest już renderowana per żądanie — patrz app/page.tsx) — dzięki temu
  // trafia od razu do znacznika HTML jako gotowa, grywalna siatka, zamiast
  // pojawiać się dopiero po stronie klienta.
  const initialPuzzle = generatePuzzle(randomSeed());

  return (
    <section className="section" id="demo">
      <div className="wrap">
        <div className={`section-head ${styles.demoIntro}`}>
          <span className="eyebrow">Podgląd rozgrywki</span>
          <h2 className="balance">Wypróbuj jeden układ siatki bezpośrednio tutaj</h2>
          <p>
            Poniższa plansza to działający fragment mechaniki, w który naprawdę można
            grać. Kliknij segment, aby go obrócić, i połącz bursztynowy generator z
            błękitnym odbiornikiem, zanim skończy się czas.
          </p>
        </div>

        <PulseGridDemo initialPuzzle={initialPuzzle} />

        <p className={styles.demoNote}>
          Pełna wersja gry dodaje do tego wzmacniacze, tłumiki i losowe węzły sabotujące
          (opisane niżej), a także kampanię, wyzwanie dnia, pojedynki rankingowe i turnieje
          tygodniowe.
        </p>
      </div>
    </section>
  );
}
