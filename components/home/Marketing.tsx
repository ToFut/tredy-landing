import Link from "next/link";
import { PlatformMarquee } from "@/components/home/PlatformMarquee";
import { Wizard } from "@/components/start/Wizard";
import { IphoneCall, OpsDashboard, RolloutBoard, TeamThread } from "@/components/visuals/Screens";
import { planLabel } from "@/lib/content";

const offerings = [
  {
    href: "/voice-agents",
    index: "01",
    title: "Voice Agents",
    line: "Never miss a call",
    detail: "An AI receptionist answers your phone 24/7.",
    price: "From $1,800",
    link: "See voice agents",
  },
  {
    href: "/ai-assistants",
    index: "02",
    title: "AI Assistants",
    line: "Follow up every lead",
    detail: "Drafts and routes the replies your team would send.",
    price: "From $1,200",
    link: "See assistants",
  },
  {
    href: "/custom-projects",
    index: "03",
    title: "Custom Projects",
    line: "Software built for how you work",
    detail: "A portal or tool shaped to the job you already do.",
    price: "",
    link: "See projects",
  },
  {
    href: "/ai-enablement",
    index: "04",
    title: "AI Enablement",
    line: "Train your team to use AI",
    detail: "A short plan and training so the team actually uses it.",
    price: "",
    link: "See training",
  },
];

export function PlanCta({ demoHref }: { demoHref?: string }) {
  return (
    <div className="plan-actions">
      <Link className="btn btn-solid btn-lg" href="/#plan">
        {planLabel}
      </Link>
      {demoHref ? (
        <Link className="demo-link" href={demoHref}>
          Hear a live demo call
        </Link>
      ) : null}
    </div>
  );
}

export function HomeHero() {
  return (
    <section className="home-hero">
      <div className="wrap">
        <p className="kicker">AI for small and mid-size businesses</p>
        <h1 className="hero-title">
          We set up AI for your business,
          <br />
          so you never miss a customer.
        </h1>
        <div className="home-hero-grid">
        <div className="hero-copy">
          <p className="hero-sub">
            AI receptionists that answer your phone 24/7, assistants that follow up on leads, and custom AI tools. Done
            for you, live in days.
          </p>
          <p className="here-line">Don&apos;t have the time or know-how to enable AI? We&apos;re here.</p>
          <ul className="benefit-chips">
            <li>Answers every call</li>
            <li>Books appointments</li>
            <li>Texts you a summary</li>
          </ul>
          <PlanCta demoHref="#demo" />
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
      </div>
    </section>
  );
}

export function ModelStrip() {
  return <PlatformMarquee />;
}

export function OfferingCards() {
  return (
    <section className="section reveal" id="offerings">
      <div className="wrap">
        <p className="kicker">Four offerings</p>
        <h2 className="section-title offer-heading">What we set up</h2>
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
              {item.price ? <p className="card-price">{item.price}</p> : null}
              <span>{item.link} &gt;</span>
            </Link>
          ))}
        </div>
        <PlanCta />
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
    { title: "Tell us your business", line: "Name, what you need, and how to reach you." },
    { title: "We build and connect it", line: "Your phone, your leads, and the tools you already use." },
    { title: "It answers and books for you", line: "Customers get a reply. You get the booking and a text." },
  ];
  return (
    <section className="how-strip" id="how">
      <div className="wrap">
        <h2 className="section-title offer-heading">How it works</h2>
        <ol className="work-steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span aria-hidden="true">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.line}</p>
            </li>
          ))}
        </ol>
        <PlanCta />
      </div>
    </section>
  );
}

export function CaseStudies() {
  return (
    <section className="section studies reveal" id="work">
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
        <PlanCta />
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="section setup-band" id="plan">
      <div className="wrap">
        <h2 className="section-title offer-heading">Get your free AI plan</h2>
        <p className="hero-sub">Three details. We reply with what to set up first.</p>
        <Wizard id="plan-form" />
      </div>
    </section>
  );
}
