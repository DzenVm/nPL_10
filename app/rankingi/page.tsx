import type { Metadata } from "next";
import Link from "next/link";
import legal from "@/components/legal.module.css";

export const metadata: Metadata = {
  title: "Rankingi — ocena sezonowa i progresja",
  description: "Jak działa ranking sezonowy: system oceny, progi rangowe i sezony.",
  alternates: { canonical: "/rankingi" },
};

const TIERS = [
  { name: "Węzeł startowy", range: "0–399", note: "Punkt wyjścia dla każdego nowego konta." },
  { name: "Dyspozytor", range: "400–899", note: "Stabilne wygrywanie Pojedynków rankingowych." },
  { name: "Operator regionalny", range: "900–1499", note: "Regularny udział w Turniejach tygodniowych." },
  { name: "Architekt sieci", range: "1500–2199", note: "Wysoka efektywność tras przy krótkim czasie." },
  { name: "Rdzeń systemu", range: "2200+", note: "Najwyższa ranga sezonu, dostępna dla nielicznych." },
];

export default function RankingiPage() {
  return (
    <div className={`wrap ${legal.page}`}>
      <div className={legal.header}>
        <span className="eyebrow">Rankingi</span>
        <h1 className="balance">Jak liczona jest ocena sezonowa</h1>
      </div>

      <div className={legal.prose}>
        <section>
          <h2>Zasada ogólna</h2>
          <p>
            Ocena zmienia się wyłącznie w wyniku Pojedynków rankingowych i Turniejów
            tygodniowych — kampania i Wyzwanie dnia mają własne, osobne tabele wyników i nie
            wpływają na rangę sezonową. System działa podobnie do skali Elo: wygrana z
            wyżej ocenianym przeciwnikiem daje więcej punktów niż wygrana z niżej
            ocenianym.
          </p>
        </section>

        <section>
          <h2>Progi rangowe</h2>
          <ul>
            {TIERS.map((tier) => (
              <li key={tier.name}>
                <strong>{tier.name}</strong> ({tier.range} pkt) — {tier.note}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Sezony</h2>
          <p>
            Sezon trwa 8 tygodni. Na koniec sezonu ocena każdego gracza łagodnie przesuwa
            się w stronę środka skali, dzięki czemu kolejny sezon zaczyna się na względnie
            wyrównanych warunkach, a wysoka ranga wymaga potwierdzenia w każdym sezonie od
            nowa.
          </p>
        </section>

        <section>
          <h2>Personalizacja</h2>
          <p>
            Niezależnie od rangi możesz zmieniać wygląd siatki i skórki węzłów — to
            personalizacja profilu, bez wpływu na przebieg rozgrywki. Zasady uczciwej
            rywalizacji opisujemy w sekcji{" "}
            <Link href="/#fair-play">zasady rywalizacji</Link> na stronie głównej.
          </p>
        </section>
      </div>
    </div>
  );
}
