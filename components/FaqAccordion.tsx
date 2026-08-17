"use client";

import { useState } from "react";
import { ArrowIcon } from "./Icons";
import styles from "./FaqAccordion.module.css";

export function FaqAccordion({ items }: { items: readonly { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={styles.list}>
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div className={styles.item} key={item.q} data-open={open}>
            <button
              type="button"
              className={styles.question}
              aria-expanded={open}
              aria-controls={`faq-answer-${i}`}
              onClick={() => setOpenIndex(open ? null : i)}
            >
              {item.q}
              <ArrowIcon className={styles.chevron} />
            </button>
            {open && (
              <div id={`faq-answer-${i}`} className={styles.answer}>
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
