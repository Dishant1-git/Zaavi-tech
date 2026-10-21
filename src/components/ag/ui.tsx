import Link from "next/link";

export const container = "mx-auto w-full max-w-[1200px] px-5 lg:px-4";

export const GRAD = "bg-[linear-gradient(90deg,#1f8bff,#0a3fb8,#1f8bff)] bg-[length:200%_100%] transition-[background-position] duration-500 hover:bg-[position:100%_0]";

export function Arrow({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 10h12m0 0-5-5m5 5-5 5" />
    </svg>
  );
}

/** Gradient pill + round arrow button, the site's signature CTA. */
export function DiscoverButton({ href = "/contact", label = "Discover more" }: { href?: string; label?: string }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2.5">
      <span className={`${GRAD} rounded-full px-7 py-4 font-ag text-sm font-bold tracking-tight text-white uppercase shadow-[0_15px_30px_-12px_rgba(31,139,255,0.7)] sm:px-8`}>
        {label}
      </span>
      <span className={`${GRAD} grid h-14 w-14 shrink-0 place-items-center rounded-full text-white transition-transform duration-500 group-hover:rotate-[-45deg]`}>
        <Arrow />
      </span>
    </Link>
  );
}

export function GhostButton({ href, label, light = true }: { href: string; label: string; light?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full border px-7 py-4 font-ag text-sm font-bold tracking-tight uppercase transition-colors duration-300 ${
        light ? "border-white/30 text-white hover:border-white hover:bg-white hover:text-ag-dark" : "border-ag-dark/20 text-ag-dark hover:border-ag-base hover:text-ag-base"
      }`}
    >
      {label}
      <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export function Eyebrow({ children, light = false, center = false }: { children: React.ReactNode; light?: boolean; center?: boolean }) {
  return (
    <div data-reveal="up" className={`mb-5 flex items-center gap-3 font-ag text-xs font-bold tracking-[0.22em] uppercase ${light ? "text-[#7cc4ff]" : "text-ag-base"} ${center ? "justify-center" : ""}`}>
      <span className="h-[2px] w-8 bg-[linear-gradient(90deg,#1f8bff,#0a3fb8)]" />
      {children}
    </div>
  );
}

export function Heading({ children, className = "", light = false, center = false, as: Tag = "h2" }: { children: React.ReactNode; className?: string; light?: boolean; center?: boolean; as?: "h1" | "h2" }) {
  return (
    <Tag
      data-split
      className={`font-ag text-[32px] leading-[1.15] font-extrabold tracking-[-0.02em] sm:text-[42px] lg:text-[48px] ${light ? "text-white" : "text-ag-dark"} ${center ? "text-center" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}

export const notch = (size = 56) => ({ clipPath: `polygon(0 0, calc(100% - ${size}px) 0, 100% ${size}px, 100% 100%, 0 100%)` });

export const Social = {
  facebook: <path d="M13.5 21v-7h2.4l.4-2.9h-2.8V9.3c0-.8.2-1.4 1.4-1.4h1.5V5.3c-.3 0-1.1-.1-2.2-.1-2.2 0-3.6 1.3-3.6 3.7v2.2H8.2V14h2.4v7z" fill="currentColor" />,
  x: <path d="M17.7 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2l7.3-8.4L1.7 3h6.4l4.4 5.9zm-1.1 16.2h1.7L7.2 4.7H5.4z" fill="currentColor" />,
  linkedin: <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z" fill="currentColor" />,
  youtube: <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z" fill="currentColor" />,
};

export function SocialIcon({ name, className = "h-4 w-4" }: { name: keyof typeof Social; className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} aria-hidden>{Social[name]}</svg>;
}
