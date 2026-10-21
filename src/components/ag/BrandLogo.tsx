import Image from "next/image";

/**
 * Zaavi Technologies logo from /public (generated from src/app/photos/LOGO.png).
 * `tone="light"` uses the white-lettered variant for dark backgrounds; `"dark"` is the original artwork.
 */
export default function BrandLogo({ tone = "light", className = "h-12 w-auto" }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <Image
      src={tone === "light" ? "/logo-light.png" : "/logo.png"}
      alt="Zaavi Technologies"
      width={1000}
      height={352}
      priority
      className={className}
    />
  );
}
