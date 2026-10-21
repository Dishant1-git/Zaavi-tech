"use client";

import { useEffect, useState } from "react";
import { contactPage } from "@/lib/content";
import { isPlaceholder, site } from "@/lib/site";
import { GRAD } from "./ui";

const field = "w-full rounded-2xl border border-ag-border bg-ag-light px-5 py-4 font-ag text-[15px] text-ag-dark outline-none transition-colors placeholder:text-ag-gray focus:border-ag-base focus:bg-white";
const label = "mb-2 block font-ag text-sm font-bold text-ag-dark";

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
      <div className="grid min-h-[420px] place-items-center rounded-[30px] border border-ag-border bg-white p-10 text-center">
        <div>
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[linear-gradient(135deg,#1f8bff,#0a3fb8)] text-white">
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="m5 12 5 5L20 7" /></svg>
          </span>
          <h2 className="mt-6 font-ag text-2xl font-extrabold text-ag-dark">Thank you for your enquiry.</h2>
          <p className="mx-auto mt-3 max-w-md leading-[1.8] text-ag-text">We review your enquiry and reply within {site.responseTime}.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[30px] border border-ag-border bg-white p-6 shadow-[0_30px_60px_-40px_rgba(13,26,66,0.5)] sm:p-10">
      <h2 className="font-ag text-2xl font-extrabold text-ag-dark">Enquiry form</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={label}>Full name <span className="text-ag-base">*</span></label>
          <input id="cf-name" name="name" required autoComplete="name" className={field} />
        </div>
        <div>
          <label htmlFor="cf-email" className={label}>Work email <span className="text-ag-base">*</span></label>
          <input id="cf-email" name="email" type="email" required autoComplete="email" className={field} />
        </div>
        <div>
          <label htmlFor="cf-phone" className={label}>Phone number</label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" className={field} />
        </div>
        <div>
          <label htmlFor="cf-company" className={label}>Company name <span className="text-ag-base">*</span></label>
          <input id="cf-company" name="company" required autoComplete="organization" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-interest" className={label}>I&apos;m interested in <span className="text-ag-base">*</span></label>
          <select id="cf-interest" name="interest" required value={interest} onChange={(e) => setInterest(e.target.value)} className={`${field} appearance-none bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 12 12%22%3E%3Cpath d=%22m3 4.5 3 3 3-3%22 fill=%22none%22 stroke=%22%230f1b33%22 stroke-width=%221.6%22/%3E%3C/svg%3E')] bg-[length:14px] bg-[position:right_20px_center] bg-no-repeat`}>
            <option value="" disabled>Select a service</option>
            {contactPage.interests.map((i) => <option key={i.label} value={i.label}>{i.label}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-challenge" className={label}>Tell us about your challenge <span className="text-ag-base">*</span></label>
          <textarea id="cf-challenge" name="challenge" required rows={6} placeholder={contactPage.challengeHint} className={`${field} resize-y`} />
        </div>
      </div>
      <label className="mt-6 flex cursor-pointer items-start gap-3 font-ag text-[15px] font-medium text-ag-text">
        <input type="checkbox" name="consent" required className="mt-1 h-5 w-5 shrink-0 accent-[#1f8bff]" />
        {contactPage.consent}
      </label>
      <button type="submit" className={`${GRAD} mt-8 w-full rounded-full px-10 py-4 font-ag text-sm font-bold text-white uppercase sm:w-auto`}>
        {contactPage.cta}
      </button>
    </form>
  );
}
