import type { MetadataRoute } from "next";
import { aboutPage } from "@/lib/about";
import { industryPages } from "@/lib/industries";
import { posts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/seo";
import { servicePages } from "@/lib/service-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-30");
  const paths = [
    "/",
    "/pricing",
    "/about",
    "/get-started",
    "/contact",
    "/book",
    "/privacy",
    "/blog",
    ...servicePages.map((page) => page.path),
    ...industryPages.map((page) => page.path),
    ...posts.map((post) => post.path),
    aboutPage.path,
  ];
  const unique = [...new Set(paths)];
  return unique.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
  }));
}
