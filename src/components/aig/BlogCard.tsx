import Link from "next/link";
import { formatDate, type Post } from "@/lib/blog";
import Photo from "./Photo";
import { Glyph } from "./ui";

export default function BlogCard({ post, delay }: { post: Post; delay?: number }) {
  const href = `/blog/${post.slug}`;
  return (
    <article className="article-blog hover-zoom effectFade fadeUp" data-delay={delay}>
      <Link href={href} tabIndex={-1} aria-hidden>
        <Photo photo={post.cover} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
      </Link>
      <div className="blog-content">
        <div className="meta">
          <span className="cat">{post.category}</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readMinutes} min read</span>
        </div>
        <h3 className="h6 fw-semibold"><Link href={href} className="link1">{post.title}</Link></h3>
        <p className="excerpt">{post.excerpt}</p>
        <Link href={href} className="tf-btn-2" aria-label={`Read: ${post.title}`}>
          Read more <Glyph name="arrowUpRight" />
        </Link>
      </div>
    </article>
  );
}
