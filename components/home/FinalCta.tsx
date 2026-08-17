import Link from "next/link";
import styles from "./home.module.css";

export function FinalCta() {
  return (
    <section className={`section ${styles.finalCta}`}>
      <div className="wrap">
        <h2 className="balance">Siatka czeka na dyspozytora</h2>
        <p>
          Zagraj w przeglądarce bez zakładania konta — kampania i wyzwanie dnia startują od
          razu.
        </p>
        <div className={styles.finalActions}>
          <Link href="#demo" className="btn btn-primary">
            Wróć do gry
          </Link>
          <Link href="/tryby-gry" className="btn btn-ghost">
            Poznaj tryby gry
          </Link>
        </div>
      </div>
    </section>
  );
}
