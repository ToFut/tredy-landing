import Link from "next/link";
import { PlatformMarquee } from "@/components/home/PlatformMarquee";
import { IphoneCall } from "@/components/visuals/Screens";
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
    <section className="band" id="offerings">
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
    { title: "Tell us your business", line: "Name, what you need, and how to reach you." },
    { title: "We build and connect it", line: "Your phone, your leads, and the tools you already use." },
    { title: "It answers and books for you", line: "Customers get a reply. You get the booking and a text." },
  ];
  return (
    <section className="band" id="how">
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
        <Actions />
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
        <h2 className="type-h2">Ready for a call?</h2>
        <p className="type-body">15 minutes. We will tell you the first thing to set up.</p>
        <Actions />
      </div>
    </section>
  );
}
