import Image from "next/image";
import Link from "next/link";
import { TryItLive } from "@/components/demo/TryItLive";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Contact } from "@/components/sections";
import { IndustryStory } from "@/components/industries/IndustryStory";
import { Actions } from "@/components/ui/Actions";
import { planLabel } from "@/lib/content";
import { IphoneCall } from "@/components/visuals/Screens";
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

const industryPitch: Record<string, string> = {
  "/industries/roofing":
    "An AI receptionist that answers every call your crew can't, books the inspection, and texts you a summary.",
  "/industries/home-services":
    "An AI receptionist that answers emergency calls while your techs are on a job, books the visit, and texts you a summary.",
  "/industries/real-estate":
    "An AI receptionist that answers buyer calls while you are in a showing, books the next step, and texts you a summary.",
  "/industries/property-management":
    "An AI receptionist that answers resident calls while you are between buildings, logs the repair, and texts you a summary.",
  "/industries/insurance":
    "An AI receptionist that answers quote and certificate calls while you are with a client, logs the request, and texts you a summary.",
};

const industryCall: Record<string, { name: string; caption: string; callerLine: string }> = {
  "/industries/roofing": {
    name: "Harbor Roofing",
    caption: "Hi, thanks for calling Harbor Roofing. How can I help you today?",
    callerLine: "The roof is leaking after the storm on Oak Street.",
  },
  "/industries/home-services": {
    name: "Northline HVAC",
    caption: "Hi, thanks for calling Northline HVAC. How can I help you today?",
    callerLine: "The heat is out on Pine Avenue. Can someone come today?",
  },
  "/industries/real-estate": {
    name: "Harbor Homes",
    caption: "Hi, thanks for calling Harbor Homes. How can I help you today?",
    callerLine: "Is the house on Oak still available for a look this week?",
  },
  "/industries/property-management": {
    name: "Harbor Property",
    caption: "Hi, thanks for calling Harbor Property. How can I help you today?",
    callerLine: "The sink in unit 4 is dripping under the cabinet.",
  },
  "/industries/insurance": {
    name: "Harbor Agency",
    caption: "Hi, thanks for calling Harbor Agency. How can I help you today?",
    callerLine: "Can you send a certificate to the job site by Thursday?",
  },
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
        {page.kind === "industry" ? (
          <IndustryHero page={page} />
        ) : (
          <header className="product-hero">
            <div className="wrap">
              <Breadcrumbs items={page.crumbs} />
              <h1>{page.h1}</h1>
              <p className="hero-sub">{plainLine(page)}</p>
              {page.path === "/voice-agents" ? <p className="card-price">From $1,495 setup and $349/mo</p> : null}
              {page.path === "/ai-assistants" ? <p className="card-price">Quoted with your setup</p> : null}
              <Actions demoHref={hasDemo ? "#try" : undefined} />
            </div>
          </header>
        )}
        {page.path === "/about" ? <Founder /> : null}
        {tab ? <TryItLive initialTab={tab} only={[tab]} /> : null}
        {preset ? (
          <TryItLive initialTab="voice" only={["voice", "assistant"]} presetIndustry={preset} />
        ) : null}
        {page.kind === "industry" ? <IndustryStory path={page.path} /> : null}
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
        <section id="details" className="band">
          <div className="wrap">
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
            <h2 className="fx-title">How it works</h2>
            {page.kind === "industry" ? (
              <ol className="fx-steps">
                <li>
                  <span>1</span>
                  <h3>Tell us the calls you miss</h3>
                  <p>One line, and the questions the office already asks.</p>
                </li>
                <li>
                  <span>2</span>
                  <h3>We connect your number</h3>
                  <p>Your phone, your calendar, and the rules you approve.</p>
                </li>
                <li>
                  <span>3</span>
                  <h3>It answers and books</h3>
                  <p>The caller gets a next step. You get a text.</p>
                </li>
              </ol>
            ) : (
              <ol className="how-steps">
                {steps.map((section, index) => (
                  <li key={section.heading}>
                    <span>0{index + 1}</span>
                    {section.heading}
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>
        <section className="band" id="faq">
          <div className="wrap">
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
        <section className="band cta-band">
          <div className="wrap">
            <h2 className="fx-title">{planLabel}</h2>
            <p className="fx-lede">We will tell you if this is the right first step.</p>
            <Actions demoHref={hasDemo ? "#try" : undefined} />
          </div>
        </section>
      </article>
      {page.kind === "about" || page.kind === "industry" ? <Contact /> : null}
    </>
  );
}

function IndustryHero({ page }: { page: TopicPageData }) {
  const call = industryCall[page.path];
  return (
    <header className="band industry-hero fx-hero">
      <div className="wrap grid-12">
        <div className="span-7 hero-copy">
          <Breadcrumbs items={page.crumbs} />
          <h1 className="hero-title">{page.h1}</h1>
          <p className="hero-sub">{industryPitch[page.path]}</p>
          <p className="card-price">From $1,495 setup and $349/mo</p>
          <Actions demoHref="#try" location="industry-hero" hero />
        </div>
        {call ? (
          <div className="span-5 hero-phone">
            <IphoneCall name={call.name} caption={call.caption} callerLine={call.callerLine} timer="00:12" />
          </div>
        ) : null}
      </div>
    </header>
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
