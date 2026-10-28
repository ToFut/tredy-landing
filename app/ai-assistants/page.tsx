import { TopicPage } from "@/components/TopicPage";
import { getServicePage } from "@/lib/service-pages";
import { pageMetadata } from "@/lib/seo";

const page = getServicePage("/ai-assistants");

export const metadata = pageMetadata({
  title: page!.title,
  description: page!.description,
  path: page!.path,
});

export default function AiAssistantsPage() {
  return <TopicPage page={page!} />;
}
