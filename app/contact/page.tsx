import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { Contact } from "@/components/sections";
import { breadcrumbOnlyJsonLd, pageMetadata } from "@/lib/seo";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

export const metadata: Metadata = pageMetadata({
  title: "Book a free 15-minute live setup | Futurix",
  description:
    "Book a free 15-minute live setup with Futurix. AI voice receptionists, automations, and custom software for local businesses.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbOnlyJsonLd(crumbs)} />
      <section className="page-lead">
        <div className="wrap">
          <Breadcrumbs items={crumbs} />
          <p className="kicker">Contact</p>
          <h1>Book a free 15-minute live setup.</h1>
          <p>
            Tell us about the calls you miss, or the automation or custom build you need. We reply from segev@futurixs.com.
          </p>
        </div>
      </section>
      <Contact />
    </>
  );
}
