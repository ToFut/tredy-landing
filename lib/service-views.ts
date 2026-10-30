import type { FaqItem } from "@/lib/types";

export type ServiceSpec = {
  path: string;
  eyebrow: string;
  h1: string;
  sentence: string;
  price: string;
  secondary: string;
  secondaryHref: string;
  visual: "phone" | "imessage" | "booking" | "notes";
  exampleVisual: "whatsapp" | "calendar" | "imessage" | "notes";
  audienceLead: string;
  audience: string[];
  serviceType: string;
  description: string;
  steps: { title: string; line: string }[];
  gets: string[];
  exampleTitle: string;
  example: string[];
  tools: string[];
  includes: string[];
  timeline: string;
  faqs: FaqItem[];
  crumbs: { name: string; path: string }[];
};

const book = "The free 15-minute live setup is where we scope the first version. There is no charge for that call.";

export const serviceViews: ServiceSpec[] = [
  {
    path: "/voice-agents",
    eyebrow: "AI voice receptionists",
    h1: "An AI receptionist that answers every call",
    sentence: "We pick up the phone, book the appointment, and follow up. Built for dental offices, HVAC and trades, med spas, and law firms.",
    price: "From $1,495 setup and $349/mo",
    secondary: "Hear a live demo",
    secondaryHref: "/#demo",
    visual: "phone",
    exampleVisual: "whatsapp",
    audienceLead: "Local offices that miss calls during jobs, lunch, and after hours.",
    audience: ["Dental", "HVAC and trades", "Med spas", "Law firms", "Home services"],
    serviceType: "AI voice agents and AI receptionist",
    description:
      "An AI receptionist that answers your phone, books the visit, and texts you a summary. Built and launched for you.",
    steps: [
      { title: "Tell us the calls you miss", line: "One line, and the questions you already ask." },
      { title: "We connect the number", line: "Your phone, your calendar, and your rules." },
      { title: "It answers and books", line: "The caller gets a next step. You get a text." },
    ],
    gets: [
      "Answers every call, including after hours",
      "Books only inside the windows you set",
      "Texts you a summary after each call",
      "Hands the call to a person when you say so",
      "Uses the questions your office already asks",
    ],
    exampleTitle: "A sample call",
    example: [
      "Caller: The roof is leaking after the storm on Oak Street.",
      "Agent: I can book an inspection. Thursday at 10 or Friday at 2.",
      "Caller: Thursday at 10.",
      "Agent: Booked. You will get a text confirmation.",
    ],
    tools: ["Google Calendar", "JobNimbus", "ServiceTitan", "Jobber", "Housecall Pro"],
    includes: ["One call flow", "Booking rules", "A text or email summary", "A package from the pricing page"],
    timeline: "Overflow Desk is live in about 5 to 7 business days. Booked Front Desk is about 7 to 10.",
    faqs: [
      { question: "What does the voice receptionist do?", answer: "It answers the phone, asks your questions, and books or logs the next step." },
      { question: "Can I keep my number?", answer: "Yes. The agent can sit on the number you already use." },
      { question: "Will it book without me?", answer: "Only inside rules you approve. Other calls are logged for a person." },
      { question: "What does it cost?", answer: `Overflow Desk is $1,495 setup and $349/mo. Booked Front Desk, the plan we recommend, is $2,495 setup and $497/mo. ${book}` },
      { question: "How long until it is live?", answer: "Overflow Desk is about 5 to 7 business days after we get access. Booked Front Desk is about 7 to 10." },
    ],
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Voice Agents", path: "/voice-agents" },
    ],
  },
  {
    path: "/ai-assistants",
    eyebrow: "AI automations",
    h1: "Automations that follow up the call",
    sentence: "We draft the text, route the lead, and log the handoff in the tools your team already opens.",
    price: "Quoted with your setup",
    secondary: "See a sample text",
    secondaryHref: "#example",
    visual: "imessage",
    exampleVisual: "calendar",
    audienceLead: "Teams that lose the lead after the first reply, or retype the same details into a job system.",
    audience: ["Shared inboxes", "Home service coordinators", "Front desks", "Follow-up queues"],
    serviceType: "AI assistants",
    description: "An AI assistant that drafts follow-ups and routes the ones a person should see. Done for you.",
    steps: [
      { title: "Pick one inbox", line: "The follow-up that slips today." },
      { title: "We write the rules", line: "What the draft may say, and when to stop." },
      { title: "You review and send", line: "The lead gets a reply. You see the ones that matter." },
    ],
    gets: [
      "A draft in your words",
      "A tag for urgent, new lead, or routine",
      "A route to the right person",
      "A stop when the message needs a human judgment",
    ],
    exampleTitle: "A sample follow-up",
    example: ["Customer: The patch from last week is dripping again.", "Assistant: We can come back Thursday at 10. Reply YES to book."],
    tools: ["Google Calendar", "Your inbox", "Jobber", "Housecall Pro"],
    includes: ["One follow-up flow", "Drafts your team can edit", "A route for urgent notes"],
    timeline: "First version live in days.",
    faqs: [
      { question: "Does the assistant send messages on its own?", answer: "Only if you allow it. Many teams review the draft first." },
      { question: "What does an assistant cost?", answer: `Automations are quoted on the live setup, often beside a receptionist package. ${book}` },
      { question: "Will it invent an answer?", answer: "No. It uses the facts and the tone you approve." },
      { question: "Can it work in text and email?", answer: "Yes. We start with the one channel that loses leads today." },
    ],
    crumbs: [
      { name: "Home", path: "/" },
      { name: "AI Assistants", path: "/ai-assistants" },
    ],
  },
  {
    path: "/custom-projects",
    eyebrow: "Custom AI and full-stack",
    h1: "Custom software for the way you already work",
    sentence: "We build booking sites, portals, and internal tools, then connect them to the systems you run.",
    price: "Custom quote",
    secondary: "See a sample booking screen",
    secondaryHref: "#example",
    visual: "booking",
    exampleVisual: "calendar",
    audienceLead: "Operators who need a screen or a handoff their current tools do not share.",
    audience: ["Booking sites", "Client portals", "Internal tools", "Full-stack products"],
    serviceType: "Custom AI software",
    description: "Custom software for the way your team already works. Scoped on a free 15 minute call.",
    steps: [
      { title: "Name the job", line: "The screen or handoff that does not exist today." },
      { title: "We build a first version", line: "Small enough to use on real work." },
      { title: "Your team runs it", line: "We stay while you decide what to keep." },
    ],
    gets: [
      "One tool for one job",
      "The roles your team already has",
      "A connection to the system you use now",
      "A first version you can try on live work",
    ],
    exampleTitle: "A sample booking screen",
    example: ["The guest picks Thursday.", "10:00 is open.", "The visit lands on the calendar the office already uses."],
    tools: ["Google Calendar", "The CRM or job system you already run"],
    includes: ["A scoped first version", "The screens for that one job", "A handoff your team can run"],
    timeline: "Scope on the free call. A first version follows in days when the job is narrow.",
    faqs: [
      { question: "Why is there no set price?", answer: `Custom tools are scoped on the free call. ${book}` },
      { question: "Do you replace our current software?", answer: "No. The first version connects to what you already use." },
      { question: "Who is this for?", answer: "A team that needs a screen or a handoff their current tools do not share." },
      { question: "What do I bring to the call?", answer: "The job that is stuck, and who does it today." },
    ],
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Custom Projects", path: "/custom-projects" },
    ],
  },
  {
    path: "/ai-enablement",
    eyebrow: "AI enablement",
    h1: "Training so the team actually uses it",
    sentence: "We write the rules for one real workflow and train the people who do that work.",
    price: "Custom quote",
    secondary: "See a sample plan",
    secondaryHref: "#example",
    visual: "notes",
    exampleVisual: "notes",
    audienceLead: "Owners who want AI on one workflow, with a person still reviewing the result.",
    audience: ["Office managers", "Coordinators", "Small teams", "Owners without an AI staff"],
    serviceType: "AI enablement and training",
    description: "Training and a short plan so a small team can use AI on one real workflow.",
    steps: [
      { title: "Name one workflow", line: "The task that already wastes time." },
      { title: "Train the people who do it", line: "What the AI may do, and what it must not do." },
      { title: "Review real work", line: "Keep what the team uses. Stop the rest." },
    ],
    gets: [
      "One workflow, not a tool tour",
      "Rules the team can repeat",
      "A person who reviews the result",
      "A plan for the next month of use",
    ],
    exampleTitle: "A sample plan",
    example: ["Name the workflow and the rules.", "Use a first version and review it.", "Keep what the team actually uses."],
    tools: ["The inbox, files, and calendar your team already opens"],
    includes: ["A readiness look at one workflow", "Training for the people who do that work", "A written set of rules"],
    timeline: "The plan starts on the free call. Training follows on your calendar.",
    faqs: [
      { question: "Is this a software build?", answer: "Not by itself. It is the plan and the training. A build is a separate offering." },
      { question: "What does training cost?", answer: `Training is scoped on the free call. ${book}` },
      { question: "Who should be in the room?", answer: "The people who do the workflow, not only the owner." },
      { question: "What do we leave with?", answer: "One named workflow, the rules, and a next step the team can run." },
    ],
    crumbs: [
      { name: "Home", path: "/" },
      { name: "AI Enablement", path: "/ai-enablement" },
    ],
  },
];

export function getServiceView(path: string) {
  return serviceViews.find((item) => item.path === path);
}
