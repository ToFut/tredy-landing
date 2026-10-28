export const site = {
  name: "Futurix",
  url: "https://futurixs.com",
  location: "Suffern, New York",
  contactEmail: "hello@futurixs.com",
  description:
    "Futurix builds voice agents, AI assistants, and custom AI projects, and helps companies enable AI. Studio in Suffern, New York.",
  title:
    "Futurix | Voice agents, AI assistants, custom projects, and AI enablement",
};

export type Offering = {
  id: string;
  number: string;
  nav: string;
  title: string;
  summary: string;
  description: string;
  examples: string[];
  outcome: string;
};

export const offerings: Offering[] = [
  {
    id: "voice-agents",
    number: "01",
    nav: "Voice agents",
    title: "Voice Agents",
    summary:
      "Phone and voice agents that answer, qualify, book, and support, on your CRM and calendar.",
    description:
      "AI phone and voice agents that answer calls, qualify leads, book appointments, and handle customer service 24/7. They connect to the CRM and calendar you already use.",
    examples: [
      "After hours and overflow answering, so a call is not missed",
      "Lead qualification that writes the result into the CRM",
      "Appointment booking and rescheduling on the live calendar",
      "Customer service for scheduling, status, and common questions",
      "A short call summary a person on the team can review",
    ],
    outcome:
      "Calls get answered, qualified, and booked without a person on every ring, and the CRM and calendar stay in step with what was said.",
  },
  {
    id: "custom-projects",
    number: "02",
    nav: "Custom projects",
    title: "Custom Projects",
    summary:
      "Platforms, portals, dashboards, internal tools, and integrations, built end to end.",
    description:
      "Custom software and AI products built end to end. Platforms, portals, dashboards, internal tools, and the integrations that connect them to the business.",
    examples: [
      "Client and staff portals",
      "Operations dashboards",
      "Internal tools for the work the team already does",
      "Integrations with the systems you already run",
      "A public site tied to the operating platform",
    ],
    outcome:
      "The operation gets software shaped around the work, and your team can run it.",
  },
  {
    id: "ai-assistants",
    number: "03",
    nav: "AI assistants",
    title: "AI Assistants",
    summary:
      "Chat and workflow assistants for teams and customers, inside the tools you already use.",
    description:
      "Chat and workflow assistants for teams and customers. Document handling, inbox and intake, internal knowledge, and automations, inside the tools you already use.",
    examples: [
      "Document handling that sorts, extracts, and files",
      "Inbox and intake that drafts a reply and routes the work",
      "An internal knowledge assistant over your own material",
      "Workflow automations inside the tools the team already opens",
      "Customer chat that answers from approved sources",
    ],
    outcome:
      "Repetitive reading, sorting, and answering happens in the tools people already use, and a person can still review what matters.",
  },
  {
    id: "ai-enablement",
    number: "04",
    nav: "AI enablement",
    title: "AI Enablement",
    summary:
      "Assessment, strategy, training, governance, and rollout so the company can adopt AI.",
    description:
      "Help for companies adopting AI. Opportunity assessment, strategy and roadmap, team training, governance, and rollout and adoption support.",
    examples: [
      "An opportunity assessment across the real operation",
      "A strategy and a practical roadmap",
      "Team training and workshops",
      "Governance for how AI is allowed to be used",
      "Rollout and adoption support after the decision",
    ],
    outcome:
      "The company knows where AI belongs, how it is governed, and how the team will use it.",
  },
];

export const principles = [
  {
    number: "01",
    title: "Find the value",
    body: "A close look at where a voice agent, an assistant, or a custom tool changes the operation, scoped small enough to start.",
  },
  {
    number: "02",
    title: "Build it in",
    body: "The first version, connected to the CRM, calendar, inbox, files, or other systems you already run.",
  },
  {
    number: "03",
    title: "Make it stick",
    body: "Training, guardrails, and adoption support so the team actually uses it. That is AI enablement, alongside the build.",
  },
];

export const approach = [
  {
    number: "01",
    title: "Discover",
    body: "We sit with the work: the calls, the queues, the tools, and where time actually goes. The point is a narrow place to start.",
  },
  {
    number: "02",
    title: "Prototype",
    body: "A small first version the team can try. Enough to judge whether it holds up, before a wider build.",
  },
  {
    number: "03",
    title: "Build and integrate",
    body: "We build the agent, the assistant, or the software, and connect it to the systems you already run.",
  },
  {
    number: "04",
    title: "Enable and scale",
    body: "Training, guardrails, and support after launch. What holds up in the real operation is what we extend.",
  },
];

export const industries = [
  {
    title: "Real estate and property management",
    body: "Booking, owner and guest portals, and the operational work around listings and clients.",
  },
  {
    title: "Insurance",
    body: "Document handling, inquiry response, and internal workflows around policies and claims.",
  },
  {
    title: "Home services and construction",
    body: "Public sites, lead response, and job operations for trades such as roofing and remodeling.",
  },
  {
    title: "Financial services",
    body: "Exchange operations, client and third party portals, and the documents that move with a transaction.",
  },
  {
    title: "Startups and small teams",
    body: "A first assistant, an internal tool, or a product surface, scoped so a small team can run it.",
  },
];

export type WorkItem = {
  kicker: string;
  title: string;
  body: string;
  href?: string;
  wide?: boolean;
  variant: "exchange" | "stay" | "roof" | "shop" | "product" | "signal";
};

export const work: WorkItem[] = [
  {
    kicker: "Financial services",
    title: "Peak Exchange",
    body: "Operations platform for 1031 exchanges. Client, third party, and admin portals on one transaction, including quoting of work orders.",
    wide: true,
    variant: "exchange",
  },
  {
    kicker: "Real estate",
    title: "Lina Properties",
    body: "Direct booking website for a short-term rental company, live at linaproperties.com. Futurix maintains the site.",
    href: "https://linaproperties.com",
    variant: "stay",
  },
  {
    kicker: "Home services",
    title: "redfroggroup.net",
    body: "Website and platform for a roofing company, live at redfroggroup.net.",
    href: "https://redfroggroup.net",
    variant: "roof",
  },
  {
    kicker: "Home services",
    title: "Remodeling company platform",
    body: "Internal tools for a remodeling company, from the public site through operations.",
    variant: "shop",
  },
  {
    kicker: "Product",
    title: "adjetixai.com",
    body: "Product website, live at adjetixai.com.",
    href: "https://adjetixai.com",
    variant: "product",
  },
  {
    kicker: "Product",
    title: "tredy.ai",
    body: "Product site and application work, live at tredy.ai.",
    href: "https://tredy.ai",
    wide: true,
    variant: "signal",
  },
];

export const reasons = [
  {
    number: "01",
    title: "Senior, hands-on team",
    body: "Strategy and build sit with the same people. You work with the team that will design, ship, and support the voice agent, the assistant, or the custom project.",
  },
  {
    number: "02",
    title: "Built around your existing tools",
    body: "CRM, calendar, email, booking, billing, files, and the systems you already run. Replacement is a decision, not a default.",
  },
  {
    number: "03",
    title: "A small first version, before a large spend",
    body: "The first release is something the team can use. You can judge it before funding the wider system.",
  },
  {
    number: "04",
    title: "End to end, from strategy to support",
    body: "Assessment, production software, training, guardrails, and support after launch stay with one team.",
  },
];

export const faqs = [
  {
    question: "What does Futurix build?",
    answer:
      "Four things. Voice agents that answer, qualify, and book. Custom projects: the platforms, portals, dashboards, and tools around the work. AI assistants for documents, inbox, knowledge, and workflow, inside the tools you already use. And AI enablement, so the company can adopt the work on purpose. An engagement can use one of them, or several. Most work starts with a single workflow.",
  },
  {
    question: "What does a first project look like?",
    answer:
      "A small version you can use. For a voice agent, that might be one call flow that answers, qualifies, and books. For an assistant, one queue or one document type. For a custom project, one workflow with the people who use it. You judge that version before a wider build.",
  },
  {
    question: "Do you work with our existing systems?",
    answer:
      "Yes. Voice agents connect to the CRM and calendar you already use. Assistants sit inside the inbox, files, and tools the team already opens. Custom projects integrate with those systems. Replacing a system is a decision, not the default.",
  },
  {
    question: "Who owns the code?",
    answer:
      "You do. Custom projects, and the configuration of agents and assistants, are delivered to you. We can stay on for support. The work does not depend on staying.",
  },
  {
    question: "How do you handle data security?",
    answer:
      "We design around the data the workflow actually needs. Access, retention, and what an agent is allowed to do are part of the build. We do not train public models on your data.",
  },
  {
    question: "What is included in AI enablement?",
    answer:
      "Opportunity assessment, a practical roadmap, team training, governance for how AI is allowed to be used, and help with rollout and adoption. The aim is a company that can use AI on purpose, including deciding where not to use it.",
  },
];

export const studioFacts = [
  { label: "Studio", value: "Suffern, New York" },
  { label: "First release", value: "A small version you can use" },
  { label: "Scope", value: "Strategy through production support" },
];

export const nav = [
  ...offerings.map((item) => ({ href: `#${item.id}`, label: item.nav })),
  { href: "#work", label: "Work" },
  { href: "#faq", label: "FAQ" },
];
