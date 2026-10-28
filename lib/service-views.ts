import type { FaqItem } from "@/lib/types";

export type ServiceSpec = {
  path: string;
  eyebrow: string;
  h1: string;
  sentence: string;
  price: string;
  secondary: string;
  secondaryHref: string;
  visual: "phone" | "sms" | "board" | "plan";
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

const book = "The free 15 minute call is where we scope the first version. There is no charge for that call.";

export const serviceViews: ServiceSpec[] = [
  {
    path: "/voice-agents",
    eyebrow: "Voice agents",
    h1: "Never miss a call",
    sentence: "An AI receptionist answers your phone 24/7, books the visit, and texts you a summary.",
    price: "From $1,800",
    secondary: "Hear a demo call",
    secondaryHref: "/#demo",
    visual: "phone",
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
    includes: ["One call flow", "Booking rules", "A text summary to your phone"],
    timeline: "First version live in days.",
    faqs: [
      { question: "What does the voice receptionist do?", answer: "It answers the phone, asks your questions, and books or logs the next step." },
      { question: "Can I keep my number?", answer: "Yes. The agent can sit on the number you already use." },
      { question: "Will it book without me?", answer: "Only inside rules you approve. Other calls are logged for a person." },
      { question: "What does it cost?", answer: `A voice receptionist starts at $1,800. ${book}` },
      { question: "How long until it is live?", answer: "A first version is live in days, after the free call." },
    ],
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Voice Agents", path: "/voice-agents" },
    ],
  },
  {
    path: "/ai-assistants",
    eyebrow: "AI assistants",
    h1: "Follow up every lead",
    sentence: "An assistant drafts the reply your team would send, then routes what a person should see.",
    price: "From $1,200",
    secondary: "See a sample follow-up",
    secondaryHref: "#example",
    visual: "sms",
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
      { question: "What does an assistant cost?", answer: `An assistant starts at $1,200. ${book}` },
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
    eyebrow: "Custom projects",
    h1: "Software built for how you work",
    sentence: "A portal or tool shaped to the job you already do, connected to the systems you have.",
    price: "Custom quote",
    secondary: "See a sample app",
    secondaryHref: "#example",
    visual: "board",
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
    exampleTitle: "A sample job board",
    example: ["New: Leak on Oak Street, today.", "Set: Estimate, Thursday at 10.", "Done: Ridge cap, yesterday."],
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
    h1: "Train your team to use AI",
    sentence: "A short plan and hands-on training so the team uses AI on the work you already do.",
    price: "Custom quote",
    secondary: "See a sample plan",
    secondaryHref: "#example",
    visual: "plan",
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
