import type { MetadataRoute } from "next";
import { activeLandings } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/ai-solutions", "/about-us", "/contact", "/faq", ...activeLandings.map((l) => `/${l.slug}`)];
  return paths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.8 }));
}
