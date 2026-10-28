"use client";

import type { RefObject } from "react";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return letters.join("") || "FX";
}

const callKeys = [
  { label: "mute", icon: "mic" },
  { label: "keypad", icon: "grid" },
  { label: "speaker", icon: "speaker" },
  { label: "add", icon: "add" },
  { label: "video", icon: "video" },
  { label: "contacts", icon: "person" },
] as const;

function CallGlyph({ icon }: { icon: (typeof callKeys)[number]["icon"] }) {
  if (icon === "mic") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 14a3 3 0 0 0 3-3V7a3 3 0 0 0-6 0v4a3 3 0 0 0 3 3z" fill="currentColor" />
        <path d="M7 11a5 5 0 0 0 10 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 16v3M9 19h6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M5 5l14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "grid") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, index) => (
          <circle key={index} cx={6 + (index % 3) * 6} cy={6 + Math.floor(index / 3) * 6} r="1.35" fill="currentColor" />
        ))}
      </svg>
    );
  }
  if (icon === "speaker") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 10h3l4-3v10l-4-3H4z" fill="currentColor" />
        <path d="M15 9.5a3 3 0 0 1 0 5M17.5 7a6 6 0 0 1 0 10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "add") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10" cy="9" r="3" fill="currentColor" />
        <path d="M4.5 18.5c.8-2.6 2.8-4 5.5-4s4.7 1.4 5.5 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M18 8v6M15 11h6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (icon === "video") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="7" width="12" height="10" rx="2" fill="currentColor" />
        <path d="M15 10.5l6-3v9l-6-3z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="9" r="3.2" fill="currentColor" />
      <path d="M5.5 19c1-3 3-4.5 6.5-4.5S17.5 16 18.5 19" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function IphoneCall({
  name,
  caption,
  callerLine,
  timer = "00:12",
  live = true,
  waveRef,
}: {
  name: string;
  caption: string;
  callerLine?: string;
  timer?: string;
  live?: boolean;
  waveRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="ios-call" aria-label={`Phone call with ${name}`}>
      <div className="ios-status" aria-hidden="true">
        <span>9:41</span>
        <span className="ios-status-icons">
          <svg viewBox="0 0 18 12">
            <rect x="0" y="7" width="3" height="5" rx="0.6" fill="currentColor" />
            <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.6" fill="currentColor" />
            <rect x="9" y="2.2" width="3" height="9.8" rx="0.6" fill="currentColor" />
            <rect x="13.5" y="0" width="3" height="12" rx="0.6" fill="currentColor" />
          </svg>
          <svg viewBox="0 0 16 12">
            <path d="M8 9.6a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3z" fill="currentColor" />
            <path d="M4.4 7.4a5 5 0 0 1 7.2 0" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M2.1 5a8.2 8.2 0 0 1 11.8 0" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M0.2 2.7a11 11 0 0 1 15.6 0" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <svg viewBox="0 0 27 12">
            <rect x="0.6" y="0.6" width="22" height="10.8" rx="2.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <rect x="2" y="2" width="15" height="8" rx="1" fill="currentColor" />
            <path d="M24.2 4v4c.9-.5 1.6-1.3 1.6-2s-.7-1.5-1.6-2z" fill="currentColor" />
          </svg>
        </span>
      </div>
      <p className="ios-carrier">{live ? "mobile" : "calling"}</p>
      <div className="ios-avatar" aria-hidden="true">
        {initials(name)}
      </div>
      <h3 className="ios-name">{name}</h3>
      <p className="ios-timer">{timer}</p>
      <div className={`ios-wave ${live ? "on" : ""}`} ref={waveRef} aria-hidden="true">
        {Array.from({ length: 9 }).map((_, index) => (
          <i key={index} />
        ))}
      </div>
      <div className="ios-captions">
        {callerLine ? <p>{callerLine}</p> : null}
        <p>{caption}</p>
      </div>
      <div className="ios-keys" aria-hidden="true">
        {callKeys.map((key) => (
          <span key={key.label}>
            <i>
              <CallGlyph icon={key.icon} />
            </i>
            {key.label}
          </span>
        ))}
      </div>
      <div className="ios-end" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path
            d="M7.2 10.4c1.2-1 2.6-1.6 4.8-1.6s3.6.6 4.8 1.6c.5.4.7 1 .5 1.6l-.8 2.2c-.2.5-.7.8-1.2.7l-2.2-.4c-.4-.1-.7-.4-.8-.8l-.3-1c-.5-.1-1.1-.2-1.6-.2s-1.1.1-1.6.2l-.3 1c-.1.4-.4.7-.8.8l-2.2.4c-.5.1-1-.2-1.2-.7l-.8-2.2c-.2-.6 0-1.2.5-1.6z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}

export function WhatsAppThread({
  name,
  messages,
}: {
  name: string;
  messages: { side: "in" | "out"; text: string; time: string }[];
}) {
  return (
    <div className="wa" aria-label={`Message thread with ${name}`}>
      <header className="wa-head">
        <span className="wa-avatar" aria-hidden="true">
          {initials(name)}
        </span>
        <div>
          <strong>{name}</strong>
          <small>online</small>
        </div>
      </header>
      <div className="wa-body">
        {messages.map((message) => (
          <p key={`${message.time}-${message.text}`} className={message.side === "out" ? "wa-bubble out" : "wa-bubble in"}>
            {message.text}
            <span>
              {message.time}
              {message.side === "out" ? <i className="wa-ticks" aria-hidden="true" /> : null}
            </span>
          </p>
        ))}
      </div>
      <div className="wa-bar">
        <span aria-hidden="true">+</span>
        <input aria-label="Message" placeholder="Message" readOnly />
        <span className="wa-mic" aria-hidden="true" />
      </div>
    </div>
  );
}

export function TeamThread({
  channel,
  messages,
}: {
  channel: string;
  messages: { author: string; time: string; text: string; system?: boolean }[];
}) {
  return (
    <div className="team" aria-label={`${channel} thread`}>
      <aside className="team-rail" aria-hidden="true">
        <b>NR</b>
        <span />
        <span />
        <span />
      </aside>
      <div className="team-main">
        <header>
          <strong># {channel}</strong>
          <small>North Roofing</small>
        </header>
        <div className="team-log">
          {messages.map((message) =>
            message.system ? (
              <p key={message.text} className="team-system">
                {message.text}
              </p>
            ) : (
              <article key={`${message.author}-${message.text}`}>
                <span aria-hidden="true">{initials(message.author)}</span>
                <div>
                  <strong>
                    {message.author} <time>{message.time}</time>
                  </strong>
                  <p>{message.text}</p>
                </div>
              </article>
            ),
          )}
        </div>
        <div className="team-compose">
          <input aria-label={`Message ${channel}`} placeholder={`Message #${channel}`} readOnly />
        </div>
      </div>
    </div>
  );
}

export function OpsDashboard({
  title,
  rows,
}: {
  title: string;
  rows: { status: string; job: string; when: string }[];
}) {
  return (
    <div className="dash" aria-label={`${title} dashboard`}>
      <aside aria-hidden="true">
        <strong>{initials(title)}</strong>
        <span>Jobs</span>
        <span>Schedule</span>
        <span>Customers</span>
      </aside>
      <div>
        <header>
          <h3>{title}</h3>
          <p>Sample data, not a live account</p>
        </header>
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>Job</th>
              <th>When</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.job}>
                <td>
                  <em>{row.status}</em>
                </td>
                <td>{row.job}</td>
                <td>{row.when}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function RolloutBoard({
  step,
  items,
}: {
  step: string;
  items: { label: string; state: string }[];
}) {
  return (
    <div className="rollout" aria-label="Enablement plan">
      <aside aria-hidden="true">
        <span>Assessment</span>
        <span>Training</span>
        <span className="on">Rollout</span>
      </aside>
      <div>
        <header>
          <p>North Roofing</p>
          <h3>{step}</h3>
        </header>
        <ul>
          {items.map((item) => (
            <li key={item.label} className={item.state}>
              <i aria-hidden="true" />
              <span>{item.label}</span>
              <small>{item.state}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
