import { LiveDemo } from "@/components/demo/LiveDemo";
import { TopicPage } from "@/components/TopicPage";
import { getServicePage } from "@/lib/service-pages";
import { pageMetadata } from "@/lib/seo";

const page = getServicePage("/voice-agents");

export const metadata = pageMetadata({
  title: page!.title,
  description: page!.description,
  path: page!.path,
});

export default function VoiceAgentsPage() {
  return (
    <>
      <LiveDemo />
      <TopicPage page={page!} />
    </>
  );
}
