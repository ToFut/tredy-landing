import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PricingSection } from "@/components/pricing/PricingSection";
import { pricingHeadline, pricingIntro, receptionistTiers } from "@/lib/pricing";
import { pageMetadata } from "@/lib/seo";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
];

const title = "AI Receptionist Pricing | Futurix";
const description =
  "Futurix AI receptionist packages for local businesses. Overflow Desk is $1,495 setup and $349/mo. Booked Front Desk is $2,495 setup and $497/mo. Multi-location starts at $4,995 setup and $897/mo.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/pricing",
});

export default function PricingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: crumb.path === "/" ? "https://futurixs.com" : `https://futurixs.com${crumb.path}`,
        })),
      },
      {
        "@type": "OfferCatalog",
        name: pricingHeadline,
        description: pricingIntro,
        itemListElement: receptionistTiers.map((tier) => ({
          "@type": "Offer",
          name: tier.name,
          description: tier.summary,
          priceCurrency: "USD",
          price: tier.id === "overflow" ? "349" : tier.id === "booked" ? "497" : "897",
          url: "https://futurixs.com/pricing",
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <header className="band fx-hero fx-pricing-hero">
        <div className="wrap">
          <Breadcrumbs items={crumbs} />
          <p className="kicker">Pricing</p>
          <h1 className="hero-title">{pricingHeadline}</h1>
          <p className="hero-sub">{pricingIntro}</p>
          <p className="fx-also">
            <Link href="/#demo">Hear a live demo</Link> before you pick a package.
          </p>
        </div>
      </header>
      <PricingSection id="packages" showIntro={false} showAddons />
    </>
  );
}
