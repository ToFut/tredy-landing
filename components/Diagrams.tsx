export function HeroDiagram() {
  const tools = ["CRM", "Files", "Inbox", "Booking"];

  return (
    <svg
      className="hero-diagram"
      viewBox="0 0 640 540"
      role="img"
      aria-labelledby="hero-diagram-title"
    >
      <title id="hero-diagram-title">
        A first version connected to existing tools, with the team beside it
      </title>
      <rect width="640" height="540" fill="#101412" />
      <path
        d="M28 28 H72 M28 28 V72"
        fill="none"
        stroke="#c4a36a"
        strokeWidth="1.4"
      />
      <path
        d="M612 28 H568 M612 28 V72"
        fill="none"
        stroke="#c4a36a"
        strokeWidth="1.4"
      />
      <path
        d="M28 512 H72 M28 512 V468"
        fill="none"
        stroke="rgba(196,163,106,0.45)"
        strokeWidth="1.2"
      />
      <path
        d="M612 512 H568 M612 512 V468"
        fill="none"
        stroke="rgba(196,163,106,0.45)"
        strokeWidth="1.2"
      />
      {Array.from({ length: 20 }).map((_, index) => {
        const column = index % 5;
        const row = Math.floor(index / 5);
        return (
          <circle
            key={index}
            cx={58 + column * 16}
            cy={78 + row * 16}
            r="1.7"
            fill="rgba(243,239,230,0.5)"
          />
        );
      })}
      <circle
        cx="518"
        cy="128"
        r="74"
        fill="none"
        stroke="rgba(243,239,230,0.16)"
        strokeWidth="1"
      />
      <circle
        cx="518"
        cy="128"
        r="50"
        fill="none"
        stroke="#c4a36a"
        strokeWidth="1.4"
        strokeDasharray="230 120"
        transform="rotate(-40 518 128)"
      />
      <circle
        cx="518"
        cy="128"
        r="28"
        fill="none"
        stroke="rgba(243,239,230,0.4)"
        strokeWidth="1"
      />
      <rect
        x="52"
        y="214"
        width="372"
        height="156"
        fill="#1a4034"
        stroke="rgba(196,163,106,0.7)"
      />
      <text
        x="74"
        y="250"
        fill="#ead9b4"
        fontSize="13"
        letterSpacing="2.6"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        FIRST VERSION
      </text>
      <rect x="74" y="274" width="220" height="7" rx="1" fill="rgba(243,239,230,0.32)" />
      <rect x="74" y="298" width="168" height="7" rx="1" fill="rgba(243,239,230,0.18)" />
      <line
        x1="424"
        y1="292"
        x2="468"
        y2="292"
        stroke="#c4a36a"
        strokeWidth="1.2"
      />
      <circle cx="524" cy="292" r="50" fill="#c6a56e" />
      <text
        x="524"
        y="298"
        textAnchor="middle"
        fill="#1c1914"
        fontSize="16"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        Team
      </text>
      <line
        x1="238"
        y1="370"
        x2="238"
        y2="430"
        stroke="rgba(243,239,230,0.4)"
        strokeWidth="1"
      />
      <rect x="36" y="430" width="568" height="78" fill="#0c0f0d" stroke="rgba(243,239,230,0.12)" />
      <text
        x="56"
        y="458"
        fill="rgba(243,239,230,0.55)"
        fontSize="11"
        letterSpacing="2.2"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        EXISTING TOOLS
      </text>
      {tools.map((tool, index) => (
        <g key={tool} transform={`translate(${56 + index * 112}, 472)`}>
          <rect
            width="96"
            height="24"
            rx="12"
            fill="none"
            stroke="rgba(196,163,106,0.55)"
          />
          <text
            x="48"
            y="16"
            textAnchor="middle"
            fill="#f3efe6"
            fontSize="12"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {tool}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function OfferingDiagram({ id }: { id: string }) {
  return (
    <svg className="offering-diagram" viewBox="0 0 220 160" aria-hidden="true">
      <rect width="220" height="160" fill="#101412" />
      {id === "voice-agents" && <VoiceMarks />}
      {id === "custom-projects" && <ProjectMarks />}
      {id === "ai-assistants" && <AssistantMarks />}
      {id === "ai-enablement" && <EnableMarks />}
    </svg>
  );
}

function VoiceMarks() {
  return (
    <g fill="none" stroke="#c4a36a" strokeWidth="1.2">
      <rect x="28" y="28" width="70" height="104" rx="18" stroke="rgba(243,239,230,0.45)" />
      <circle cx="63" cy="112" r="6" />
      <path d="M98 80 H132" />
      <circle cx="164" cy="80" r="28" fill="#1a4034" stroke="#c4a36a" />
      <text
        x="164"
        y="84"
        textAnchor="middle"
        fill="#f3efe6"
        stroke="none"
        fontSize="11"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        CRM
      </text>
    </g>
  );
}

function ProjectMarks() {
  return (
    <g>
      <rect x="36" y="28" width="148" height="36" fill="#1a4034" stroke="rgba(196,163,106,0.7)" />
      <rect x="48" y="78" width="92" height="54" fill="none" stroke="rgba(243,239,230,0.4)" />
      <rect x="150" y="78" width="34" height="54" fill="#c6a56e" />
    </g>
  );
}

function AssistantMarks() {
  return (
    <g>
      <rect x="24" y="36" width="110" height="28" rx="6" fill="#1a4034" />
      <rect x="78" y="76" width="118" height="28" rx="6" fill="none" stroke="#c4a36a" />
      <rect x="24" y="116" width="86" height="14" fill="rgba(243,239,230,0.25)" />
    </g>
  );
}

function EnableMarks() {
  return (
    <g fill="none" stroke="#c4a36a" strokeWidth="1.2">
      {[0, 1, 2, 3].map((step) => (
        <g key={step} transform={`translate(${28 + step * 46}, 58)`}>
          <circle cx="16" cy="16" r="16" fill={step === 1 ? "#1a4034" : "none"} />
          <text
            x="16"
            y="21"
            textAnchor="middle"
            fill="#f3efe6"
            stroke="none"
            fontSize="12"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {step + 1}
          </text>
        </g>
      ))}
    </g>
  );
}

export function WorkArt({ variant }: { variant: string }) {
  return (
    <svg className="work-art" viewBox="0 0 640 280" aria-hidden="true">
      <rect width="640" height="280" fill="#101412" />
      {variant === "exchange" && (
        <g>
          <path d="M40 220 L200 80 H440 L600 220" fill="none" stroke="#c4a36a" strokeWidth="1.4" />
          <rect x="230" y="120" width="180" height="90" fill="#1a4034" />
        </g>
      )}
      {variant === "stay" && (
        <g>
          <rect x="70" y="150" width="160" height="70" fill="#1a4034" />
          <rect x="250" y="110" width="140" height="110" fill="none" stroke="#c4a36a" />
          <rect x="420" y="160" width="140" height="60" fill="#c6a56e" />
        </g>
      )}
      {variant === "roof" && (
        <g>
          <path d="M80 190 L320 70 L560 190" fill="none" stroke="#c4a36a" strokeWidth="1.5" />
          <rect x="180" y="190" width="280" height="8" fill="rgba(243,239,230,0.35)" />
        </g>
      )}
      {variant === "shop" && (
        <g>
          <rect x="80" y="70" width="200" height="140" fill="#1a4034" />
          <rect x="310" y="110" width="240" height="100" fill="none" stroke="rgba(243,239,230,0.45)" />
        </g>
      )}
      {variant === "product" && (
        <g>
          <circle cx="200" cy="140" r="46" fill="none" stroke="#c4a36a" />
          <circle cx="360" cy="140" r="18" fill="#c6a56e" />
          <circle cx="470" cy="100" r="8" fill="rgba(243,239,230,0.7)" />
          <path d="M246 140 H342 M378 128 L450 104" stroke="rgba(243,239,230,0.45)" />
        </g>
      )}
      {variant === "signal" && (
        <g>
          <rect x="90" y="80" width="280" height="120" fill="none" stroke="rgba(196,163,106,0.8)" />
          <rect x="114" y="104" width="160" height="12" fill="rgba(243,239,230,0.3)" />
          <rect x="114" y="132" width="110" height="12" fill="rgba(243,239,230,0.16)" />
          <circle cx="470" cy="140" r="36" fill="#1a4034" stroke="#c4a36a" />
        </g>
      )}
    </svg>
  );
}
