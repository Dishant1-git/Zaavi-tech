"use client";

import { useEffect, useState } from "react";
import { contactPage } from "@/lib/content";
import { isPlaceholder, site } from "@/lib/site";
import { Glyph } from "./ui";

/**
 * Enquiry form (Part 6). There is no backend yet: on submit it opens the visitor's email app,
 * addressed to site.email, with the enquiry filled in. Swap handleSubmit for an API route or form service to go live.
 */
export default function ContactForm() {
  const [interest, setInterest] = useState("");
  const [sent, setSent] = useState(false);

  // Pre-select the service when arriving from a service page (/contact?service=slug).
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("service");
    const match = contactPage.interests.find((i) => i.slug && i.slug === slug);
    if (match) setInterest(match.label);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const body = [
      `Name: ${d.get("name")}`,
      `Work email: ${d.get("email")}`,
      `Phone: ${d.get("phone") || "-"}`,
      `Company: ${d.get("company")}`,
      `Interested in: ${d.get("interest")}`,
      "",
      `${d.get("challenge")}`,
    ].join("\n");
    if (!isPlaceholder(site.email)) {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Website enquiry from ${d.get("company")}`)}&body=${encodeURIComponent(body)}`;
    }
    setSent(true);
  };

  if (sent) {
    return (
      <div className="form-contact grid min-h-[420px] place-items-center text-center">
        <div>
          <span className="brand-tile mx-auto"><Glyph name="check" strokeWidth={2.4} /></span>
          <h2 className="h4 fw-semibold mt-6">Thank you for your enquiry.</h2>
          <p className="t-sec mx-auto mt-3 max-w-md">We review your enquiry and reply within {site.responseTime}.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="form-contact">
      <h2 className="heading h4 fw-semibold">Fill in the form below</h2>
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="f">Full name <span className="t-brand">*</span></label>
          <input id="cf-name" name="name" required autoComplete="name" placeholder="Enter your full name" />
        </div>
        <div>
          <label htmlFor="cf-email" className="f">Work email <span className="t-brand">*</span></label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder="you@company.com" />
        </div>
        <div>
          <label htmlFor="cf-phone" className="f">Phone number</label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" placeholder="Optional" />
        </div>
        <div>
          <label htmlFor="cf-company" className="f">Company name <span className="t-brand">*</span></label>
          <input id="cf-company" name="company" required autoComplete="organization" placeholder="Your organisation" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-interest" className="f">I&apos;m interested in <span className="t-brand">*</span></label>
          <select id="cf-interest" name="interest" required value={interest} onChange={(e) => setInterest(e.target.value)}>
            <option value="" disabled>Select a service</option>
            {contactPage.interests.map((i) => <option key={i.label} value={i.label}>{i.label}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-challenge" className="f">Tell us about your challenge <span className="t-brand">*</span></label>
          <textarea id="cf-challenge" name="challenge" required placeholder={contactPage.challengeHint} />
        </div>
      </div>
      <label className="mt-7 mb-8 flex cursor-pointer items-start gap-3 t-sec">
        <input type="checkbox" name="consent" required className="mt-1 h-5 w-5 shrink-0 accent-[var(--brand)]" />
        {contactPage.consent}
      </label>
      <button type="submit" className="tf-btn w-full">{contactPage.cta}</button>
    </form>
  );
}
