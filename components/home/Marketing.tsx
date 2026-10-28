import Link from "next/link";
import { TryItLive } from "@/components/demo/TryItLive";
import { Wizard } from "@/components/start/Wizard";
import { bookCallHref } from "@/lib/content";

const marks = ["Grok", "Claude", "OpenAI", "Codex", "Gemini", "ElevenLabs", "Cursor", "Vercel", "Twilio"];

const studies = [
  {
    name: "Line Properties",
    line: "A guest booking site built on Guesty.",
    href: "https://line-properties.com",
    host: "line-properties.com",
  },
  {
    name: "Peak Exchange",
    line: "An operations platform for 1031 exchanges.",
    href: "",
    host: "",
  },
];

export function HomeHero() {
  return (
    <section className="hero-premium" id="voice">
      <div className="wrap hero-copy">
        <Link className="kicker" href="/voice-agents">
          Voice Agents
        </Link>
        <h1 className="hero-title">Your phone, answered.</h1>
        <p className="hero-sub">A receptionist in your voice, for the calls you miss.</p>
        <div className="hero-actions">
          <a className="btn btn-solid btn-lg" href="#demo">
            Try the live demo
          </a>
          <a className="btn btn-line btn-lg" href={bookCallHref}>
            Book a call
          </a>
        </div>
      </div>
      <TryItLive anchor="demo" heading={false} only={["voice"]} />
    </section>
  );
}

export function OfferingBands() {
  return (
    <div className="offer-stack">
      <section className="offer-band" id="assistants">
        <div className="wrap offer-lead">
          <p className="kicker">AI Assistants</p>
          <h2 className="section-title">The inbox, handled.</h2>
          <p className="hero-sub">A draft, a tag, and a route to the right person.</p>
          <Link className="apple-more" href="/ai-assistants">
            See AI Assistants &gt;
          </Link>
        </div>
        <TryItLive anchor="assistant-demo" heading={false} initialTab="assistant" only={["assistant"]} />
      </section>
      <section className="offer-band" id="projects">
        <div className="wrap offer-lead">
          <p className="kicker">Custom Projects</p>
          <h2 className="section-title">Software around the work.</h2>
          <p className="hero-sub">A portal, a dashboard, or the tool the team is missing.</p>
          <Link className="apple-more" href="/custom-projects">
            See Custom Projects &gt;
          </Link>
        </div>
        <TryItLive anchor="projects-demo" heading={false} initialTab="projects" only={["projects"]} />
      </section>
      <section className="offer-band" id="enablement">
        <div className="wrap offer-lead">
          <p className="kicker">AI Enablement</p>
          <h2 className="section-title">A plan the team can run.</h2>
          <p className="hero-sub">One workflow, a person who reviews it, and a first version.</p>
          <Link className="apple-more" href="/ai-enablement">
            See AI Enablement &gt;
          </Link>
        </div>
        <TryItLive anchor="enablement-demo" heading={false} initialTab="enablement" only={["enablement"]} />
      </section>
    </div>
  );
}

export function HereBand() {
  return (
    <section className="here-band reveal">
      <div className="wrap">
        <h2>Don&apos;t have the time or know-how to enable AI? We&apos;re here.</h2>
        <Link className="btn btn-solid btn-lg" href={bookCallHref}>
          Book a call
        </Link>
      </div>
    </section>
  );
}

export function LogoMarquee() {
  return (
    <section className="section model-section reveal" aria-label="Models and platforms">
      <div className="wrap">
        <h2 className="section-title">Built with</h2>
        <ul className="model-strip">
          {marks.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <p className="marquee-note">Names belong to their owners. Listing a tool is not a partnership.</p>
      </div>
    </section>
  );
}

export function CaseStudies() {
  return (
    <section className="section reveal" id="work">
      <div className="wrap">
        <h2 className="section-title">Selected work</h2>
        <div className="study-grid">
          {studies.map((study) => (
            <article key={study.name} className="study-card">
              <h3>{study.name}</h3>
              <p>{study.line}</p>
              {study.href ? (
                <a href={study.href} rel="noreferrer">
                  {study.host}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SetupBand() {
  return (
    <section className="section setup-band reveal" id="setup">
      <div className="wrap">
        <h2 className="section-title">Pick what you need.</h2>
        <p className="hero-sub">Leave your details. We reply from segev@futurixs.com.</p>
        <Wizard id="home-setup" />
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
          <a className="btn btn-solid btn-lg" href="#demo">
            Try the live demo
          </a>
          <a className="btn btn-line btn-lg" href={bookCallHref}>
            Book a call
          </a>
        </div>
      </div>
    </section>
  );
}
