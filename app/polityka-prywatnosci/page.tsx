import type { Metadata } from "next";
import legal from "@/components/legal.module.css";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Zasady przetwarzania danych osobowych zgodnie z RODO w serwisie kewabort.online.",
  alternates: { canonical: "/polityka-prywatnosci" },
  robots: { index: true, follow: true },
};

export default function PolitykaPrywatnosciPage() {
  return (
    <div className={`wrap ${legal.page}`}>
      <div className={legal.header}>
        <span className="eyebrow">Dokument prawny</span>
        <h1 className="balance">Polityka prywatności</h1>
        <p className={legal.updated}>Ostatnia aktualizacja: 17 sierpnia 2026</p>
      </div>

      <div className={legal.prose}>
        <section>
          <h2>1. Administrator danych</h2>
          <p>
            Administratorem danych osobowych przetwarzanych w związku z korzystaniem z
            serwisu dostępnego pod adresem kewabort.online jest podmiot prowadzący ten
            serwis. Kontakt w sprawach ochrony danych:{" "}
            <a href="mailto:prywatnosc@kewabort.online">prywatnosc@kewabort.online</a>.
          </p>
        </section>

        <section>
          <h2>2. Jakie dane przetwarzamy</h2>
          <ul>
            <li>Dane techniczne niezbędne do działania gry: identyfikator sesji przeglądarki, zapisany lokalnie postęp kampanii, wybór motywu kolorystycznego.</li>
            <li>Dane konta — wyłącznie w zakresie potrzebnym do udziału w rankingu, Pojedynkach rankingowych i Turniejach tygodniowych (adres e-mail, pseudonim, historia wyników).</li>
            <li>Dane analityczne i reklamowe — wyłącznie po wyrażeniu zgody w banerze cookie, opisane w <a href="/polityka-cookie">polityce cookie</a>.</li>
          </ul>
        </section>

        <section>
          <h2>3. Podstawy i cele przetwarzania</h2>
          <ul>
            <li>Art. 6 ust. 1 lit. b RODO — świadczenie usługi rozgrywki i utrzymanie rankingu (wykonanie umowy).</li>
            <li>Art. 6 ust. 1 lit. a RODO — dane analityczne i reklamowe, na podstawie dobrowolnej zgody wyrażonej w banerze cookie.</li>
            <li>Art. 6 ust. 1 lit. f RODO — wykrywanie nadużyć i nieuczciwej gry w trybach rankingowych (prawnie uzasadniony interes).</li>
          </ul>
        </section>

        <section>
          <h2>4. Okres przechowywania</h2>
          <p>
            Dane konta i historii wyników przechowujemy do czasu usunięcia konta przez
            użytkownika lub przez 24 miesiące od ostatniej aktywności. Dane przetwarzane na
            podstawie zgody przechowujemy do jej wycofania.
          </p>
        </section>

        <section>
          <h2>5. Odbiorcy danych</h2>
          <p>
            Dane mogą być powierzane dostawcom infrastruktury hostingowej oraz — wyłącznie
            po wyrażeniu zgody — dostawcom usług analitycznych i reklamowych. Nie
            sprzedajemy danych osobowych.
          </p>
        </section>

        <section>
          <h2>6. Prawa użytkownika</h2>
          <p>
            Masz prawo do dostępu do swoich danych, ich sprostowania, usunięcia,
            ograniczenia przetwarzania, przenoszenia oraz wniesienia sprzeciwu, a także
            prawo wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych. Aby
            skorzystać z tych praw, napisz na{" "}
            <a href="mailto:prywatnosc@kewabort.online">prywatnosc@kewabort.online</a>.
          </p>
        </section>

        <section>
          <h2>7. Pliki cookie</h2>
          <p>
            Szczegółowe informacje o wykorzystywanych plikach cookie znajdziesz w{" "}
            <a href="/polityka-cookie">polityce cookie</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
