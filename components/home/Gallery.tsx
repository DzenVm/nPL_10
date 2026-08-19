import styles from "./home.module.css";

const ITEMS = [
  {
    src: "/images/panel-rankingowy.svg",
    alt: "Krzywa formy sezonu i tabela pozycji w panelu rankingowym",
    caption: "Panel rankingowy: krzywa formy w sezonie i bieżąca tabela pozycji.",
  },
  {
    src: "/images/turniej-tygodniowy.svg",
    alt: "Drabinka pucharowa turnieju tygodniowego z ośmioma uczestnikami",
    caption: "Ośmioosobowa drabinka pucharowa jednego z turniejów tygodniowych.",
  },
];

export function Gallery() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Wizualizacje</span>
          <h2 className="balance">Jak wygląda rywalizacja</h2>
          <p>
            Poglądowy panel rankingu i przykładowa drabinka turnieju. Tak wygląda
            rozgrywka poza kampanią, zanim jeszcze do niej dołączysz.
          </p>
        </div>

        <div className={styles.galleryGrid}>
          {ITEMS.map((item) => (
            <figure className={styles.galleryFigure} key={item.src}>
              {/* Lokalne, zaufane SVG generowane skryptem — next/image wymagałby dangerouslyAllowSVG */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.src} alt={item.alt} width={1400} height={900} loading="lazy" />
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
