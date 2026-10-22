import type { Metadata } from "next";
import PageHero from "@/components/aig/PageHero";
import BlogCard from "@/components/aig/BlogCard";
import Cta from "@/components/aig/Cta";
import { posts } from "@/lib/blog";
import { home } from "@/lib/content";

export const metadata: Metadata = {
  title: { absolute: "AI Insights & Guides | Zaavi Technologies Blog" },
  description: "Practical guides on AI strategy, generative AI, automation and keeping AI secure, from the Zaavi Technologies team.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <>
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        title="Insights & Guides"
        sub="Practical thinking on putting AI to work, without the hype."
        icons={["doc", "spark", "chart"]}
      />
      <section className="flat-spacing">
        <div className="aig-container">
          <div className="grid-cards three">
            {sorted.map((p, i) => <BlogCard key={p.slug} post={p} delay={(i % 3) * 0.1} />)}
          </div>
        </div>
      </section>
      <Cta title={home.closing.h2} body={home.closing.body} cta={home.closing.cta} />
    </>
  );
}
