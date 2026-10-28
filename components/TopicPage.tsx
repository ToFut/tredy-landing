import Image from "next/image";
import Link from "next/link";
import { TryItLive } from "@/components/demo/TryItLive";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Contact } from "@/components/sections";
import { Wizard } from "@/components/start/Wizard";
import { planLabel } from "@/lib/content";
import { aboutJsonLd, industryJsonLd, serviceJsonLd } from "@/lib/seo";
import type { BusinessId } from "@/lib/start";
import type { TopicPageData } from "@/lib/types";

const offeringTab = {
  "/voice-agents": "voice",
  "/ai-assistants": "assistant",
  "/custom-projects": "projects",
  "/ai-enablement": "enablement",
} as const;

const industryPreset: Record<string, BusinessId> = {
  "/industries/roofing": "roofing",
  "/industries/home-services": "home-services",
  "/industries/real-estate": "real-estate",
  "/industries/property-management": "property",
  "/industries/insurance": "insurance",
};

const outcomes: Record<string, string> = {
  "/voice-agents": "Never miss a call. An AI receptionist answers your phone 24/7.",
  "/ai-assistants": "Follow up every lead, then route what a person should see.",
  "/custom-projects": "Software built for how you work.",
  "/ai-enablement": "Train your team to use AI on the work you already do.",
};

function plainLine(page: TopicPageData) {
  return outcomes[page.path] ?? firstSentence(page.lede[0] ?? page.description);
}

function firstSentence(text: string) {
  const cut = text.split(". ")[0] ?? text;
  return cut.endsWith(".") ? cut : `${cut}.`;
}

export function TopicPage({ page }: { page: TopicPageData }) {
  const schema =
    page.kind === "service"
      ? serviceJsonLd(page)
      : page.kind === "about"
        ? aboutJsonLd(page)
        : industryJsonLd(page);
  const tab = offeringTab[page.path as keyof typeof offeringTab];
  const preset = industryPreset[page.path];
  const tiles = page.sections.slice(0, 4);
  const steps = page.sections.slice(0, 3);
  const hasDemo = Boolean(tab || preset);

  return (
    <>
      <JsonLd data={schema} />
      <article className="product-page">
        <header className="product-hero">
          <div className="wrap">
            <Breadcrumbs items={page.crumbs} />
            <h1>{page.h1}</h1>
            <p className="hero-sub">{plainLine(page)}</p>
            {page.path === "/voice-agents" ? <p className="card-price">From $1,800</p> : null}
            {page.path === "/ai-assistants" ? <p className="card-price">From $1,200</p> : null}
            <div className="plan-actions">
              <Link className="btn btn-solid btn-lg" href={page.kind === "service" ? "#plan" : "/#plan"}>
                {planLabel}
              </Link>
              {hasDemo ? (
                <a className="demo-link" href="#try">
                  Hear a live demo call
                </a>
              ) : null}
            </div>
          </div>
        </header>
        {page.path === "/about" ? <Founder /> : null}
        {tab ? <TryItLive initialTab={tab} only={[tab]} /> : null}
        {preset ? (
          <TryItLive initialTab="voice" only={["voice", "assistant"]} presetIndustry={preset} />
        ) : null}
        <section className="section">
          <div className="wrap">
            <h2 className="section-title">{page.kind === "industry" ? "Use cases" : "What you get"}</h2>
            <div className="bento">
              {tiles.map((section) => (
                <article key={section.heading} className="bento-card">
                  <h3>{section.heading}</h3>
                  <p>{firstSentence(section.paragraphs[0] ?? "")}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section id="details" className="section details-section">
          <div className="article-copy">
            {page.lede.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </section>
        <section className="section">
          <div className="wrap">
            <h2 className="section-title">How it works</h2>
            <ol className="how-steps">
              {steps.map((section, index) => (
                <li key={section.heading}>
                  <span>0{index + 1}</span>
                  {section.heading}
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className="section" id="faq">
          <div className="wrap article-copy">
            <h2 className="section-title">Questions</h2>
            <div className="faq-list">
              {page.faqs.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="section">
          <div className="wrap">
            <h2 className="section-title">Learn more</h2>
            <ul className="related-list">
              {page.related.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    {item.label} &gt;
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="final-cta">
          <div className="wrap">
            <h2>Set this up for your business.</h2>
            <div className="plan-actions">
              <Link className="btn btn-solid btn-lg" href={page.kind === "service" ? "#plan" : "/#plan"}>
                {planLabel}
              </Link>
              {hasDemo ? (
                <a className="demo-link" href="#try">
                  Hear a live demo call
                </a>
              ) : null}
            </div>
          </div>
        </section>
      </article>
      {page.kind === "service" ? (
        <section className="section" id="plan">
          <div className="wrap">
            <h2 className="section-title">Get your free AI plan</h2>
            <p className="hero-sub">Three details. We reply with what to set up first.</p>
            <Wizard />
          </div>
        </section>
      ) : (
        <Contact />
      )}
    </>
  );
}

function Founder() {
  return (
    <section className="founder">
      <Image
        src="/segev-halfon.jpg"
        alt="Segev Halfon, founder of Futurix"
        width={160}
        height={160}
        className="founder-photo"
      />
      <p className="kicker">Founder</p>
      <h2>Segev Halfon</h2>
      <p>MSc CS (AI), Technion. Senior software engineer, Israeli Air Force Ofek 324.</p>
    </section>
  );
}
