"use client";

import { FormEvent, useState } from "react";
import { planLabel } from "@/lib/content";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const windows = ["Morning", "Afternoon", "Evening"];

export function BookFlow() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [day, setDay] = useState("");
  const [slot, setSlot] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, contact, day, slot }),
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      setError(payload.error || "Could not save your request. Try again.");
      return;
    }
    setStep(3);
  }

  if (step === 3) {
    return (
      <div className="book-done" role="status">
        <h2 className="type-h2">Thanks, we will call you within 1 business day.</h2>
      </div>
    );
  }

  return (
    <form className="book-form" onSubmit={step === 2 ? submit : (event) => event.preventDefault()}>
      <div className="step-bar" role="progressbar" aria-valuemin={1} aria-valuemax={2} aria-valuenow={step}>
        <span style={{ width: step === 1 ? "50%" : "100%" }} />
      </div>
      <p className="type-small">Step {step} of 2</p>
      {step === 1 ? (
        <>
          <label>
            Name
            <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required />
          </label>
          <label>
            Phone or email
            <input value={contact} onChange={(event) => setContact(event.target.value)} autoComplete="email" required />
          </label>
          <button
            className="btn btn-primary"
            type="button"
            disabled={!name.trim() || !contact.trim()}
            onClick={() => setStep(2)}
          >
            Continue
          </button>
        </>
      ) : (
        <>
          <fieldset>
            <legend>Preferred day</legend>
            <div className="choice-row">
              {days.map((item) => (
                <label key={item} className={day === item ? "choice on" : "choice"}>
                  <input type="radio" name="day" value={item} checked={day === item} onChange={() => setDay(item)} required />
                  {item}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Time window</legend>
            <div className="choice-row">
              {windows.map((item) => (
                <label key={item} className={slot === item ? "choice on" : "choice"}>
                  <input type="radio" name="slot" value={item} checked={slot === item} onChange={() => setSlot(item)} required />
                  {item}
                </label>
              ))}
            </div>
          </fieldset>
          {error ? <p role="alert">{error}</p> : null}
          <div className="actions">
            <button className="btn btn-secondary" type="button" onClick={() => setStep(1)}>
              Back
            </button>
            <button className="btn btn-primary" type="submit" disabled={!day || !slot}>
              {planLabel}
            </button>
          </div>
        </>
      )}
    </form>
  );
}
