import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { GoogleTag } from "@/components/GoogleTag";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Steruj siecią impulsów energii — gra logiczno-strategiczna",
    template: "%s",
  },
  description: SITE_DESCRIPTION,
  applicationName: "gra sieciowa",
  keywords: [
    "gra przeglądarkowa",
    "gra logiczna online",
    "gra strategiczna",
    "łamigłówka online",
    "gra bez pobierania",
    "gra w przeglądarce",
  ],
  alternates: {
    canonical: "/",
    languages: { "pl-PL": "/" },
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    url: SITE_URL,
    siteName: "kewabort.online",
    title: "Steruj siecią impulsów energii — gra logiczno-strategiczna",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Steruj siecią impulsów energii — gra logiczno-strategiczna",
    description: SITE_DESCRIPTION,
  },
  other: {
    "geo.region": "PL",
    "geo.placename": "Polska",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#070a12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <head>
        <GoogleTag />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Przejdź do treści głównej
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}
