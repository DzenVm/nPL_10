// Czysta logika mini-łamigłówki "siatka impulsów": generowanie planszy,
// obrót segmentów i sprawdzanie połączenia generator -> odbiornik.
// Bez zależności od DOM — używana zarówno na serwerze (pierwsza plansza w
// HTML), jak i w kliencie (kolejne rundy po kliknięciu „Nowy układ”).

export const NORTH = 1;
export const EAST = 2;
export const SOUTH = 4;
export const WEST = 8;

const OPPOSITE: Record<number, number> = {
  [NORTH]: SOUTH,
  [EAST]: WEST,
  [SOUTH]: NORTH,
  [WEST]: EAST,
};

const DELTA: Record<number, [number, number]> = {
  [NORTH]: [0, -1],
  [EAST]: [1, 0],
  [SOUTH]: [0, 1],
  [WEST]: [-1, 0],
};

export type CellRole = "source" | "sink" | "path" | "filler";

export interface Cell {
  col: number;
  row: number;
  role: CellRole;
  shape: number; // bity połączeń w stanie "rozwiązanym" (offset 0)
  offset: number; // 0-3, aktualny obrót o 90° w prawo
  fixed: boolean; // generator/odbiornik się nie obracają
}

export interface PulseGridState {
  cols: number;
  rows: number;
  cells: Cell[];
  sourceIndex: number;
  sinkIndex: number;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function idx(col: number, row: number, cols: number) {
  return row * cols + col;
}

function rotateBits(bits: number, times: number): number {
  let out = bits;
  for (let i = 0; i < ((times % 4) + 4) % 4; i++) {
    let next = 0;
    if (out & NORTH) next |= EAST;
    if (out & EAST) next |= SOUTH;
    if (out & SOUTH) next |= WEST;
    if (out & WEST) next |= NORTH;
    out = next;
  }
  return out;
}

function randomWalkPath(
  cols: number,
  rows: number,
  start: [number, number],
  end: [number, number],
  rand: () => number
): [number, number][] | null {
  const visited = new Set<string>();
  const path: [number, number][] = [];
  const dirs = [NORTH, EAST, SOUTH, WEST];

  function key(c: number, r: number) {
    return `${c},${r}`;
  }

  function shuffle<T>(arr: T[]): T[] {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function dfs(c: number, r: number): boolean {
    visited.add(key(c, r));
    path.push([c, r]);
    if (c === end[0] && r === end[1]) return true;

    const bias = shuffle(dirs).sort((a, b) => {
      const [dax, day] = DELTA[a];
      const [dbx, dby] = DELTA[b];
      const da = Math.abs(c + dax - end[0]) + Math.abs(r + day - end[1]);
      const db = Math.abs(c + dbx - end[0]) + Math.abs(r + dby - end[1]);
      return da - db + (rand() - 0.5) * 3;
    });

    for (const d of bias) {
      const [dx, dy] = DELTA[d];
      const nc = c + dx;
      const nr = r + dy;
      if (nc < 0 || nc >= cols || nr < 0 || nr >= rows) continue;
      if (visited.has(key(nc, nr))) continue;
      if (dfs(nc, nr)) return true;
    }

    path.pop();
    visited.delete(key(c, r));
    return false;
  }

  return dfs(start[0], start[1]) ? path : null;
}

const FILLER_SHAPES = [
  NORTH | SOUTH, // prosto
  EAST | WEST, // prosto
  NORTH | EAST, // zakręt
  EAST | SOUTH,
  SOUTH | WEST,
  WEST | NORTH,
  NORTH | EAST | SOUTH, // trójnik
  EAST | SOUTH | WEST,
];

// Losowy seed dla nowej rundy — wydzielony do zwykłej funkcji (nie w ciele
// komponentu), żeby wywołanie Date.now()/Math.random() nie łamało reguły
// czystości komponentów Reacta.
export function randomSeed(): number {
  return Date.now() ^ Math.floor(Math.random() * 1e9);
}

export function generatePuzzle(seed: number, cols = 6, rows = 5): PulseGridState {
  const rand = mulberry32(seed);
  const startRow = 1 + Math.floor(rand() * (rows - 2));
  let endRow = 1 + Math.floor(rand() * (rows - 2));
  if (Math.abs(endRow - startRow) < 1 && rows > 3) endRow = (endRow + 1) % rows;
  const start: [number, number] = [0, startRow];
  const end: [number, number] = [cols - 1, endRow];

  let path = randomWalkPath(cols, rows, start, end, rand);
  if (!path) {
    // Skrajny fallback: prosta linia w tym samym wierszu (matematycznie zawsze istnieje).
    path = [];
    for (let c = 0; c < cols; c++) path.push([c, startRow]);
  }

  const cells: Cell[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({ col: c, row: r, role: "filler", shape: 0, offset: 0, fixed: false });
    }
  }

  for (let i = 0; i < path.length - 1; i++) {
    const [c1, r1] = path[i];
    const [c2, r2] = path[i + 1];
    const dx = c2 - c1;
    const dy = r2 - r1;
    let dir = EAST;
    if (dx === 1) dir = EAST;
    else if (dx === -1) dir = WEST;
    else if (dy === 1) dir = SOUTH;
    else if (dy === -1) dir = NORTH;

    const a = cells[idx(c1, r1, cols)];
    const b = cells[idx(c2, r2, cols)];
    a.shape |= dir;
    b.shape |= OPPOSITE[dir];
  }

  path.forEach(([c, r]) => {
    cells[idx(c, r, cols)].role = "path";
  });

  const sourceCell = cells[idx(start[0], start[1], cols)];
  sourceCell.role = "source";
  sourceCell.fixed = true;
  sourceCell.offset = 0;

  const sinkCell = cells[idx(end[0], end[1], cols)];
  sinkCell.role = "sink";
  sinkCell.fixed = true;
  sinkCell.offset = 0;

  for (const cell of cells) {
    if (cell.role === "source" || cell.role === "sink") continue;

    if (cell.role === "path") {
      // Losowy, ale zawsze "przekręcony" offset początkowy (nigdy od razu rozwiązany).
      const symmetric = cell.shape === (NORTH | SOUTH) || cell.shape === (EAST | WEST);
      const bad = symmetric ? [1, 3] : [1, 2, 3];
      cell.offset = bad[Math.floor(rand() * bad.length)];
    } else {
      cell.shape = FILLER_SHAPES[Math.floor(rand() * FILLER_SHAPES.length)];
      cell.offset = Math.floor(rand() * 4);
    }
  }

  return {
    cols,
    rows,
    cells,
    sourceIndex: idx(start[0], start[1], cols),
    sinkIndex: idx(end[0], end[1], cols),
  };
}

export function openBits(cell: Cell): number {
  return cell.fixed ? cell.shape : rotateBits(cell.shape, cell.offset);
}

export function rotateCell(state: PulseGridState, cellIndex: number): PulseGridState {
  const cells = state.cells.map((cell, i) =>
    i === cellIndex && !cell.fixed ? { ...cell, offset: (cell.offset + 1) % 4 } : cell
  );
  return { ...state, cells };
}

export interface ConnectivityResult {
  energized: Set<number>; // indeksy komórek połączonych z generatorem
  solved: boolean;
}

export function computeConnectivity(state: PulseGridState): ConnectivityResult {
  const { cols, rows, cells, sourceIndex, sinkIndex } = state;
  const energized = new Set<number>();
  const queue = [sourceIndex];
  energized.add(sourceIndex);

  while (queue.length) {
    const current = queue.shift()!;
    const cell = cells[current];
    const bits = openBits(cell);

    for (const dir of [NORTH, EAST, SOUTH, WEST]) {
      if (!(bits & dir)) continue;
      const [dx, dy] = DELTA[dir];
      const nc = cell.col + dx;
      const nr = cell.row + dy;
      if (nc < 0 || nc >= cols || nr < 0 || nr >= rows) continue;
      const ni = idx(nc, nr, cols);
      if (energized.has(ni)) continue;
      const neighbor = cells[ni];
      const neighborBits = openBits(neighbor);
      if (neighborBits & OPPOSITE[dir]) {
        energized.add(ni);
        queue.push(ni);
      }
    }
  }

  return { energized, solved: energized.has(sinkIndex) };
}
