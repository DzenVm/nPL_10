"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  computeConnectivity,
  EAST,
  generatePuzzle,
  NORTH,
  openBits,
  rotateCell,
  SOUTH,
  WEST,
  type PulseGridState,
} from "@/lib/pulseGrid";
import { ClockIcon } from "./Icons";
import styles from "./PulseGridDemo.module.css";

const TIME_LIMIT = 60;

type Status = "playing" | "won" | "lost";

function CellGlyph({
  bits,
  role,
  active,
}: {
  bits: number;
  role: "source" | "sink" | "path" | "filler";
  active: boolean;
}) {
  const stroke = active ? "url(#pulseGradient)" : "var(--ink-3)";
  const points: string[] = [];
  if (bits & NORTH) points.push("M50 50 L50 4");
  if (bits & EAST) points.push("M50 50 L96 50");
  if (bits & SOUTH) points.push("M50 50 L50 96");
  if (bits & WEST) points.push("M50 50 L4 50");

  return (
    <svg className={styles.cellSvg} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--pulse-cyan)" />
          <stop offset="100%" stopColor="var(--pulse-violet)" />
        </linearGradient>
      </defs>
      {points.map((d, i) => (
        <path key={i} d={d} stroke={stroke} strokeWidth={active ? 9 : 7} strokeLinecap="round" fill="none" />
      ))}
      {role === "source" && (
        <>
          <circle cx="50" cy="50" r="17" fill="var(--pulse-amber)" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 50 + Math.cos(rad) * 21;
            const y1 = 50 + Math.sin(rad) * 21;
            const x2 = 50 + Math.cos(rad) * 28;
            const y2 = 50 + Math.sin(rad) * 28;
            return (
              <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--pulse-amber)" strokeWidth="3.5" strokeLinecap="round" />
            );
          })}
        </>
      )}
      {role === "sink" && (
        <>
          <circle cx="50" cy="50" r="20" fill="none" stroke="var(--pulse-cyan)" strokeWidth="3.5" opacity="0.5" />
          <circle cx="50" cy="50" r="10" fill="var(--pulse-cyan)" />
        </>
      )}
    </svg>
  );
}

export function PulseGridDemo() {
  const [puzzle, setPuzzle] = useState<PulseGridState | null>(null);
  const [status, setStatus] = useState<Status>("playing");
  const [secondsLeft, setSecondsLeft] = useState(TIME_LIMIT);
  const [moves, setMoves] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const announceRef = useRef<HTMLDivElement>(null);

  const newPuzzle = useCallback(() => {
    setPuzzle(generatePuzzle(Date.now() ^ Math.floor(Math.random() * 1e9)));
    setStatus("playing");
    setSecondsLeft(TIME_LIMIT);
    setMoves(0);
  }, []);

  useEffect(() => {
    // Plansza zawiera losowość, więc musi powstać po stronie klienta (po
    // montażu), inaczej HTML z serwera nigdy nie zgadzałby się z klientem.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    newPuzzle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status !== "playing" || !puzzle) return;
    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          setStatus((current) => (current === "playing" ? "lost" : current));
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [status, puzzle]);

  function handleCellClick(cellIndex: number) {
    if (!puzzle || status !== "playing") return;
    const cell = puzzle.cells[cellIndex];
    if (cell.fixed) return;

    const next = rotateCell(puzzle, cellIndex);
    setPuzzle(next);
    setMoves((m) => m + 1);

    const { solved } = computeConnectivity(next);
    if (solved) {
      setStatus("won");
      setBestTime((prev) => {
        const elapsed = TIME_LIMIT - secondsLeft;
        return prev === null ? elapsed : Math.min(prev, elapsed);
      });
      if (announceRef.current) {
        announceRef.current.textContent = "Połączenie ustanowione. Sieć aktywna.";
      }
    }
  }

  if (!puzzle) {
    return (
      <div className={styles.stage} aria-busy="true">
        <p className="text-ink-2">Generowanie planszy…</p>
      </div>
    );
  }

  const { energized } = computeConnectivity(puzzle);

  return (
    <div className={styles.wrapper}>
      <div className={styles.hud}>
        <div className={styles.hudGroup}>
          <div className={styles.stat}>
            <span>Czas</span>
            <span>
              <ClockIcon size={14} /> {String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:
              {String(secondsLeft % 60).padStart(2, "0")}
            </span>
          </div>
          <div className={styles.stat}>
            <span>Obroty</span>
            <span>{moves}</span>
          </div>
          <div className={styles.stat}>
            <span>Najlepszy czas</span>
            <span>{bestTime === null ? "—" : `${bestTime}s`}</span>
          </div>
        </div>
        <button type="button" className="btn btn-ghost" onClick={newPuzzle}>
          Nowy układ
        </button>
      </div>

      <div className={styles.stage}>
        <div
          className={styles.grid}
          style={{ ["--cols" as string]: puzzle.cols, ["--rows" as string]: puzzle.rows }}
        >
          {puzzle.cells.map((cell, i) => {
            const isEnergized = energized.has(i);
            const label =
              cell.role === "source"
                ? "Generator, źródło impulsu"
                : cell.role === "sink"
                ? "Odbiornik, cel trasy"
                : `Segment sieci, ${isEnergized ? "zasilony" : "niezasilony"}, obróć`;
            return (
              <button
                key={i}
                type="button"
                className={`${styles.cell} ${cell.fixed ? styles.fixed : ""} ${isEnergized ? styles.energized : ""}`}
                onClick={() => handleCellClick(i)}
                disabled={cell.fixed}
                aria-label={label}
              >
                <CellGlyph bits={openBits(cell)} role={cell.role} active={isEnergized} />
              </button>
            );
          })}
        </div>

        {status !== "playing" && (
          <div className={styles.overlay}>
            <h3>{status === "won" ? "Połączenie ustanowione!" : "Czas minął"}</h3>
            <p className="text-ink-2 mt-0">
              {status === "won"
                ? `Sieć zasilona w ${TIME_LIMIT - secondsLeft}s, przy ${moves} obrotach.`
                : "Siatka nie zdążyła się zasilić. Spróbuj ponownie z nowym układem."}
            </p>
            <button type="button" className="btn btn-primary" onClick={newPuzzle}>
              {status === "won" ? "Zagraj jeszcze raz" : "Spróbuj ponownie"}
            </button>
          </div>
        )}
      </div>

      <div className={styles.legend}>
        <span className={styles.legendItem}>
          <span className={styles.dotAmber} /> generator
        </span>
        <span className={styles.legendItem}>
          <span className={styles.dotCyan} /> odbiornik
        </span>
        <span className={styles.legendItem}>
          <span className={styles.dotGrey} /> segment do obrócenia
        </span>
      </div>

      <div ref={announceRef} className="visually-hidden" role="status" aria-live="polite" />
    </div>
  );
}
