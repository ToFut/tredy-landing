export type ReceptionistTier = {
  id: string;
  name: string;
  badge?: string;
  bestFor: string;
  setup: string;
  monthly: string;
  minutes: string;
  summary: string;
  includes: string[];
  timeline: string;
  featured?: boolean;
};

export const pricingHeadline = "AI receptionist packages for local businesses";

export const pricingIntro =
  "Missed calls become missed jobs. We build a voice AI receptionist that answers 24/7, books into your calendar, and texts your team a short summary. Hear a live demo, then pick a package. Setup is done for you. Month to month after go-live.";

export const receptionistTiers: ReceptionistTier[] = [
  {
    id: "overflow",
    name: "Overflow Desk",
    bestFor: "Solo owners and small offices that miss lunch and after hours calls.",
    setup: "$1,495 setup",
    monthly: "$349/mo",
    minutes: "300 minutes included",
    summary:
      "Covers lunch, after hours, and busy lines. Answers FAQs, takes messages, can transfer to one on-call number, and sends you a text or email summary. Books into Google Calendar or one booking tool.",
    includes: [
      "Custom voice and scripts for FAQs, hours, and services",
      "Answer, qualify, and take a message",
      "Optional live transfer to one on-call number",
      "SMS or email call summary to the owner",
      "Calendar booking for 1 location",
      "2 rounds of script tuning in the first 30 days",
    ],
    timeline: "Live in about 5 to 7 business days after we get access.",
  },
  {
    id: "booked",
    name: "Booked Front Desk",
    badge: "Most popular",
    bestFor: "Dental, HVAC, med spa, and home service shops that want every call to book or escalate.",
    setup: "$2,495 setup",
    monthly: "$497/mo",
    minutes: "500 minutes included",
    summary:
      "Our default for dental, HVAC, med spa, and home services. Everything in Overflow Desk, plus booking rules, missed-call text-back, one CRM or booking stack connection, and monthly tuning for the first three months.",
    includes: [
      "Everything in Overflow Desk",
      "Booking rules for services and staff",
      "One CRM or booking stack connection",
      "Missed-call text-back",
      "After hours and overflow modes",
      "A 30 minute tuning call each month for the first 3 months",
    ],
    timeline: "Live in about 7 to 10 business days after we get access.",
    featured: true,
  },
  {
    id: "multi",
    name: "Multi-location Ops",
    bestFor: "Multi-location operators and agencies that want one receptionist under their brand.",
    setup: "From $4,995 setup",
    monthly: "From $897/mo",
    minutes: "1,000 pooled minutes",
    summary:
      "Shared knowledge base, weekly summaries, and automation hooks into GoHighLevel, Make, Zapier, or n8n. Extra locations are $1,495 setup and $349/mo each.",
    includes: [
      "Everything in Booked Front Desk",
      "Shared knowledge base with location overrides",
      "Weekly summaries of calls, transcripts, and booked appointments",
      "Lead routing with GoHighLevel, Make, Zapier, or n8n",
      "White label option for agencies. We stay the delivery team.",
      "1,000 voice minutes pooled across locations",
    ],
    timeline: "First location in about 10 to 15 business days. Extra locations from there.",
  },
];

export const pricingAddons = [
  "Number porting or SIP trunk setup",
  "Extra CRM or practice management connectors",
  "Outbound reactivation or review request flows",
  "A custom web app or booking site",
  "Automation retainers for Make, Zapier, n8n, or GoHighLevel",
];

export const pricingNotes = [
  "Overage minutes are billed at cost plus a small margin, confirmed before go-live. Telephony and voice platform fees may apply.",
  "Setup is 50% to start and 50% at acceptance. Monthly billing starts at go-live. Cancel with 30 days notice after the first 60 days.",
  "We deliver the scoped system. We do not guarantee a number of bookings, revenue, or call volume. Results depend on your lead volume and how your team handles handoffs.",
  "You provide phone access or forwarding, approved FAQ copy, calendar or CRM credentials, and escalation contacts.",
  "Past work you can ask about: Line Properties and Peak Exchange.",
];
