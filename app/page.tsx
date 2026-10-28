import type { Metadata } from "next";
import { TryItLive } from "@/components/demo/TryItLive";
import { CaseStudies, FinalCta, HomeHero, HowWeWork, ModelStrip, OfferingCards } from "@/components/home/Marketing";
import { JsonLd } from "@/components/JsonLd";
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
      <HomeHero />
      <ModelStrip />
      <OfferingCards />
      <HowWeWork />
      <CaseStudies />
      <section className="section demo-band" id="demo">
        <div className="wrap">
          <h2 className="section-title offer-heading">Hear it answer.</h2>
          <p className="hero-sub">Record 10 seconds, name the business, and hear the call. The voice is deleted after the demo.</p>
        </div>
        <TryItLive anchor="try" heading={false} only={["voice"]} />
      </section>
      <section id="faq" className="section">
        <div className="wrap article-copy">
          <h2 className="section-title offer-heading">Questions</h2>
          <div className="faq-list">
            {homeFaqs.map((item) => (
              <details key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
