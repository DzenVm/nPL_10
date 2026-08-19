export const REGIONS = [
  {
    name: "Region Nadrzeczny",
    note: "10 poziomów wprowadzających — pojedyncza ścieżka, bez presji czasu.",
  },
  {
    name: "Pas Przemysłowy",
    note: "Pojawiają się wzmacniacze i pierwsze rozgałęzienia sieci.",
  },
  {
    name: "Strefa Portowa",
    note: "Tłumiki i dłuższe trasy — trzeba planować z wyprzedzeniem.",
  },
  {
    name: "Wyżyna Północna",
    note: "Ograniczony czas na poziom oraz węzły o dwóch możliwych trasach.",
  },
  {
    name: "Sektor Wzgórz",
    note: "Węzły sabotujące potrafią odwrócić losowy segment w trakcie rundy.",
  },
  {
    name: "Zatoka Końcowa",
    note: "10 poziomów finałowych łączących wszystkie mechaniki kampanii.",
  },
];

export const NODE_TYPES = [
  {
    key: "generator",
    label: "Generator",
    color: "amber",
    description:
      "Źródło impulsu. Każdy poziom ma co najmniej jeden — to od niego zaczyna się każda trasa.",
  },
  {
    key: "odbiornik",
    label: "Odbiornik",
    color: "cyan",
    description:
      "Cel trasy. Impuls musi do niego dotrzeć nieprzerwanym torem, aby poziom uznać za zasilony.",
  },
  {
    key: "wzmacniacz",
    label: "Wzmacniacz",
    color: "violet",
    description:
      "Podwaja moc impulsu, który przez niego przejdzie. Wpływa na wynik końcowy, nawet jeśli nie leży na najkrótszej trasie.",
  },
  {
    key: "tlumik",
    label: "Tłumik",
    color: "grey",
    description:
      "Spowalnia falę impulsu i obniża jego moc. Czasem opłaca się go ominąć, czasem — przeprowadzić przez niego trasę awaryjną.",
  },
  {
    key: "sabotujacy",
    label: "Węzeł sabotujący",
    color: "rose",
    description:
      "Losowe zdarzenie od Sektora Wzgórz wzwyż: raz na rundę obraca jeden segment bez udziału gracza. Trzeba reagować na bieżąco.",
  },
];

export const GAME_MODES = [
  {
    key: "kampania",
    title: "Kampania",
    cadence: "60 poziomów · 6 regionów",
    description:
      "Liniowa progresja od prostych, jednościeżkowych plansz po finałowe poziomy łączące wzmacniacze, tłumiki i węzły sabotujące. Każdy region wprowadza dokładnie jedną nową zasadę.",
  },
  {
    key: "wyzwanie-dnia",
    title: "Wyzwanie dnia",
    cadence: "1× / 24 godziny",
    description:
      "Jeden układ siatki, wspólny dla wszystkich graczy danego dnia, generowany z bieżącej daty. Reset o północy czasu środkowoeuropejskiego. Własny ranking dzienny.",
  },
  {
    key: "pojedynek",
    title: "Pojedynek rankingowy",
    cadence: "asynchroniczne 1v1",
    description:
      "Ty i przeciwnik dostajecie dokładnie tę samą wygenerowaną siatkę i rozwiązujecie ją niezależnie. Liczy się czas i liczba obrotów. Wynik zmienia ocenę w rankingu sezonowym.",
  },
  {
    key: "turniej",
    title: "Turniej tygodniowy",
    cadence: "drabinka · zapisy dobrowolne",
    description:
      "Ośmioosobowe (i większe) drabinki pucharowe rozgrywane w ciągu tygodnia. Każda runda to nowo wygenerowana siatka — do finału dochodzi jedna osoba z każdej pary.",
  },
] as const;

export const FAQ_ITEMS = [
  {
    q: "Czy każdy wygenerowany układ da się rozwiązać?",
    a: "Tak. Generator plansz zawsze wyznacza co najmniej jedną poprawną trasę między generatorem a odbiornikiem, zanim poziom się rozpocznie — nie trafisz na układ bez rozwiązania.",
  },
  {
    q: "Co się dzieje, gdy zabraknie czasu na poziomie?",
    a: "Poziom kończy się bez połączenia. W kampanii możesz od razu spróbować ponownie; w Wyzwaniu dnia czekasz do resetu o północy czasu środkowoeuropejskiego.",
  },
  {
    q: "Czy da się grać bez myszy?",
    a: "Tak. Każdy segment siatki to zwykły przycisk — obracasz go też klawiaturą, przechodząc między segmentami klawiszem Tab i potwierdzając Enterem lub spacją.",
  },
  {
    q: "Na jakich urządzeniach mogę grać?",
    a: "Gra działa w przeglądarce — na komputerze i na urządzeniach mobilnych — bez instalowania dodatkowego oprogramowania.",
  },
  {
    q: "Jak działa Wyzwanie dnia?",
    a: "Układ siatki jest generowany raz na dobę na podstawie bieżącej daty czasu środkowoeuropejskiego, więc każdy gracz danego dnia mierzy się z dokładnie tą samą planszą. Ranking dzienny resetuje się o północy.",
  },
  {
    q: "Czym różni się Pojedynek rankingowy od Turnieju tygodniowego?",
    a: "Pojedynek to pojedyncze starcie 1v1 na tej samej, niezależnie rozwiązywanej siatce. Turniej tygodniowy to wieloosobowa drabinka pucharowa trwająca cały tydzień.",
  },
  {
    q: "Czy moje dane są bezpieczne?",
    a: "Przetwarzamy wyłącznie dane niezbędne do działania gry i — po Twojej zgodzie — dane analityczne oraz reklamowe, zgodnie z RODO. Szczegóły opisuje nasza polityka prywatności.",
  },
  {
    q: "Od jakiego wieku można grać?",
    a: "Gra jest odpowiednia dla graczy w każdym wieku — nie zawiera przemocy ani treści, które wymagałyby ograniczenia wiekowego.",
  },
  {
    q: "Czy da się grać bez zakładania konta?",
    a: "Kampanię i Wyzwanie dnia można rozegrać od razu. Konto jest potrzebne wyłącznie do zapisywania wyniku w rankingu sezonowym oraz do Pojedynków i Turniejów.",
  },
];
