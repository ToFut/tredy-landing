import { TopicPage } from "@/components/TopicPage";
import { aboutPage } from "@/lib/about";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: aboutPage.title,
  description: aboutPage.description,
  path: aboutPage.path,
});

export default function AboutPage() {
  return <TopicPage page={aboutPage} />;
}
