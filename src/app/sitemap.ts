import type { MetadataRoute } from "next";
import { activeLandings } from "@/lib/content";
import { posts } from "@/lib/blog";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/ai-solutions", "/about-us", "/contact", "/faq", "/blog", ...activeLandings.map((l) => `/${l.slug}`), ...posts.map((p) => `/blog/${p.slug}`)];
  return paths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.8 }));
}
