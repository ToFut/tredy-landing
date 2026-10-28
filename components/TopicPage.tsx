import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { SampleCall } from "@/components/sections";
import { Contact } from "@/components/sections";
import { bookCallHref } from "@/lib/content";
import { aboutJsonLd, industryJsonLd, serviceJsonLd } from "@/lib/seo";
import type { TopicPageData } from "@/lib/types";

export function TopicPage({ page }: { page: TopicPageData }) {
  const schema =
    page.kind === "service"
      ? serviceJsonLd(page)
      : page.kind === "about"
        ? aboutJsonLd(page)
        : industryJsonLd(page);

  return (
    <>
      <JsonLd data={schema} />
      <article className="topic">
        <div className="wrap topic-wrap">
          <Breadcrumbs items={page.crumbs} />
          <p className="kicker">{page.kind === "industry" ? "Industry" : "Futurix"}</p>
          <h1>{page.h1}</h1>
          {page.lede.map((paragraph) => (
            <p key={paragraph} className="lede">
              {paragraph}
            </p>
          ))}
          <p className="topic-cta">
            <Link className="btn btn-solid" href={bookCallHref}>
              Book a 15-minute call
              <span aria-hidden="true"> →</span>
            </Link>
          </p>
          {page.path === "/voice-agents" ? <SampleCall /> : null}
          {page.sections.map((section) => (
            <section key={section.heading} className="topic-section">
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
          <section className="topic-section" id="faq">
            <h2>Common questions</h2>
            <div className="faq-list">
              {page.faqs.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
          <section className="topic-section">
            <h2>Related</h2>
            <ul className="related-list">
              {page.related.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                  <span>{item.note}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
      <Contact />
    </>
  );
}
