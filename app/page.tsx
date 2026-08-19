import type { Metadata } from "next";
import { AboutGame } from "@/components/home/AboutGame";
import { Compliance } from "@/components/home/Compliance";
import { DemoSection } from "@/components/home/DemoSection";
import { FaqPreview } from "@/components/home/FaqPreview";
import { FinalCta } from "@/components/home/FinalCta";
import { Gallery } from "@/components/home/Gallery";
import { GameModes } from "@/components/home/GameModes";
import { Hero } from "@/components/home/Hero";
import { HowToPlay } from "@/components/home/HowToPlay";
import { NodeTypesSection } from "@/components/home/NodeTypesSection";
import { RankingAndDaily } from "@/components/home/RankingAndDaily";
import { getDailyChallenge } from "@/lib/daily";
import { FAQ_ITEMS } from "@/lib/gameContent";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

// Strona zależy od bieżącej daty (seed Wyzwania dnia liczony w Europe/Warsaw),
// więc renderujemy ją per żądanie zamiast statycznie.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Steruj siecią impulsów energii — gra logiczno-strategiczna online",
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const daily = getDailyChallenge();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "Gra logiczno-strategiczna o sterowaniu siecią impulsów energii",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    inLanguage: "pl-PL",
    genre: ["Puzzle", "Strategy"],
    gamePlatform: ["Web Browser"],
    applicationCategory: "Game",
    audience: {
      "@type": "Audience",
      geographicArea: {
        "@type": "AdministrativeArea",
        name: "Polska",
      },
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Hero />
      <DemoSection />
      <AboutGame />
      <HowToPlay />
      <NodeTypesSection />
      <GameModes />
      <RankingAndDaily daily={daily} />
      <Gallery />
      <Compliance />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
