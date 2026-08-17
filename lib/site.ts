export const SITE_URL = "https://kewabort.online";

export const SITE_DESCRIPTION =
  "Darmowa, przeglądarkowa gra logiczno-strategiczna: przekierowuj impulsy energii między węzłami, zanim siatka się przeciąży. Kampania, wyzwanie dnia, pojedynki rankingowe i turnieje tygodniowe.";

export const NAV_LINKS = [
  { href: "/", label: "Strona główna" },
  { href: "/o-grze", label: "O grze" },
  { href: "/tryby-gry", label: "Tryby gry" },
  { href: "/rankingi", label: "Rankingi" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakt", label: "Kontakt" },
] as const;

export const LEGAL_LINKS = [
  { href: "/regulamin", label: "Regulamin" },
  { href: "/polityka-prywatnosci", label: "Polityka prywatności" },
  { href: "/polityka-cookie", label: "Polityka cookie" },
] as const;

export const GTAG_ID = process.env.NEXT_PUBLIC_GTAG_ID || "";
