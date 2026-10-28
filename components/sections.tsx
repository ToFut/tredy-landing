import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { HeroDiagram, OfferingDiagram, WorkArt } from "@/components/Diagrams";
import { industryPages } from "@/lib/industries";
import {
  approach,
  bookCallHref,
  faqs,
  here,
  offerings,
  platforms,
  platformsNote,
  principles,
  reasons,
  site,
  studioFacts,
  voiceSampleSrc,
  work,
} from "@/lib/content";

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <p className="kicker">
            Voice agents, AI assistants, custom projects, AI enablement
          </p>
          <h1>AI that answers, assists, and gets built into your business.</h1>
          <p className="lede">
            Futurix, a custom AI solutions and AI enablement company based in Suffern, New York,
            builds voice agents, AI assistants, and custom AI projects for US small and mid-size
            businesses. We also help companies enable AI when the team does not have the time or
            the know-how.
          </p>
          <p className="support">
            We fit the work into the tools and workflows you already run. Start with a small
            first version, then scale what holds up in the real operation.
          </p>
          <div className="hero-actions">
            <Link className="btn btn-solid" href={bookCallHref}>
              Get your free AI plan
              <span aria-hidden="true"> →</span>
            </Link>
            <Link className="btn btn-ghost" href="#work">
              See our work
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
          <dl className="facts">
            {studioFacts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <figure className="hero-figure">
          <HeroDiagram />
          <figcaption>
            A first version, inside the tools you already run, with the team in it.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function OfferingStrip() {
  return (
    <section id="offerings" className="strip" aria-label="Four offerings">
      <div className="wrap">
        <p className="kicker">What Futurix builds</p>
        <div className="strip-grid">
          {offerings.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              <span className="kicker">{item.number}</span>
              <span className="strip-title">{item.title}</span>
              <span className="strip-summary">{item.summary}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Here() {
  return (
    <section id="here" className="here" aria-labelledby="here-title">
      <div className="wrap here-inner">
        <p className="kicker kicker-gold">AI enablement</p>
        <h2 id="here-title">{here.title}</h2>
        <p>{here.body}</p>
        <p>{here.support}</p>
        <Link className="btn btn-paper" href={bookCallHref}>
          Get your free AI plan
          <span aria-hidden="true"> →</span>
        </Link>
      </div>
    </section>
  );
}

export function Principles() {
  return (
    <section className="band" aria-label="How an engagement starts">
      <div className="wrap principle-grid">
        {principles.map((item) => (
          <article key={item.number}>
            <p className="kicker kicker-gold">{item.number}</p>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="section">
      <div className="wrap">
        <div className="section-intro">
          <p className="kicker">Services</p>
          <h2>Four ways we can help.</h2>
          <p>
            An engagement can use one of them, or several. Most work starts with a single
            workflow.
          </p>
        </div>
        <div className="offering-list">
          {offerings.map((item) => (
            <article id={item.id} key={item.id} className="offering">
              <div>
                <p className="kicker">{item.number}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                {item.id === "voice-agents" ? <SampleCall /> : null}
                <p className="outcome">
                  <span>Outcome</span>
                  {item.outcome}
                </p>
                <Link className="text-link" href={item.path}>
                  {item.linkLabel}
                </Link>
              </div>
              <div>
                <p className="kicker">What we build</p>
                <ul className="examples">
                  {item.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </div>
              <OfferingDiagram id={item.id} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SampleCall() {
  return (
    <div className="sample-call">
      <p className="kicker">Hear a sample call</p>
      {voiceSampleSrc ? (
        <audio className="sample-audio" controls preload="none" src={voiceSampleSrc}>
          Sample call
        </audio>
      ) : (
        <div className="sample-player" role="group" aria-label="Sample coming soon">
          <button type="button" disabled>
            <span className="sample-play" aria-hidden="true" />
            <span className="sr-only">Play</span>
          </button>
          <span className="sample-track" aria-hidden="true" />
          <span className="sample-status">Sample coming soon</span>
        </div>
      )}
    </div>
  );
}

export function Models() {
  return (
    <section id="models" className="section models">
      <div className="wrap">
        <div className="section-intro">
          <p className="kicker">Stack</p>
          <h2>Models and platforms we build with.</h2>
          <p>
            Voice, assistants, and custom projects are built on the tools that fit the job.
            The list changes as the work changes.
          </p>
        </div>
        <ul className="model-grid">
          {platforms.map((item) => (
            <li key={item.name}>
              <span className="model-name">{item.name}</span>
              <span className="model-detail">{item.detail}</span>
            </li>
          ))}
        </ul>
        <p className="models-note">{platformsNote}</p>
      </div>
    </section>
  );
}

export function Approach() {
  return (
    <section id="approach" className="band">
      <div className="wrap">
        <div className="section-intro light">
          <p className="kicker kicker-gold">Approach</p>
          <h2>How we work</h2>
        </div>
        <div className="approach-grid">
          {approach.map((step) => (
            <article key={step.number}>
              <p className="kicker kicker-gold">{step.number}</p>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Industries() {
  return (
    <section id="industries" className="section">
      <div className="wrap industries-layout">
        <div>
          <div className="section-intro">
            <p className="kicker">Industries</p>
            <h2>Industries with a call or a desk we can take on.</h2>
            <p>
              Roofing, home services, real estate, property management, and insurance agencies.
              Each page describes the workflow, the four offerings, and the tools already in that
              trade.
            </p>
          </div>
          <ol className="industry-list">
            {industryPages.map((item, index) => (
              <li key={item.path}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>
                    <Link href={item.path}>{item.crumbs[item.crumbs.length - 1]?.name}</Link>
                  </h3>
                  <p>{item.description}</p>
                  <Link className="text-link" href={item.path}>
                    See this industry
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <svg className="industry-art" viewBox="0 0 160 280" aria-hidden="true">
          <rect x="20" y="150" width="22" height="90" fill="#1a4034" />
          <rect x="54" y="110" width="22" height="130" fill="#c6a56e" />
          <rect x="88" y="70" width="22" height="170" fill="#1b3328" />
          <rect x="122" y="130" width="22" height="110" fill="#d7c4a2" />
        </svg>
      </div>
    </section>
  );
}

export function Work() {
  return (
    <section id="work" className="section section-tight">
      <div className="wrap">
        <div className="section-intro">
          <p className="kicker">Selected work</p>
          <h2>Work that shipped.</h2>
          <p>Platforms, sites, and product work. Each note stays with what the engagement was.</p>
        </div>
        <div className="work-grid">
          {work.map((item) => (
            <article key={item.title} className={item.wide ? "work-card wide" : "work-card"}>
              <WorkArt variant={item.variant} />
              <div className="work-copy">
                <p className="kicker">{item.kicker}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer">
                    View site
                    <span aria-hidden="true"> →</span>
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Why() {
  return (
    <section id="why" className="band">
      <div className="wrap">
        <div className="section-intro light">
          <p className="kicker kicker-gold">Why Futurix</p>
          <h2>The people who frame the work also build it.</h2>
          <p>Segev Halfon leads a senior, hands-on team.</p>
        </div>
        <div className="why-grid">
          {reasons.map((item) => (
            <article key={item.number}>
              <p className="kicker kicker-gold">{item.number}</p>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="section">
      <div className="wrap faq-layout">
        <div className="section-intro">
          <p className="kicker">FAQ</p>
          <h2>Common questions</h2>
          <p>Straight answers before a first conversation.</p>
        </div>
        <div className="faq-list">
          {faqs.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="wrap contact-grid">
        <div>
          <p className="kicker kicker-gold">Contact</p>
          <h2>Get your free AI plan</h2>
          <p>
            Tell us which offering you have in mind, and what the work is. If a first version
            is worth building, we will say so.
          </p>
          <p className="contact-who">
            Segev Halfon leads Futurix.
            <br />
            {site.location}
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
