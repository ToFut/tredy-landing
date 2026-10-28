import { ServiceView } from "@/components/services/ServiceView";
import { getServicePage } from "@/lib/service-pages";
import { getServiceView } from "@/lib/service-views";
import { pageMetadata } from "@/lib/seo";

const page = getServicePage("/voice-agents");
const spec = getServiceView("/voice-agents")!;

export const metadata = pageMetadata({
  title: page!.title,
  description: page!.description,
  path: page!.path,
});

export default function VoiceAgentsPage() {
  return <ServiceView spec={spec} />;
}
