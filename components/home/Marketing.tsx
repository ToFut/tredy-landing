import Link from "next/link";
import { bookCallHref } from "@/lib/content";

const marks = [
  "Grok",
  "Claude",
  "GPT",
  "Codex",
  "Gemini",
  "ElevenLabs",
  "Cursor",
  "Vercel",
  "Microsoft 365",
  "Twilio",
  "Supabase",
  "n8n",
  "Make",
];

export function HomeHero() {
  return (
    <section className="hero-premium">
      <div className="aurora" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div>
          <p className="kicker">Futurix</p>
          <h1 className="hero-title">AI that works for your business.</h1>
          <p className="hero-sub">Answer calls, follow up, and ship the tools around the work.</p>
          <div className="hero-actions">
            <Link className="btn btn-solid btn-lg" href="#try">
              Try it live
            </Link>
            <Link className="text-link apple-more" href="/voice-agents">
              Learn more &gt;
            </Link>
          </div>
        </div>
        <div className="float-phone" aria-hidden="true">
          <div className="iphone glow-phone">
            <div className="iphone-notch" />
            <p className="phone-label">In call</p>
            <div className="mini-wave tall idle-wave">
              {Array.from({ length: 16 }).map((_, index) => (
                <i key={index} />
              ))}
            </div>
            <p className="bubble caller">
              <b>Caller</b>
              The roof is leaking after the storm.
            </p>
            <p className="bubble agent">
              <b>North Roofing</b>
              I can book an estimate for Thursday at 10 AM.
            </p>
            <p className="booked-chip">Booked: Thu 10:00 AM</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function OfferBento() {
  const cards = [
    { href: "/voice-agents", title: "Voice agents", line: "Answers, qualifies, books.", kind: "wave" },
    { href: "/ai-assistants", title: "AI assistants", line: "Drafts a reply, then routes it.", kind: "chat" },
    { href: "/custom-projects", title: "Custom projects", line: "Portals and tools, built around you.", kind: "window" },
    { href: "/ai-enablement", title: "AI enablement", line: "A plan the team can run.", kind: "steps" },
  ];
  return (
    <section id="offerings" className="section">
      <div className="wrap">
        <h2 className="section-title">Four ways in.</h2>
        <div className="bento">
          {cards.map((card) => (
            <Link key={card.href} href={card.href} className="bento-card">
              <Mini kind={card.kind} />
              <h3>{card.title}</h3>
              <p>{card.line}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mini({ kind }: { kind: string }) {
  if (kind === "wave") {
    return (
      <div className="mini-art" aria-hidden="true">
        <div className="mini-wave">
          {Array.from({ length: 10 }).map((_, index) => (
            <i key={index} />
          ))}
        </div>
      </div>
    );
  }
  if (kind === "chat") {
    return (
      <div className="mini-art" aria-hidden="true">
        <span className="mini-bubble" />
        <span className="mini-bubble alt" />
      </div>
    );
  }
  if (kind === "window") {
    return (
      <div className="mini-art window" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
    );
  }
  return (
    <div className="mini-art steps" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}

export function HereBand() {
  return (
    <section className="here-band">
      <div className="wrap">
        <h2>Don&apos;t have the time or know-how to enable AI? We&apos;re here.</h2>
        <Link className="btn btn-solid btn-lg" href={bookCallHref}>
          Book a 15-minute call
        </Link>
      </div>
    </section>
  );
}

export function LogoMarquee() {
  const row = [...marks, ...marks];
  return (
    <section className="section marquee-section" aria-label="Models and platforms">
      <div className="wrap">
        <h2 className="section-title">Built with</h2>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {row.map((name, index) => (
            <span key={`${name}-${index}`}>{name}</span>
          ))}
        </div>
      </div>
      <p className="marquee-note">Names are trademarks of their owners.</p>
    </section>
  );
}

export function HowSteps() {
  const steps = ["Name one workflow", "Ship a small version", "Train the team on it"];
  return (
    <section id="approach" className="section">
      <div className="wrap">
        <h2 className="section-title">How it works</h2>
        <ol className="how-steps">
          {steps.map((step, index) => (
            <li key={step}>
              <span>0{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="final-cta">
      <div className="wrap">
        <h2>Put it on your real phone line.</h2>
        <div className="hero-actions">
          <Link className="btn btn-solid btn-lg" href="/get-started">
            Try it live
          </Link>
          <Link className="btn btn-ghost btn-lg" href={bookCallHref}>
            Book a 15-minute call
          </Link>
        </div>
      </div>
    </section>
  );
}
