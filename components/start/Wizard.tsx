"use client";

import { FormEvent, useState } from "react";
import { studioMailto } from "@/lib/start";
import { planLabel } from "@/lib/content";

const needs = ["Answer my phone", "Follow up on leads", "A custom tool", "Train my team"];

export function Wizard({
  id = "plan-form",
  extra,
  initialDetails,
}: {
  initialGoals?: string[];
  initialBusiness?: string;
  initialDetails?: { name?: string; businessName?: string; website?: string; phone?: string };
  extra?: Record<string, string>;
  id?: string;
  startAtContact?: boolean;
}) {
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const href = studioMailto({
      Business: String(data.get("businessName") || ""),
      Need: String(data.get("need") || ""),
      "Email or phone": String(data.get("contact") || ""),
      ...extra,
    });
    window.location.href = href;
    setSent(true);
  }

  if (sent) {
    return (
      <section id={id} className="wizard">
        <h2>Your plan request is ready in your email app.</h2>
        <p className="wizard-note">If it did not open, send the same note to segev@futurixs.com.</p>
      </section>
    );
  }

  return (
    <section id={id} className="wizard">
      <form className="setup-form plan-form" onSubmit={submit}>
        <label>
          Business name
          <input
            name="businessName"
            autoComplete="organization"
            required
            defaultValue={initialDetails?.businessName ?? ""}
          />
        </label>
        <label>
          What you need
          <select name="need" required defaultValue="">
            <option value="" disabled>
              Choose one
            </option>
            {needs.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          Email or phone
          <input
            name="contact"
            autoComplete="email"
            required
            placeholder="you@company.com or a phone number"
            defaultValue={initialDetails?.phone ?? ""}
          />
        </label>
        <button className="btn btn-solid btn-lg" type="submit">
          {planLabel}
        </button>
      </form>
    </section>
  );
}
