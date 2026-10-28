import type { Metadata } from "next";
import { DeferredTry } from "@/components/demo/DeferredTry";
import { DemoLoop } from "@/components/demo/DemoLoop";
import { FinalCta, HomeHero, HowWeWork, ModelStrip, OfferingCards, PriceTeaser, Trust } from "@/components/home/Marketing";
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
      <ModelStrip />
      <HowWeWork />
      <OfferingCards />
      <section className="band" id="demo">
        <div className="wrap">
          <p className="eyebrow">Live demo</p>
          <h2 className="type-h2">Try it: hear an AI answer your phone</h2>
          <p className="type-body">Three steps. The voice is deleted after the demo.</p>
        </div>
        <DeferredTry anchor="try" heading={false} only={["voice"]} />
        <div className="wrap">
          <p className="type-small">A sample of that demo.</p>
          <DemoLoop />
          <Actions demoHref="#try" />
        </div>
      </section>
      <Trust />
      <PriceTeaser />
      <section id="faq" className="band">
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
