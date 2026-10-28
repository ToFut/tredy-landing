"use client";

import { FormEvent, useState } from "react";
import { offerings, site } from "@/lib/content";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const website = String(data.get("website") || "").trim();
    const offering = String(data.get("offering") || "").trim();
    const message = String(data.get("message") || "").trim();

    const lines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${company || "Not given"}`,
      `Website: ${website || "Not given"}`,
      `Offering: ${offering}`,
      "",
      message,
    ];
    const subject = `15-minute call: ${offering}`;
    const href = `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = href;
    setSent(true);
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="field-row">
        <label>
          Name
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <div className="field-row">
        <label>
          Company
          <input name="company" autoComplete="organization" />
        </label>
        <label>
          Website
          <input name="website" type="url" autoComplete="url" placeholder="https://" />
        </label>
      </div>
      <label>
        Offering
        <select name="offering" required defaultValue="">
          <option value="" disabled>
            Choose one
          </option>
          {offerings.map((item) => (
            <option key={item.id} value={item.title}>
              {item.title}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </label>
      <label>
        What should we talk about
        <textarea name="message" rows={5} required />
      </label>
      <button className="btn btn-paper" type="submit">
        Book a 15-minute call
        <span aria-hidden="true"> →</span>
      </button>
      <p className="form-note">
        This opens your email app, addressed to {site.contactEmail}. Read the{" "}
        <a href="/privacy">privacy notice</a>.
      </p>
      {sent ? (
        <p className="form-success" role="status">
          Your email app should open with this note, addressed to {site.contactEmail}. If it
          does not, send the same note there.
        </p>
      ) : null}
    </form>
  );
}
