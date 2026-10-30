import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Actions } from "@/components/ui/Actions";
import { BookingWidget, CalendarDay, IMessageThread, NotesPlan } from "@/components/visuals/AppMocks";
import { IphoneCall, WhatsAppThread } from "@/components/visuals/Screens";
import { planLabel } from "@/lib/content";
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
        <header className="band industry-hero fx-hero">
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
        <section className="band" id="who">
          <div className="wrap">
            <h2 className="fx-title">Who it is for</h2>
            <p className="fx-lede">{spec.audienceLead}</p>
            <ul className="service-who">
              {spec.audience.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
        <section className="band">
          <div className="wrap">
            <h2 className="fx-title">How it works</h2>
            <ol className="fx-steps">
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
                  <Link href="/#demo">Try the live demo</Link>
                </p>
              ) : null}
              {spec.path === "/custom-projects" ? (
                <p>
                  Past builds include a booking site and a maintenance retainer for Line Properties, and a 1031 exchange
                  platform for Peak Exchange.
                </p>
              ) : null}
            </div>
            <div className="span-6">
              <ServiceVisual kind={spec.exampleVisual} />
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
            <h2 className="fx-title">Pricing</h2>
            <div className="price-box">
              <p className="card-price">{spec.price}</p>
              {spec.path === "/voice-agents" ? (
                <p>
                  <Link href="/pricing">See Overflow Desk, Booked Front Desk, and Multi-location Ops</Link>
                </p>
              ) : null}
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
            <h2 className="fx-title">{planLabel}</h2>
            <p className="fx-lede">We will tell you if this is the right first step.</p>
            <Actions location="service-cta" />
          </div>
        </section>
      </article>
    </>
  );
}

function ServiceVisual({ kind }: { kind: ServiceSpec["visual"] | ServiceSpec["exampleVisual"] }) {
  if (kind === "phone") {
    return (
      <IphoneCall
        name="Oak Dental"
        caption="Hi, thanks for calling Oak Dental. I can book a cleaning."
        callerLine="I need a cleaning next week."
        timer="00:12"
      />
    );
  }
  if (kind === "whatsapp") {
    return (
      <WhatsAppThread
        name="Oak Dental"
        messages={[
          { side: "in", text: "New patient. Cleaning next week. She can do Thursday at 10.", time: "9:14" },
          { side: "out", text: "Booked Thursday at 10. Confirmation text sent.", time: "9:14" },
        ]}
      />
    );
  }
  if (kind === "imessage") {
    return (
      <IMessageThread
        name="Northline HVAC"
        messages={[
          { side: "out", text: "Hi, this is Northline HVAC. We can come Thursday at 10. Reply YES to book." },
          { side: "in", text: "YES" },
          { side: "out", text: "Booked. See you Thursday at 10." },
        ]}
      />
    );
  }
  if (kind === "calendar") {
    return <CalendarDay title="Service visit" place="Northline HVAC" />;
  }
  if (kind === "booking") {
    return <BookingWidget />;
  }
  return (
    <NotesPlan
      title="Front desk rules"
      lines={["Name the workflow.", "A person reviews the result.", "Write what the AI must not do.", "Keep what the team uses."]}
    />
  );
}
