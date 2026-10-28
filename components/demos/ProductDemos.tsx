export function CallDemo({
  variant = "roofing",
}: {
  variant?: "roofing" | "hvac" | "property" | "insurance" | "real-estate";
}) {
  const script = {
    roofing: {
      caller: "Leak in the roof after the storm.",
      agent: "I can book an estimate.",
      chip: "Booked: Thu 10:00 AM, estimate",
      crm: "Caller · Roof estimate · Thu 10:00 AM",
    },
    hvac: {
      caller: "No heat since this morning.",
      agent: "I can book a visit for Thursday.",
      chip: "Booked: Thu 10:00 AM, visit",
      crm: "Caller · Service visit · Thu 10:00 AM",
    },
    property: {
      caller: "The sink is leaking in unit 4.",
      agent: "I can log a maintenance request.",
      chip: "Logged: maintenance, unit 4",
      crm: "Caller · Maintenance · Unit 4",
    },
    insurance: {
      caller: "I need a certificate for a job site.",
      agent: "I can collect the holder and the deadline.",
      chip: "Logged: certificate request",
      crm: "Caller · Certificate · Service queue",
    },
    "real-estate": {
      caller: "Can I see the house on Thursday?",
      agent: "I can request that showing.",
      chip: "Requested: Thu 10:00 AM, showing",
      crm: "Caller · Showing request · Thu 10:00 AM",
    },
  }[variant];

  return (
    <div className="demo call-demo" aria-hidden="true">
      <div className="demo-top">
        <span className="live-dot" />
        Live call
        <span className="wave" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, index) => (
            <i key={index} style={{ animationDelay: `${index * 0.08}s` }} />
          ))}
        </span>
      </div>
      <p className="demo-line line-a">
        <b>Caller</b>
        <span>{script.caller}</span>
      </p>
      <p className="demo-line line-b">
        <b>Futurix</b>
        <span>{script.agent}</span>
      </p>
      <p className="booked-chip">{script.chip}</p>
      <p className="crm-row">
        <span>CRM</span>
        {script.crm}
      </p>
    </div>
  );
}

export function AssistantDemo() {
  return (
    <div className="demo chat-demo" aria-hidden="true">
      <p className="bubble in">Can you follow up on the open estimate?</p>
      <p className="bubble out">Draft ready: following up on your estimate. A person can send it.</p>
      <p className="booked-chip">Routed: estimate follow-up</p>
    </div>
  );
}

export function DashboardDemo() {
  return (
    <div className="demo dash-demo" aria-hidden="true">
      <div className="dash-top">
        <span>Portal</span>
        <span>Jobs</span>
        <span>Inbox</span>
      </div>
      <div className="bars">
        <i />
        <i />
        <i />
        <i />
        <i />
      </div>
      <p className="crm-row">
        <span>Today</span>
        Items waiting for review
      </p>
    </div>
  );
}

export function EnablementDemo() {
  const steps = ["Assess", "Plan", "Train", "Roll out"];
  return (
    <ol className="demo timeline-demo">
      {steps.map((step, index) => (
        <li key={step} style={{ animationDelay: `${index * 0.8}s` }}>
          <span>0{index + 1}</span>
          {step}
        </li>
      ))}
    </ol>
  );
}

export function DemoFor({ path }: { path: string }) {
  if (path === "/ai-assistants" || path === "/industries/real-estate") return <AssistantDemo />;
  if (path === "/custom-projects") return <DashboardDemo />;
  if (path === "/ai-enablement") return <EnablementDemo />;
  if (path === "/industries/home-services") return <CallDemo variant="hvac" />;
  if (path === "/industries/property-management") return <CallDemo variant="property" />;
  if (path === "/industries/insurance") return <CallDemo variant="insurance" />;
  if (path === "/industries/real-estate") return <AssistantDemo />;
  return <CallDemo variant="roofing" />;
}
