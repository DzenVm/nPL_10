import type { Metadata } from "next";
import Link from "next/link";
import { GAME_MODES } from "@/lib/gameContent";
import legal from "@/components/legal.module.css";

export const metadata: Metadata = {
  title: "Tryby gry — kampania, wyzwanie dnia, pojedynki, turnieje",
  description:
    "Szczegółowy opis czterech trybów gry: kampanii regionów, codziennego wyzwania, asynchronicznych pojedynków rankingowych i cotygodniowych turniejów.",
  alternates: { canonical: "/tryby-gry" },
};

const DETAILS: Record<string, string[]> = {
  kampania: [
    "60 poziomów podzielonych na sześć regionów po 10 poziomów każdy.",
    "Każdy region wprowadza jedną nową mechanikę: wzmacniacze, tłumiki, rozgałęzienia, limit czasu, węzły sabotujące.",
    "Postęp zapisuje się lokalnie — możesz wrócić do kampanii w dowolnym momencie.",
  ],
  "wyzwanie-dnia": [
    "Układ siatki generowany raz na dobę na podstawie bieżącej daty w strefie Europe/Warsaw.",
    "Wszyscy gracze danego dnia mierzą się z identyczną planszą — ranking dzienny liczy czas i liczbę obrotów.",
    "Reset o północy czasu środkowoeuropejskiego, więc każdego dnia czeka nowe wyzwanie.",
  ],
  pojedynek: [
    "Dwóch graczy dostaje dokładnie tę samą wygenerowaną siatkę.",
    "Rozgrywka jest asynchroniczna — nie trzeba grać w tym samym momencie co przeciwnik.",
    "Wygrywa krótszy czas rozwiązania przy mniejszej liczbie obrotów; wynik wpływa na ocenę sezonową.",
  ],
  turniej: [
    "Drabinka pucharowa rozgrywana w ciągu tygodnia, zapisy dobrowolne dla każdego konta.",
    "Każda runda to osobno wygenerowana siatka — awans do kolejnej rundy zależy wyłącznie od wyniku.",
    "Ranga zdobyta w finale liczy się do rankingu sezonowego.",
  ],
};

export default function TrybyGryPage() {
  return (
    <div className={`wrap ${legal.page}`}>
      <div className={legal.header}>
        <span className="eyebrow">Tryby gry</span>
        <h1 className="balance">Cztery sposoby na rozegranie siatki impulsów</h1>
      </div>

      <div className={legal.prose}>
        {GAME_MODES.map((mode) => (
          <section key={mode.key}>
            <h2>{mode.title}</h2>
            <p>{mode.description}</p>
            <ul>
              {DETAILS[mode.key].map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        ))}

        <section>
          <h2>Zaczynamy?</h2>
          <p>
            Kampanię i Wyzwanie dnia można rozegrać bez zakładania konta —{" "}
            <Link href="/#demo">wróć na stronę główną</Link>, żeby wypróbować mechanikę, albo
            sprawdź, jak liczony jest wynik, na stronie{" "}
            <Link href="/rankingi">rankingów</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
