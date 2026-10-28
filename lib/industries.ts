import { site } from "@/lib/content";
import type { TopicPageData } from "@/lib/types";

const entity = site.entity;

export const industryPages: TopicPageData[] = [
  {
    path: "/industries/roofing",
    kind: "industry",
    title: "AI Receptionist for Roofing Companies | Futurix",
    description:
      "An AI receptionist for roofing companies that answers storm calls, books inspections, and captures leads when the crew is on a roof. Built by Futurix.",
    h1: "An AI receptionist for roofing companies",
    lede: [
      `${entity}, builds an AI receptionist for roofing companies that answers when the office cannot. Storm calls, inspection requests, and "do you cover my area" questions get a next step instead of a missed ring.`,
      "The agent books or logs the job in the tools the office already uses. A person still takes the calls that need a person.",
    ],
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Industries", path: "/#industries" },
      { name: "Roofing", path: "/industries/roofing" },
    ],
    sections: [
      {
        heading: "The calls a roofing office actually misses",
        paragraphs: [
          "The useful calls are specific. A homeowner after a storm. A property manager who wants a roof looked at this week. A past customer asking whether a leak is covered by the work you already did. These calls land while the owner is on a ladder or the coordinator is on the other line.",
        ],
        bullets: [
          "New storm and leak calls, including the address and what the caller can see",
          "Requests to book an inspection or an estimate visit",
          "Questions about service area, timing, and what to send before a visit",
          "Status calls on a repair that is already sold",
          "After hours messages that should be a booked visit, not a voicemail",
        ],
      },
      {
        heading: "What Futurix would build across the four offerings",
        paragraphs: [
          "Voice agents are usually the first build: one storm or estimate line, with booking rules and a handoff. AI assistants come next for the follow-up the office forgets, such as a draft note after an estimate that was not accepted.",
          "A custom project is the right step when the office needs a place the crew, the coordinator, and the customer all touch, such as a simple job view. AI enablement is the training so the coordinator trusts the summary and corrects the agent instead of ignoring it.",
        ],
      },
      {
        heading: "How it connects to the tools a roofing company already runs",
        paragraphs: [
          "The agent writes into the CRM or job system you already use, and onto the calendar that holds inspections. Photo apps, estimating tools, and accounting stay where they are. We do not replace them as the default.",
          "If your office lives in a shared inbox and a paper board, the first version can be that simple. The connection should match the office you have, not a software stack you do not run.",
        ],
      },
      {
        heading: "What a first roofing version looks like",
        paragraphs: [
          "One number, or one queue on the number you have. A short script for storm and estimate calls. Booking only inside the windows you set. A summary a coordinator can read in the morning. You listen, change the questions, and then decide whether a second flow is worth it.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can an AI receptionist for roofing companies book inspections?",
        answer:
          "Yes, when you want it to. Futurix connects the agent to the calendar and the rules for which visits can be booked without a person.",
      },
      {
        question: "What happens to after hours storm calls?",
        answer:
          "The agent can answer them, capture the address and the problem, and book or flag the visit. You choose whether nights are booked or only logged.",
      },
      {
        question: "Will it talk about insurance claims?",
        answer:
          "It can collect the facts you ask for and the photos the caller already has. It does not give coverage advice. A person handles anything that needs a judgment about a claim.",
      },
      {
        question: "Do we have to change our job software?",
        answer:
          "No. The first version connects to the system you use to track leads and visits. Replacing that system is a separate decision.",
      },
      {
        question: "How is this different from an answering service with a live person?",
        answer:
          "A person on a generic script takes a message. This agent follows your roofing questions and can book into your calendar. Read the comparison on the blog if you are choosing between the two.",
      },
    ],
    related: [
      { href: "/voice-agents", label: "Voice agents", note: "The usual first build for a roofing line" },
      { href: "/industries/home-services", label: "Home services and HVAC", note: "A related trade pattern" },
      { href: "/ai-assistants", label: "AI assistants", note: "Estimate follow-up after the call" },
      { href: "/blog/ai-receptionist-vs-virtual-receptionist", label: "AI receptionist vs virtual receptionist", note: "How the two differ" },
    ],
  },
  {
    path: "/industries/home-services",
    kind: "industry",
    title: "AI Answering Service for HVAC and Home Services | Futurix",
    description:
      "AI answering for HVAC and home service businesses. Emergency calls, maintenance visits, and lead capture, connected to the dispatch tools you already use.",
    h1: "An AI answering service for HVAC and home service businesses",
    lede: [
      `${entity}, builds an AI answering service for HVAC companies and other home service businesses. No-heat, no-cool, and other urgent calls get a real next step when the dispatcher is already on a job.`,
      "The same pattern fits plumbing, electrical, and similar trades: qualify the call, book or dispatch within your rules, and write it into the system the office already trusts.",
    ],
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Industries", path: "/#industries" },
      { name: "Home services", path: "/industries/home-services" },
    ],
    sections: [
      {
        heading: "Calls that should not wait for a callback",
        paragraphs: [
          "Home service revenue sits in the calls that arrive while every technician is in a van. The caller with no heat at night, the landlord who wants a maintenance visit, and the new customer asking for a quote are not the same call. They should not share one vague voicemail box.",
        ],
        bullets: [
          "Emergency intake: what failed, the address, and whether someone is on site",
          "Maintenance agreement visits and seasonal tune-ups",
          "New install and replacement leads, with the questions your comfort advisor already asks",
          "Status calls on a repair that is open",
          "After hours coverage that follows your on-call rules",
        ],
      },
      {
        heading: "Four offerings, applied to a home service company",
        paragraphs: [
          "A voice agent is the answering layer: it picks up, sorts emergency from routine, and books or pages within rules you set. An assistant handles the desk work around the call, such as a maintenance renewal note or a parts status the coordinator retypes today.",
          "A custom project fits when dispatch, the customer, and the office need one view the current tools do not share. Enablement is how the dispatcher learns to trust the summary and when to take the call back.",
        ],
      },
      {
        heading: "Connected to dispatch, the calendar, and the phone you have",
        paragraphs: [
          "Home service teams often already run a dispatch board, a calendar, and a phone system. Futurix connects the agent to those, instead of asking you to move the company into a new suite.",
          "Membership visits, emergency windows, and the zip codes you serve become rules. The agent does not invent a slot you would not have offered.",
        ],
      },
      {
        heading: "A first version for an HVAC office",
        paragraphs: [
          "Start with one line: after hours no-heat and no-cool, or daytime overflow on new leads. Define what counts as an emergency in your words. Book only the windows a technician can actually make. Review a week of summaries before you add maintenance renewals or install leads.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is this an AI answering service for HVAC, or a generic call bot?",
        answer:
          "It is built for HVAC and home service calls. The questions, the emergency rules, and the booking windows are yours, not a generic script.",
      },
      {
        question: "Can it tell a no-heat emergency from a tune-up request?",
        answer:
          "Yes, if you define the difference. The agent asks the checks you specify and then books, pages, or logs the call.",
      },
      {
        question: "Will it dispatch a technician on its own?",
        answer:
          "Only inside rules you approve. Many offices let it book routine visits and require a person for true emergencies. Both are normal setups.",
      },
      {
        question: "What tools does it connect to?",
        answer:
          "The phone path, the calendar, and the dispatch or CRM system you already use. Futurix does not require a new operating system to start.",
      },
      {
        question: "Does this fit trades other than HVAC?",
        answer:
          "Yes. Plumbing, electrical, and similar home service businesses use the same shape: urgent calls, booked visits, and a desk that is already busy. Roofing has its own page because storm calls are a different script.",
      },
    ],
    related: [
      { href: "/voice-agents", label: "Voice agents", note: "AI phone answering for the trade" },
      { href: "/industries/roofing", label: "Roofing", note: "A neighboring trade" },
      { href: "/ai-assistants", label: "AI assistants", note: "Renewals and desk follow-up" },
      { href: "/ai-enablement", label: "AI enablement", note: "Train the dispatcher, not only the owner" },
    ],
  },
  {
    path: "/industries/real-estate",
    kind: "industry",
    title: "AI Voice Agents and Chatbots for Real Estate | Futurix",
    description:
      "AI voice agents for real estate and a chatbot for agent and team inquiries. Showing requests, lead capture, and follow-up, connected to your CRM.",
    h1: "AI voice agents and a chatbot for real estate teams",
    lede: [
      `${entity}, builds AI voice agents for real estate teams that answer buyer and seller calls when the agent is in a showing. A chatbot for real estate agents covers the same questions in text, on the site or in the inbox, from listing facts you approve.`,
      "The goal is a captured lead and a booked next step, written into the CRM and calendar you already use.",
    ],
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Industries", path: "/#industries" },
      { name: "Real estate", path: "/industries/real-estate" },
    ],
    sections: [
      {
        heading: "Inquiries that go cold while you are at a showing",
        paragraphs: [
          "Real estate leads decay when nobody answers. The caller wants to know if the house is available, whether they can see it, or what the next step is for a listing conversation. Those calls hit while the agent is with another client.",
        ],
        bullets: [
          "Buyer calls about a listing: availability, showing windows, and how to reach the agent",
          "Seller inquiries that qualify the timeline and the property before a person calls back",
          "Showing and consultation requests booked onto the calendar you allow",
          "After hours capture so a night inquiry is not a missed number",
          "Text questions on the site that answer only from approved listing notes",
        ],
      },
      {
        heading: "Voice agents and a chatbot, used for different moments",
        paragraphs: [
          "A voice agent is for the person who called. A chatbot is for the person who is already on the page or in the inbox. Futurix does not force both on day one. We start with the channel that loses leads today.",
          "Assistants also draft the follow-up after a showing request, so the agent is not rewriting the same note. A custom project fits a team that needs a client portal or a shared desk the CRM does not provide. Enablement trains the agents to correct the bot instead of working around it.",
        ],
      },
      {
        heading: "Connected to the CRM and the calendar, not to a guessed listing feed",
        paragraphs: [
          "The agent and the chatbot write into the CRM and the calendar you use. Answers about a property come from notes you approve. Futurix does not invent listing facts, and we do not claim a live feed from a brokerage system unless that connection is actually in scope.",
          "What the bot may promise, such as a showing time, is a rule. If only the agent can confirm a time, the bot collects the request and stops there.",
        ],
      },
      {
        heading: "A first version for a team or a solo agent",
        paragraphs: [
          "One lead source. Either the main office line or the website chat, not both on day one. A short list of questions. A clear handoff to the agent. A week of real inquiries to see whether the notes are usable. Then widen it.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is an AI voice agent for real estate?",
        answer:
          "It answers buyer and seller calls, asks the qualifying questions you set, and books or records the next step in your CRM and calendar. Futurix builds that flow for the team.",
      },
      {
        question: "Can a chatbot for real estate agents answer listing questions?",
        answer:
          "Yes, from the facts you provide. It should not guess a price, a status, or a detail that is not in the approved notes.",
      },
      {
        question: "Will it book showings without the agent?",
        answer:
          "Only if you allow that. Many agents prefer the bot to collect times and let a person confirm. Both setups are reasonable.",
      },
      {
        question: "Does this replace an ISA or a showing desk?",
        answer:
          "No. It covers the first response and the repeat questions. People still handle negotiations, advice, and the conversations you want a person on.",
      },
      {
        question: "Which system does it connect to?",
        answer:
          "The CRM and calendar you already run. We name the specific connection in the scope, and we do not assume a listing feed we have not built.",
      },
    ],
    related: [
      { href: "/voice-agents", label: "Voice agents", note: "Phone coverage during showings" },
      { href: "/ai-assistants", label: "AI assistants", note: "Chat and follow-up drafts" },
      { href: "/industries/property-management", label: "Property management", note: "A different call mix on the same buildings" },
      { href: "/blog/ai-receptionist-vs-virtual-receptionist", label: "Receptionist comparison", note: "Person versus agent on the first call" },
    ],
  },
  {
    path: "/industries/property-management",
    kind: "industry",
    title: "AI Receptionist for Property Management | Futurix",
    description:
      "An AI receptionist for property management teams. Maintenance requests, leasing calls, and after hours emergencies, logged into the systems you already use.",
    h1: "An AI receptionist for property management",
    lede: [
      `${entity}, builds an AI receptionist for property management teams. Residents, owners, and prospects reach a line that can take a maintenance request, answer a leasing question, or flag an emergency.`,
      "The note lands in the work-order or leasing tools you already use. Staff still handle judgments, vendors, and anything the rules mark for a person.",
    ],
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Industries", path: "/#industries" },
      { name: "Property management", path: "/industries/property-management" },
    ],
    sections: [
      {
        heading: "Three different callers, one overloaded line",
        paragraphs: [
          "A property desk hears residents, owners, and leasing prospects on the same number. Mixing those calls into one voicemail creates angry residents and lost leases. The first job is to tell the calls apart and give each a real next step.",
        ],
        bullets: [
          "Maintenance requests with the unit, the problem, and whether there is an active leak or no utilities",
          "After hours emergencies that page a person under your on-call rules",
          "Leasing questions about availability, using only facts you approve",
          "Tour or application next steps booked onto the calendar you allow",
          "Owner calls that are logged and routed, not answered with resident policy",
        ],
      },
      {
        heading: "What we would build for a property team",
        paragraphs: [
          "A voice agent is the front door for the phone. An assistant drafts resident updates and files routine requests that staff currently retype. A custom project fits when owners, residents, and staff need a portal your current system does not offer. Enablement trains the site team to treat the agent as part of the desk, including how to correct a bad work order.",
        ],
      },
      {
        heading: "Connected to work orders, leasing, and the on-call list",
        paragraphs: [
          "Property teams already have a system of record for units, work orders, and sometimes leasing. Futurix connects the agent to that system and to the phone and calendar. We do not stand up a second database of residents as the default.",
          "Emergency rules should match the on-call list you already keep. The agent does not promise a vendor visit the company would not promise.",
        ],
      },
      {
        heading: "A first version that a site team can trust",
        paragraphs: [
          "Pick one property or one call type. Maintenance intake is the usual start, because the fields are concrete. Run it where staff can see every summary. Add leasing only after the maintenance notes are clean. Owners are often a later flow, with a different script.",
        ],
      },
    ],
    faqs: [
      {
        question: "What does an AI receptionist for property management answer?",
        answer:
          "It separates maintenance, leasing, and owner calls, then logs or books the next step under your rules. Futurix builds the flow and the connection to your current system.",
      },
      {
        question: "Can it create a work order?",
        answer:
          "Yes, when the fields it collects match the work order you already use. A person can still approve orders you do not want created automatically.",
      },
      {
        question: "How are emergencies handled?",
        answer:
          "By rules you write. The agent gathers the facts and then pages or transfers when the situation matches your emergency list.",
      },
      {
        question: "Will it quote rent or availability it does not know?",
        answer:
          "No. Leasing answers come from details you approve. If the fact is not in that set, the agent takes a message instead of guessing.",
      },
      {
        question: "Is this the same setup as a real estate team?",
        answer:
          "No. Real estate is mostly buyer and seller inquiries. Property management is residents, work orders, and owners. The pages are separate because the calls are different.",
      },
    ],
    related: [
      { href: "/voice-agents", label: "Voice agents", note: "The phone layer for the desk" },
      { href: "/industries/real-estate", label: "Real estate", note: "Leasing and sales calls, separately" },
      { href: "/ai-assistants", label: "AI assistants", note: "Resident updates and filing" },
      { href: "/custom-projects", label: "Custom projects", note: "When you need a portal" },
    ],
  },
  {
    path: "/industries/insurance",
    kind: "industry",
    title: "AI Receptionist for Insurance Agencies | Futurix",
    description:
      "An AI receptionist for insurance agencies. Quote calls, certificate requests, and claim intake, written into the agency tools you already use.",
    h1: "An AI receptionist for insurance agencies",
    lede: [
      `${entity}, builds an AI receptionist for insurance agencies. The agent answers quote calls, certificate requests, and the first report of a claim while producers are with clients.`,
      "It collects the facts your service team already asks for and writes them into the systems the agency uses. It does not give coverage advice, and it does not replace a licensed person.",
    ],
    crumbs: [
      { name: "Home", path: "/" },
      { name: "Industries", path: "/#industries" },
      { name: "Insurance agencies", path: "/industries/insurance" },
    ],
    sections: [
      {
        heading: "The desk work that arrives as a phone call",
        paragraphs: [
          "An independent agency loses time on calls that are important and repetitive. A client needs a certificate. A prospect wants a quote conversation started. Someone needs to report a loss and does not know what to send. Those calls stack up behind renewals and walk-ins.",
        ],
        bullets: [
          "New quote calls that capture the line of business, the deadline, and how to reach the prospect",
          "Certificate and proof-of-coverage requests, with the holder details your team needs",
          "First notice of a loss: what happened, when, and the contact, without advising on coverage",
          "Billing and policy-change messages that are logged for a service person",
          "After hours capture so a night claim report is not a voicemail on Monday",
        ],
      },
      {
        heading: "How the four offerings show up in an agency",
        paragraphs: [
          "A voice agent is the receptionist on the service line. An assistant drafts the certificate cover note, sorts inbound email, or prepares a renewal checklist from documents you already store. A custom project fits when producers, service, and clients need a portal or a queue the agency system does not show cleanly.",
          "Enablement matters here because staff must know what the agent is allowed to say. Training includes the line between intake and advice. Futurix will not design an agent that tells a client they are covered.",
        ],
      },
      {
        heading: "Connected to the agency system, the inbox, and the calendar",
        paragraphs: [
          "Agencies already run a management system, an inbox, and a calendar. The agent and the assistant connect to those. Futurix does not ask you to leave the system that holds your policies as the price of answering the phone.",
          "We also do not name or prefer any carrier. The workflow is the agency's. The companies that issue policies stay out of the script except as facts the caller already stated.",
        ],
      },
      {
        heading: "A first version that stays inside the rules",
        paragraphs: [
          "Start with certificates or new-quote intake, not with claims advice. Write the exact fields. Decide which calls transfer to a licensed person immediately. Review every summary for a short period. Add a second call type only when the first one is clean.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is an AI receptionist for an insurance agency?",
        answer:
          "It answers routine agency calls, collects the details your service team needs, and logs them in the tools you already use. It is built by Futurix around your script.",
      },
      {
        question: "Can it tell a client whether a claim is covered?",
        answer:
          "No. It can take the first report of a loss. Coverage questions go to a licensed person. That limit is part of the design.",
      },
      {
        question: "Can it start a certificate request?",
        answer:
          "Yes. It can collect the holder, the address, and the deadline, then hand a complete request to the person who issues the certificate.",
      },
      {
        question: "Do you work for a specific insurance company?",
        answer:
          "No. The client is the agency. Futurix does not build this as a program for any one carrier, and we do not put carrier names in the product story.",
      },
      {
        question: "What if the caller asks for their producer?",
        answer:
          "The agent transfers or takes a message, based on the rules you set for that person. It does not pretend to be the producer.",
      },
    ],
    related: [
      { href: "/voice-agents", label: "Voice agents", note: "The service line" },
      { href: "/ai-assistants", label: "AI assistants", note: "Certificates, email, and checklists" },
      { href: "/ai-enablement", label: "AI enablement", note: "Rules and staff training" },
      { href: "/about", label: "About Futurix", note: "Who you would be hiring" },
    ],
  },
];

export function getIndustry(slug: string) {
  return industryPages.find((page) => page.path === `/industries/${slug}`);
}
