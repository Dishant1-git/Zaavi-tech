import Header from "@/components/ag/Header";
import Footer from "@/components/ag/Footer";
import BackTop from "@/components/ag/BackTop";
import { site } from "@/lib/site";

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
    <div className="overflow-x-clip bg-white font-ag text-ag-text">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <Header />
      <main>{children}</main>
      <Footer />
      <BackTop />
    </div>
  );
}
