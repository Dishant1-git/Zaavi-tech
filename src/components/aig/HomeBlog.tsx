import Link from "next/link";
import { posts } from "@/lib/blog";
import BlogCard from "./BlogCard";
import { Glyph, SectionHeading } from "./ui";

/** The three newest articles. */
export default function HomeBlog() {
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  return (
    <section id="blog" className="flat-spacing pb-0">
      <div className="aig-container">
        <div className="mb-8 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <SectionHeading sub="Insights" className="mb-0">
            Latest From <br /> Our Blog
          </SectionHeading>
          <Link href="/blog" className="tf-btn-2 self-start md:self-auto effectFade fadeUp">
            View all articles <Glyph name="arrowUpRight" />
          </Link>
        </div>
        <div className="grid-cards three">
          {latest.map((p, i) => <BlogCard key={p.slug} post={p} delay={i * 0.1} />)}
        </div>
      </div>
    </section>
  );
}
