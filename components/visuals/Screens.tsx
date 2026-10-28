"use client";

import type { RefObject } from "react";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const letters = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return letters.join("") || "FX";
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
          <i />
          <i />
          <b />
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
        {["mute", "keypad", "speaker", "add", "video", "contacts"].map((label) => (
          <span key={label}>
            <i />
            {label}
          </span>
        ))}
      </div>
      <div className="ios-end" aria-hidden="true" />
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
