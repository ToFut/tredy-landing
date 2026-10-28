import { site } from "@/lib/content";
import type { TopicPageData } from "@/lib/types";

const entity = site.entity;

export const servicePages: TopicPageData[] = [
  {
    path: "/voice-agents",
    kind: "service",
    serviceType: "AI voice agents and AI receptionist",
    title: "AI Receptionist and AI Phone Answering Service | Futurix",
    description:
      "AI phone agents that answer calls, book jobs, and capture leads 24/7 for roofing, HVAC, real estate, and property teams. Built and launched for you.",
    h1: "AI voice agents and an AI receptionist for small business",
    lede: [
      `${entity}, builds AI voice agents that answer the phone, book work, and capture the lead. An AI receptionist for a small business picks up 24/7, asks the questions your office already asks, and writes the result into the CRM and calendar you use.`,
      "This is an AI phone answering service with a job to finish, not a phone tree that traps the caller. We build it and launch it for you.",
    ],
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Voice Agents", path: "/voice-agents" },
    ],
    sections: [
      {
        heading: "An AI phone answering service that finishes the call",
        paragraphs: [
          "An AI phone answering service should do more than say the office is closed. The agent greets the caller, finds out what they need, and either books the next step or hands the call to a person when the rules say so.",
          "A small business misses calls during jobs, after hours, and at lunch. The agent covers those gaps. A person still takes the calls you want a person to take.",
        ],
      },
      {
        heading: "What an AI receptionist handles on a live call",
        paragraphs: [
          "The first version is one call flow, not every line the company owns. You choose the flow that loses work today.",
        ],
        bullets: [
          "Answer new leads and ask the qualifying questions your team already uses",
          "Book, move, or confirm an appointment on the live calendar",
          "Take a service request and write the details into the CRM",
          "Answer common questions from a short list you approve",
          "Send a short summary a person can review",
        ],
      },
      {
        heading: "Built for roofing, HVAC, real estate, and property teams",
        paragraphs: [
          "The same pattern shows up in trades and property work. A homeowner calls about a leak, a no-heat emergency, a showing, or a maintenance request. The office is on a job or off the clock. The call still needs a next step.",
          "Futurix shapes the agent around that trade. A roofing office and a property desk do not share a script. The questions, the booking rules, and the handoff are part of the design.",
        ],
      },
      {
        heading: "Connected to the CRM and calendar you already use",
        paragraphs: [
          "The agent connects to the CRM and calendar you already run, and to the phone path your customers already dial. It does not ask you to replace those systems as the default.",
          "What the agent is allowed to say, book, and write down is decided before launch. After launch you can listen, correct the flow, and widen it only where it holds up.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is an AI receptionist for a small business?",
        answer:
          "It is a voice agent that answers the phone, qualifies the caller, and books or records the next step. Futurix builds that agent around one real call flow and connects it to your CRM and calendar.",
      },
      {
        question: "Is an AI phone answering service the same as a chatbot?",
        answer:
          "No. A chatbot answers in text. An AI phone answering service speaks with the person who called. Futurix also builds chat assistants, on a separate page, when the work lives in an inbox instead of on the phone.",
      },
      {
        question: "Will it book jobs, or only take a message?",
        answer:
          "It can book when you want it to book, using the calendar and the rules you set. If the call should not be booked, it captures the lead and leaves a summary for a person.",
      },
      {
        question: "Does the agent work after hours?",
        answer:
          "Yes. Coverage can be 24/7, or only the hours your team does not answer. You choose the window.",
      },
      {
        question: "What if the caller needs a person?",
        answer:
          "The agent transfers or flags that call when the rules say a person should take it. The point is to cover the calls that do not need a person on every ring.",
      },
      {
        question: "Who owns the agent after launch?",
        answer:
          "You do. Futurix can stay for support, and the setup does not depend on staying.",
      },
    ],
    related: [
      { href: "/industries/roofing", label: "Roofing", note: "Storm and inspection calls" },
      { href: "/industries/home-services", label: "Home services", note: "HVAC and trade dispatch" },
      { href: "/industries/real-estate", label: "Real estate", note: "Inquiry and showing calls" },
      { href: "/industries/property-management", label: "Property management", note: "Maintenance and leasing lines" },
      { href: "/blog/ai-receptionist-vs-virtual-receptionist", label: "AI receptionist vs a virtual receptionist", note: "How to choose" },
      { href: "/ai-enablement", label: "AI enablement", note: "Training and rollout with the build" },
    ],
  },
  {
    path: "/ai-assistants",
    kind: "service",
    serviceType: "AI assistants and workflow automation",
    title: "AI Chatbot for Business | Futurix",
    description:
      "AI chatbot for business and workflow assistants that handle follow-ups, FAQs, and ops tasks. Done for you, inside the tools your team already opens.",
    h1: "AI assistants and automation for small business",
    lede: [
      `${entity}, builds chat and workflow assistants that take follow-ups, FAQs, and repeat ops tasks off the owner's desk. AI automation for a small business lives inside the inbox, files, and tools the team already opens.`,
      "An AI assistant for a business owner is done for you. We design it, connect it, and train the people who will run it, so their time goes back to work that pays.",
    ],
    crumbs: [
      { name: "Home", path: "/" },
      { name: "AI Assistants", path: "/ai-assistants" },
    ],
    sections: [
      {
        heading: "AI automation for small business, inside the tools you have",
        paragraphs: [
          "Most small teams do not need a new app. They need the reading, sorting, and drafting to happen where the work already sits: the inbox, the shared drive, the job system, the chat tool.",
          "Futurix starts with one queue or one document type. You can tell in a week whether it helps, before anyone funds a wider build.",
        ],
      },
      {
        heading: "An AI assistant for the business owner",
        paragraphs: [
          "Owners lose hours to follow-ups, status replies, and the same questions from customers and staff. An assistant drafts the reply, pulls the fact, or files the item. A person still sends or approves what should not go out alone.",
        ],
        bullets: [
          "Follow-ups that draft the next note and wait for a person",
          "FAQ answers drawn only from material you approve",
          "Inbox and intake that route work to the right person",
          "Document sorting, extraction, and filing",
          "Internal questions over your own notes, prices, and procedures",
        ],
      },
      {
        heading: "Follow-ups, FAQs, and ops tasks",
        paragraphs: [
          "The useful work is specific. A missed estimate follow-up. A tenant asking for a status. A coordinator copying details from a form into the job system. Those are ops tasks with a clear done state.",
          "We do not start with a general chatbot that talks about anything. The assistant has a job, a source of truth, and a person who can review it.",
        ],
      },
      {
        heading: "Done for you, then your team runs it",
        paragraphs: [
          "Futurix builds the assistant and the connections. Training is part of the work, so the owner is not left with a tool nobody opens. If the team needs a wider plan before any build, that is AI enablement, and it can come first.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is AI automation for a small business?",
        answer:
          "It is an assistant that does a repeat task inside the tools you already use, such as drafting a follow-up or filing a document. Futurix builds that task end to end so the team does not have to assemble it.",
      },
      {
        question: "What does an AI assistant for a business owner actually do?",
        answer:
          "It takes a defined slice of the owner's repeat work: follow-ups, FAQ replies, or an ops handoff. A person still reviews anything that should not go out on its own.",
      },
      {
        question: "Will this replace my staff?",
        answer:
          "No. It takes tasks that are the same every time, so people spend more time on the work that needs judgment. You decide which tasks are in scope.",
      },
      {
        question: "Does the assistant sit in a new app?",
        answer:
          "Usually no. It sits in the inbox, files, or system the team already opens. A new surface is a decision, not the default.",
      },
      {
        question: "How is this different from a voice agent?",
        answer:
          "A voice agent answers the phone. An assistant works in text and files. Many companies need one of them first. Some later use both.",
      },
    ],
    related: [
      { href: "/voice-agents", label: "Voice agents", note: "When the work is a phone call" },
      { href: "/ai-enablement", label: "AI enablement", note: "Training so the team uses it" },
      { href: "/custom-projects", label: "Custom projects", note: "When the work needs its own software" },
      { href: "/blog/how-to-implement-ai-in-a-small-business", label: "How to implement AI without a tech team", note: "A practical sequence" },
      { href: "/industries/real-estate", label: "Real estate", note: "Lead follow-up and listing questions" },
    ],
  },
  {
    path: "/custom-projects",
    kind: "service",
    serviceType: "Custom AI development and software",
    title: "Custom AI Development for Small Business | Futurix",
    description:
      "Custom AI and software built around your process, tools, and data. From a first scoped build to production handoff for US businesses.",
    h1: "Custom AI development and software for US businesses",
    lede: [
      `${entity}, is a custom AI development company in the US. We build software and AI products around the process, tools, and data you already have.`,
      "A custom project starts as a scoped first build your team can use. It ends with a production handoff, so you own the work and can run it.",
    ],
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Custom Projects", path: "/custom-projects" },
    ],
    sections: [
      {
        heading: "A custom AI development company in the US",
        paragraphs: [
          "Futurix designs and builds in the same team. You are not handed from a sales deck to a distant production group. The studio is in Suffern, New York, and the work is for businesses in the United States.",
          "Custom means the software follows your operation. Portals, dashboards, internal tools, and the integrations between them are in scope when the work needs a place to live.",
        ],
      },
      {
        heading: "Built around your process, tools, and data",
        paragraphs: [
          "We start from the workflow, not from a template product. If a voice agent or an assistant is enough, we say so. A custom project is the right path when the work needs screens, roles, and data your current tools do not hold together.",
        ],
        bullets: [
          "Client and staff portals",
          "Operations dashboards",
          "Internal tools for a job the team already does",
          "Integrations with the CRM, files, billing, or phone system you run",
          "A public site tied to the operating system behind it",
        ],
      },
      {
        heading: "From a first scoped build to production handoff",
        paragraphs: [
          "The first release is small enough to judge. One workflow, the people who use it, and the data that workflow needs. If it holds up, we extend it. If it does not, you have not funded a wide system you cannot use.",
          "Handoff includes the code, the configuration, and a walkthrough so your team can operate it. Support after launch is available. It is not required for you to keep the system.",
        ],
      },
      {
        heading: "What we do not pretend a custom build is",
        paragraphs: [
          "We do not start with a rewrite of every system you own. Replacement is a decision. We also do not attach AI to a process that should stay manual. If the honest answer is training and a smaller assistant, that is the recommendation.",
        ],
      },
    ],
    faqs: [
      {
        question: "What does a custom AI development company in the US do for a small business?",
        answer:
          "Futurix designs and builds the software or AI product around one of your workflows, then hands it to you in production. The studio is in Suffern, New York.",
      },
      {
        question: "How small is the first build?",
        answer:
          "Small enough that the people who do the work can use it and judge it. One workflow, not a full company platform, unless that is truly the job.",
      },
      {
        question: "Do we have to replace our current tools?",
        answer:
          "No. The default is to connect to the tools you already run. Replacing one is a separate decision.",
      },
      {
        question: "Who owns the code?",
        answer:
          "You do. The handoff includes what your team needs to run the system.",
      },
      {
        question: "When is a custom project the wrong first step?",
        answer:
          "When a voice agent, an assistant, or a readiness plan would answer the need. We will say that before a larger build.",
      },
    ],
    related: [
      { href: "/voice-agents", label: "Voice agents", note: "When the gap is the phone" },
      { href: "/ai-assistants", label: "AI assistants", note: "When the gap is a queue or a document" },
      { href: "/ai-enablement", label: "AI enablement", note: "When you need a plan before a build" },
      { href: "/about", label: "About Futurix", note: "Studio and founder" },
      { href: "/#work", label: "Selected work", note: "Notes on shipped projects" },
    ],
  },
  {
    path: "/ai-enablement",
    kind: "service",
    serviceType: "AI enablement, training, and implementation",
    title: "AI Consulting for Small Business | Futurix",
    description:
      "AI consulting for small business: readiness, training, and rollout so your team actually uses AI at work. Don't have the time or know-how to enable AI? We're here.",
    h1: "AI enablement, training, and implementation for small business",
    lede: [
      `${entity}, helps owners who do not have the time or the know-how to enable AI. An AI consultant for a small business should leave you with a decision, a first workflow, and a team that can use it.`,
      "That work is an AI readiness assessment, a practical plan, AI training for small business owners and their staff, and rollout. The aim is use, not a slide deck.",
    ],
    crumbs: [
      { name: "Home", path: "/" },
      { name: "AI Enablement", path: "/ai-enablement" },
    ],
    sections: [
      {
        heading: "An AI consultant for a small business",
        paragraphs: [
          "Owners are asked to pick tools before anyone has named the workflow. Futurix starts with the operation: the calls, the inbox, the handoffs, and where time actually goes.",
          "You get a recommendation you can act on. Sometimes that is a voice agent or an assistant. Sometimes it is a custom build. Sometimes it is to leave a task alone.",
        ],
      },
      {
        heading: "AI readiness assessment",
        paragraphs: [
          "A readiness assessment looks at where a first use of AI would help, what data it would touch, who would review it, and whether the team can absorb it. It is a working session, not a score you can buy off a website.",
          "We use a plain checklist so the conversation stays concrete. You can also read the public version on the blog and bring it to a call.",
        ],
      },
      {
        heading: "AI training for small business owners",
        paragraphs: [
          "Training is for the people who will use the system, including the owner. It covers what the tool does, what it must not do, and how to correct it. A workshop with no system behind it is optional. Training tied to a live workflow is the default.",
        ],
        bullets: [
          "Where AI belongs in this company, and where it does not",
          "How to review a draft, a call summary, or a booked job",
          "What data the workflow may use",
          "Who owns the process after Futurix steps back",
        ],
      },
      {
        heading: "How to implement AI in a small business",
        paragraphs: [
          "Implementation is a sequence. Name one workflow. Describe the done state. Build a small version. Connect it to the tools you have. Train the team. Watch whether they use it. Extend only what holds up.",
          "You do not need a technical department to start. Futurix does the build and stays through the first weeks of use. If you want the longer explanation, the blog post walks the same sequence without a sales script.",
        ],
      },
    ],
    faqs: [
      {
        question: "What does an AI consultant for a small business deliver?",
        answer:
          "A clear recommendation for one workflow, plus the training and rollout to use it. Futurix can also build the voice agent, assistant, or software that recommendation points to.",
      },
      {
        question: "What is an AI readiness assessment?",
        answer:
          "It is a structured look at where AI would help, what data it needs, and whether the team can adopt it. You leave with a decision, not a vanity score.",
      },
      {
        question: "Do you train small business owners, or only staff?",
        answer:
          "Both, when both will touch the work. AI training for small business owners is part of enablement because the owner usually sets what is allowed.",
      },
      {
        question: "How do you implement AI if we have no tech team?",
        answer:
          "Futurix does the technical build. Your team describes the work, reviews the first version, and learns to run it. You do not staff an engineering group to begin.",
      },
      {
        question: "Can enablement happen without a software project?",
        answer:
          "Yes. Some engagements stop at the assessment, the plan, and the training. A build starts only if a build is the right next step.",
      },
      {
        question: "How is this different from buying a chatbot subscription?",
        answer:
          "A subscription gives you a tool. Enablement decides where it belongs, sets the rules, and gets the team to use it. Futurix stays for that adoption work.",
      },
    ],
    related: [
      { href: "/blog/how-to-implement-ai-in-a-small-business", label: "How to implement AI without a tech team", note: "The sequence in plain language" },
      { href: "/blog/ai-readiness-assessment-checklist", label: "AI readiness checklist", note: "Ten questions before you buy a tool" },
      { href: "/voice-agents", label: "Voice agents", note: "A common first build" },
      { href: "/ai-assistants", label: "AI assistants", note: "A common first build in the inbox" },
      { href: "/about", label: "About Futurix", note: "Who leads the work" },
    ],
  },
];

export function getServicePage(path: string) {
  return servicePages.find((page) => page.path === path);
}
