// Logika "Wyzwania dnia" liczona na serwerze, przy każdym żądaniu (stąd realny SSR
// na stronie głównej — to nie jest kosmetyczna flaga, tylko realna zależność
// od bieżącej daty w strefie Europe/Warsaw).

function warsawParts(date: Date) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Warsaw",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = Object.fromEntries(fmt.formatToParts(date).map((p) => [p.type, p.value]));
  return {
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    second: Number(parts.second),
  };
}

function seedFromDateString(dateStr: string) {
  let h = 1779033703 ^ dateStr.length;
  for (let i = 0; i < dateStr.length; i++) {
    h = Math.imul(h ^ dateStr.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

export function getDailyChallenge(now: Date = new Date()) {
  const w = warsawParts(now);
  const dateStr = `${w.year}-${String(w.month).padStart(2, "0")}-${String(w.day).padStart(2, "0")}`;
  const seed = seedFromDateString(dateStr).toUpperCase();

  const secondsLeftInDay = (23 - w.hour) * 3600 + (59 - w.minute) * 60 + (60 - w.second);
  const hoursLeft = Math.floor(secondsLeftInDay / 3600);
  const minutesLeft = Math.floor((secondsLeftInDay % 3600) / 60);

  const dayLabel = new Intl.DateTimeFormat("pl-PL", {
    timeZone: "Europe/Warsaw",
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(now);

  return {
    dateStr,
    seed,
    dayLabel,
    hoursLeft,
    minutesLeft,
  };
}
