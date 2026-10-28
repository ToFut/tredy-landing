import { ServiceView } from "@/components/services/ServiceView";
import { getServicePage } from "@/lib/service-pages";
import { getServiceView } from "@/lib/service-views";
import { pageMetadata } from "@/lib/seo";

const page = getServicePage("/custom-projects");
const spec = getServiceView("/custom-projects")!;

export const metadata = pageMetadata({
  title: page!.title,
  description: page!.description,
  path: page!.path,
});

export default function ProjectsPage() {
  return <ServiceView spec={spec} />;
}
