import type { Metadata } from "next";
import legal from "@/components/legal.module.css";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Dane kontaktowe: zgłoszenia dotyczące gry, danych osobowych i spraw technicznych.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <div className={`wrap ${legal.page}`}>
      <div className={legal.header}>
        <span className="eyebrow">Kontakt</span>
        <h1 className="balance">Napisz do nas</h1>
      </div>

      <div className={legal.prose}>
        <section>
          <h2>Zgłoszenia ogólne i techniczne</h2>
          <p>
            W sprawach dotyczących rozgrywki, błędów technicznych oraz współpracy pisz na
            adres <a href="mailto:kontakt@kewabort.online">kontakt@kewabort.online</a>.
            Odpowiadamy zwykle w ciągu kilku dni roboczych.
          </p>
        </section>

        <section>
          <h2>Dane osobowe i RODO</h2>
          <p>
            W sprawach związanych z ochroną danych osobowych — w tym z realizacją praw
            opisanych w{" "}
            <a href="/polityka-prywatnosci">polityce prywatności</a> — napisz na adres{" "}
            <a href="mailto:prywatnosc@kewabort.online">prywatnosc@kewabort.online</a>.
          </p>
        </section>

        <section>
          <h2>Zgłaszanie nadużyć</h2>
          <p>
            Podejrzenie oszustwa, nieuczciwej gry w Pojedynkach rankingowych lub Turniejach
            tygodniowych zgłoś na adres{" "}
            <a href="mailto:uczciwa-gra@kewabort.online">uczciwa-gra@kewabort.online</a>,
            podając identyfikator rozgrywki, jeśli jest znany.
          </p>
        </section>
      </div>
    </div>
  );
}
