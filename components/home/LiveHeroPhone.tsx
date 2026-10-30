"use client";

import { useEffect, useState } from "react";

const script = [
  { side: "caller", text: "I need a cleaning next week." },
  { side: "agent", text: "Thursday at 10 or Friday at 2. Which works?" },
  { side: "caller", text: "Thursday at 10." },
  { side: "agent", text: "Booked. I will text you a confirmation." },
];

export function LiveHeroPhone() {
  const [index, setIndex] = useState(1);
  const [seconds, setSeconds] = useState(12);
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMotion(!reduce);
    if (reduce) return;
    const lines = window.setInterval(() => {
      setIndex((value) => (value + 1) % script.length);
    }, 1800);
    const clock = window.setInterval(() => {
      setSeconds((value) => (value + 1) % 60);
    }, 1000);
    return () => {
      window.clearInterval(lines);
      window.clearInterval(clock);
    };
  }, []);

  const current = script[index];
  const previous = script[(index + script.length - 1) % script.length];
  const timer = `00:${String(motion ? seconds : 12).padStart(2, "0")}`;

  return (
    <div className="hero-stage">
      <div className="hero-glow" aria-hidden="true" />
      <div className="phone-wrap">
        <a className="live-badge" href="#demo">
          Live demo
        </a>
        <div className="iphone-shell" aria-hidden="true">
          <div className="ios-call">
            <span className="dynamic-island" />
            <div className="ios-status">
              <span>9:41</span>
            </div>
            <p className="ios-carrier">mobile</p>
            <div className="ios-avatar">OD</div>
            <p className="ios-name">Oak Dental</p>
            <p className="ios-timer">{timer}</p>
            <div className={`ios-wave ${motion ? "on" : ""}`}>
              {Array.from({ length: 9 }).map((_, item) => (
                <i key={item} />
              ))}
            </div>
            <div className="ios-captions">
              <p>{previous.side === "caller" ? previous.text : current.text}</p>
              <p>{current.side === "agent" ? current.text : previous.text}</p>
            </div>
            <div className="ios-end" />
          </div>
        </div>
      </div>
    </div>
  );
}
