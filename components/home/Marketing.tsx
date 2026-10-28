import Link from "next/link";
import { PlatformMarquee } from "@/components/home/PlatformMarquee";
import { Wizard } from "@/components/start/Wizard";
import { IphoneCall, OpsDashboard, RolloutBoard, TeamThread } from "@/components/visuals/Screens";
import { bookCallHref } from "@/lib/content";

const offerings = [
  {
    href: "/voice-agents",
    index: "01",
    title: "Voice Agents",
    line: "Your phone, answered.",
    detail: "A receptionist that books and texts back.",
    link: "Try the live demo",
  },
  {
    href: "/ai-assistants",
    index: "02",
    title: "AI Assistants",
    line: "The inbox, handled.",
    detail: "Drafts, tags, and routes in the tools you already open.",
    link: "See assistants",
  },
  {
    href: "/custom-projects",
    index: "03",
    title: "Custom Projects",
    line: "Software around the work.",
    detail: "Portals, dashboards, and platforms shaped to your process.",
    link: "See projects",
  },
  {
    href: "/ai-enablement",
    index: "04",
    title: "AI Enablement",
    line: "A plan the team can run.",
    detail: "Assessment, training, and rollout without the buzzwords.",
    link: "See enablement",
  },
];

export function HomeHero() {
  return (
    <section className="home-hero">
      <div className="wrap home-hero-grid">
        <div className="hero-copy">
          <p className="kicker">AI for small and mid-size businesses</p>
          <h1 className="hero-title">AI that answers, books, and runs while you work.</h1>
          <p className="hero-sub">
            Don&apos;t have the time or know-how to enable AI? We&apos;re here. Voice agents, assistants, custom
            software, and enablement, built with Grok, Claude, and ElevenLabs.
          </p>
          <div className="hero-actions">
            <a className="btn btn-solid btn-lg" href="#demo">
              Hear it answer
            </a>
            <a className="btn btn-line btn-lg" href={bookCallHref}>
              Book a 15-min call
            </a>
          </div>
          <p className="hero-proof">
            Real work only. <Link href="#work">Line Properties</Link> · <Link href="#work">Peak Exchange</Link> · live
            voice clone.
          </p>
        </div>
        <div className="hero-phone">
          <IphoneCall
            name="North Roofing"
            caption="Hi, thanks for calling North Roofing. How can I help you today?"
            callerLine="Can someone look at a leak this week?"
            timer="00:12"
          />
        </div>
      </div>
    </section>
  );
}

export function ModelStrip() {
  return <PlatformMarquee />;
}

export function OfferingCards() {
  return (
    <section className="section" id="offerings">
      <div className="wrap">
        <p className="kicker">Four offerings</p>
        <h2 className="section-title offer-heading">Start with the bottleneck.</h2>
        <div className="offer-cards">
          {offerings.map((item) => (
            <Link key={item.href} href={item.href} className="offer-card">
              <div className="offer-visual" aria-hidden="true">
                <OfferArt kind={item.index} />
              </div>
              <p className="kicker">
                {item.index} · {item.title}
              </p>
              <h3>{item.line}</h3>
              <p>{item.detail}</p>
              <span>{item.link} &gt;</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function OfferArt({ kind }: { kind: string }) {
  if (kind === "01") {
    return (
      <IphoneCall
        name="North Roofing"
        caption="Thursday 10:30 or Friday 2:00. Which works?"
        callerLine="Can someone look at a leak this week?"
        timer="00:18"
      />
    );
  }
  if (kind === "02") {
    return (
      <TeamThread
        channel="inbox"
        messages={[
          { author: "Alex Kim", time: "9:14 AM", text: "The patch from last week is dripping again." },
          { author: "Futurix assistant", time: "9:14 AM", text: "We can come back Thursday at 10 AM." },
        ]}
      />
    );
  }
  if (kind === "03") {
    return (
      <OpsDashboard
        title="North Roofing"
        rows={[
          { status: "New", job: "Leak on Oak Street", when: "Today" },
          { status: "Scheduled", job: "Estimate, Thursday", when: "Thu 10:00" },
        ]}
      />
    );
  }
  return (
    <RolloutBoard
      step="First version"
      items={[
        { label: "Name the one workflow", state: "Yes" },
        { label: "A person reviews the result", state: "Yes" },
        { label: "Rules written down", state: "Open" },
      ]}
    />
  );
}

export function HowWeWork() {
  const steps = [
    {
      title: "Find the bottleneck",
      line: "A short call on where time leaks: missed rings, an inbox pile, or a tool that never shipped.",
    },
    {
      title: "Ship a first version",
      line: "A voice agent, assistant, or custom surface your team can try on real work.",
    },
    {
      title: "Enable and extend",
      line: "Training, guardrails, and only the next piece that earns its place.",
    },
  ];
  return (
    <section className="section" id="how">
      <div className="wrap">
        <h2 className="section-title offer-heading">Three steps. One first version.</h2>
        <ol className="work-steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CaseStudies() {
  return (
    <section className="section studies" id="work">
      <div className="wrap">
        <p className="kicker">Selected work</p>
        <h2 className="section-title offer-heading">Built for real operations.</h2>
        <div className="study-grid">
          <article className="study-card">
            <div className="study-face line" aria-hidden="true">
              Line Properties
            </div>
            <h3>Line Properties</h3>
            <p>Guest booking site on Guesty for a short-term rental company.</p>
            <a href="https://line-properties.com" rel="noreferrer">
              line-properties.com &gt;
            </a>
            <Link href="/custom-projects">Related: custom projects &gt;</Link>
          </article>
          <article className="study-card">
            <div className="study-face peak" aria-hidden="true">
              Peak Exchange
            </div>
            <h3>Peak Exchange</h3>
            <p>Operations platform for 1031 exchanges. Client, third-party, and admin portals on one transaction.</p>
            <Link href="/custom-projects">Related: custom projects &gt;</Link>
          </article>
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="section setup-band" id="contact">
      <div className="wrap">
        <h2 className="section-title offer-heading">Put AI on the work that already costs you.</h2>
        <p className="hero-sub">
          Tell us where the time goes. We will say whether a voice agent, an assistant, or a custom project is the right
          first step.
        </p>
        <div className="hero-actions">
          <a className="btn btn-solid btn-lg" href="#demo">
            Hear it answer
          </a>
          <a className="btn btn-line btn-lg" href="mailto:segev@futurixs.com">
            segev@futurixs.com
          </a>
        </div>
        <Wizard id="home-setup" />
      </div>
    </section>
  );
}
