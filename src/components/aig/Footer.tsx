import Image from "next/image";
import Link from "next/link";
import { activeLandings } from "@/lib/content";
import { site } from "@/lib/site";
import BrandLogo from "@/components/ag/BrandLogo";
import { SocialIcon } from "@/components/ag/ui";
import { Glyph } from "./ui";

const socials = [
  { key: "x", label: "Twitter / X" },
  { key: "facebook", label: "Facebook" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "youtube", label: "YouTube" },
] as const;

const company = [
  { label: "AI Solutions & Services", href: "/ai-solutions" },
  ...activeLandings.filter((l) => l.group === "enterprise").map((l) => ({ label: l.nav, href: `/${l.slug}` })),
  { label: "About Us", href: "/about-us" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="aig-footer">
      <Image src="/logo.png" alt="" width={1000} height={352} className="wordmark" aria-hidden />
      <div className="aig-container">
        <div className="footer-content">
          <Link href="/" className="inline-flex" aria-label="Zaavi Technologies home">
            <BrandLogo tone="dark" className="h-14 w-auto" />
          </Link>
          <div className="title h6 fw-semibold">{site.tagline}</div>
          <p className="text">Practical AI, automation and analytics, connected to your systems and proven before they scale.</p>
          <div className="tf-social-1">
            {socials.map((s) => (
              <a key={s.key} href={site.social[s.key]} target="_blank" rel="noreferrer">
                {s.label}
                <span className="social-item"><SocialIcon name={s.key} /></span>
              </a>
            ))}
          </div>
        </div>

        <div className="link-cols">
          <div>
            <h3>AI Solutions</h3>
            <ul>
              {activeLandings.filter((l) => l.group === "ai").map((l) => (
                <li key={l.slug}><Link href={`/${l.slug}`}>{l.nav}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Company</h3>
            <ul>
              {company.map((c) => <li key={c.href + c.label}><Link href={c.href}>{c.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>
              <li><p>{site.address}</p></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={`tel:${site.phone}`}>{site.phone}</a></li>
              <li><p>{site.hours}</p></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <ul className="flex flex-wrap items-center gap-6 fw-semibold">
            <li><Link href="/about-us" className="link1">About</Link></li>
            <li><Link href="/ai-solutions" className="link1">Solutions</Link></li>
            <li><Link href="/blog" className="link1">Blog</Link></li>
            <li><Link href="/faq" className="link1">FAQ</Link></li>
            <li><Link href="/contact" className="link1">Contact</Link></li>
          </ul>
          <p className="t-sec text-center">© {new Date().getFullYear()} Zaavi Technologies. All rights reserved.</p>
          <a href="#top" className="link1 flex items-center justify-end gap-2 fw-semibold">
            Back to top <Glyph name="arrowDown" className="h-5 w-5 rotate-180" />
          </a>
        </div>
      </div>
    </footer>
  );
}
