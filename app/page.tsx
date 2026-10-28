import type { Metadata } from "next";
import { CaseStudies, FinalCta, HereBand, HomeHero, LogoMarquee, OfferingBands, SetupBand } from "@/components/home/Marketing";
import { JsonLd } from "@/components/JsonLd";
import { Contact } from "@/components/sections";
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
      <OfferingBands />
      <HereBand />
      <LogoMarquee />
      <CaseStudies />
      <SetupBand />
      <FinalCta />
      <section id="faq" className="section">
        <div className="wrap topic-wrap">
          <h2 className="section-title">Questions</h2>
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
      <Contact />
    </>
  );
}
