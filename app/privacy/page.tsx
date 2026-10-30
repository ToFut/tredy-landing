import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/content";
import { breadcrumbOnlyJsonLd, pageMetadata } from "@/lib/seo";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Privacy", path: "/privacy" },
];

export const metadata: Metadata = pageMetadata({
  title: "Privacy notice | Futurix",
  description: "How Futurix handles information submitted through futurixs.com.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <article className="legal">
      <JsonLd data={breadcrumbOnlyJsonLd(crumbs)} />
      <div className="legal-wrap">
        <Breadcrumbs items={crumbs} />
        <p className="kicker">Privacy</p>
        <h1>Privacy notice</h1>
        <p>Futurix, {site.address}. This notice covers futurixs.com.</p>

        <h2>What you send us</h2>
        <p>
          The contact form asks for your name, email, company, website, the offering you want
          to discuss, and a short note. Company and website are optional. Submitting the form
          opens your own email application, addressed to {site.contactEmail}. This site does
          not store those submissions in a database.
        </p>
        <p>
          If you email us directly, we use that message to reply and to decide whether a first
          conversation makes sense.
        </p>

        <h2>What we do not do</h2>
        <p>
          We do not sell personal information. This site does not run advertising cookies, and
          it does not use your messages to train public models.
        </p>

        <h2>Hosting</h2>
        <p>
          The site is hosted on Vercel. The host may process standard connection data, such as
          IP address and browser type, to deliver the pages.
        </p>

        <h2>Questions</h2>
        <p>
          Write to <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a> if you want
          a copy of an email you sent us, or if you want us to delete it.
        </p>
      </div>
    </article>
  );
}
