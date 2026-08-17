import { NODE_TYPES } from "@/lib/gameContent";
import styles from "./home.module.css";

export function NodeTypesSection() {
  return (
    <section className="section" id="typy-wezlow">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Elementy siatki</span>
          <h2 className="balance">Pięć typów węzłów, jedna zasada: przepływ musi dotrzeć do celu</h2>
        </div>

        <div className="grid-auto">
          {NODE_TYPES.map((node) => (
            <div className={`card ${styles.nodeCard}`} key={node.key}>
              <span className={`${styles.nodeDot} ${styles["dot-" + node.color]}`} aria-hidden="true" />
              <div>
                <h3>{node.label}</h3>
                <p className="mt-0">{node.description}</p>
              </div>
            </div>
          ))}
        </div>

        <figure className={styles.nodeArt}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/typy-wezlow.svg"
            alt="Ilustracja czterech podstawowych typów węzłów: generator, odbiornik, wzmacniacz i tłumik"
            width={1400}
            height={900}
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
}
