export const Social = {
  facebook: <path d="M13.5 21v-7h2.4l.4-2.9h-2.8V9.3c0-.8.2-1.4 1.4-1.4h1.5V5.3c-.3 0-1.1-.1-2.2-.1-2.2 0-3.6 1.3-3.6 3.7v2.2H8.2V14h2.4v7z" fill="currentColor" />,
  x: <path d="M17.7 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2l7.3-8.4L1.7 3h6.4l4.4 5.9zm-1.1 16.2h1.7L7.2 4.7H5.4z" fill="currentColor" />,
  linkedin: <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z" fill="currentColor" />,
  youtube: <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z" fill="currentColor" />,
};

export function SocialIcon({ name, className = "h-4 w-4" }: { name: keyof typeof Social; className?: string }) {
  return <svg viewBox="0 0 24 24" className={className} aria-hidden>{Social[name]}</svg>;
}
