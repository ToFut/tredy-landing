import Link from "next/link";
import { LiveHeroPhone } from "@/components/home/LiveHeroPhone";
import { PlatformMarquee } from "@/components/home/PlatformMarquee";
import { Actions } from "@/components/ui/Actions";

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
    price: "Custom quote",
    link: "See projects",
  },
  {
    href: "/ai-enablement",
    index: "04",
    title: "AI Enablement",
    line: "Train your team to use AI",
    detail: "A short plan and training so the team actually uses it.",
    price: "Custom quote",
    link: "See training",
  },
];

export function HomeHero() {
  return (
    <section className="band home-hero">
      <div className="wrap grid-12">
        <div className="span-7 hero-copy">
          <p className="kicker">AI for small and mid-size businesses</p>
          <h1 className="hero-title">We set up AI for your business, so you never miss a customer.</h1>
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
          <Actions demoHref="/#demo" location="hero" hero />
        </div>
        <div className="span-5 hero-phone">
          <LiveHeroPhone />
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
    <section className="band rise" id="offerings">
      <div className="wrap">
        <p className="kicker">Four offerings</p>
        <h2 className="section-title offer-heading">What we set up</h2>
        <div className="offer-cards">
          {offerings.map((item) => (
            <Link key={item.href} href={item.href} className="offer-card">
              <div className="offer-frame" aria-hidden="true">
                <OfferArt kind={item.index} />
              </div>
              <p className="kicker">{item.index}</p>
              <h3>{item.line}</h3>
              <p>{item.detail}</p>
              <p className="card-price">{item.price}</p>
              <span className="see-how">See how it works &gt;</span>
            </Link>
          ))}
        </div>
        <Actions />
      </div>
    </section>
  );
}

function OfferArt({ kind }: { kind: string }) {
  if (kind === "01") {
    return (
      <div className="mini-phone">
        <b>Incoming call</b>
        <span>Answered by AI</span>
      </div>
    );
  }
  if (kind === "02") {
    return (
      <div className="mini-sms">
        <p>We can come Thursday at 10. Reply YES to book.</p>
        <small>SMS 9:14</small>
      </div>
    );
  }
  if (kind === "03") {
    return (
      <table className="mini-board">
        <tbody>
          <tr>
            <td>New</td>
            <td>Leak on Oak</td>
          </tr>
          <tr>
            <td>Set</td>
            <td>Thu 10:00</td>
          </tr>
          <tr>
            <td>Done</td>
            <td>Ridge cap</td>
          </tr>
        </tbody>
      </table>
    );
  }
  return (
    <ul className="mini-check">
      <li>Name the workflow</li>
      <li>A person reviews it</li>
      <li>Rules are written</li>
    </ul>
  );
}

export function HowWeWork() {
  const steps = [
    { title: "A 15 minute call", line: "We look at the calls or leads you miss.", mark: "15 min" },
    { title: "We build it in days", line: "Your number, your rules, your tools.", mark: "Days" },
    { title: "It answers and books", line: "Customers get a next step. You get a text.", mark: "Live" },
  ];
  return (
    <section className="band rise" id="how">
      <div className="wrap">
        <h2 className="section-title offer-heading">How it works</h2>
        <ol className="work-steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="step-visual" aria-hidden="true">
                {step.mark}
              </span>
              <h3>
                {index + 1}. {step.title}
              </h3>
              <p>{step.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Trust() {
  return (
    <section className="band rise" id="work">
      <div className="wrap">
        <p className="kicker">Why Futurix</p>
        <h2 className="section-title offer-heading">Built by engineers.</h2>
        <p className="type-body">The team comes from software engineering and the Israeli Air Force.</p>
        <div className="study-grid">
          <article className="study-card">
            <h3>Line Properties</h3>
            <p>A guest booking site on Guesty for a short-term rental company.</p>
            <a href="https://line-properties.com" rel="noreferrer">
              line-properties.com &gt;
            </a>
            <Link href="/custom-projects">Custom projects &gt;</Link>
          </article>
          <article className="study-card">
            <h3>Peak Exchange</h3>
            <p>An operations platform for 1031 exchanges, with client, third-party, and admin portals on one transaction.</p>
            <Link href="/custom-projects">Custom projects &gt;</Link>
          </article>
        </div>
        <article className="privacy-block">
          <h3>Your data stays yours</h3>
          <p>
            We use only what a workflow needs. We do not train public models on your calls or files. You own the setup.
            Read the <Link href="/privacy">privacy notice</Link>.
          </p>
        </article>
      </div>
    </section>
  );
}

const prices = [
  { href: "/voice-agents", name: "Voice receptionist", price: "From $1,800", line: "Answers, books, and texts you a summary." },
  { href: "/ai-assistants", name: "AI assistant", price: "From $1,200", line: "Drafts the follow-up and routes what you should see." },
  { href: "/custom-projects", name: "Custom work", price: "Custom quote", line: "A tool or training plan, scoped on the call." },
];

export function PriceTeaser() {
  return (
    <section className="band rise" id="pricing">
      <div className="wrap">
        <h2 className="section-title offer-heading">Simple starting prices</h2>
        <div className="price-cards">
          {prices.map((item) => (
            <Link key={item.href} href={item.href} className="price-card">
              <h3>{item.name}</h3>
              <p className="card-price">{item.price}</p>
              <p>{item.line}</p>
              <span>See how it works &gt;</span>
            </Link>
          ))}
        </div>
        <p className="type-body">Every project starts with a free 15-min call.</p>
        <Actions location="pricing" />
      </div>
    </section>
  );
}

export function CaseStudies() {
  return (
    <section className="band" id="work">
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
        <Actions />
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="band cta-band">
      <div className="wrap">
        <h2 className="type-h2">Never miss another customer.</h2>
        <p className="type-body">Book a free 15 minute call. We will tell you the first thing to set up.</p>
        <Actions />
      </div>
    </section>
  );
}
