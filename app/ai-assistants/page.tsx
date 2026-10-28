import { ServiceView } from "@/components/services/ServiceView";
import { getServicePage } from "@/lib/service-pages";
import { getServiceView } from "@/lib/service-views";
import { pageMetadata } from "@/lib/seo";

const page = getServicePage("/ai-assistants");
const spec = getServiceView("/ai-assistants")!;

export const metadata = pageMetadata({
  title: page!.title,
  description: page!.description,
  path: page!.path,
});

export default function AssistantsPage() {
  return <ServiceView spec={spec} />;
}
