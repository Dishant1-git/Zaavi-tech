import type { IconName } from "@/lib/content";

/* One consistent line-icon set (Part 10: "a consistent line-icon set, one per card"). 24×24, stroke-based. */
const P: Record<IconName, React.ReactNode> = {
  spark: <><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" /><path d="M18.5 15l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" /></>,
  workflow: <><rect x="3" y="3" width="6" height="6" rx="1.5" /><rect x="15" y="15" width="6" height="6" rx="1.5" /><path d="M9 6h5a3 3 0 0 1 3 3v6" /><path d="m14.5 12.5 2.5 2.5 2.5-2.5" /><circle cx="6" cy="18" r="3" /></>,
  chart: <><path d="M3 20h18" /><path d="M4 16l5-5 4 3 7-8" /><path d="M16 6h4v4" /></>,
  chat: <><path d="M4 5h16v11H9l-5 4z" /><path d="M8 9.5h8M8 12.5h5" /></>,
  cloud: <><path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 8.5a4.75 4.75 0 0 1-.5 9.5z" /><path d="M12 11v5m-2.5-2.5L12 16l2.5-2.5" /></>,
  signal: <><path d="M12 20v-9" /><circle cx="12" cy="9" r="1.6" /><path d="M8.5 12.5a5 5 0 0 1 0-7M15.5 5.5a5 5 0 0 1 0 7M5.6 15.4a9 9 0 0 1 0-12.8M18.4 2.6a9 9 0 0 1 0 12.8" /></>,
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></>,
  doc: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v4h4M9 12h6M9 15.5h6M9 9h2" /></>,
  text: <><path d="M4 6h16M4 10h10M4 14h16M4 18h7" /></>,
  bot: <><rect x="5" y="8" width="14" height="11" rx="3" /><path d="M12 8V4.5" /><circle cx="12" cy="4" r="1" /><circle cx="9.5" cy="13" r="1" /><circle cx="14.5" cy="13" r="1" /><path d="M2.5 12.5v3M21.5 12.5v3" /></>,
  brain: <><path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3h1V4z" /><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3h-1V4z" /></>,
  dashboard: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 9v11M11 16l2-3 2 2 3-4" /></>,
  plug: <><path d="M9 3v5M15 3v5" /><path d="M6 8h12v3a6 6 0 0 1-12 0z" /><path d="M12 17v4" /></>,
  server: <><rect x="4" y="3" width="16" height="7" rx="1.5" /><rect x="4" y="14" width="16" height="7" rx="1.5" /><path d="M8 6.5h.01M8 17.5h.01M12 6.5h5M12 17.5h5" /></>,
  shield: <><path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></>,
  refresh: <><path d="M20 11a8 8 0 0 0-14.6-4.5L4 8" /><path d="M4 3.5V8h4.5" /><path d="M4 13a8 8 0 0 0 14.6 4.5L20 16" /><path d="M20 20.5V16h-4.5" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.2" /></>,
  flask: <><path d="M9 3h6M10 3v6l-5.5 9.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3" /><path d="M7.5 15h9" /></>,
  link: <><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" /><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" /></>,
  gauge: <><path d="M4 17a8 8 0 1 1 16 0" /><path d="m12 15 4-5" /><circle cx="12" cy="15.5" r="1.3" /></>,
  lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2.5" /></>,
  rocket: <><path d="M14 4c3.5 0 6 2.5 6 6-1.5 3-5 6.5-8 8l-6-6c1.5-3 5-6.5 8-8z" /><circle cx="14.5" cy="9.5" r="1.7" /><path d="M7 14.5 4 16l1 3 3 1 1.5-3" /></>,
  factory: <><path d="M3 21V10l5 3V10l5 3V10l5 3V4h3v17z" /><path d="M7 17h2M12 17h2" /></>,
  cart: <><path d="M3 4h2.5l2.2 11h10.6l2.2-8H7" /><circle cx="9" cy="19" r="1.4" /><circle cx="17" cy="19" r="1.4" /></>,
  cap: <><path d="m12 4 10 5-10 5L2 9z" /><path d="M6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6" /></>,
  heart: <><path d="M12 20s-7.5-4.6-7.5-10.3A4.2 4.2 0 0 1 12 7.2a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z" /><path d="M7 12h3l1.2-2 1.8 4 1.2-2H17" /></>,
  truck: <><path d="M2 6h12v10H2zM14 10h4l3 3v3h-7" /><circle cx="6.5" cy="17.5" r="1.8" /><circle cx="17.5" cy="17.5" r="1.8" /></>,
  bank: <><path d="m3 9 9-5 9 5M4 9h16M5 9v9M9.5 9v9M14.5 9v9M19 9v9M3 20h18" /></>,
  building: <><path d="M4 21V4h11v17M15 9h5v12M2 21h20" /><path d="M8 8h3M8 12h3M8 16h3" /></>,
};

export default function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {P[name]}
    </svg>
  );
}
