import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gra logiczno-strategiczna — siatka impulsów energii",
    short_name: "Siatka impulsów",
    description:
      "Darmowa, przeglądarkowa gra logiczno-strategiczna: przekierowuj impulsy energii między węzłami, zanim siatka się przeciąży.",
    start_url: "/",
    display: "standalone",
    background_color: "#070a12",
    theme_color: "#070a12",
    lang: "pl-PL",
    categories: ["games", "puzzle"],
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
