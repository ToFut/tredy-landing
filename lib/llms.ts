import { aboutPage } from "@/lib/about";
import { site, offerings } from "@/lib/content";
import { industryPages } from "@/lib/industries";
import { posts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/seo";
import { servicePages } from "@/lib/service-pages";

export function llmsText() {
  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.entity}.`,
    "",
    site.description,
    "",
    `Email: ${site.contactEmail}`,
    `Place: ${site.location}`,
    `Founder: ${site.founder}, MSc CS (AI), Technion. Former senior software engineer, Israeli Air Force Ofek 324.`,
    `LinkedIn: ${site.founderLinkedIn}`,
    "",
    "## Services",
    "",
    ...servicePages.map(
      (page) => `- [${page.h1}](${absoluteUrl(page.path)}): ${page.description}`,
    ),
    "",
    "## Industries",
    "",
    ...industryPages.map(
      (page) => `- [${page.h1}](${absoluteUrl(page.path)}): ${page.description}`,
    ),
    "",
    "## Notes",
    "",
    ...posts.map((post) => `- [${post.h1}](${absoluteUrl(post.path)}): ${post.description}`),
    "",
    "## Company",
    "",
    `- [Get started](${absoluteUrl("/get-started")}): Record a voice sample and hear a receptionist call for your business.`,
    `- [Home](${absoluteUrl("/")}): ${site.description}`,
    `- [About](${absoluteUrl(aboutPage.path)}): ${aboutPage.description}`,
    `- [Blog](${absoluteUrl("/blog")}): Practical notes for owners.`,
    `- [Contact](${absoluteUrl("/contact")}): Book a 15-minute call.`,
    `- [Privacy](${absoluteUrl("/privacy")}): How Futurix handles information from this site.`,
    "",
    "## Offerings in short",
    "",
    ...offerings.map((item) => `- ${item.title}: ${item.description}`),
    "",
    "## Selected work",
    "",
    "- Line Properties: a guest booking site built on Guesty. https://line-properties.com",
    "- Peak Exchange: an operations platform for 1031 exchanges.",
    "",
    "Futurix does not publish client counts, ratings, or performance claims on this site.",
    "Names of models and platforms are trademarks of their owners. Listing them is not a partnership.",
    "",
  ];
  return lines.join("\n");
}

export function llmsFullText() {
  const blocks = [llmsText(), "", "# Full pages", ""];

  for (const page of [...servicePages, ...industryPages, aboutPage]) {
    blocks.push(`## ${page.h1}`, absoluteUrl(page.path), "");
    blocks.push(...page.lede, "");
    for (const section of page.sections) {
      blocks.push(`### ${section.heading}`, ...section.paragraphs, "");
      if (section.bullets) {
        blocks.push(...section.bullets.map((item) => `- ${item}`), "");
      }
    }
    blocks.push("### Questions", "");
    for (const faq of page.faqs) {
      blocks.push(`Q: ${faq.question}`, `A: ${faq.answer}`, "");
    }
  }

  for (const post of posts) {
    blocks.push(`## ${post.h1}`, absoluteUrl(post.path), `${post.author}, ${post.dateLabel}`, "");
    blocks.push(...post.lede, "");
    for (const section of post.sections) {
      if (section.heading) blocks.push(`### ${section.heading}`);
      blocks.push(...section.paragraphs, "");
    }
  }

  return blocks.join("\n");
}
