import styles from "./home.module.css";

const ITEMS = [
  {
    src: "/images/panel-rankingowy.svg",
    alt: "Wizualizacja panelu rankingowego: krzywa formy sezonu i tabela pozycji",
    caption: "Krzywa formy sezonu i tabela pozycji — wizualizacja panelu rankingowego.",
  },
  {
    src: "/images/turniej-tygodniowy.svg",
    alt: "Wizualizacja drabinki turnieju tygodniowego z ośmioma uczestnikami",
    caption: "Drabinka pucharowa turnieju tygodniowego — wizualizacja koncepcyjna.",
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
            Poglądowe ilustracje koncepcyjne interfejsu rankingu i turniejów — nie zrzuty
            ekranu z gotowego panelu.
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
