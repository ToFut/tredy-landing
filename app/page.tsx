import type { Metadata } from "next";
import { LiveDemo } from "@/components/demo/LiveDemo";
import { JsonLd } from "@/components/JsonLd";
import { Contact } from "@/components/sections";
import { Packages } from "@/components/start/Packages";
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
      <LiveDemo titleAs="h1" />
      <Packages />
      <section id="faq" className="section">
        <div className="wrap topic-wrap">
          <h2>Common questions</h2>
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
