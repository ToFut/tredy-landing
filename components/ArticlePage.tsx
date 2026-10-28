import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Contact } from "@/components/sections";
import { JsonLd } from "@/components/JsonLd";
import { bookCallHref, site } from "@/lib/content";
import { articleJsonLd } from "@/lib/seo";
import type { Post } from "@/lib/types";

export function ArticlePage({ post }: { post: Post }) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.h1, path: post.path },
  ];

  return (
    <>
      <JsonLd data={articleJsonLd(post)} />
      <article className="topic">
        <div className="wrap topic-wrap">
          <Breadcrumbs items={crumbs} />
          <p className="kicker">Notes from {site.name}</p>
          <h1>{post.h1}</h1>
          <p className="byline">
            {post.author}, {post.dateLabel}
          </p>
          {post.lede.map((paragraph) => (
            <p key={paragraph} className="lede">
              {paragraph}
            </p>
          ))}
          {post.sections.map((section) => (
            <section key={section.heading ?? section.paragraphs[0]} className="topic-section">
              {section.heading ? <h2>{section.heading}</h2> : null}
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
              {post.faqs.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
          <p className="topic-cta">
            <Link className="btn btn-solid" href={bookCallHref}>
              Get your free AI plan
              <span aria-hidden="true"> →</span>
            </Link>
          </p>
          <p className="topic-links">
            <Link href="/blog">All notes</Link>
            <Link href="/ai-enablement">AI enablement</Link>
            <Link href="/voice-agents">Voice agents</Link>
          </p>
        </div>
      </article>
      <Contact />
    </>
  );
}
