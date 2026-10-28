"use client";

import { FormEvent, useState } from "react";
import { studioMailto } from "@/lib/start";
import { planLabel } from "@/lib/content";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const windows = ["Morning", "Afternoon", "Evening"];

export function BookFlow() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [day, setDay] = useState("");
  const [slot, setSlot] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const href = studioMailto({
      Name: name,
      "Phone or email": contact,
      Day: day,
      Time: slot,
    });
    window.location.href = href;
    setStep(3);
  }

  if (step === 3) {
    return (
      <div className="book-done" role="status">
        <h1 className="type-h1">We will call you within 1 business day.</h1>
        <p className="type-body">If your email app did not open, write to segev@futurixs.com with the same details.</p>
      </div>
    );
  }

  return (
    <form className="book-form" onSubmit={step === 2 ? submit : (event) => event.preventDefault()}>
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
          <div className="plan-actions">
            <button className="text-btn" type="button" onClick={() => setStep(1)}>
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
