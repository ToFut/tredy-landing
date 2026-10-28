"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AudioLines,
  CalendarCheck,
  Check,
  GraduationCap,
  Inbox,
  MessageSquare,
  Phone,
  Sparkles,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import {
  type BusinessId,
  type GoalId,
  businesses,
  callTimes,
  goals,
  studioMailto,
  teamSizes,
} from "@/lib/start";

const icons = {
  phone: Phone,
  leads: MessageSquare,
  book: CalendarCheck,
  voice: AudioLines,
  inbox: Inbox,
  train: GraduationCap,
  custom: Sparkles,
};

export function Wizard({
  initialGoals = [],
  initialBusiness,
  initialDetails,
  extra,
  id = "setup",
  startAtContact = false,
}: {
  initialGoals?: GoalId[];
  initialBusiness?: BusinessId;
  initialDetails?: { name?: string; businessName?: string; website?: string; phone?: string };
  extra?: Record<string, string>;
  id?: string;
  startAtContact?: boolean;
}) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(startAtContact ? 3 : 1);
  const [selected, setSelected] = useState<GoalId[]>(initialGoals);
  const [business, setBusiness] = useState<BusinessId | "">(initialBusiness ?? "");
  const [size, setSize] = useState(startAtContact ? "Just me" : "");
  const [sent, setSent] = useState(false);

  const goalLabels = useMemo(
    () => goals.filter((item) => selected.includes(item.id)).map((item) => item.label),
    [selected],
  );

  function toggle(goal: GoalId) {
    setSelected((current) =>
      current.includes(goal) ? current.filter((item) => item !== goal) : [...current, goal],
    );
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const businessLabel = businesses.find((item) => item.id === business)?.label ?? "Other";
    const href = studioMailto({
      Name: String(data.get("name") || ""),
      Business: String(data.get("businessName") || ""),
      Email: String(data.get("email") || ""),
      Phone: String(data.get("phone") || ""),
      Website: String(data.get("website") || "Not given"),
      "Best time to call": String(data.get("time") || ""),
      "Team size": size,
      "Business type": businessLabel,
      "Wants": goalLabels.join(", "),
      ...extra,
    });
    window.location.href = href;
    setSent(true);
  }

  if (sent) {
    return (
      <section id={id} className="wizard">
        <p className="kicker">Get started</p>
        <h2>We&apos;ll reach out within one business day with a setup plan.</h2>
        <p className="wizard-note">
          If your email app did not open, send the same note to segev@futurixs.com.
        </p>
      </section>
    );
  }

  return (
    <section id={id} className="wizard">
      <p className="kicker">Get started in 2 minutes</p>
      <h2>{step === 1 ? "What do you want handled?" : step === 2 ? "Your business" : "How do we reach you?"}</h2>
      <p className="wizard-step">Step {step} of 3</p>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
        >
          {step === 1 ? (
            <div className="choice-grid">
              {goals.map((item) => {
                const Icon = icons[item.id];
                const on = selected.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={on ? "choice on" : "choice"}
                    aria-pressed={on}
                    onClick={() => toggle(item.id)}
                  >
                    <Icon aria-hidden="true" />
                    <span>{item.label}</span>
                    {on ? <Check aria-hidden="true" /> : null}
                  </button>
                );
              })}
            </div>
          ) : null}
          {step === 2 ? (
            <div className="stack-gap">
              <p className="choice-label">Business type</p>
              <div className="choice-grid">
                {businesses.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={business === item.id ? "choice on" : "choice"}
                    aria-pressed={business === item.id}
                    onClick={() => setBusiness(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <p className="choice-label">Team size</p>
              <div className="choice-grid size-grid">
                {teamSizes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={size === item ? "choice on" : "choice"}
                    aria-pressed={size === item}
                    onClick={() => setSize(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          {step === 3 ? (
            <form className="setup-form" onSubmit={submit}>
              <label>
                Name
                <input name="name" autoComplete="name" required defaultValue={initialDetails?.name ?? ""} />
              </label>
              <label>
                Business name
                <input name="businessName" autoComplete="organization" required defaultValue={initialDetails?.businessName ?? ""} />
              </label>
              <label>
                Email
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>
                Phone
                <input name="phone" type="tel" autoComplete="tel" required defaultValue={initialDetails?.phone ?? ""} />
              </label>
              <label>
                Website, optional
                <input name="website" type="url" placeholder="https://" defaultValue={initialDetails?.website ?? ""} />
              </label>
              <fieldset>
                <legend>Best time to call</legend>
                <div className="choice-grid size-grid">
                  {callTimes.map((item) => (
                    <label key={item} className="choice radio">
                      <input type="radio" name="time" value={item} required />
                      {item}
                    </label>
                  ))}
                </div>
              </fieldset>
              <button className="btn btn-solid btn-lg" type="submit">
                Send my setup
              </button>
            </form>
          ) : null}
        </motion.div>
      </AnimatePresence>
      {step < 3 ? (
        <div className="wizard-nav">
          {step > 1 ? (
            <button type="button" className="btn btn-ghost btn-lg" onClick={() => setStep((value) => value - 1)}>
              Back
            </button>
          ) : null}
          <button
            type="button"
            className="btn btn-solid btn-lg"
            disabled={step === 1 ? selected.length === 0 : !business || !size}
            onClick={() => setStep((value) => value + 1)}
          >
            Continue
          </button>
        </div>
      ) : (
        <button type="button" className="btn btn-ghost btn-lg" onClick={() => setStep(2)}>
          Back
        </button>
      )}
    </section>
  );
}
