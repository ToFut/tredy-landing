import Link from "next/link";
import { PlatformMarquee } from "@/components/home/PlatformMarquee";
import { PricingSection } from "@/components/pricing/PricingSection";
import { Actions } from "@/components/ui/Actions";
import { CalendarDay, IMessageThread } from "@/components/visuals/AppMocks";
import { WhatsAppThread } from "@/components/visuals/Screens";

const audiences = [
  {
    title: "Dental",
    line: "New patient calls, approved insurance questions, and hygiene visits that should land on the book.",
    href: "/voice-agents",
  },
  {
    title: "HVAC and trades",
    line: "Emergency and estimate calls while the crew is on a job, including after hours.",
    href: "/industries/home-services",
  },
  {
    title: "Med spas",
    line: "Consults and treatment bookings that still get a time when the front desk is with a guest.",
    href: "/voice-agents",
  },
  {
    title: "Law firms",
    line: "Intake that qualifies and books a consult, then hands off anything an attorney should take.",
    href: "/voice-agents",
  },
];

const offerings = [
  {
    href: "/voice-agents",
    index: "01",
    title: "AI voice receptionists",
    line: "The core offer",
    detail: "Answers every call, books the appointment, and follows up by text.",
    price: "From $1,495 setup",
  },
  {
    href: "/ai-assistants",
    index: "02",
    title: "AI automations",
    line: "The follow-up",
    detail: "Missed-call text-back, inbox drafts, and routing into the tools you already use.",
    price: "Quoted with setup",
  },
  {
    href: "/custom-projects",
    index: "03",
    title: "Custom AI and full-stack",
    line: "The software",
    detail: "Booking sites, portals, and internal tools when the desk needs its own product.",
    price: "Custom quote",
  },
  {
    href: "/ai-enablement",
    index: "04",
    title: "AI enablement",
    line: "The rollout",
    detail: "A short plan and training so the team actually uses what we ship.",
    price: "Custom quote",
  },
];

export function HomeHero() {
  return (
    <section className="band home-hero fx-hero tone-a">
      <div className="wrap hero-copy">
        <p className="kicker">For local businesses</p>
        <h1 className="hero-title">AI receptionists that answer every call.</h1>
        <p className="hero-sub">
          We pick up the phone, book the appointment, and follow up. Built for dental offices, HVAC and trades, med
          spas, and law firms. Automations and custom software, when the desk needs more than a voice.
        </p>
        <ul className="benefit-chips">
          <li>Answers every call</li>
          <li>Books appointments</li>
          <li>Follows up by text</li>
        </ul>
        <Actions demoHref="/#demo" location="hero" hero />
      </div>
    </section>
  );
}

export function AudienceBand() {
  return (
    <section className="band fx-audience tone-b" id="who">
      <div className="wrap">
        <p className="kicker">Who it is for</p>
        <h2 className="fx-title">Offices that lose jobs when the phone rings out.</h2>
        <div className="fx-audience-grid">
          {audiences.map((item) => (
            <Link key={item.title} href={item.href} className="fx-audience-card">
              <h3>{item.title}</h3>
              <p>{item.line}</p>
              <span>See the receptionist</span>
            </Link>
          ))}
        </div>
        <p className="fx-also">
          Also for <Link href="/industries/roofing">roofing</Link>, <Link href="/industries/real-estate">real estate</Link>,{" "}
          <Link href="/industries/property-management">property management</Link>, and{" "}
          <Link href="/industries/insurance">insurance agencies</Link>.
        </p>
      </div>
    </section>
  );
}

export function ModelStrip() {
  return <PlatformMarquee />;
}

export function Proof() {
  return (
    <section className="band fx-proof tone-b" id="screens">
      <div className="wrap">
        <p className="kicker">What your team sees</p>
        <h2 className="fx-title">A call summary, a booking, and a text.</h2>
        <p className="fx-lede">Sample screens with fictional callers. Not a customer account.</p>
        <div className="fx-proof-grid">
          <figure>
            <WhatsAppThread
              name="Oak Dental"
              messages={[
                { side: "in", text: "New patient. Cleaning next week. She can do Thursday at 10.", time: "9:14" },
                { side: "out", text: "Booked Thursday at 10. Confirmation text sent.", time: "9:14" },
              ]}
            />
            <figcaption>WhatsApp call summary to the owner</figcaption>
          </figure>
          <figure>
            <CalendarDay />
            <figcaption>The visit on the calendar</figcaption>
          </figure>
          <figure>
            <IMessageThread
              name="Oak Dental"
              messages={[
                { side: "out", text: "Hi, this is Oak Dental. We can see you Thursday at 10. Reply YES to book." },
                { side: "in", text: "YES" },
                { side: "out", text: "Booked. See you Thursday at 10." },
              ]}
            />
            <figcaption>iMessage follow-up after a missed call</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export function HowWeWork() {
  const steps = [
    {
      title: "Book a free 15-minute live setup",
      line: "We listen to how the phone works today and which calls should book.",
      mark: "15 min",
    },
    {
      title: "We build it on your line",
      line: "Your number, your calendar, and the rules you approve.",
      mark: "Days",
    },
    {
      title: "It answers, books, and texts",
      line: "You hear it before it takes a live customer call.",
      mark: "Live",
    },
  ];
  return (
    <section className="band fx-how tone-a" id="how">
      <div className="wrap">
        <p className="kicker">How it works</p>
        <h2 className="fx-title">Three steps from a missed call to a booked visit.</h2>
        <ol className="fx-steps">
          {steps.map((step, index) => (
            <li key={step.title}>
              <span>{index + 1}</span>
              <small>{step.mark}</small>
              <h3>{step.title}</h3>
              <p>{step.line}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function OfferingCards() {
  return (
    <section className="band fx-offers tone-a" id="offerings">
      <div className="wrap">
        <p className="kicker">What we build</p>
        <h2 className="fx-title">Receptionists first. Automations and custom builds when you need them.</h2>
        <div className="fx-offer-grid">
          {offerings.map((item) => (
            <Link key={item.href} href={item.href} className="fx-offer">
              <p className="kicker">{item.index}</p>
              <h3>{item.title}</h3>
              <p className="fx-offer-line">{item.line}</p>
              <p>{item.detail}</p>
              <p className="card-price">{item.price}</p>
              <span>See how it works</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Trust() {
  return (
    <section className="band fx-work tone-b" id="work">
      <div className="wrap">
        <p className="kicker">Selected work</p>
        <h2 className="fx-title">Two builds you can ask about.</h2>
        <div className="fx-studies">
          <article>
            <p className="kicker">Booking site</p>
            <h3>Line Properties</h3>
            <p>A booking site and a maintenance retainer for a short-term rental company.</p>
            <a href="https://line-properties.com" rel="noreferrer">
              line-properties.com
            </a>
          </article>
          <article>
            <p className="kicker">Platform</p>
            <h3>Peak Exchange</h3>
            <p>A 1031 exchange platform, with client, third party, and admin portals on one transaction.</p>
            <Link href="/custom-projects">Custom projects</Link>
          </article>
        </div>
        <article className="fx-privacy">
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

export function PriceTeaser() {
  return <PricingSection />;
}

export function FinalCta() {
  return (
    <section className="band cta-band fx-final tone-a">
      <div className="wrap">
        <h2 className="fx-title">Book a free 15-minute live setup.</h2>
        <p className="fx-lede">We will show you the receptionist on a live call and tell you which package fits.</p>
        <Actions demoHref="/#demo" location="final" />
        <p className="fx-mail">
          Or email <a href="mailto:segev@futurixs.com">segev@futurixs.com</a>
        </p>
      </div>
    </section>
  );
}
