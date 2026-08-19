import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COLS = 9;
const ROWS = 4;
const CELL = 58;
const GAP = 8;
const GRID_X = 560;
const GRID_Y = 70;

function cellCenter(c: number, r: number) {
  return [GRID_X + c * (CELL + GAP) + CELL / 2, GRID_Y + r * (CELL + GAP) + CELL / 2];
}

// Ścieżka z generatora (0, 1) do odbiornika (8, 2) — te same proporcje co
// plansza w grywalnym demo, żeby okładka OG była spójna z resztą serwisu.
const PATH: [number, number][] = [
  [0, 1],
  [2, 1],
  [2, 2],
  [4, 2],
  [4, 0],
  [6, 0],
  [6, 2],
  [8, 2],
];

export default function OgImage() {
  const tiles = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const [x, y] = cellCenter(c, r);
      tiles.push(
        <rect
          key={`${c}-${r}`}
          x={x - CELL / 2}
          y={y - CELL / 2}
          width={CELL}
          height={CELL}
          rx={10}
          fill="none"
          stroke="#22315a"
        />
      );
    }
  }

  const segments = [];
  for (let i = 0; i < PATH.length - 1; i++) {
    const [x1, y1] = cellCenter(...PATH[i]);
    const [x2, y2] = cellCenter(...PATH[i + 1]);
    segments.push(
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#og-pulse)" strokeWidth={5} strokeLinecap="round" />
    );
  }

  const [sx, sy] = cellCenter(...PATH[0]);
  const [ex, ey] = cellCenter(...PATH[PATH.length - 1]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "linear-gradient(135deg,#0c1120 0%,#070a12 60%,#0a0f1e 100%)",
          padding: 72,
          position: "relative",
        }}
      >
        <svg width={1200} height={630} style={{ position: "absolute", top: 0, left: 0 }}>
          <defs>
            <linearGradient id="og-pulse" x1={GRID_X} y1={GRID_Y} x2={1150} y2={300} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4cf1e0" />
              <stop offset="100%" stopColor="#b39bff" />
            </linearGradient>
          </defs>
          {tiles}
          {segments}
          <circle cx={sx} cy={sy} r={14} fill="#ffb454" />
          <circle cx={ex} cy={ey} r={14} fill="none" stroke="#4cf1e0" strokeWidth={3} />
          <circle cx={ex} cy={ey} r={6} fill="#4cf1e0" />
        </svg>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 4,
            color: "#4cf1e0",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          Gra przeglądarkowa · Polska
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 62,
            color: "#eef2fb",
            fontWeight: 700,
            marginTop: 14,
            maxWidth: 980,
            fontFamily: "sans-serif",
          }}
        >
          Steruj siecią impulsów, zanim siatka się przeciąży
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#aab6d6", marginTop: 20, fontFamily: "sans-serif" }}>
          Gra logiczno-strategiczna w przeglądarce
        </div>
      </div>
    ),
    { ...size }
  );
}
