import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const nodes = [
  { x: 90, y: 120, c: "#ffb454" },
  { x: 230, y: 60, c: "#4cf1e0" },
  { x: 340, y: 190, c: "#4cf1e0" },
  { x: 470, y: 90, c: "#b39bff" },
  { x: 560, y: 220, c: "#4cf1e0" },
  { x: 700, y: 70, c: "#ffb454" },
  { x: 800, y: 200, c: "#4cf1e0" },
  { x: 940, y: 110, c: "#b39bff" },
  { x: 1050, y: 210, c: "#4cf1e0" },
  { x: 150, y: 300, c: "#4cf1e0" },
  { x: 420, y: 340, c: "#ffb454" },
  { x: 680, y: 320, c: "#4cf1e0" },
  { x: 960, y: 340, c: "#4cf1e0" },
];

export default function OgImage() {
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
        <svg
          width="1200"
          height="630"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          {nodes.map((n, i) =>
            nodes.slice(i + 1).map((m, j) =>
              Math.abs(n.x - m.x) < 220 && Math.abs(n.y - m.y) < 140 ? (
                <line
                  key={`${i}-${j}`}
                  x1={n.x}
                  y1={n.y}
                  x2={m.x}
                  y2={m.y}
                  stroke="#22315a"
                  strokeWidth={1.5}
                />
              ) : null
            )
          )}
          {nodes.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r={n.c === "#ffb454" ? 8 : 6} fill={n.c} />
          ))}
        </svg>
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, color: "#4cf1e0", textTransform: "uppercase", fontFamily: "sans-serif" }}>
          Gra przeglądarkowa · Polska
        </div>
        <div style={{ display: "flex", fontSize: 62, color: "#eef2fb", fontWeight: 700, marginTop: 14, maxWidth: 980, fontFamily: "sans-serif" }}>
          Steruj siecią impulsów, zanim siatka się przeciąży
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#aab6d6", marginTop: 20, fontFamily: "sans-serif" }}>
          Darmowa gra logiczno-strategiczna w przeglądarce
        </div>
      </div>
    ),
    { ...size }
  );
}
