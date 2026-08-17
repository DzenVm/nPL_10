#!/usr/bin/env node
// Proceduralny generator ilustracji SVG dla galerii na stronie głównej.
// Deterministyczny (seed -> ten sam wynik), bez zewnętrznych bibliotek grafiki
// i bez żadnych zasobów zewnętrznych — cała grafika to wygenerowana geometria.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "images");
mkdirSync(OUT_DIR, { recursive: true });

const PALETTE = {
  bg0: "#070a12",
  bg1: "#0c1120",
  bg2: "#111a30",
  line: "#22315a",
  cyan: "#4cf1e0",
  amber: "#ffb454",
  violet: "#b39bff",
  rose: "#ff6b81",
  ink1: "#eef2fb",
  ink3: "#7482a8",
};

function mulberry32(seed) {
  let a = seed >>> 0;
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFromString(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

function svgDoc(width, height, body, { title, desc } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${title ?? ""}">
${title ? `<title>${title}</title>` : ""}
${desc ? `<desc>${desc}</desc>` : ""}
${body}
</svg>`;
}

function backdrop(width, height, id) {
  return `<defs>
  <radialGradient id="bgrad-${id}" cx="18%" cy="0%" r="95%">
    <stop offset="0%" stop-color="${PALETTE.bg2}"/>
    <stop offset="55%" stop-color="${PALETTE.bg1}"/>
    <stop offset="100%" stop-color="${PALETTE.bg0}"/>
  </radialGradient>
  <linearGradient id="pulse-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="${PALETTE.cyan}"/>
    <stop offset="100%" stop-color="${PALETTE.violet}"/>
  </linearGradient>
  <filter id="glow-${id}" x="-60%" y="-60%" width="220%" height="220%">
    <feGaussianBlur stdDeviation="6" result="blur"/>
    <feMerge>
      <feMergeNode in="blur"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
</defs>
<rect width="${width}" height="${height}" fill="url(#bgrad-${id})"/>`;
}

function scatterParticles(rand, width, height, count, color) {
  let out = "";
  for (let i = 0; i < count; i++) {
    const x = rand() * width;
    const y = rand() * height;
    const r = 0.6 + rand() * 1.8;
    const o = 0.15 + rand() * 0.35;
    out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" fill="${color}" opacity="${o.toFixed(2)}"/>\n`;
  }
  return out;
}

// 1) Siatka główna — węzły i połączenia impulsów energii.
function imageGridOverview(seed) {
  const rand = mulberry32(seed);
  const W = 1600, H = 1000, id = "grid";
  const cols = 12, rows = 8;
  const padX = 140, padY = 120;
  const cellW = (W - padX * 2) / (cols - 1);
  const cellH = (H - padY * 2) / (rows - 1);
  const nodeTypes = [
    { color: PALETTE.amber, weight: 0.16 },
    { color: PALETTE.cyan, weight: 0.16 },
    { color: PALETTE.violet, weight: 0.1 },
    { color: PALETTE.ink3, weight: 0.58 },
  ];
  const nodes = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const jitterX = (rand() - 0.5) * cellW * 0.35;
      const jitterY = (rand() - 0.5) * cellH * 0.35;
      const x = padX + c * cellW + jitterX;
      const y = padY + r * cellH + jitterY;
      let roll = rand(), acc = 0, type = nodeTypes[nodeTypes.length - 1];
      for (const t of nodeTypes) {
        acc += t.weight;
        if (roll <= acc) { type = t; break; }
      }
      nodes.push({ x, y, r: r === Math.floor(rows/2) && c === Math.floor(cols/2) ? 8 : 3 + rand() * 3, color: type.color });
    }
  }
  const idx = (c, r) => r * cols + c;
  let edges = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (c < cols - 1 && rand() > 0.28) {
        const a = nodes[idx(c, r)], b = nodes[idx(c + 1, r)];
        edges += line(a, b, rand);
      }
      if (r < rows - 1 && rand() > 0.32) {
        const a = nodes[idx(c, r)], b = nodes[idx(c, r + 1)];
        edges += line(a, b, rand);
      }
    }
  }
  function line(a, b, rand) {
    const active = rand() > 0.72;
    const stroke = active ? `url(#pulse-${id})` : PALETTE.line;
    const width = active ? 2.4 : 1;
    const op = active ? 0.95 : 0.55;
    return `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="${stroke}" stroke-width="${width}" opacity="${op}" ${active ? `filter="url(#glow-${id})"` : ""}/>\n`;
  }
  const dots = nodes.map(n => `<circle cx="${n.x.toFixed(1)}" cy="${n.y.toFixed(1)}" r="${n.r.toFixed(1)}" fill="${n.color}" ${n.r > 6 ? `filter="url(#glow-${id})"` : ""}/>`).join("\n");
  const body = `${backdrop(W, H, id)}
${scatterParticles(rand, W, H, 70, PALETTE.ink3)}
<g>${edges}</g>
<g>${dots}</g>`;
  return svgDoc(W, H, body, { title: "Wizualizacja siatki węzłów i impulsów energii", desc: "Abstrakcyjna wizualizacja rozgrywki: węzły połączone aktywnymi ścieżkami impulsów." });
}

// 2) Typy węzłów — cztery symbole roli w rzędzie.
function imageNodeTypes(seed) {
  const rand = mulberry32(seed);
  const W = 1400, H = 900, id = "nodes";
  const items = [
    { label: "Generator", sub: "źródło impulsu", color: PALETTE.amber, glyph: "sun" },
    { label: "Odbiornik", sub: "cel trasy", color: PALETTE.cyan, glyph: "target" },
    { label: "Wzmacniacz", sub: "podwaja moc", color: PALETTE.violet, glyph: "chevrons" },
    { label: "Tłumik", sub: "spowalnia falę", color: PALETTE.ink3, glyph: "wave" },
  ];
  const cardW = 280, gap = 40;
  const totalW = items.length * cardW + (items.length - 1) * gap;
  const startX = (W - totalW) / 2;
  const cy = H / 2 - 20;

  function glyph(item, cx) {
    switch (item.glyph) {
      case "sun": {
        let rays = "";
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2;
          const x1 = cx + Math.cos(a) * 46, y1 = cy + Math.sin(a) * 46;
          const x2 = cx + Math.cos(a) * 68, y2 = cy + Math.sin(a) * 68;
          rays += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${item.color}" stroke-width="4" stroke-linecap="round"/>`;
        }
        return `${rays}<circle cx="${cx}" cy="${cy}" r="38" fill="${item.color}" filter="url(#glow-${id})"/>`;
      }
      case "target":
        return `<circle cx="${cx}" cy="${cy}" r="60" fill="none" stroke="${item.color}" stroke-width="3" opacity="0.35"/>
<circle cx="${cx}" cy="${cy}" r="40" fill="none" stroke="${item.color}" stroke-width="3" opacity="0.65"/>
<circle cx="${cx}" cy="${cy}" r="18" fill="${item.color}" filter="url(#glow-${id})"/>`;
      case "chevrons": {
        let out = "";
        [-24, 6, 36].forEach((dy, i) => {
          out += `<path d="M ${cx - 34} ${cy + dy - 16} L ${cx} ${cy + dy + 6} L ${cx - 34} ${cy + dy + 28}" fill="none" stroke="${item.color}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" opacity="${0.45 + i * 0.25}"/>`;
        });
        return out;
      }
      case "wave":
        return `<path d="M ${cx - 70} ${cy} Q ${cx - 45} ${cy - 46} ${cx - 20} ${cy} T ${cx + 30} ${cy} T ${cx + 80} ${cy}" fill="none" stroke="${item.color}" stroke-width="4" opacity="0.85"/>
<path d="M ${cx - 70} ${cy} Q ${cx - 45} ${cy - 20} ${cx - 20} ${cy} T ${cx + 30} ${cy} T ${cx + 80} ${cy}" fill="none" stroke="${item.color}" stroke-width="4" opacity="0.4"/>`;
      default:
        return "";
    }
  }

  let cards = "";
  items.forEach((item, i) => {
    const x = startX + i * (cardW + gap);
    const cx = x + cardW / 2;
    cards += `<g>
<rect x="${x}" y="${H/2 - 210}" width="${cardW}" height="420" rx="26" fill="${PALETTE.bg2}" stroke="${PALETTE.line}" stroke-width="1.5"/>
${glyph(item, cx)}
<text x="${cx}" y="${H/2 + 150}" text-anchor="middle" font-family="sans-serif" font-size="26" font-weight="700" fill="${PALETTE.ink1}">${item.label}</text>
<text x="${cx}" y="${H/2 + 182}" text-anchor="middle" font-family="sans-serif" font-size="16" fill="${PALETTE.ink3}">${item.sub}</text>
</g>`;
  });

  const body = `${backdrop(W, H, id)}
${scatterParticles(rand, W, H, 40, PALETTE.ink3)}
${cards}`;
  return svgDoc(W, H, body, { title: "Cztery typy węzłów w grze", desc: "Ilustracja przedstawiająca generator, odbiornik, wzmacniacz i tłumik." });
}

// 3) Panel rankingowy — abstrakcyjny wykres formy i lista pozycji.
function imageRankingPanel(seed) {
  const rand = mulberry32(seed);
  const W = 1400, H = 900, id = "rank";
  const chartX = 90, chartY = 90, chartW = 760, chartH = 420;
  let points = [];
  let v = 0.35;
  const n = 22;
  for (let i = 0; i < n; i++) {
    v += (rand() - 0.42) * 0.12;
    v = Math.max(0.08, Math.min(0.95, v));
    points.push(v);
  }
  const step = chartW / (n - 1);
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${(chartX + i * step).toFixed(1)} ${(chartY + chartH - p * chartH).toFixed(1)}`).join(" ");
  const area = `${path} L ${(chartX + chartW).toFixed(1)} ${(chartY + chartH).toFixed(1)} L ${chartX} ${(chartY + chartH).toFixed(1)} Z`;

  let gridLines = "";
  for (let i = 0; i <= 4; i++) {
    const y = chartY + (chartH / 4) * i;
    gridLines += `<line x1="${chartX}" y1="${y}" x2="${chartX + chartW}" y2="${y}" stroke="${PALETTE.line}" stroke-width="1" opacity="0.5"/>`;
  }

  const rows = 6;
  const listX = chartX + chartW + 60;
  const listW = W - listX - 70;
  let list = "";
  for (let i = 0; i < rows; i++) {
    const y = chartY + i * 62;
    const barW = listW * (0.35 + rand() * 0.6);
    const highlight = i === 0;
    list += `<g>
<circle cx="${listX + 16}" cy="${y + 20}" r="15" fill="${highlight ? PALETTE.amber : PALETTE.bg2}" stroke="${PALETTE.line}"/>
<text x="${listX + 16}" y="${y + 25}" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="${highlight ? PALETTE.bg0 : PALETTE.ink2 || PALETTE.ink3}">${i + 1}</text>
<rect x="${listX + 44}" y="${y + 8}" width="${barW.toFixed(1)}" height="24" rx="12" fill="${highlight ? "url(#pulse-" + id + ")" : PALETTE.bg2}" opacity="${highlight ? 0.95 : 0.8}"/>
</g>`;
  }

  const body = `${backdrop(W, H, id)}
${scatterParticles(rand, W, H, 50, PALETTE.ink3)}
${gridLines}
<path d="${area}" fill="url(#pulse-${id})" opacity="0.14"/>
<path d="${path}" fill="none" stroke="url(#pulse-${id})" stroke-width="3.5" filter="url(#glow-${id})"/>
${list}
<text x="${chartX}" y="${chartY - 26}" font-family="sans-serif" font-size="20" font-weight="700" fill="${PALETTE.ink1}">Krzywa formy sezonu</text>
<text x="${listX + 44}" y="${chartY - 26}" font-family="sans-serif" font-size="20" font-weight="700" fill="${PALETTE.ink1}">Tabela pozycji</text>`;
  return svgDoc(W, H, body, { title: "Panel rankingowy sezonu", desc: "Abstrakcyjna wizualizacja krzywej rankingu i tabeli pozycji." });
}

// 4) Wyzwanie dnia — kalendarz + odliczanie.
function imageDailyChallenge(seed) {
  const rand = mulberry32(seed);
  const W = 1400, H = 900, id = "daily";
  const cols = 7, rows = 4;
  const cell = 80, gap = 14;
  const gridW = cols * cell + (cols - 1) * gap;
  const startX = 110, startY = 140;
  const todayIndex = 16;
  let cells = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      const x = startX + c * (cell + gap);
      const y = startY + r * (cell + gap);
      const isToday = i === todayIndex;
      cells += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="16" fill="${isToday ? "url(#pulse-" + id + ")" : PALETTE.bg2}" stroke="${isToday ? "none" : PALETTE.line}" ${isToday ? `filter="url(#glow-${id})"` : ""} opacity="${isToday ? 0.95 : 0.7 + rand() * 0.2}"/>`;
      if (isToday) {
        cells += `<circle cx="${x + cell/2}" cy="${y + cell/2}" r="10" fill="${PALETTE.bg0}"/>`;
      }
    }
  }
  const cx = startX + gridW + 190;
  const cy = startY + (rows * cell + (rows - 1) * gap) / 2;
  const R = 130;
  const circumference = 2 * Math.PI * R;
  const progress = 0.62;
  const ticks = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2 - Math.PI / 2;
    const r1 = R + 18, r2 = R + (i % 6 === 0 ? 34 : 26);
    return `<line x1="${(cx + Math.cos(a) * r1).toFixed(1)}" y1="${(cy + Math.sin(a) * r1).toFixed(1)}" x2="${(cx + Math.cos(a) * r2).toFixed(1)}" y2="${(cy + Math.sin(a) * r2).toFixed(1)}" stroke="${PALETTE.ink3}" stroke-width="2" opacity="0.5"/>`;
  }).join("");

  const body = `${backdrop(W, H, id)}
${scatterParticles(rand, W, H, 40, PALETTE.ink3)}
${cells}
${ticks}
<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${PALETTE.line}" stroke-width="14"/>
<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="url(#pulse-${id})" stroke-width="14" stroke-linecap="round"
  stroke-dasharray="${circumference.toFixed(1)}" stroke-dashoffset="${(circumference * (1 - progress)).toFixed(1)}"
  transform="rotate(-90 ${cx} ${cy})" filter="url(#glow-${id})"/>
<text x="${cx}" y="${cy - 6}" text-anchor="middle" font-family="sans-serif" font-size="34" font-weight="700" fill="${PALETTE.ink1}">1× / 24h</text>
<text x="${cx}" y="${cy + 28}" text-anchor="middle" font-family="sans-serif" font-size="15" fill="${PALETTE.ink3}">nowy układ siatki</text>
<text x="${startX}" y="${startY - 40}" font-family="sans-serif" font-size="20" font-weight="700" fill="${PALETTE.ink1}">Wyzwanie dnia</text>`;
  return svgDoc(W, H, body, { title: "Wyzwanie dnia — wspólny układ na 24 godziny", desc: "Abstrakcyjna wizualizacja kalendarza wyzwań i odliczania do resetu." });
}

// 5) Turniej tygodniowy — drabinka.
function imageTournamentBracket(seed) {
  const rand = mulberry32(seed);
  const W = 1400, H = 900, id = "bracket";
  const roundsX = [140, 460, 780, 1100];
  const leafCount = 8;
  const leafGap = 90;
  const leafStartY = 120;
  let nodesByRound = [];
  let leaves = [];
  for (let i = 0; i < leafCount; i++) {
    leaves.push({ x: roundsX[0], y: leafStartY + i * leafGap });
  }
  nodesByRound.push(leaves);
  for (let round = 1; round < roundsX.length; round++) {
    const prev = nodesByRound[round - 1];
    const cur = [];
    for (let i = 0; i < prev.length; i += 2) {
      const y = (prev[i].y + prev[i + 1].y) / 2;
      cur.push({ x: roundsX[round], y });
    }
    nodesByRound.push(cur);
  }
  let connectors = "";
  let dots = "";
  nodesByRound.forEach((round, ri) => {
    round.forEach((node) => {
      const isFinal = ri === nodesByRound.length - 1;
      const active = rand() > 0.4;
      dots += `<circle cx="${node.x}" cy="${node.y}" r="${isFinal ? 12 : 8}" fill="${isFinal ? PALETTE.amber : active ? PALETTE.cyan : PALETTE.ink3}" ${isFinal || active ? `filter="url(#glow-${id})"` : ""}/>`;
    });
  });
  for (let ri = 1; ri < nodesByRound.length; ri++) {
    const prev = nodesByRound[ri - 1];
    const cur = nodesByRound[ri];
    cur.forEach((node, i) => {
      const a = prev[i * 2], b = prev[i * 2 + 1];
      const midX = (a.x + node.x) / 2;
      const active = rand() > 0.45;
      const stroke = active ? `url(#pulse-${id})` : PALETTE.line;
      connectors += `<path d="M ${a.x} ${a.y} H ${midX} V ${node.y} H ${node.x}" fill="none" stroke="${stroke}" stroke-width="2.5" opacity="${active ? 0.9 : 0.5}"/>`;
      connectors += `<path d="M ${b.x} ${b.y} H ${midX} V ${node.y} H ${node.x}" fill="none" stroke="${stroke}" stroke-width="2.5" opacity="${active ? 0.9 : 0.5}"/>`;
    });
  }

  const body = `${backdrop(W, H, id)}
${scatterParticles(rand, W, H, 40, PALETTE.ink3)}
${connectors}
${dots}
<text x="140" y="70" font-family="sans-serif" font-size="20" font-weight="700" fill="${PALETTE.ink1}">Turniej tygodniowy — drabinka</text>
<text x="${roundsX[roundsX.length-1] - 30}" y="${nodesByRound[nodesByRound.length-1][0].y - 26}" font-family="sans-serif" font-size="15" fill="${PALETTE.ink3}">finał</text>`;
  return svgDoc(W, H, body, { title: "Drabinka turnieju tygodniowego", desc: "Abstrakcyjna wizualizacja rundy pucharowej z ośmioma uczestnikami." });
}

const files = [
  { name: "siatka-glowna.svg", seed: seedFromString("siatka-glowna-v1"), gen: imageGridOverview },
  { name: "typy-wezlow.svg", seed: seedFromString("typy-wezlow-v1"), gen: imageNodeTypes },
  { name: "panel-rankingowy.svg", seed: seedFromString("panel-rankingowy-v1"), gen: imageRankingPanel },
  { name: "wyzwanie-dnia.svg", seed: seedFromString("wyzwanie-dnia-v1"), gen: imageDailyChallenge },
  { name: "turniej-tygodniowy.svg", seed: seedFromString("turniej-tygodniowy-v1"), gen: imageTournamentBracket },
];

for (const f of files) {
  const svg = f.gen(f.seed);
  writeFileSync(join(OUT_DIR, f.name), svg, "utf8");
  console.log(`✓ wygenerowano ${f.name}`);
}
