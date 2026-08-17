import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const ROUTES = [
  { path: "/", priority: 1, changeFrequency: "daily" as const },
  { path: "/o-grze", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/tryby-gry", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/rankingi", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/kontakt", priority: 0.5, changeFrequency: "yearly" as const },
  { path: "/regulamin", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/polityka-prywatnosci", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/polityka-cookie", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
