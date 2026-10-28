import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

const allow = { allow: "/" } as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", ...allow },
      { userAgent: "GPTBot", ...allow },
      { userAgent: "ClaudeBot", ...allow },
      { userAgent: "PerplexityBot", ...allow },
      { userAgent: "Google-Extended", ...allow },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
