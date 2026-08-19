import type { Metadata } from "next";
import legal from "@/components/legal.module.css";

export const metadata: Metadata = {
  title: "Regulamin",
  description: "Regulamin korzystania z gry: zasady rozgrywki, konta i rankingu sezonowego.",
  alternates: { canonical: "/regulamin" },
};

export default function RegulaminPage() {
  return (
    <div className={`wrap ${legal.page}`}>
      <div className={legal.header}>
        <span className="eyebrow">Dokument prawny</span>
        <h1 className="balance">Regulamin</h1>
        <p className={legal.updated}>Ostatnia aktualizacja: 17 sierpnia 2026</p>
      </div>

      <div className={legal.prose}>
        <section>
          <h2>1. Postanowienia ogólne</h2>
          <p>
            Regulamin określa zasady korzystania z gry przeglądarkowej dostępnej pod
            adresem kewabort.online („gra”). Korzystanie z gry oznacza akceptację
            niniejszego regulaminu.
          </p>
        </section>

        <section>
          <h2>2. Charakter gry</h2>
          <ul>
            <li>Gra jest dostępna w przeglądarce, bez konieczności instalacji dodatkowego oprogramowania.</li>
            <li>Wynik w każdym trybie zależy wyłącznie od umiejętności gracza — czasu rozwiązania i efektywności trasy.</li>
            <li>Gra nie zawiera treści nieodpowiednich dla młodszych odbiorców.</li>
          </ul>
        </section>

        <section>
          <h2>3. Konto gracza</h2>
          <p>
            Kampanię i Wyzwanie dnia można rozgrywać bez zakładania konta. Konto jest
            wymagane wyłącznie do udziału w Pojedynkach rankingowych, Turniejach
            tygodniowych oraz do zapisywania wyniku w rankingu sezonowym. Jeden gracz może
            posiadać jedno konto; wielokrotna rejestracja w celu obejścia zasad rankingu
            jest zabroniona.
          </p>
        </section>

        <section>
          <h2>4. Ranking i personalizacja</h2>
          <p>
            Ranking sezonowy oblicza się na podstawie wyników Pojedynków rankingowych i
            Turniejów tygodniowych, w cyklach ośmiotygodniowych sezonów. Wygląd siatki i
            węzłów można zmieniać niezależnie od rangi — to wyłącznie personalizacja
            profilu, bez wpływu na przebieg rozgrywki.
          </p>
        </section>

        <section>
          <h2>5. Zasady fair play</h2>
          <p>
            Zabronione jest wykorzystywanie oprogramowania automatyzującego rozgrywkę,
            wielokrotnych kont w trybach rankingowych oraz jakichkolwiek działań mających
            na celu sztuczne zawyżenie wyniku. Naruszenie tych zasad może skutkować
            usunięciem wyników z rankingu lub zablokowaniem konta.
          </p>
        </section>

        <section>
          <h2>6. Reklamacje</h2>
          <p>
            Reklamacje dotyczące działania gry można zgłaszać na adres{" "}
            <a href="mailto:kontakt@kewabort.online">kontakt@kewabort.online</a>.
            Rozpatrujemy je w terminie 14 dni od zgłoszenia.
          </p>
        </section>

        <section>
          <h2>7. Zmiany regulaminu</h2>
          <p>
            Regulamin może być aktualizowany, w szczególności wraz z wprowadzaniem nowych
            trybów gry. O istotnych zmianach informujemy z odpowiednim wyprzedzeniem na tej
            stronie.
          </p>
        </section>
      </div>
    </div>
  );
}
