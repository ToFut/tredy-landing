import type { Metadata } from "next";
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

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: site.url },
};

export default function Page() {
  return (
    <>
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
