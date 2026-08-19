import { ClockIcon, TrophyIcon } from "@/components/Icons";
import type { getDailyChallenge } from "@/lib/daily";
import styles from "./home.module.css";

const RANK_TIERS = [
  { name: "Węzeł startowy", range: "0–399" },
  { name: "Dyspozytor", range: "400–899" },
  { name: "Operator regionalny", range: "900–1499" },
  { name: "Architekt sieci", range: "1500–2199" },
  { name: "Rdzeń systemu", range: "2200+" },
];

export function RankingAndDaily({ daily }: { daily: ReturnType<typeof getDailyChallenge> }) {
  return (
    <section className="section" id="rankingi">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Postęp i rywalizacja</span>
          <h2 className="balance">System rankingu i wyzwanie dnia</h2>
        </div>

        <div className={styles.splitGrid}>
          <div className="card">
            <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <TrophyIcon /> Ranking sezonowy
            </h3>
            <p>
              Każdy Pojedynek rankingowy i Turniej tygodniowy zmienia Twoją ocenę w skali
              podobnej do systemów Elo. Sezon trwa 8 tygodni, po czym ocena łagodnie
              resetuje się w stronę środka skali — dzięki temu nowy sezon zaczyna się na
              względnie równych zasadach.
            </p>
            <p className="mt-0">
              Wygląd siatki i skórki węzłów możesz zmieniać niezależnie od rangi — to
              personalizacja profilu, bez wpływu na samą rozgrywkę.
            </p>
            <div style={{ marginTop: "0.5rem" }}>
              {RANK_TIERS.map((tier) => (
                <div className={styles.rankRow} key={tier.name}>
                  <strong style={{ minWidth: "11rem" }}>{tier.name}</strong>
                  <span className="text-ink-2">{tier.range} pkt</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`card ${styles.dailyCard}`}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <ClockIcon /> Wyzwanie dnia
            </h3>
            <p className="mt-0">
              Układ siatki na dziś jest wygenerowany na serwerze z bieżącej daty — dokładnie
              ta sama plansza czeka na każdego gracza, który wejdzie na stronę w ciągu tej
              doby.
            </p>
            <div className={styles.dailyMeta}>
              <span className="pill">{daily.dayLabel}</span>
              <span className="pill">
                reset za {daily.hoursLeft} godz. {daily.minutesLeft} min
              </span>
            </div>
            <p className={styles.seed}>seed dnia: {daily.seed}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/wyzwanie-dnia.svg"
              alt="Kalendarz wyzwań dnia z odliczaniem do najbliższego resetu"
              width={1400}
              height={900}
              loading="lazy"
              style={{ borderRadius: "var(--radius-md)", border: "1px solid var(--line-soft)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
