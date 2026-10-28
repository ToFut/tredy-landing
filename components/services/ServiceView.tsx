import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Actions } from "@/components/ui/Actions";
import { IphoneCall, WhatsAppThread } from "@/components/visuals/Screens";
import type { ServiceSpec } from "@/lib/service-views";
import { serviceJsonLd } from "@/lib/seo";
import type { TopicPageData } from "@/lib/types";

export function ServiceView({ spec }: { spec: ServiceSpec }) {
  const page = {
    path: spec.path,
    title: spec.h1,
    description: spec.description,
    h1: spec.h1,
    lede: [spec.sentence],
    sections: [],
    faqs: spec.faqs,
    crumbs: spec.crumbs,
    related: [],
    kind: "service",
    serviceType: spec.serviceType,
  } as TopicPageData;

  return (
    <>
      <JsonLd data={serviceJsonLd(page)} />
      <article>
        <header className="band industry-hero">
          <div className="wrap grid-12">
            <div className="span-7 hero-copy">
              <Breadcrumbs items={spec.crumbs} />
              <p className="kicker">{spec.eyebrow}</p>
              <h1 className="hero-title">{spec.h1}</h1>
              <p className="hero-sub">{spec.sentence}</p>
              <p className="card-price">{spec.price}</p>
              <Actions demoHref={spec.secondaryHref} demoText={spec.secondary} location="service-hero" hero />
            </div>
            <div className="span-5 hero-phone">
              <ServiceVisual kind={spec.visual} />
            </div>
          </div>
        </header>
        <section className="band">
          <div className="wrap">
            <h2 className="type-h2">How it works</h2>
            <ol className="service-steps">
              {spec.steps.map((step, index) => (
                <li key={step.title}>
                  <span>{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.line}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className="band">
          <div className="wrap">
            <h2 className="type-h2">What you get</h2>
            <ul className="service-list">
              {spec.gets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
        <section className="band" id="example">
          <div className="wrap grid-12">
            <div className="span-6">
              <h2 className="type-h2">{spec.exampleTitle}</h2>
              <div className="example-card">
                {spec.example.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              {spec.path === "/voice-agents" ? (
                <p>
                  <Link href="/#demo">Try the live demo &gt;</Link>
                </p>
              ) : null}
            </div>
            <div className="span-6">
              <ServiceVisual kind={spec.visual} />
            </div>
          </div>
        </section>
        <section className="band">
          <div className="wrap">
            <h2 className="type-h2">Tools it can connect to</h2>
            <p className="type-body">Connecting is optional. Your current system can stay.</p>
            <ul className="tool-row">
              {spec.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        </section>
        <section className="band">
          <div className="wrap">
            <h2 className="type-h2">Pricing</h2>
            <div className="price-box">
              <p className="card-price">{spec.price}</p>
              <ul className="service-list">
                {spec.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>{spec.timeline}</p>
              <Actions location="service-price" />
            </div>
          </div>
        </section>
        <section className="band" id="faq">
          <div className="wrap">
            <h2 className="type-h2">Questions</h2>
            <div className="faq-list">
              {spec.faqs.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="band cta-band">
          <div className="wrap">
            <h2 className="type-h2">Book a free 15-min call</h2>
            <p className="type-body">We will tell you if this is the right first step.</p>
            <Actions location="service-cta" />
          </div>
        </section>
      </article>
    </>
  );
}

function ServiceVisual({ kind }: { kind: ServiceSpec["visual"] }) {
  if (kind === "phone") {
    return (
      <IphoneCall
        name="Harbor Roofing"
        caption="Incoming call, answered by AI"
        callerLine="The roof is leaking after the storm on Oak Street."
        timer="00:12"
      />
    );
  }
  if (kind === "sms") {
    return (
      <WhatsAppThread
        name="Harbor Roofing"
        messages={[
          { side: "in", text: "The patch from last week is dripping again.", time: "9:14" },
          { side: "out", text: "We can come Thursday at 10. Reply YES to book.", time: "9:14" },
        ]}
      />
    );
  }
  if (kind === "board") {
    return (
      <table className="mini-board">
        <tbody>
          <tr>
            <td>New</td>
            <td>Leak on Oak Street</td>
          </tr>
          <tr>
            <td>Set</td>
            <td>Estimate, Thu 10:00</td>
          </tr>
          <tr>
            <td>Done</td>
            <td>Ridge cap, Maple Ave</td>
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
