import type { Metadata } from "next";
import { Contact } from "@/components/sections";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book a 15-minute call",
  description:
    "Book a 15-minute call with Futurix about voice agents, AI assistants, custom projects, or AI enablement.",
  alternates: { canonical: "/contact" },
  openGraph: { url: `${site.url}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <section className="page-lead">
        <div className="wrap">
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
