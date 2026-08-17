import Link from "next/link";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FAQ_ITEMS } from "@/lib/gameContent";

export function FaqPreview() {
  const items = FAQ_ITEMS.slice(0, 5);
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Najczęstsze pytania</span>
          <h2 className="balance">FAQ</h2>
        </div>

        <FaqAccordion items={items} />

        <p style={{ marginTop: "1.5rem" }}>
          <Link href="/faq" className="btn btn-ghost">
            Zobacz wszystkie pytania
          </Link>
        </p>
      </div>
    </section>
  );
}
