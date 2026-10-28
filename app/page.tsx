import type { Metadata } from "next";
import {
  Approach,
  Contact,
  Faq,
  Hero,
  Industries,
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
      <Principles />
      <Services />
      <Approach />
      <Industries />
      <Work />
      <Why />
      <Faq />
      <Contact />
    </>
  );
}
