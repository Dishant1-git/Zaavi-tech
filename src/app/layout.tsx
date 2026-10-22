import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Plus_Jakarta_Sans, Instrument_Serif, Urbanist } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
const serif = Instrument_Serif({ subsets: ["latin"], variable: "--font-instrument", weight: "400", style: ["normal", "italic"] });
const urbanist = Urbanist({ subsets: ["latin"], variable: "--font-urbanist", weight: ["400", "500", "600", "700"] });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Zaavi Technologies | AI Solutions & Intelligent Automation",
  description:
    "Practical AI, automation, machine learning and analytics, connected to your systems and proven before they scale. Discuss your AI project.",
  openGraph: { siteName: "Zaavi Technologies", type: "website", images: ["/logo.png"] },
};

export const viewport: Viewport = {
  themeColor: "#04050a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${grotesk.variable} ${jetbrains.variable} ${jakarta.variable} ${serif.variable} ${urbanist.variable}`}>
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
