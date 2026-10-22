import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/aig/PageHero";
import Photo from "@/components/aig/Photo";
import BlogCard from "@/components/aig/BlogCard";
import Cta from "@/components/aig/Cta";
import { Glyph, SectionHeading } from "@/components/aig/ui";
import { formatDate, postBySlug, posts } from "@/lib/blog";
import { landingBySlug } from "@/lib/content";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = postBySlug((await params).slug);
  if (!post) return {};
  return {
    title: { absolute: `${post.title} | Zaavi Technologies` },
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", images: [post.cover.src], publishedTime: post.date },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const post = postBySlug((await params).slug);
  if (!post) notFound();
  const others = posts.filter((p) => p.slug !== post.slug).sort((a, b) => b.date.localeCompare(a.date));
  const service = post.related ? landingBySlug(post.related) : undefined;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: `${site.url}${post.cover.src}`,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/logo.png` } },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PageHero
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.category }]}
        title={post.title}
        sub={`${formatDate(post.date)} · ${post.readMinutes} min read`}
        body={[post.excerpt]}
        small
      />

      <section className="flat-spacing">
        <div className="aig-container">
          <Photo photo={post.cover} className="post-cover effectFade fadeUp" sizes="(min-width: 1320px) 1296px, 100vw" priority />

          <div className="mt-12 grid gap-12 md:mt-20 lg:grid-cols-[1fr_340px] lg:gap-16">
            <article className="prose-aig mx-auto w-full max-w-[760px]">
              {post.body.map((b, i) => {
                if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
                if (b.type === "list") return <ul key={i}>{b.items.map((it) => <li key={it}>{it}</li>)}</ul>;
                if (b.type === "quote") return <blockquote key={i}>{b.text}</blockquote>;
                return <p key={i}>{b.text}</p>;
              })}
            </article>

            <aside className="grid content-start gap-6 lg:sticky lg:top-32 lg:self-start">
              {service && (
                <div className="card-dark">
                  <div className="lbl mb-3 text-[var(--brand-light)]!">Related service</div>
                  <h2 className="h5 fw-semibold mb-3">{service.nav}</h2>
                  <p className="t-n400 mb-6">{service.intro}</p>
                  <Link href={`/${service.slug}`} className="tf-btn-2">Explore <Glyph name="arrowUpRight" /></Link>
                </div>
              )}
              <div className="card">
                <h2 className="h6 fw-semibold mb-5">More articles</h2>
                <ul className="grid gap-5">
                  {others.slice(0, 3).map((o) => (
                    <li key={o.slug}>
                      <Link href={`/blog/${o.slug}`} className="side-post hover-zoom group">
                        <Photo photo={o.cover} sizes="88px" />
                        <span>
                          <span className="block text-sm t-sec">{formatDate(o.date)}</span>
                          <span className="fw-semibold transition-colors group-hover:text-[var(--brand)]">{o.title}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="box-white">
        <section className="flat-spacing">
          <div className="aig-container">
            <div className="mb-8 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
              <SectionHeading sub="Keep reading" className="mb-0">More From <br /> Our Blog</SectionHeading>
              <Link href="/blog" className="tf-btn-2 self-start md:self-auto effectFade fadeUp">All articles <Glyph name="arrowUpRight" /></Link>
            </div>
            <div className="grid-cards three">
              {others.slice(0, 3).map((o, i) => <BlogCard key={o.slug} post={o} delay={i * 0.1} />)}
            </div>
          </div>
        </section>
      </div>

      <Cta title="Have an AI Question of Your Own?" body="Tell us about your challenge and we'll give you an honest view of whether AI is the right fit." cta="Discuss Your AI Project" />
    </>
  );
}
