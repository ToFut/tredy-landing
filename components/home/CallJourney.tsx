"use client";

import { useEffect, useState } from "react";

const lines = [
  { side: "in", text: "I need a cleaning next week." },
  { side: "out", text: "Thursday at 10 or Friday at 2." },
  { side: "in", text: "Thursday at 10." },
];

export function CallJourney() {
  const [step, setStep] = useState(3);
  const [motion, setMotion] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMotion(!reduce);
    if (reduce) {
      setStep(3);
      return;
    }
    setStep(0);
    const timer = window.setInterval(() => {
      setStep((value) => (value + 1) % 6);
    }, 1600);
    return () => window.clearInterval(timer);
  }, []);

  const showCall = true;
  const shownLines = motion ? lines.slice(0, Math.min(Math.max(step, 0), lines.length)) : lines;
  const showBooked = !motion || step >= 4;
  const showText = !motion || step >= 5;

  return (
    <div className="journey" aria-label="Sample call with a fictional caller">
      <p className="journey-note">Sample. Fictional caller.</p>
      <div className="journey-card">
        <header>
          <strong>Oak Dental</strong>
          <span>Front desk</span>
        </header>
        {showCall ? (
          <div className="journey-incoming">
            <b>Incoming call</b>
            <span>Maya Chen</span>
          </div>
        ) : null}
        <div className="journey-lines">
          {shownLines.map((line) => (
            <p key={line.text} className={line.side === "out" ? "out" : "in"}>
              {line.text}
            </p>
          ))}
        </div>
        {showBooked ? (
          <div className="journey-booked">
            <b>Booked</b>
            <span>Thu 10:00</span>
            <small>New patient consult</small>
          </div>
        ) : null}
        {showText ? <p className="journey-sent">Confirmation text sent</p> : null}
      </div>
    </div>
  );
}
