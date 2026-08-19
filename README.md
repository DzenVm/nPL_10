# kewabort.online

Darmowa, przeglądarkowa gra logiczno-strategiczna dla graczy w Polsce: gracz
przekierowuje impulsy energii między węzłami sieci, zanim siatka się
przeciąży. Next.js (App Router), renderowany po stronie serwera (SSR),
bez zewnętrznych bibliotek UI.

## Stos technologiczny

- **Next.js 16 (App Router) + TypeScript**, strona główna renderowana
  per żądanie (`export const dynamic = "force-dynamic"`) — "Wyzwanie dnia"
  liczy swój seed z bieżącej daty w strefie `Europe/Warsaw` na serwerze.
- **Własny system CSS** (custom properties, `@layer`, CSS Modules) —
  bez Tailwind i bez gotowego UI-kita.
- **Grywalne demo mechaniki** (`components/PulseGridDemo.tsx`) — pełnoprawna,
  interaktywna łamigłówka DOM/SVG (obrót segmentów, BFS sprawdzający
  połączenie, timer), a nie nagranie czy zrzut ekranu.
- **Proceduralnie generowana grafika** (`scripts/generate-art.mjs`) —
  deterministyczny generator SVG (seeded PRNG) tworzący ilustracje w
  `public/images/`.
- **Dynamiczne obrazy przez `next/og`** — favicon (`app/icon.tsx`),
  ikona Apple (`app/apple-icon.tsx`) i obraz Open Graph
  (`app/opengraph-image.tsx`) generowane kodem, bez plików binarnych w repo.
- **Zgoda na cookie zgodna z Google Consent Mode v2** — `lib/consent.ts` +
  `components/CookieConsent.tsx`; `components/GoogleTag.tsx` ładuje `gtag.js`
  tylko, gdy ustawiono `NEXT_PUBLIC_GTAG_ID`.
- **JSON-LD** (`VideoGame`, `FAQPage`) oraz `sitemap.ts` / `robots.ts` /
  `manifest.ts` przez Metadata API.

## Uruchomienie lokalne

```bash
npm install
npm run dev
```

Aplikacja wystartuje na `http://localhost:3000`.

## Skrypty

| Skrypt                | Opis                                                        |
| ---------------------- | ------------------------------------------------------------ |
| `npm run dev`           | Serwer deweloperski                                          |
| `npm run build`         | Build produkcyjny                                             |
| `npm start`             | Serwer produkcyjny (po `build`)                               |
| `npm run lint`          | ESLint                                                        |
| `npm run generate:art`  | Ponowne wygenerowanie ilustracji SVG w `public/images/`       |

## Dokumenty i polityki

Regulamin, polityka prywatności i polityka cookie znajdują się pod
`/regulamin`, `/polityka-prywatnosci` i `/polityka-cookie`. Szczegóły
wdrożenia (domena, zmienne środowiskowe) opisuje `README-DEPLOY.md`.
