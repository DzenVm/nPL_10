import type { Metadata } from "next";
import Link from "next/link";
import { NODE_TYPES, REGIONS } from "@/lib/gameContent";
import legal from "@/components/legal.module.css";
import styles from "@/components/home/home.module.css";

export const metadata: Metadata = {
  title: "O grze — mechanika, świat i zasady",
  description:
    "Pełny opis mechaniki gry: świat mikrosieci energii, rola dyspozytora, typy węzłów i sześć regionów kampanii.",
  alternates: { canonical: "/o-grze" },
};

export default function OGrzePage() {
  return (
    <div className={`wrap ${legal.page}`}>
      <div className={legal.header}>
        <span className="eyebrow">O grze</span>
        <h1 className="balance">Świat mikrosieci i rola dyspozytora</h1>
      </div>

      <div className={legal.prose}>
        <section>
          <h2>Scenariusz</h2>
          <p>
            Miejska sieć energetyczna została podzielona na dziesiątki niezależnych
            mikrosieci — mniejsze awarie nie gasną całego miasta, ale każda mikrosieć
            potrzebuje kogoś, kto ręcznie poprowadzi impuls od generatora do odbiornika,
            zanim przeciążenie odłączy sektor. Tą osobą jest gracz — dyspozytor.
          </p>
          <p>
            Rozgrywka toczy się na planszy złożonej z obracanych segmentów. Zadanie zawsze
            brzmi tak samo: doprowadź impuls do celu, zanim skończy się czas. To, co się
            zmienia między poziomami, to liczba węzłów, ich typy oraz to, czy siatka sama
            próbuje Ci przeszkodzić.
          </p>
        </section>

        <section>
          <h2>Pięć typów węzłów</h2>
          <ul>
            {NODE_TYPES.map((node) => (
              <li key={node.key}>
                <strong>{node.label}</strong> — {node.description}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Sześć regionów kampanii</h2>
          <p>
            Kampania wprowadza mechaniki stopniowo — każdy region dodaje dokładnie jedną
            nową zasadę, dzięki czemu trudność rośnie w przewidywalnym tempie.
          </p>
          <ol>
            {REGIONS.map((region) => (
              <li key={region.name}>
                <strong>{region.name}</strong> — {region.note}
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2>Poza kampanią</h2>
          <p>
            Gdy skończysz kampanię — albo po prostu chcesz szybkiej rundy — do dyspozycji
            są jeszcze trzy tryby: codzienne <Link href="/tryby-gry">Wyzwanie dnia</Link>,
            asynchroniczne Pojedynki rankingowe oraz cotygodniowe Turnieje. Wszystkie
            opisaliśmy szczegółowo na stronie{" "}
            <Link href="/tryby-gry">trybów gry</Link>.
          </p>
        </section>

        <section>
          <h2>Zasady w skrócie</h2>
          <p className={styles.demoNote} style={{ maxWidth: "none" }}>
            Grę można wypróbować bezpośrednio na{" "}
            <Link href="/#demo">stronie głównej</Link> — działający fragment mechaniki bez
            zakładania konta.
          </p>
        </section>
      </div>
    </div>
  );
}
