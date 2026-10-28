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
  title: "Book a 15-minute call | Futurix",
  description:
    "Book a 15-minute call with Futurix about voice agents, AI assistants, custom projects, or AI enablement.",
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
          <h1>Talk through a first version.</h1>
          <p>
            Voice agents, custom projects, AI assistants, or AI enablement. Tell us which one
            fits, and what the work actually is.
          </p>
        </div>
      </section>
      <Contact />
    </>
  );
}
