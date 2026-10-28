export type IndustryStory = {
  problems: string[];
  script: { speaker: "Caller" | "Agent"; text: string }[];
  summary: { side: "in" | "out"; text: string; time: string }[];
  summaryName: string;
  tools: string[];
};

export const industryStories: Record<string, IndustryStory> = {
  "/industries/roofing": {
    problems: [
      "Storm calls arrive while the crew is on a roof.",
      "Estimate requests sit in voicemail until the next morning.",
      "A coordinator cannot answer a new lead and a status call at the same time.",
    ],
    script: [
      { speaker: "Caller", text: "The roof is leaking after the storm on Oak Street." },
      { speaker: "Agent", text: "I can book an inspection. Thursday at 10 or Friday at 2. Which works?" },
      { speaker: "Caller", text: "Thursday at 10." },
      { speaker: "Agent", text: "Booked. You will get a text confirmation from Harbor Roofing." },
    ],
    summaryName: "Harbor Roofing",
    summary: [
      { side: "in", text: "Alex called about a leak on Oak Street.", time: "10:41" },
      { side: "in", text: "Inspection booked Thursday at 10 AM.", time: "10:41" },
      { side: "out", text: "Got it. I will confirm the crew.", time: "10:42" },
    ],
    tools: ["JobNimbus", "ServiceTitan", "Jobber", "Google Calendar"],
  },
  "/industries/home-services": {
    problems: [
      "No heat and no cool calls come in while every technician is on a job.",
      "Plumbing and electrical emergencies share one voicemail box with tune-up requests.",
      "A new install lead and a status call are not the same conversation.",
    ],
    script: [
      { speaker: "Caller", text: "The heat is out on Pine Avenue. Can someone come today?" },
      { speaker: "Agent", text: "I can hold a same day window. Today at 2 or tomorrow at 8. Which works?" },
      { speaker: "Caller", text: "Today at 2." },
      { speaker: "Agent", text: "Booked for Northline HVAC. A text will confirm the arrival window." },
    ],
    summaryName: "Northline HVAC",
    summary: [
      { side: "in", text: "Sam called. No heat at Pine Avenue.", time: "7:12" },
      { side: "in", text: "Same day visit booked today at 2 PM.", time: "7:12" },
      { side: "out", text: "Send the on call tech.", time: "7:13" },
    ],
    tools: ["ServiceTitan", "Housecall Pro", "Jobber", "Google Calendar"],
  },
  "/industries/real-estate": {
    problems: [
      "Showing requests arrive while the agent is in a house with another buyer.",
      "Website leads wait overnight and call the next brokerage.",
      "A listing question and a new buyer lead need different next steps.",
    ],
    script: [
      { speaker: "Caller", text: "Is the house on Oak still available for a look this week?" },
      { speaker: "Agent", text: "I can request a showing. Thursday at 10 or Friday at 2. Which works?" },
      { speaker: "Caller", text: "Thursday at 10." },
      { speaker: "Agent", text: "Requested. Harbor Homes will text to confirm." },
    ],
    summaryName: "Harbor Homes",
    summary: [
      { side: "in", text: "Alex asked to see the Oak Street listing.", time: "4:05" },
      { side: "in", text: "Showing requested Thursday at 10 AM.", time: "4:05" },
      { side: "out", text: "I will confirm with the listing side.", time: "4:06" },
    ],
    tools: ["Follow Up Boss", "Google Calendar"],
  },
  "/industries/property-management": {
    problems: [
      "Maintenance calls pile up while the manager is between buildings.",
      "After hours leaks become morning voicemails.",
      "A leasing question and a repair request should not share one generic reply.",
    ],
    script: [
      { speaker: "Caller", text: "The sink in unit 4 is dripping under the cabinet." },
      { speaker: "Agent", text: "I can log that and set maintenance for Thursday at 10. Does that work?" },
      { speaker: "Caller", text: "Yes, Thursday at 10." },
      { speaker: "Agent", text: "Logged for Harbor Property. You will get a text confirmation." },
    ],
    summaryName: "Harbor Property",
    summary: [
      { side: "in", text: "Resident in unit 4 reported a drip under the sink.", time: "8:20" },
      { side: "in", text: "Maintenance set for Thursday at 10 AM.", time: "8:20" },
      { side: "out", text: "Assign it to the Thursday route.", time: "8:21" },
    ],
    tools: ["AppFolio", "Buildium", "Google Calendar"],
  },
};
