import type { Metadata } from "next";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FAQ_ITEMS } from "@/lib/gameContent";
import legal from "@/components/legal.module.css";

export const metadata: Metadata = {
  title: "FAQ — najczęstsze pytania",
  description: "Odpowiedzi na najczęstsze pytania o zasady, tryby, ranking, dane i bezpieczeństwo gry.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <div className={`wrap ${legal.page}`}>
      <div className={legal.header}>
        <span className="eyebrow">FAQ</span>
        <h1 className="balance">Najczęstsze pytania</h1>
      </div>
      <FaqAccordion items={FAQ_ITEMS} />
    </div>
  );
}
