import { site } from "@/lib/content";
import type { TopicPageData } from "@/lib/types";

export const aboutPage: TopicPageData = {
  path: "/about",
  kind: "about",
  title: "About Futurix | Custom AI Solutions in Suffern, New York",
  description:
    "Futurix is a custom AI solutions and AI enablement company in Suffern, New York, led by Segev Halfon. Voice agents, assistants, custom projects, and training.",
  h1: "About Futurix",
  lede: [
    `${site.entity}. Segev Halfon leads the studio. The people who frame the work also build it.`,
    "We work with small and mid-size businesses in the United States. The four offerings are voice agents, custom projects, AI assistants, and AI enablement.",
  ],
  crumbs: [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ],
  sections: [
    {
      heading: "Company facts",
      paragraphs: [
        "Futurix is based in Suffern, New York. The public site is futurixs.com. The contact address for a first conversation is segev@futurixs.com.",
        "The work is custom. We do not sell a single packaged product, and we do not publish client counts, revenue, or performance claims. If a number is not on this page, we are not asking you to assume it.",
      ],
      bullets: [
        "Name: Futurix",
        "Place: Suffern, New York",
        "Founder: Segev Halfon",
        "Email: segev@futurixs.com",
        "Work: voice agents, custom projects, AI assistants, AI enablement",
        "Clients: US small and mid-size businesses",
      ],
    },
    {
      heading: "Who leads the work",
      paragraphs: [
        "Segev Halfon leads Futurix and stays on the work, from the first look at a workflow through the build and the training. The public professional profile is on LinkedIn.",
        "A first conversation is a 15-minute call. Bring the workflow. If a small version is worth building, we will say so. If it is not, we will say that too.",
      ],
    },
    {
      heading: "How an engagement is shaped",
      paragraphs: [
        "Most work starts with one workflow. A voice agent for one call type. An assistant for one queue. A custom tool for one job. Enablement when the company needs a plan and training before, or beside, the build.",
        "You own the result. Support after launch is available and is not a condition of keeping the system.",
      ],
    },
  ],
  faqs: [
    {
      question: "Where is Futurix based?",
      answer: "Suffern, New York. The company works with small and mid-size businesses in the United States.",
    },
    {
      question: "Who founded Futurix?",
      answer:
        "Segev Halfon. He leads the studio and works on the engagements, from the first workflow through build and training.",
    },
    {
      question: "What does Futurix sell?",
      answer:
        "Four offerings: voice agents, custom projects, AI assistants, and AI enablement. An engagement can use one of them or several.",
    },
    {
      question: "How do we start?",
      answer:
        "Book a 15-minute call and describe the workflow. The note goes to segev@futurixs.com.",
    },
  ],
  related: [
    { href: "/voice-agents", label: "Voice agents", note: "AI receptionist and phone agents" },
    { href: "/ai-assistants", label: "AI assistants", note: "Follow-ups, FAQs, and ops tasks" },
    { href: "/custom-projects", label: "Custom projects", note: "Software built around your process" },
    { href: "/ai-enablement", label: "AI enablement", note: "Readiness, training, and rollout" },
    { href: "/blog", label: "Blog", note: "Practical notes for owners" },
  ],
};
