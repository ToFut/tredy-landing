import { notFound } from "next/navigation";
import { TopicPage } from "@/components/TopicPage";
import { getIndustry, industryPages } from "@/lib/industries";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return industryPages.map((page) => ({
    slug: page.path.replace("/industries/", ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getIndustry(slug);
  if (!page) return {};
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getIndustry(slug);
  if (!page) notFound();
  return <TopicPage page={page} />;
}
