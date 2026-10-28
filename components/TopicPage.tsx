import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { TryItLive } from "@/components/demo/TryItLive";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Contact } from "@/components/sections";
import { bookCallHref } from "@/lib/content";
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
            <p className="hero-sub">{firstSentence(page.lede[0] ?? page.description)}</p>
            <div className="hero-actions">
              {hasDemo ? (
                <a className="btn btn-solid btn-lg" href="#try">
                  Try the live demo
                </a>
              ) : (
                <Link className="btn btn-solid btn-lg" href="/get-started">
                  Get started
                </Link>
              )}
              <Link className="btn btn-line btn-lg" href={bookCallHref}>
                Book a call
              </Link>
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
            <div className="hero-actions">
            <Link className="btn btn-solid btn-lg" href={hasDemo ? "#try" : "/get-started"}>
              {hasDemo ? "Try the live demo" : "Get started"}
            </Link>
            <Link className="btn btn-line btn-lg" href={bookCallHref}>
              Book a call
            </Link>
            </div>
          </div>
        </section>
      </article>
      <Contact />
    </>
  );
}

function Founder() {
  const ready = existsSync(path.join(process.cwd(), "public", "segev-halfon.jpg"));
  return (
    <section className="founder">
      {ready ? (
        <Image
          src="/segev-halfon.jpg"
          alt="Segev Halfon"
          width={160}
          height={160}
          className="founder-photo"
        />
      ) : null}
      <p className="kicker">Founder</p>
      <h2>Segev Halfon</h2>
      <p>MSc CS (AI), Technion. Senior software engineer, Israeli Air Force Ofek 324.</p>
    </section>
  );
}
