/**
 * Business details and switches for the Zaavi Technologies site.
 * Values in [square brackets] are placeholders from the content document; replace them with verified details
 * before going live (Part 10, pre-publication checklist).
 */
export const site = {
  name: "Zaavi Technologies",
  tagline: "AI That Works the Way Your Business Does.",
  /** Used for sitemap and canonical URLs. */
  url: "https://www.example.com",

  city: "[City, Country]",
  email: "[email address]",
  phone: "[number]",
  address: "[full address]",
  hours: "[days and times, with time zone]",
  responseTime: "[one business day]",

  social: { facebook: "#", x: "#", linkedin: "#", youtube: "#" },

  /**
   * Editor notes: publish Cloud and Telecom only if Zaavi genuinely delivers them.
   * Turning one off removes its pages, cards, menu items and form options; the homepage then shows the
   * "Data Analytics & Business Intelligence" and "AI Consulting & Strategy" cards instead.
   */
  offers: { cloud: true, telecom: true },
};

export const isPlaceholder = (v: string) => v.startsWith("[");
