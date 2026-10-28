import { site } from "@/lib/content";

export type GoalId = "phone" | "leads" | "book" | "voice" | "inbox" | "train" | "custom";

export type BusinessId =
  | "roofing"
  | "home-services"
  | "real-estate"
  | "property"
  | "insurance"
  | "other";

export const goals: { id: GoalId; label: string }[] = [
  { id: "phone", label: "Answer my phone 24/7" },
  { id: "leads", label: "Follow up with my leads" },
  { id: "book", label: "Book appointments for me" },
  { id: "voice", label: "Set up an AI voice that sounds like my business" },
  { id: "inbox", label: "Handle my inbox and FAQs" },
  { id: "train", label: "Train my team on AI" },
  { id: "custom", label: "Something custom" },
];

export const businesses: { id: BusinessId; label: string }[] = [
  { id: "roofing", label: "Roofing" },
  { id: "home-services", label: "HVAC/Home services" },
  { id: "real-estate", label: "Real estate" },
  { id: "property", label: "Property management" },
  { id: "insurance", label: "Insurance agency" },
  { id: "other", label: "Other" },
];

export const teamSizes = ["Just me", "2 to 10", "11 to 50", "More than 50"] as const;

export const callTimes = ["Morning", "Afternoon", "Evening"] as const;

export const packages = [
  {
    id: "receptionist",
    title: "AI Receptionist",
    line: "Answers calls, qualifies, books, and texts you a summary.",
    bullets: ["Answers every call", "Qualifies and books", "Texts you a summary"],
    goals: ["phone", "book"] as GoalId[],
  },
  {
    id: "follow-up",
    title: "Lead Follow-up",
    line: "Calls or texts new leads and logs them in your CRM.",
    bullets: ["Reaches new leads", "Logs them in your CRM", "Keeps the first reply moving"],
    goals: ["leads"] as GoalId[],
  },
  {
    id: "assistant",
    title: "AI Assistant",
    line: "Inbox, FAQs, and intake, with a person still able to review.",
    bullets: ["Handles inbox and FAQs", "Takes intake", "Drafts replies for review"],
    goals: ["inbox"] as GoalId[],
  },
  {
    id: "sprint",
    title: "AI Enablement Sprint",
    line: "Assessment, training, and a rollout your team can run.",
    bullets: ["Readiness assessment", "Team training", "A rollout plan"],
    goals: ["train"] as GoalId[],
  },
];

export function presetFor(path: string): { goals: GoalId[]; business?: BusinessId } {
  switch (path) {
    case "/voice-agents":
      return { goals: ["phone", "book"] };
    case "/ai-assistants":
      return { goals: ["inbox", "leads"] };
    case "/custom-projects":
      return { goals: ["custom"] };
    case "/ai-enablement":
      return { goals: ["train"] };
    case "/industries/roofing":
      return { goals: ["phone", "book"], business: "roofing" };
    case "/industries/home-services":
      return { goals: ["phone", "book"], business: "home-services" };
    case "/industries/real-estate":
      return { goals: ["leads", "book"], business: "real-estate" };
    case "/industries/property-management":
      return { goals: ["phone", "inbox"], business: "property" };
    case "/industries/insurance":
      return { goals: ["phone", "inbox"], business: "insurance" };
    default:
      return { goals: [] };
  }
}

export function startHref(goalIds: GoalId[], business?: BusinessId) {
  const params = new URLSearchParams();
  if (goalIds.length) params.set("goals", goalIds.join(","));
  if (business) params.set("business", business);
  const query = params.toString();
  return query ? `/get-started?${query}` : "/get-started";
}

export function studioMailto(details: Record<string, string>) {
  const lines = Object.entries(details).map(([key, value]) => `${key}: ${value}`);
  const href = `mailto:${site.contactEmail}?subject=${encodeURIComponent("Setup plan")}&body=${encodeURIComponent(lines.join("\n"))}`;
  return href;
}
