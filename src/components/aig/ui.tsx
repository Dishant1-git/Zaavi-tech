
/** Eyebrow chip + large gradient title, the heading used by every homepage section. */
export function SectionHeading({
  sub,
  children,
  center = false,
  dark = false,
  grad = "grad-3",
  className = "",
}: {
  sub: string;
  children?: React.ReactNode;
  center?: boolean;
  dark?: boolean;
  grad?: "grad-2" | "grad-3" | "";
  className?: string;
}) {
  return (
    <div className={`heading-section ${center ? "center" : ""} ${className}`}>
      <div className={`heading-sub effectFade fadeUp ${dark ? "dark" : ""}`}>{sub}</div>
      {children && <h2 className={`heading-title effectFade fadeRotateX ${dark ? "text-white" : grad}`}>{children}</h2>}
    </div>
  );
}

const paths = {
  arrowDown: <path d="M12 4v16m0 0-6-6m6 6 6-6" />,
  arrowUpRight: <path d="M7 17 17 7m0 0H8m9 0v9" />,
  left: <path d="m15 5-7 7 7 7" />,
  right: <path d="m9 5 7 7-7 7" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
};

export function Glyph({ name, className = "h-5 w-5", strokeWidth = 2 }: { name: keyof typeof paths; className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {paths[name]}
    </svg>
  );
}

export function QuoteMark({ fill = "#e2e7ef" }: { fill?: string }) {
  return (
    <svg width="23" height="20" viewBox="0 0 23 20" fill="none" aria-hidden>
      <path d="M12.94 20v-9.64c0-2.64.88-4.84 2.66-6.62C17.42 1.92 19.89.67 23 0v6.4c-1.2.39-1.99.87-2.37 1.44-.38.53-.6 1.2-.65 2.02H23V20H12.94ZM0 20v-9.64c0-2.64.89-4.84 2.66-6.62C4.48 1.92 6.95.67 10.06 0v6.4c-1.15.39-1.94.87-2.37 1.44-.38.53-.6 1.2-.65 2.02h3.02V20H0Z" fill={fill} />
    </svg>
  );
}

/** Four-point sparkle pair from the hero eyebrow. */
export function Sparkles({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="currentColor" aria-hidden>
      <path d="M3.53 12.1c.22-.6 1.06-.6 1.29 0l.72 1.96c.07.18.22.33.4.4l1.96.72c.6.22.6 1.06 0 1.28l-1.96.73a.68.68 0 0 0-.4.4l-.72 1.96c-.22.6-1.06.6-1.29 0l-.72-1.96a.68.68 0 0 0-.4-.4l-1.96-.73c-.6-.22-.6-1.06 0-1.28l1.96-.72a.68.68 0 0 0 .4-.4l.72-1.96Z" />
      <path d="M11.41.67c.33-.9 1.59-.9 1.92 0l1.46 3.94c.1.28.33.5.61.61l3.94 1.46c.9.33.9 1.6 0 1.92l-3.94 1.46c-.28.1-.5.33-.61.61l-1.46 3.94c-.33.9-1.59.9-1.92 0l-1.46-3.94a1.05 1.05 0 0 0-.61-.61L5.4 8.6c-.9-.33-.9-1.6 0-1.92l3.94-1.46c.28-.1.5-.33.61-.61L11.41.67Z" />
    </svg>
  );
}
