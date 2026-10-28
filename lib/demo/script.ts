import { siteHint, templateFor, type CallScript, type DemoIndustry, industries } from "@/lib/demo/templates";

export function asIndustry(value: string): DemoIndustry {
  return (industries as readonly string[]).includes(value) ? (value as DemoIndustry) : "other";
}

export async function buildScript(input: {
  industry: string;
  businessName: string;
  websiteText?: string;
  siteTitle?: string;
  siteDescription?: string;
}): Promise<CallScript> {
  const hint = siteHint(input.siteTitle || "", input.siteDescription || "", input.businessName);
  const fallback = templateFor(input.industry, input.businessName, hint);
  const generated = await askModel({ ...input, siteHint: hint }).catch(() => null);
  if (!generated) return fallback;
  const parsed = parseScript(generated);
  return parsed ?? fallback;
}

async function askModel(input: {
  industry: string;
  businessName: string;
  websiteText?: string;
  siteTitle?: string;
  siteDescription?: string;
  siteHint?: string;
}) {
  const prompt = [
    "Write a short receptionist phone call as JSON.",
    "The caller asks for help. The AI receptionist qualifies, books Thursday at 10 AM, and confirms.",
    "Use the business name. Use Caller, not a made up full name. No statistics, no reviews, no insurer names, no em dashes or en dashes.",
    `Industry: ${input.industry}. Business name: ${input.businessName || "the business"}.`,
    input.siteTitle ? `Website title: ${input.siteTitle}` : "",
    input.siteDescription ? `Website description: ${input.siteDescription}` : "",
    input.siteHint ? `Short site note: ${input.siteHint}` : "",
    input.websiteText ? `Website text: ${input.websiteText}` : "No website text.",
    'Return only JSON: {"lines":[{"speaker":"caller"|"agent","text":"..."}],"summary":{"caller":"Caller","need":"","area":"","urgency":"","booked":"Thu 10:00 AM","next":""}}',
    "Use 4 lines.",
  ].join("\n");

  if (process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN) {
    const { generateText } = await import("ai");
    const model = process.env.AI_GATEWAY_MODEL || "openai/gpt-4.1-mini";
    const { text } = await generateText({ model, prompt });
    return text;
  }
  if (process.env.OPENAI_API_KEY) {
    const { generateText } = await import("ai");
    const { createOpenAI } = await import("@ai-sdk/openai");
    const openai = createOpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const { text } = await generateText({ model: openai("gpt-4o-mini"), prompt });
    return text;
  }
  return null;
}

function parseScript(raw: string): CallScript | null {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end < start) return null;
  let data: unknown;
  try {
    data = JSON.parse(raw.slice(start, end + 1));
  } catch {
    return null;
  }
  if (!data || typeof data !== "object") return null;
  const record = data as {
    lines?: { speaker?: string; text?: string }[];
    summary?: Record<string, string>;
  };
  if (!Array.isArray(record.lines) || record.lines.length < 2) return null;
  const lines = record.lines.slice(0, 6).map((line) => ({
    speaker: line.speaker === "agent" ? ("agent" as const) : ("caller" as const),
    text: String(line.text || "").replace(/[—–]/g, ",").slice(0, 280),
  }));
  if (lines.some((line) => !line.text)) return null;
  const summary = record.summary || {};
  return {
    lines,
    summary: {
      caller: "Caller",
      need: String(summary.need || "Request").slice(0, 120),
      area: String(summary.area || "Area to collect").slice(0, 120),
      urgency: String(summary.urgency || "This week").slice(0, 80),
      booked: String(summary.booked || "Thu 10:00 AM").slice(0, 80),
      next: String(summary.next || "The team follows up").slice(0, 160),
    },
    source: "llm",
  };
}
