import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/contact", "/privacy"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date("2026-10-28"),
  }));
}
