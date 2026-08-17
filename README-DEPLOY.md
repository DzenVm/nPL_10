# Wdrożenie na Vercel — kewabort.online

## 1. Import projektu

1. [vercel.com/new](https://vercel.com/new) → **Import Git Repository** →
   wskaż to repozytorium (branch produkcyjny, np. `main`).
2. Framework Preset: **Next.js** (wykrywany automatycznie). Nie trzeba
   zmieniać Build/Output/Install Command — `next build` i domyślny output
   wystarczą.
3. Kliknij **Deploy**. Pierwszy deploy stworzy adres tymczasowy
   `*.vercel.app` — to normalne, domenę podłączamy w kroku 3.

## 2. Zmienne środowiskowe (opcjonalne)

W **Project Settings → Environment Variables** możesz dodać:

| Nazwa                  | Kiedy ustawiać                                                   |
| ------------------------ | ------------------------------------------------------------------ |
| `NEXT_PUBLIC_GTAG_ID`     | Gdy podłączasz Google Ads / Google Analytics (np. `AW-XXXXXXXXX` lub `G-XXXXXXXXXX`). Bez tej zmiennej `gtag.js` w ogóle się nie ładuje — zobacz `components/GoogleTag.tsx`. |

Ustaw dla środowiska **Production** (i ewentualnie **Preview**), a następnie
zrób redeploy, żeby zmienna weszła w życie.

## 3. Podpięcie domeny kewabort.online

1. **Project Settings → Domains** → wpisz `kewabort.online` → **Add**.
2. Vercel pokaże wymagany rekord DNS. Dla domeny nazwowej (apex) zwykle jest to:
   - `A` @ → `76.76.21.21`
     — lub, jeśli rejestrator wspiera ALIAS/ANAME/CNAME flattening na apeksie,
     Vercel zaproponuje odpowiedni wariant automatycznie.
   - `CNAME` `www` → `cname.vercel-dns.com`
3. Dodaj te rekordy u rejestratora domeny `kewabort.online`.
4. Poczekaj na propagację DNS (zwykle minuty, czasem do 24h) — Vercel
   automatycznie wystawi certyfikat TLS (Let's Encrypt) po weryfikacji.
5. W **Domains** ustaw przekierowanie `www.kewabort.online → kewabort.online`
   (lub odwrotnie) jako **Redirect**, żeby uniknąć duplikacji treści (SEO).

## 4. Po wdrożeniu — checklist pod Google Ads

- [ ] Strona ładuje się pod `https://kewabort.online` bez błędów.
- [ ] `/regulamin`, `/polityka-prywatnosci`, `/polityka-cookie`, `/kontakt`
      działają i są linkowane w stopce.
- [ ] Banner cookie pojawia się przy pierwszej wizycie i realnie blokuje
      zgodę domyślną (`denied`) do czasu decyzji użytkownika.
- [ ] Jeśli prowadzisz kampanię Google Ads z pomiarem konwersji — ustaw
      `NEXT_PUBLIC_GTAG_ID` (krok 2) i zweryfikuj tag w Google Tag Assistant.
- [ ] `sitemap.xml` i `robots.txt` są dostępne pod `/sitemap.xml` i
      `/robots.txt` i wskazują na `https://kewabort.online`.
- [ ] Treść strony jest zgodna z tym, co reklamujesz (brak zwodniczych
      obietnic, jasny opis darmowego modelu, brak elementów hazardowych).

## 5. Aktualizacje

Każdy push na branch produkcyjny uruchamia nowy deploy automatycznie.
Branche/PR-y dostają osobne środowiska **Preview** z własnym adresem
`*.vercel.app` do podglądu przed scaleniem.
