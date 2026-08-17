import { GAME_MODES } from "@/lib/gameContent";
import styles from "./home.module.css";

export function GameModes() {
  return (
    <section className="section" id="tryby-gry">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Cztery sposoby na grę</span>
          <h2 className="balance">Tryby gry</h2>
        </div>

        <div className="grid-auto">
          {GAME_MODES.map((mode) => (
            <div className={`card ${styles.modeCard}`} key={mode.key}>
              <span className={styles.modeCadence}>{mode.cadence}</span>
              <h3>{mode.title}</h3>
              <p className="mt-0">{mode.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
