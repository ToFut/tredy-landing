import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LiveDemo } from "@/components/demo/LiveDemo";
import { JsonLd } from "@/components/JsonLd";
import { Packages } from "@/components/start/Packages";
import { breadcrumbOnlyJsonLd, pageMetadata } from "@/lib/seo";

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Get started", path: "/get-started" },
];

export const metadata: Metadata = pageMetadata({
  title: "Get started in 2 minutes | Futurix",
  description:
    "Record a short voice sample, add your business, and hear a receptionist call. Then book setup for your real phone line.",
  path: "/get-started",
});

export default function GetStartedPage() {
  return (
    <>
      <JsonLd data={breadcrumbOnlyJsonLd(crumbs)} />
      <div className="wrap page-lead">
        <Breadcrumbs items={crumbs} />
      </div>
      <LiveDemo titleAs="h1" />
      <Packages />
    </>
  );
}
