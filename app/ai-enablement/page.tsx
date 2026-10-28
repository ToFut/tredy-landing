import { ServiceView } from "@/components/services/ServiceView";
import { getServicePage } from "@/lib/service-pages";
import { getServiceView } from "@/lib/service-views";
import { pageMetadata } from "@/lib/seo";

const page = getServicePage("/ai-enablement");
const spec = getServiceView("/ai-enablement")!;

export const metadata = pageMetadata({
  title: page!.title,
  description: page!.description,
  path: page!.path,
});

export default function EnablementPage() {
  return <ServiceView spec={spec} />;
}
