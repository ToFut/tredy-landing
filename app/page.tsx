import type { Metadata } from "next";
import { DeferredTry } from "@/components/demo/DeferredTry";
import { MissedCallMath } from "@/components/home/MissedCallMath";
import { AudienceBand, FinalCta, HomeHero, HowWeWork, ModelStrip, OfferingCards, PriceTeaser, Proof, Trust } from "@/components/home/Marketing";
import { Reveal } from "@/components/home/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Actions } from "@/components/ui/Actions";
import { homeFaqs, site } from "@/lib/content";
import { homeJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: site.title,
  description: site.description,
  path: "/",
});

export default function Page() {
  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <Reveal />
      <HomeHero />
      <Proof />
      <AudienceBand />
      <HowWeWork />
      <OfferingCards />
      <ModelStrip />
      <PriceTeaser />
      <MissedCallMath />
      <section className="band tone-b" id="demo">
        <div className="wrap">
          <p className="kicker">Live demo</p>
          <h2 className="fx-title">Hear a live demo</h2>
          <p className="fx-lede">Three steps. You talk to the receptionist. The voice sample is deleted after the demo.</p>
        </div>
        <DeferredTry anchor="try" heading={false} only={["voice"]} />
        <div className="wrap">
          <Actions demoHref="#try" />
        </div>
      </section>
      <Trust />
      <section id="faq" className="band tone-b">
        <div className="wrap">
          <h2 className="type-h2">Questions</h2>
          <div className="faq-list">
            {homeFaqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
          <Actions />
        </div>
      </section>
      <FinalCta />
    </>
  );
}
