import type { Metadata } from "next";
import legal from "@/components/legal.module.css";

export const metadata: Metadata = {
  title: "Polityka cookie",
  description: "Jakie pliki cookie wykorzystujemy, w jakim celu i jak zarządzać zgodą.",
  alternates: { canonical: "/polityka-cookie" },
};

const COOKIE_ROWS = [
  {
    name: "Niezbędne",
    example: "postęp kampanii, wybrany motyw, decyzja o zgodzie cookie",
    base: "art. 6 ust. 1 lit. f RODO — prawnie uzasadniony interes (działanie serwisu)",
  },
  {
    name: "Analityczne",
    example: "statystyki odwiedzin i użycia poszczególnych trybów gry",
    base: "art. 6 ust. 1 lit. a RODO — zgoda",
  },
  {
    name: "Reklamowe",
    example: "pomiar skuteczności kampanii reklamowych, w tym Google Ads",
    base: "art. 6 ust. 1 lit. a RODO — zgoda",
  },
];

export default function PolitykaCookiePage() {
  return (
    <div className={`wrap ${legal.page}`}>
      <div className={legal.header}>
        <span className="eyebrow">Dokument prawny</span>
        <h1 className="balance">Polityka cookie</h1>
        <p className={legal.updated}>Ostatnia aktualizacja: 17 sierpnia 2026</p>
      </div>

      <div className={legal.prose}>
        <section>
          <h2>1. Czym są pliki cookie</h2>
          <p>
            Pliki cookie to niewielkie pliki tekstowe zapisywane w Twojej przeglądarce.
            Używamy ich do zapamiętania postępu w grze oraz — po Twojej zgodzie — do
            celów analitycznych i reklamowych.
          </p>
        </section>

        <section>
          <h2>2. Rodzaje wykorzystywanych cookie</h2>
          <ul>
            {COOKIE_ROWS.map((row) => (
              <li key={row.name}>
                <strong>{row.name}</strong> — {row.example}. Podstawa prawna: {row.base}.
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>3. Google Consent Mode</h2>
          <p>
            Zanim podejmiesz decyzję w banerze cookie, wszystkie sygnały reklamowe i
            analityczne są domyślnie ustawione na „odmówiono”. Po wyrażeniu zgody status
            zmienia się na „udzielono” zgodnie z Google Consent Mode v2. Zgodę możesz
            wycofać w dowolnym momencie, zmieniając ustawienia przeglądarki lub czyszcząc
            dane strony.
          </p>
        </section>

        <section>
          <h2>4. Zarządzanie zgodą</h2>
          <p>
            Banner cookie pojawia się przy pierwszej wizycie. Możesz zaakceptować
            wszystkie kategorie lub ograniczyć się do niezbędnych. Aby zmienić decyzję,
            wyczyść dane strony w ustawieniach przeglądarki — baner pojawi się ponownie.
          </p>
        </section>

        <section>
          <h2>5. Kontakt</h2>
          <p>
            Pytania dotyczące plików cookie kieruj na adres{" "}
            <a href="mailto:prywatnosc@kewabort.online">prywatnosc@kewabort.online</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
