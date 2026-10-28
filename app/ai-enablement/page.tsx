import { TopicPage } from "@/components/TopicPage";
import { getServicePage } from "@/lib/service-pages";
import { pageMetadata } from "@/lib/seo";

const page = getServicePage("/ai-enablement");

export const metadata = pageMetadata({
  title: page!.title,
  description: page!.description,
  path: page!.path,
});

export default function AiEnablementPage() {
  return <TopicPage page={page!} />;
}
