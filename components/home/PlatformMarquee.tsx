import {
  siClaude,
  siCursor,
  siElevenlabs,
  siGooglegemini,
  siMake,
  siN8n,
  siSupabase,
  siVercel,
  siZapier,
} from "simple-icons";

type Mark = { name: string; path?: string; hex: string };

const marks: Mark[] = [
  { name: "Grok", hex: "#1d1d1f" },
  { name: "Claude", path: siClaude.path, hex: `#${siClaude.hex}` },
  { name: "OpenAI", hex: "#10a37f" },
  { name: "ChatGPT", hex: "#10a37f" },
  { name: "Gemini", path: siGooglegemini.path, hex: `#${siGooglegemini.hex}` },
  { name: "ElevenLabs", path: siElevenlabs.path, hex: "#1d1d1f" },
  { name: "Cursor", path: siCursor.path, hex: "#1d1d1f" },
  { name: "Codex", hex: "#10a37f" },
  { name: "n8n", path: siN8n.path, hex: `#${siN8n.hex}` },
  { name: "Make", path: siMake.path, hex: `#${siMake.hex}` },
  { name: "Zapier", path: siZapier.path, hex: `#${siZapier.hex}` },
  { name: "Twilio", hex: "#f22f46" },
  { name: "GoHighLevel", hex: "#f6f3ec" },
  { name: "Google Calendar", hex: "#1a73e8" },
  { name: "Supabase", path: siSupabase.path, hex: `#${siSupabase.hex}` },
  { name: "Vercel", path: siVercel.path, hex: "#1d1d1f" },
  { name: "Copilot", hex: "#0078d4" },
];

function Logo({ mark }: { mark: Mark }) {
  return (
    <span className="brand-logo" style={{ ["--brand" as string]: mark.hex }}>
      {mark.path ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={mark.path} fill="currentColor" />
        </svg>
      ) : null}
      <span>{mark.name}</span>
    </span>
  );
}

export function PlatformMarquee() {
  const row = [...marks, ...marks];
  return (
    <section className="brand-marquee" aria-label="The AI we support and enable">
      <p>The AI we support and enable</p>
      <div className="brand-viewport">
        <div className="brand-track">
          {row.map((mark, index) => (
            <Logo key={`${mark.name}-${index}`} mark={mark} />
          ))}
        </div>
      </div>
    </section>
  );
}
