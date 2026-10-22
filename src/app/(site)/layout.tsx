import Header from "@/components/aig/Header";
import Footer from "@/components/aig/Footer";
import AigMotion from "@/components/aig/AigMotion";
import BackTop from "@/components/aig/BackTop";
import MouseFollower from "@/components/aig/MouseFollower";
import { site } from "@/lib/site";
import "@/components/aig/aig.css";
import "@/components/aig/aig-pages.css";

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/logo.png`,
  slogan: site.tagline,
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="top" className="aig">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <Header />
      <main>{children}</main>
      <Footer />
      <BackTop />
      <MouseFollower />
      <AigMotion />
    </div>
  );
}
