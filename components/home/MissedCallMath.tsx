"use client";

import { useMemo, useState } from "react";
import { Actions } from "@/components/ui/Actions";

function numberValue(raw: string) {
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 0) return null;
  return value;
}

export function MissedCallMath() {
  const [missed, setMissed] = useState("");
  const [bookRate, setBookRate] = useState("");
  const [jobValue, setJobValue] = useState("");

  const result = useMemo(() => {
    const calls = numberValue(missed);
    const percent = numberValue(bookRate);
    const value = numberValue(jobValue);
    if (calls === null || percent === null || value === null) return null;
    if (percent > 100) return null;
    return Math.round(calls * (percent / 100) * value * 4);
  }, [missed, bookRate, jobValue]);

  return (
    <section className="band tone-a" id="estimate">
      <div className="wrap missed-math">
        <p className="kicker">Your numbers</p>
        <h2 className="fx-title">What missed calls may be costing.</h2>
        <p className="fx-lede">
          This is an estimate from the numbers you type. It is not a Futurix result, and it does not predict what your
          office will book.
        </p>
        <form className="missed-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            Missed calls per week
            <input
              inputMode="decimal"
              value={missed}
              onChange={(event) => setMissed(event.target.value)}
              aria-describedby="estimate-note"
            />
          </label>
          <label>
            Percent that would book
            <input
              inputMode="decimal"
              value={bookRate}
              onChange={(event) => setBookRate(event.target.value)}
            />
          </label>
          <label>
            Average visit value, USD
            <input
              inputMode="decimal"
              value={jobValue}
              onChange={(event) => setJobValue(event.target.value)}
            />
          </label>
        </form>
        <p className="missed-result" id="estimate-note">
          {result === null
            ? "Enter all three numbers. The month uses 4 weeks."
            : `Estimated revenue left on the table: $${result.toLocaleString("en-US")} per month.`}
        </p>
        <p className="missed-fine">
          Estimate only. Missed calls per week, times the percent you said would book, times the visit value, times 4
          weeks. Results depend on your lead volume and how your team handles handoffs.
        </p>
        <Actions location="estimate" />
      </div>
    </section>
  );
}
