import Link from "next/link";
import legal from "@/components/legal.module.css";

export default function NotFound() {
  return (
    <div className={`wrap ${legal.page}`} style={{ textAlign: "center" }}>
      <span className="eyebrow">Błąd 404</span>
      <h1 className="balance" style={{ marginTop: "1rem" }}>
        Ten węzeł nie istnieje w sieci
      </h1>
      <p style={{ maxWidth: "34rem", marginInline: "auto", marginTop: "0.75rem" }}>
        Strona, której szukasz, została przeniesiona albo nigdy nie istniała. Wróć na
        stronę główną i spróbuj jeszcze raz połączyć siatkę.
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginTop: "1.5rem" }}>
        <Link href="/" className="btn btn-primary">
          Strona główna
        </Link>
        <Link href="/faq" className="btn btn-ghost">
          FAQ
        </Link>
      </div>
    </div>
  );
}
