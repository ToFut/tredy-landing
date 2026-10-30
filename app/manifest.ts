import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Futurix",
    short_name: "Futurix",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F2EA",
    theme_color: "#0B1A3A",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
