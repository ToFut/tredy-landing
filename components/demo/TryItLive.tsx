"use client";

import { useRef, useState } from "react";
import { Wizard } from "@/components/start/Wizard";
import type { BusinessId } from "@/lib/start";
import type { CallLine, CallSummary } from "@/lib/demo/templates";

const tabs = [
  { id: "voice", label: "Voice Agent", title: "Hear your business answer the phone" },
  { id: "assistant", label: "AI Assistant", title: "Watch AI handle your inbox" },
  { id: "projects", label: "Custom Projects", title: "See your custom app" },
  { id: "enablement", label: "AI Enablement", title: "Check your AI readiness" },
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
}: {
  asPage?: boolean;
  initialTab?: TabId;
}) {
  const [tab, setTab] = useState<TabId>(initialTab);
  const current = tabs.find((item) => item.id === tab) ?? tabs[0];

  return (
    <section id="try" className="try-live">
      <div className="wrap">
        <p className="kicker">Try it live</p>
        {asPage ? <h1>Try it live</h1> : null}
        <h2>{current.title}</h2>
        <div className="try-tabs" role="tablist">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={tab === item.id}
              className={tab === item.id ? "try-tab on" : "try-tab"}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        {tab === "voice" ? <VoiceDemo /> : null}
        {tab === "assistant" ? <AssistantDemo /> : null}
        {tab === "projects" ? <ProjectDemo /> : null}
        {tab === "enablement" ? <QuizDemo /> : null}
      </div>
    </section>
  );
}

function VoiceDemo() {
  const [step, setStep] = useState(1);
  const [consent, setConsent] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState<BusinessId>("roofing");
  const [phase, setPhase] = useState<"idle" | "recording" | "cloning" | "error" | "hear" | "call" | "summary">("idle");
  const [left, setLeft] = useState(10);
  const [error, setError] = useState("");
  const [voiceId, setVoiceId] = useState<string | null>(null);
  const [cloned, setCloned] = useState(false);
  const [greetUrl, setGreetUrl] = useState<string | null>(null);
  const [lines, setLines] = useState<CallLine[]>([]);
  const [summary, setSummary] = useState<CallSummary | null>(null);
  const [shown, setShown] = useState(0);
  const [bookedOn, setBookedOn] = useState(false);
  const [booking, setBooking] = useState(false);
  const [callError, setCallError] = useState("");
  const recorder = useRef<MediaRecorder | null>(null);
  const bars = useRef<HTMLDivElement | null>(null);
  const playBars = useRef<HTMLDivElement | null>(null);

  const label = businessName.trim() || "your business";
  const greet = `Hi, thanks for calling ${label}. How can I help you today?`;

  async function record() {
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
      paint(bars.current, data);
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
      await speakClone(payload.voiceId);
    } catch (reason) {
      setPhase("error");
      setError(reason instanceof Error ? reason.message : "Voice clone failed.");
    }
  }

  async function chooseDemoVoice() {
    setError("");
    setPhase("cloning");
    try {
      const body = new FormData();
      body.set("fallback", "yes");
      const response = await fetch("/api/demo/voice", { method: "POST", body });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || `Voice API failed (${response.status}).`);
      setVoiceId(payload.voiceId);
      setCloned(false);
      await speakClone(payload.voiceId);
    } catch (reason) {
      setPhase("error");
      setError(reason instanceof Error ? reason.message : "Demo voice failed.");
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
    setGreetUrl(payload.audio);
    setPhase("hear");
    await playWithWave(payload.audio, playBars.current);
  }

  async function buildCall() {
    setCallError("");
    setPhase("call");
    setShown(0);
    setBookedOn(false);
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
    setStep(3);
    await wait(80);
    const callResponse = await fetch("/api/demo/call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ voiceId, cloned, industry, lines: script.lines }),
    });
    const call = await callResponse.json();
    if (!callResponse.ok) {
      setCallError(call.error || "Call audio failed.");
      setShown(script.lines.length);
      setBookedOn(true);
      setStep(4);
      setPhase("summary");
      return;
    }
    const clips: string[] = call.clips || [];
    for (let index = 0; index < script.lines.length; index += 1) {
      setShown(index + 1);
      if (clips[index]) await playWithWave(clips[index], playBars.current);
      else await wait(900);
    }
    setBookedOn(true);
    setStep(4);
    setPhase("summary");
  }

  return (
    <div className="demo-panel">
      <ol className="step-meter">
        {["Record", "Business", "The call", "Your phone"].map((item, index) => (
          <li key={item} className={step === index + 1 ? "now" : step > index + 1 ? "done" : ""}>
            <span>{index + 1}</span>
            {item}
          </li>
        ))}
      </ol>
      <p className="one-line">Read the line, hold for 10 seconds, then hear yourself answer.</p>

      {step === 1 ? (
        <>
          <label>
            Business name
            <input value={businessName} onChange={(event) => setBusinessName(event.target.value)} placeholder="North Roofing" />
          </label>
          <p className="read-script">{greet}</p>
          <div className="record-row">
            <div className={`count-ring ${phase === "recording" ? "on" : ""}`} style={{ ["--p" as string]: `${((10 - left) / 10) * 100}` }}>
              <strong>{phase === "recording" ? left : 10}</strong>
            </div>
            <div className="mini-wave" ref={bars} aria-hidden="true">
              {Array.from({ length: 12 }).map((_, index) => (
                <i key={index} />
              ))}
            </div>
          </div>
          <label className="consent">
            <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
            This is my voice and I agree to it being used to create a demo voice. It is deleted after the demo.
          </label>
          {phase === "cloning" ? <p className="status-line">Cloning your voice...</p> : null}
          {phase === "hear" ? (
            <div>
              <p className="status-line">Hear your clone</p>
              <p className="read-script">{greet}</p>
              <div className="mini-wave" ref={playBars} aria-hidden="true">
                {Array.from({ length: 12 }).map((_, index) => (
                  <i key={index} />
                ))}
              </div>
              {greetUrl ? <button type="button" className="btn btn-ghost btn-lg" onClick={() => void playWithWave(greetUrl, playBars.current)}>Play again</button> : null}
              <button type="button" className="btn btn-solid btn-lg" onClick={() => setStep(2)}>
                Continue
              </button>
            </div>
          ) : null}
          {phase === "error" ? (
            <div className="form-error" role="alert">
              <p>{error}</p>
              <button type="button" className="btn btn-ghost btn-lg" onClick={() => void chooseDemoVoice()}>
                Use the demo voice instead
              </button>
            </div>
          ) : null}
          {phase === "idle" || phase === "recording" ? (
            <button
              type="button"
              className="btn btn-solid btn-lg mic-btn"
              disabled={!consent || !businessName.trim() || phase === "recording"}
              onClick={() => void record()}
            >
              {phase === "recording" ? "Recording..." : "Record 10 seconds"}
            </button>
          ) : null}
        </>
      ) : null}

      {step === 2 ? (
        <>
          <p className="one-line">Add the industry, or a website, and we write the call.</p>
          <label>
            Business name
            <input value={businessName} onChange={(event) => setBusinessName(event.target.value)} />
          </label>
          <label>
            Website, optional
            <input value={website} onChange={(event) => setWebsite(event.target.value)} placeholder="https://" />
          </label>
          <label>
            Industry
            <select value={industry} onChange={(event) => setIndustry(event.target.value as BusinessId)}>
              <option value="roofing">Roofing</option>
              <option value="home-services">HVAC/Home services</option>
              <option value="real-estate">Real estate</option>
              <option value="property">Property management</option>
              <option value="insurance">Insurance agency</option>
              <option value="other">Other</option>
            </select>
          </label>
          <button type="button" className="btn btn-solid btn-lg" onClick={() => void buildCall()}>
            Play the call
          </button>
          {callError && step === 2 ? <p className="form-error" role="alert">{callError}</p> : null}
        </>
      ) : null}

      {step >= 3 ? (
        <div className="iphone">
          <div className="iphone-notch" />
          <p className="phone-label">In call</p>
          <div className="mini-wave tall" ref={playBars} aria-hidden="true">
            {Array.from({ length: 16 }).map((_, index) => (
              <i key={index} />
            ))}
          </div>
          {lines.slice(0, shown).map((line, index) => (
            <p key={`${line.speaker}-${index}`} className={line.speaker === "agent" ? "bubble agent" : "bubble caller"}>
              <b>{line.speaker === "agent" ? label : "Caller"}</b>
              {line.text}
            </p>
          ))}
          {bookedOn && summary ? <p className="booked-chip">Booked: {summary.booked}</p> : null}
          {callError ? <p className="form-error" role="alert">{callError}</p> : null}
        </div>
      ) : null}

      {phase === "summary" && summary ? (
        <div className="phone-frame">
          <p className="phone-label">Summary sent to your phone</p>
          <div className="chat-bubbles">
            <p>{summary.caller} called about {summary.need}.</p>
            <p>Area: {summary.area}. Urgency: {summary.urgency}.</p>
            <p>Booked {summary.booked}. Next: {summary.next}.</p>
          </div>
          <button type="button" className="btn btn-solid btn-lg" onClick={() => setBooking(true)}>
            Set this up for my business
          </button>
        </div>
      ) : null}
      {booking ? (
        <Wizard
          id="book"
          initialGoals={["phone", "book"]}
          initialBusiness={industry}
          initialDetails={{ businessName, website }}
          startAtContact
          extra={{ Need: summary?.need || "", Booked: summary?.booked || "" }}
        />
      ) : null}
    </div>
  );
}

function AssistantDemo() {
  const [industry, setIndustry] = useState<BusinessId>("roofing");
  const [count, setCount] = useState(0);
  const sample = inboxSamples[industry];
  const [booking, setBooking] = useState(false);

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
    <div className="demo-panel">
      <p className="one-line">Pick the kind of message. One tap shows the draft and where it goes.</p>
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
      <article className="inbox-card">
        <p className="kicker">{sample.from}</p>
        <p>{sample.text}</p>
      </article>
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
        <button type="button" className="btn btn-solid btn-lg" onClick={() => setBooking(true)}>
          Set this up for my business
        </button>
      ) : null}
      {booking ? <Wizard initialGoals={["inbox"]} initialBusiness={industry} startAtContact id="book-assistant" /> : null}
    </div>
  );
}

function ProjectDemo() {
  const [industry, setIndustry] = useState<BusinessId | "">("");
  const [built, setBuilt] = useState(false);
  const [booking, setBooking] = useState(false);

  return (
    <div className="demo-panel">
      <p className="one-line">Pick an industry. A sample app layout builds on screen.</p>
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
        <div className="app-mock">
          <p className="kicker">Sample layout, not live data</p>
          <div className="dash-top">
            <span>Portal</span>
            <span>Jobs</span>
            <span>Inbox</span>
          </div>
          <div className="bars sample-bars">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="board">
            <p>New</p>
            <p>Scheduled</p>
            <p>Done</p>
          </div>
          <button type="button" className="btn btn-solid btn-lg" onClick={() => setBooking(true)}>
            Set this up for my business
          </button>
        </div>
      ) : null}
      {booking ? <Wizard initialGoals={["custom"]} initialBusiness={industry || undefined} startAtContact id="book-project" /> : null}
    </div>
  );
}

function QuizDemo() {
  const [answers, setAnswers] = useState<Array<"yes" | "not" | null>>([null, null, null, null, null]);
  const [booking, setBooking] = useState(false);
  const index = answers.findIndex((item) => item === null);
  const done = index === -1;
  const score = answers.filter((item) => item === "yes").length;
  const level = score >= 4 ? "Ready for a first version" : score >= 2 ? "A few pieces in place" : "Starting out";

  return (
    <div className="demo-panel">
      <p className="one-line">Five taps. You get a readiness level and a 30, 60, 90 day plan.</p>
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
          <button type="button" className="btn btn-solid btn-lg" onClick={() => setBooking(true)}>
            Set this up for my business
          </button>
        </div>
      )}
      {booking ? <Wizard initialGoals={["train"]} startAtContact id="book-enable" /> : null}
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
    audio.onended = () => {
      cancelAnimationFrame(frame);
      void ctx.close();
      resolve();
    };
    audio.onerror = () => {
      cancelAnimationFrame(frame);
      void ctx.close();
      resolve();
    };
    void audio.play().then(draw).catch(() => resolve());
  });
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
