import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Contact } from "@/components/sections";
import { BookLink } from "@/components/ui/Actions";
import { site } from "@/lib/content";
import { posts } from "@/lib/posts";
import { breadcrumbOnlyJsonLd, pageMetadata } from "@/lib/seo";

const title = "Notes for Small Business Owners | Futurix Blog";
const description =
  "Practical notes from Futurix on implementing AI, choosing an AI receptionist, and running a readiness check. No invented statistics.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/blog",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
];

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd data={breadcrumbOnlyJsonLd(crumbs)} />
      <article className="topic">
        <div className="wrap topic-wrap">
          <Breadcrumbs items={crumbs} />
          <p className="kicker">Blog</p>
          <h1>Notes for owners who do not have a tech team</h1>
          <p className="lede">
            {site.entity}, writes these notes for small and mid-size businesses. Each one is a
            working explanation. None of them invents a statistic, a rating, or a client quote.
          </p>
          <ul className="post-list">
            {posts.map((post) => (
              <li key={post.path}>
                <p className="kicker">{post.dateLabel}</p>
                <h2>
                  <Link href={post.path}>{post.h1}</Link>
                </h2>
                <p>{post.description}</p>
                <Link className="text-link" href={post.path}>
                  Read the note
                </Link>
              </li>
            ))}
          </ul>
          <p className="topic-cta">
            <BookLink location="blog" />
          </p>
        </div>
      </article>
      <Contact />
    </>
  );
}
