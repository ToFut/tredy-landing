export const industries = [
  "roofing",
  "home-services",
  "real-estate",
  "property",
  "insurance",
  "other",
] as const;

export type DemoIndustry = (typeof industries)[number];

export type CallLine = { speaker: "caller" | "agent"; text: string };

export type CallSummary = {
  caller: string;
  need: string;
  area: string;
  urgency: string;
  booked: string;
  next: string;
};

export type CallScript = {
  lines: CallLine[];
  summary: CallSummary;
  source: "template" | "llm";
};

const booked = "Thu 10:00 AM";

export const industryTemplates: Record<DemoIndustry, Omit<CallScript, "source">> = {
  roofing: {
    lines: [
      { speaker: "caller", text: "Hi, I have a leak in the roof after the storm." },
      { speaker: "agent", text: "I can help. Is water coming in right now, and can you share the area?" },
      { speaker: "caller", text: "It is dripping inside. I can text the address." },
      {
        speaker: "agent",
        text: "You are booked for Thursday at 10 AM for a roof estimate. I will send a short summary to the team.",
      },
    ],
    summary: {
      caller: "Caller",
      need: "Roof leak after a storm",
      area: "Address to be texted",
      urgency: "Active drip",
      booked,
      next: "Estimator visit Thursday at 10 AM",
    },
  },
  "home-services": {
    lines: [
      { speaker: "caller", text: "Our heat has been out since this morning." },
      { speaker: "agent", text: "I am sorry. Is anyone without heat overnight, and what is the area?" },
      { speaker: "caller", text: "We need it today if you can. I can share the address." },
      {
        speaker: "agent",
        text: "You are booked for Thursday at 10 AM for a service visit. A summary is going to the office now.",
      },
    ],
    summary: {
      caller: "Caller",
      need: "No heat",
      area: "Address to collect",
      urgency: "Same day if possible",
      booked,
      next: "Technician visit Thursday at 10 AM",
    },
  },
  "real-estate": {
    lines: [
      { speaker: "caller", text: "Can someone show me the house I saw online?" },
      { speaker: "agent", text: "Yes. Are you hoping to buy or just take a look, and what day works?" },
      { speaker: "caller", text: "Just a look. Thursday morning is good." },
      {
        speaker: "agent",
        text: "I requested Thursday at 10 AM for a showing. The agent will confirm, and you will get a summary.",
      },
    ],
    summary: {
      caller: "Caller",
      need: "Showing request",
      area: "Listing they named",
      urgency: "This week",
      booked,
      next: "Agent confirms the showing",
    },
  },
  property: {
    lines: [
      { speaker: "caller", text: "The sink is leaking in my unit." },
      { speaker: "agent", text: "I can log that. Is water spreading, and which unit is it?" },
      { speaker: "caller", text: "It is a drip under the sink. Unit 4." },
      {
        speaker: "agent",
        text: "You are on the list for Thursday at 10 AM. Maintenance will get the summary.",
      },
    ],
    summary: {
      caller: "Caller",
      need: "Leaking sink",
      area: "Unit 4",
      urgency: "Drip, not a flood",
      booked,
      next: "Maintenance visit Thursday at 10 AM",
    },
  },
  insurance: {
    lines: [
      { speaker: "caller", text: "I need a certificate for a job site." },
      { speaker: "agent", text: "I can start that. Who should receive it, and when do you need it?" },
      { speaker: "caller", text: "The site office, by Thursday. I can spell the name." },
      {
        speaker: "agent",
        text: "I logged the certificate request for Thursday at 10 AM. A licensed person will issue it. I cannot speak to coverage.",
      },
    ],
    summary: {
      caller: "Caller",
      need: "Certificate request",
      area: "Job site, name to confirm",
      urgency: "Needed by Thursday",
      booked,
      next: "Service team issues the certificate",
    },
  },
  other: {
    lines: [
      { speaker: "caller", text: "Hi, I am calling about a new request." },
      { speaker: "agent", text: "Happy to help. What do you need, and how soon?" },
      { speaker: "caller", text: "A first visit this week. I can share the address." },
      {
        speaker: "agent",
        text: "You are booked for Thursday at 10 AM. I will send the team a short summary.",
      },
    ],
    summary: {
      caller: "Caller",
      need: "New request",
      area: "Address to collect",
      urgency: "This week",
      booked,
      next: "First visit Thursday at 10 AM",
    },
  },
};

export function siteHint(title: string, description: string, businessName: string) {
  const name = businessName.trim().toLowerCase();
  const parts = title
    .split(/\s*(?:\|| - )\s*/)
    .map((part) => part.trim())
    .filter((part) => part && part.toLowerCase() !== name);
  const sentence = description.split(/(?<=\.)\s/)[0]?.trim() || "";
  const hint = [parts[0], sentence].filter(Boolean).join(". ");
  return hint.replace(/\s+/g, " ").slice(0, 140);
}

export function templateFor(
  industry: string,
  businessName: string,
  blurb = "",
): CallScript {
  const key = (industries as readonly string[]).includes(industry)
    ? (industry as DemoIndustry)
    : "other";
  const base = industryTemplates[key];
  const name = businessName.trim();
  const note = blurb.trim();
  const lines = base.lines.map((line) => {
    if (line.speaker !== "agent") return { ...line };
    let text = line.text;
    if (name) {
      text = text
        .replace(/^I can help\b/, `${name} can help`)
        .replace(/^I am sorry\./, `${name} here.`)
        .replace(/^Yes\./, `${name} here.`)
        .replace(/^I can start that\./, `${name} can start that.`)
        .replace(/^I can log that\./, `${name} can log that.`)
        .replace(/^Happy to help\./, `${name} can help.`)
        .replace("You are booked", `You are booked with ${name}`)
        .replace("I requested", `${name} requested`)
        .replace("I logged", `${name} logged`);
    }
    if (note && text.includes("summary")) {
      text = `${text} From the site: ${note}.`;
    }
    return { ...line, text };
  });
  return {
    lines,
    summary: {
      ...base.summary,
      need: name ? `${base.summary.need} for ${name}` : base.summary.need,
      next: note ? `${base.summary.next}. Site note: ${note}` : base.summary.next,
    },
    source: "template",
  };
}
