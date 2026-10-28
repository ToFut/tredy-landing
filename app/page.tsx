import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import {
  Approach,
  Contact,
  Faq,
  Here,
  Hero,
  Industries,
  Models,
  OfferingStrip,
  Principles,
  Services,
  Why,
  Work,
} from "@/components/sections";
import { site } from "@/lib/content";
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
      <Hero />
      <OfferingStrip />
      <Here />
      <Principles />
      <Services />
      <Models />
      <Approach />
      <Industries />
      <Work />
      <Why />
      <Faq />
      <Contact />
    </>
  );
}
