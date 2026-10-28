"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { AppWindow, Inbox, Phone, Sparkles } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { BookLink } from "@/components/ui/Actions";
import { track } from "@/lib/track";
import { IphoneCall, OpsDashboard, RolloutBoard, TeamThread, WhatsAppThread } from "@/components/visuals/Screens";
import type { BusinessId } from "@/lib/start";
import type { CallLine, CallSummary } from "@/lib/demo/templates";

const tabs = [
  { id: "voice", label: "Voice Agent", title: "Hear your business answer the phone", icon: Phone },
  { id: "assistant", label: "AI Assistant", title: "Watch AI handle your inbox", icon: Inbox },
  { id: "projects", label: "Custom Projects", title: "See your custom app", icon: AppWindow },
  { id: "enablement", label: "AI Enablement", title: "Check your AI readiness", icon: Sparkles },
] as const;

type TabId = (typeof tabs)[number]["id"];

const inboxSamples: Record<BusinessId, { from: string; text: string; tag: string; draft: string; route: string }> = {
  roofing: {
    from: "New email",
    text: "The patch from last week is dripping again. Can someone come back?",
    tag: "Urgent",
    draft: "Sorry the patch is leaking. We can come back Thursday at 10 AM. Reply if that time works.",
    route: "Urgent. Routed to you.",
  },
  "home-services": {
    from: "New text",
    text: "No heat this morning. Are you able to come today?",
    tag: "Urgent",
    draft: "Sorry the heat is out. We can be there Thursday at 10 AM. Reply if you need a sooner slot.",
    route: "Urgent. Routed to you.",
  },
  "real-estate": {
    from: "Website form",
    text: "Is the house on Oak still available for a look this week?",
    tag: "New lead",
    draft: "Thanks for asking. I can request a look Thursday at 10 AM. Reply with the best number.",
    route: "New lead. Routed to you.",
  },
  property: {
    from: "Resident",
    text: "The sink in unit 4 is dripping under the cabinet.",
    tag: "Maintenance",
    draft: "Thanks, we logged the drip in unit 4. Maintenance is set for Thursday at 10 AM.",
    route: "Maintenance. Routed to you.",
  },
  insurance: {
    from: "Client",
    text: "Please send a certificate to the job site office by Thursday.",
    tag: "Service",
    draft: "We can start the certificate. A licensed person will issue it. Reply with the exact name to print.",
    route: "Service task. Routed to you.",
  },
  other: {
    from: "Customer",
    text: "Can someone follow up on my request from yesterday?",
    tag: "Follow-up",
    draft: "Thanks for the nudge. We can pick this up Thursday at 10 AM. Reply if another time is better.",
    route: "Follow-up. Routed to you.",
  },
};

const questions = [
  "Do you have one workflow you would hand to AI first?",
  "Can someone on the team review what the AI does?",
  "Do you know which tools that work already uses?",
  "Have you decided what the AI must not do?",
  "Can you spend time this month on a first version?",
];

export function TryItLive({
  asPage = false,
  initialTab = "voice",
  presetIndustry,
  only,
  anchor = "try",
  heading = true,
  variant = "page",
}: {
  asPage?: boolean;
  initialTab?: TabId;
  presetIndustry?: BusinessId;
  only?: TabId[];
  anchor?: string;
  heading?: boolean;
  variant?: "page" | "hero";
}) {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<TabId>(initialTab);
  const current = tabs.find((item) => item.id === tab) ?? tabs[0];
  const visible = tabs.filter((item) => !only || only.includes(item.id));

  return (
    <section id={anchor} className={heading ? "try-live" : variant === "hero" ? "try-live try-plain hero-demo" : "try-live try-plain"}>
      <div className="wrap">
        {heading ? <p className="kicker">Try it live</p> : null}
        {asPage ? <h1 className="hero-title">Try it live</h1> : null}
        {heading ? <h2 className="section-title">{current.title}</h2> : null}
        {visible.length > 1 ? (
        <div className="try-tabs" role="tablist">
          {visible.map((item) => {
            const Icon = item.icon;
            const on = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={on}
                className={on ? "try-tab on" : "try-tab"}
                onClick={() => setTab(item.id)}
              >
                {on && !reduce ? <motion.span layoutId="try-pill" className="try-pill" /> : null}
                <Icon aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
        ) : null}
        {tab === "voice" ? <VoiceDemo presetIndustry={presetIndustry} compact={variant === "hero"} /> : null}
        {tab === "assistant" ? <AssistantDemo presetIndustry={presetIndustry} /> : null}
        {tab === "projects" ? <ProjectDemo /> : null}
        {tab === "enablement" ? <QuizDemo /> : null}
      </div>
    </section>
  );
}

function VoiceDemo({
  presetIndustry = "roofing",
  compact = false,
}: {
  presetIndustry?: BusinessId;
  compact?: boolean;
}) {
  const [step, setStep] = useState(1);
  const [consent, setConsent] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const website = "";
  const [industry, setIndustry] = useState<BusinessId>(presetIndustry);
  const [phase, setPhase] = useState<"idle" | "recording" | "cloning" | "error" | "hear" | "call" | "summary">("idle");
  const [left, setLeft] = useState(10);
  const [error, setError] = useState("");
  const [voiceId, setVoiceId] = useState<string | null>(null);
  const [cloned, setCloned] = useState(false);
  const [lines, setLines] = useState<CallLine[]>([]);
  const [summary, setSummary] = useState<CallSummary | null>(null);
  const [shown, setShown] = useState(0);
  const [callError, setCallError] = useState("");
  const recorder = useRef<MediaRecorder | null>(null);
  const waveRef = useRef<HTMLDivElement | null>(null);

  const label = businessName.trim() || "Harbor Roofing";
  const greet = `Hi, thanks for calling ${label}. How can I help you today?`;

  async function record() {
    track("demo_start");
    setError("");
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setError("Microphone is blocked. Allow the mic, or use the demo voice.");
      setPhase("error");
      return;
    }
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64;
    source.connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);
    let frame = 0;
    const draw = () => {
      if (!recorder.current || recorder.current.state !== "recording") return;
      analyser.getByteFrequencyData(data);
      paint(waveRef.current, data);
      frame = requestAnimationFrame(draw);
    };
    const media = new MediaRecorder(stream);
    const parts: Blob[] = [];
    media.ondataavailable = (event) => {
      if (event.data.size) parts.push(event.data);
    };
    media.onstop = () => {
      cancelAnimationFrame(frame);
      stream.getTracks().forEach((track) => track.stop());
      void audioCtx.close();
      const blob = new Blob(parts, { type: media.mimeType || "audio/webm" });
      void cloneVoice(blob);
    };
    recorder.current = media;
    media.start();
    setPhase("recording");
    setLeft(10);
    draw();
    startCountdown(
      (remain) => setLeft(remain),
      () => {
        if (media.state === "recording") media.stop();
      },
    );
  }

  async function cloneVoice(blob: Blob) {
    setPhase("cloning");
    setError("");
    try {
      const body = new FormData();
      body.set("consent", "yes");
      body.set("audio", blob, "clip.webm");
      const response = await fetch("/api/demo/voice", { method: "POST", body });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || `Voice API failed (${response.status}).`);
      setVoiceId(payload.voiceId);
      setCloned(Boolean(payload.cloned));
      if (payload.cloned) track("demo_voice_cloned");
      await speakClone(payload.voiceId);
    } catch (reason) {
      setPhase("error");
      setError(reason instanceof Error ? reason.message : "Voice clone failed.");
    }
  }

  async function speakClone(id: string) {
    const response = await fetch("/api/demo/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ voiceId: id, text: greet }),
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || `Speech failed (${response.status}).`);
    setPhase("hear");
    setStep(3);
    await playWithWave(payload.audio, waveRef.current);
  }

  async function buildCall(id = voiceId, wasCloned = cloned) {
    setCallError("");
    setPhase("call");
    setShown(0);
    const scriptResponse = await fetch("/api/demo/script", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ website, industry, businessName: businessName || label }),
    });
    const script = await scriptResponse.json();
    if (!scriptResponse.ok) {
      setCallError(script.error || "Could not build the call.");
      return;
    }
    setLines(script.lines);
    setSummary(script.summary);
    track("demo_call_played");
    setStep(3);
    await wait(80);
    const callResponse = await fetch("/api/demo/call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ voiceId: id, cloned: wasCloned, industry, lines: script.lines }),
    });
    const call = await callResponse.json();
    if (!callResponse.ok) {
      setCallError(call.error || "Call audio failed.");
      setShown(script.lines.length);
      setStep(4);
      setPhase("summary");
      return;
    }
    const clips: string[] = call.clips || [];
    for (let index = 0; index < script.lines.length; index += 1) {
      setShown(index + 1);
      if (clips[index]) await playWithWave(clips[index], waveRef.current);
      else await wait(900);
    }
    setStep(4);
    setPhase("summary");
  }

  async function skipSample() {
    setError("");
    setCallError("");
    setStep(3);
    setPhase("cloning");
    try {
      const body = new FormData();
      body.set("fallback", "yes");
      const response = await fetch("/api/demo/voice", { method: "POST", body });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || `Voice API failed (${response.status}).`);
      setVoiceId(payload.voiceId);
      setCloned(false);
      await buildCall(payload.voiceId, false);
    } catch (reason) {
      setPhase("error");
      setStep(2);
      setError(reason instanceof Error ? reason.message : "Sample call failed.");
    }
  }

  const callerLine = lines.find((line) => line.speaker !== "agent")?.text;
  const spoken = lines.slice(0, shown).filter((line) => line.speaker === "agent").at(-1)?.text;
  const device =
    phase === "summary" && summary ? (
      <WhatsAppThread
        name={label}
        messages={[
          { side: "in", text: `${summary.caller} called about ${summary.need}.`, time: "10:41" },
          { side: "in", text: `Area: ${summary.area}. Urgency: ${summary.urgency}.`, time: "10:41" },
          { side: "out", text: `Booked ${summary.booked}. Next: ${summary.next}.`, time: "10:42" },
        ]}
      />
    ) : (
      <IphoneCall
        name={label}
        caption={step >= 3 ? spoken || "Incoming call, answered by AI" : "Incoming call, answered by AI"}
        callerLine={step >= 3 ? callerLine : undefined}
        timer={phase === "recording" ? `0:0${Math.max(0, 10 - left)}` : phase === "call" ? "00:12" : "00:00"}
        live={phase === "recording" || phase === "call"}
        waveRef={waveRef}
      />
    );

  return (
    <>
      {compact ? null : (
        <ol className="demo-guide">
          <li>
            <b>1</b> Type your business name.
          </li>
          <li>
            <b>2</b> Read one sentence (10 sec).
          </li>
          <li>
            <b>3</b> Hear your AI receptionist answer a call.
          </li>
        </ol>
      )}
      <Stage
        controls={
          <>
            {compact ? null : (
              <ol className="step-meter" aria-label="Demo progress">
                {["Business", "Voice", "Call", "Summary"].map((item, index) => (
                  <li key={item} className={step === index + 1 ? "now" : step > index + 1 ? "done" : ""}>
                    <span>{index + 1}</span>
                    {item}
                  </li>
                ))}
              </ol>
            )}
            {step === 1 ? (
              <>
                <label>
                  Business name
                  <input value={businessName} onChange={(event) => setBusinessName(event.target.value)} placeholder="Harbor Roofing" />
                </label>
                <label>
                  Industry
                  <select value={industry} onChange={(event) => setIndustry(event.target.value as BusinessId)}>
                    <option value="roofing">Roofing</option>
                    <option value="home-services">HVAC and home services</option>
                    <option value="real-estate">Real estate</option>
                    <option value="property">Property management</option>
                    <option value="insurance">Insurance agency</option>
                    <option value="other">Other</option>
                  </select>
                </label>
                <button className="btn btn-primary btn-lg" type="button" disabled={!businessName.trim()} onClick={() => setStep(2)}>
                  Next
                </button>
              </>
            ) : null}
            {step === 2 ? (
              <>
                <p className="read-script">{greet}</p>
                <label className="consent">
                  <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
                  <span>This is my voice. Use it for this demo, then delete it.</span>
                </label>
                <button
                  className="btn btn-primary btn-lg"
                  type="button"
                  disabled={!consent || phase === "recording" || phase === "cloning"}
                  onClick={() => void record()}
                >
                  {phase === "recording" ? `Recording ${left}s` : phase === "cloning" ? "Cloning your voice..." : "Start recording"}
                </button>
                {error ? (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                ) : null}
                <button className="text-btn" type="button" onClick={() => void skipSample()}>
                  Skip, hear a sample call
                </button>
              </>
            ) : null}
            {step === 3 && phase !== "summary" ? (
              <>
                <p className="type-body">Hear {label} answer a caller.</p>
                <button className="btn btn-primary btn-lg" type="button" disabled={phase === "call" || phase === "cloning"} onClick={() => void buildCall()}>
                  {phase === "call" ? "Playing the call" : phase === "cloning" ? "Getting a sample voice..." : "Play the call"}
                </button>
                {callError ? (
                  <p className="form-error" role="alert">
                    {callError}
                  </p>
                ) : null}
              </>
            ) : null}
            {phase === "summary" && summary ? (
              <>
                <p className="type-body">This is the summary your phone would get.</p>
                <Link className="btn btn-primary" href="/book" onClick={() => track("cta_click", { location: "demo-summary" })}>
                  Get this for my business
                </Link>
              </>
            ) : null}
          </>
        }
        device={device}
      />
    </>
  );
}

function AssistantDemo({ presetIndustry = "roofing" }: { presetIndustry?: BusinessId }) {
  const [industry, setIndustry] = useState<BusinessId>(presetIndustry);
  const [count, setCount] = useState(0);
  const sample = inboxSamples[industry];

  function handleMessage() {
    setCount(0);
    const timer = window.setInterval(() => {
      setCount((value) => {
        if (value >= 3) {
          window.clearInterval(timer);
          return value;
        }
        return value + 1;
      });
    }, 700);
  }

  return (
    <Stage
      controls={
        <>
      <p className="one-line">One message. See the draft and where it goes.</p>
      <label>
        Industry
        <select
          value={industry}
          onChange={(event) => {
            setIndustry(event.target.value as BusinessId);
            setCount(0);
          }}
        >
          <option value="roofing">Roofing</option>
          <option value="home-services">HVAC/Home services</option>
          <option value="real-estate">Real estate</option>
          <option value="property">Property management</option>
          <option value="insurance">Insurance agency</option>
          <option value="other">Other</option>
        </select>
      </label>
      {count === 0 ? (
        <button type="button" className="btn btn-solid btn-lg" onClick={handleMessage}>
          Handle this message
        </button>
      ) : (
        <div className="inbox-result">
          {count >= 1 ? <p className="booked-chip">{sample.tag}</p> : null}
          {count >= 2 ? <p className="read-script">{sample.draft}</p> : null}
          {count >= 3 ? <p className="status-line">{sample.route}</p> : null}
        </div>
      )}
      {count >= 3 ? (
        <BookLink />
      ) : null}
        </>
      }
      device={
        <TeamThread
          channel="inbox"
          messages={[
            { author: sample.from, time: "9:14 AM", text: sample.text },
            ...(count >= 2 ? [{ author: "Futurix assistant", time: "9:14 AM", text: sample.draft }] : []),
            ...(count >= 3 ? [{ author: "Futurix", time: "9:14 AM", text: sample.route, system: true }] : []),
          ]}
        />
      }
    />
  );
}

function ProjectDemo() {
  const [industry, setIndustry] = useState<BusinessId | "">("");
  const [built, setBuilt] = useState(false);

  return (
    <Stage
      controls={
        <>
      <p className="one-line">Pick an industry. Watch a sample app appear.</p>
      <label>
        Industry
        <select
          value={industry}
          onChange={(event) => {
            setIndustry(event.target.value as BusinessId);
            setBuilt(false);
          }}
        >
          <option value="">Choose</option>
          <option value="roofing">Roofing</option>
          <option value="home-services">HVAC/Home services</option>
          <option value="real-estate">Real estate</option>
          <option value="property">Property management</option>
          <option value="insurance">Insurance agency</option>
          <option value="other">Other</option>
        </select>
      </label>
      {industry && !built ? (
        <button type="button" className="btn btn-solid btn-lg" onClick={() => setBuilt(true)}>
          Build the sample
        </button>
      ) : null}
      {built ? (
        <BookLink />
      ) : null}
        </>
      }
      device={
        <OpsDashboard
          title={built ? "North Roofing jobs" : "Jobs"}
          rows={
            built
              ? [
                  { status: "New", job: "Leak on Oak Street", when: "Today" },
                  { status: "Scheduled", job: "Estimate, Thursday", when: "Thu 10:00" },
                  { status: "Done", job: "Ridge cap, Maple Ave", when: "Yesterday" },
                ]
              : [{ status: "Waiting", job: "Choose an industry to fill the board", when: "" }]
          }
        />
      }
    />
  );
}

function QuizDemo() {
  const [answers, setAnswers] = useState<Array<"yes" | "not" | null>>([null, null, null, null, null]);
  const index = answers.findIndex((item) => item === null);
  const done = index === -1;
  const score = answers.filter((item) => item === "yes").length;
  const level = score >= 4 ? "Ready for a first version" : score >= 2 ? "A few pieces in place" : "Starting out";

  return (
    <Stage
      controls={
        <>
      <p className="one-line">Five taps. A plan for 30, 60, and 90 days.</p>
      {!done ? (
        <>
          <p className="wizard-step">Question {index + 1} of 5</p>
          <h3>{questions[index]}</h3>
          <div className="choice-grid">
            <button
              type="button"
              className="choice"
              onClick={() =>
                setAnswers((current) => current.map((item, itemIndex) => (itemIndex === index ? "yes" : item)))
              }
            >
              Yes
            </button>
            <button
              type="button"
              className="choice"
              onClick={() =>
                setAnswers((current) => current.map((item, itemIndex) => (itemIndex === index ? "not" : item)))
              }
            >
              Not yet
            </button>
          </div>
        </>
      ) : (
        <div className="plan-card">
          <p className="kicker">Quiz result</p>
          <h3>{level}</h3>
          <p>Yes answers: {score} of 5. This is only this quiz, not a market score.</p>
          <ul>
            <li>30 days: name the one workflow and the rules.</li>
            <li>60 days: use a first version on live work and review it.</li>
            <li>90 days: keep what the team actually uses, and stop the rest.</li>
          </ul>
          <BookLink />
        </div>
      )}
        </>
      }
      device={
        <RolloutBoard
          step={done ? level : `Question ${Math.max(index, 0) + 1} of 5`}
          items={
            done
              ? [
                  { label: "30 days: name the workflow and the rules", state: "Next" },
                  { label: "60 days: use a first version and review it", state: "Later" },
                  { label: "90 days: keep what the team uses", state: "Later" },
                ]
              : questions.map((question, itemIndex) => ({
                  label: question,
                  state: answers[itemIndex] === "yes" ? "Yes" : answers[itemIndex] === "not" ? "Not yet" : "Open",
                }))
          }
        />
      }
    />
  );
}

function Stage({ controls, device }: { controls: ReactNode; device: ReactNode }) {
  return (
    <div className="stage">
      <div className="stage-device">{device}</div>
      <div className="stage-controls">{controls}</div>
    </div>
  );
}

function startCountdown(onTick: (left: number) => void, onDone: () => void) {
  const started = Date.now();
  const tick = () => {
    const remain = Math.max(0, 10 - (Date.now() - started) / 1000);
    onTick(Math.ceil(remain));
    if (remain <= 0) {
      onDone();
      return;
    }
    requestAnimationFrame(tick);
  };
  tick();
}

function paint(node: HTMLDivElement | null, data: Uint8Array) {
  if (!node) return;
  [...node.children].forEach((child, index) => {
    const value = data[index] || 0;
    (child as HTMLElement).style.height = `${8 + value / 6}px`;
  });
}

function playWithWave(url: string, node: HTMLDivElement | null) {
  return new Promise<void>((resolve) => {
    const audio = new Audio(url);
    const ctx = new AudioContext();
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;
    const source = ctx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(ctx.destination);
    const data = new Uint8Array(analyser.frequencyBinCount);
    let frame = 0;
    const draw = () => {
      analyser.getByteFrequencyData(data);
      paint(node, data);
      if (!audio.paused) frame = requestAnimationFrame(draw);
    };
    const finish = () => {
      cancelAnimationFrame(frame);
      void ctx.close();
      resolve();
    };
    audio.onended = finish;
    audio.onerror = finish;
    void audio.play().then(() => {
      if (!Number.isFinite(audio.duration) || audio.duration === 0) {
        finish();
        return;
      }
      draw();
    }).catch(finish);
  });
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
