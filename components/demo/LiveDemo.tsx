"use client";

import { useEffect, useRef, useState } from "react";
import { Wizard } from "@/components/start/Wizard";
import type { BusinessId } from "@/lib/start";
import type { CallLine, CallSummary } from "@/lib/demo/templates";

const steps = ["Your voice", "Your business", "Hear the call", "On your phone"];

const readAloud =
  "Hi, this is a short sample of my voice for a Futurix demo. I want callers to hear a calm, clear receptionist.";

type VoiceResult = { mode: "live" | "preview"; voiceId: string | null; cloned: boolean };

export function LiveDemo({ titleAs }: { titleAs?: "h1" | "h2" }) {
  const Title = titleAs;
  const [step, setStep] = useState(1);
  const [consent, setConsent] = useState(false);
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [clip, setClip] = useState<Blob | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [voice, setVoice] = useState<VoiceResult | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState<BusinessId>("roofing");
  const [lines, setLines] = useState<CallLine[]>([]);
  const [summary, setSummary] = useState<CallSummary | null>(null);
  const [clips, setClips] = useState<string[] | null>(null);
  const [sample, setSample] = useState<string | null>(null);
  const [shown, setShown] = useState(0);
  const [bookedOn, setBookedOn] = useState(false);
  const [booking, setBooking] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const bars = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!recording) return;
    const timer = window.setInterval(() => {
      setSeconds((value) => {
        if (value >= 29) {
          recorder.current?.stop();
          return 30;
        }
        return value + 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [recording]);

  async function startRecording() {
    setError("");
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      setError("Microphone is not available. Upload a clip or skip.");
      return;
    }
    const audio = new AudioContext();
    const source = audio.createMediaStreamSource(stream);
    const analyser = audio.createAnalyser();
    analyser.fftSize = 64;
    source.connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);
    let frame = 0;
    const draw = () => {
      if (!recorder.current || recorder.current.state !== "recording") return;
      analyser.getByteFrequencyData(data);
      const next = Array.from({ length: 8 }, (_, index) => 6 + (data[index] || 0) / 8);
      if (bars.current) {
        [...bars.current.children].forEach((child, index) => {
          (child as HTMLElement).style.height = `${next[index]}px`;
        });
      }
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
      void audio.close();
      setRecording(false);
      setClip(new Blob(parts, { type: media.mimeType || "audio/webm" }));
    };
    recorder.current = media;
    media.start();
    setClip(null);
    setSeconds(0);
    setRecording(true);
    draw();
  }

  function stopRecording() {
    recorder.current?.stop();
  }

  async function sendVoice(skip: boolean) {
    setBusy(true);
    setError("");
    try {
      const body = new FormData();
      if (skip) body.set("skip", "yes");
      else {
        body.set("consent", consent ? "yes" : "no");
        if (clip) body.set("audio", clip, "clip.webm");
      }
      const response = await fetch("/api/demo/voice", { method: "POST", body });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Voice step failed.");
      setVoice(payload);
      setStep(2);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Voice step failed.");
    } finally {
      setBusy(false);
    }
  }

  async function sendBusiness() {
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/demo/script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ website, industry, businessName }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Script step failed.");
      setLines(payload.lines);
      setSummary(payload.summary);
      setStep(3);
      await playCall(payload.lines);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Script step failed.");
    } finally {
      setBusy(false);
    }
  }

  async function playCall(nextLines: CallLine[]) {
    setShown(0);
    setBookedOn(false);
    const response = await fetch("/api/demo/call", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        voiceId: voice?.voiceId,
        cloned: voice?.cloned,
        industry,
        lines: nextLines,
      }),
    });
    const payload = await response.json();
    if (!response.ok) {
      await reveal(nextLines.length);
      return;
    }
    setSample(payload.sample);
    setClips(payload.clips);
    if (payload.clips?.length) {
      for (let index = 0; index < payload.clips.length; index += 1) {
        setShown(index + 1);
        await playUrl(payload.clips[index]);
      }
    } else if (payload.sample) {
      await reveal(nextLines.length);
      await playUrl(payload.sample);
    } else {
      await reveal(nextLines.length);
    }
    setBookedOn(true);
    setStep(4);
  }

  function reveal(count: number) {
    return new Promise<void>((resolve) => {
      let index = 0;
      const timer = window.setInterval(() => {
        index += 1;
        setShown(index);
        if (index >= count) {
          window.clearInterval(timer);
          resolve();
        }
      }, 900);
    });
  }

  function playUrl(url: string) {
    return new Promise<void>((resolve) => {
      const audio = new Audio(url);
      audio.onended = () => resolve();
      audio.onerror = () => resolve();
      void audio.play().catch(() => resolve());
    });
  }

  return (
    <section id="demo" className="demo-flow">
      <div className="wrap">
        <p className="kicker">Start setup</p>
        {Title ? <Title>Hear your business answer the phone.</Title> : null}
        <p className="one-line">Four steps. One sample call. Nothing is kept after the demo.</p>
        <ol className="step-meter">
          {steps.map((label, index) => (
            <li key={label} className={step === index + 1 ? "now" : step > index + 1 ? "done" : ""}>
              <span>{index + 1}</span>
              {label}
            </li>
          ))}
        </ol>

        {step === 1 ? (
          <div className="demo-panel">
            <h3>Clone your voice</h3>
            <p className="read-script">{readAloud}</p>
            <div className="record-row">
              <div className="mini-wave" ref={bars} aria-hidden="true">
                {Array.from({ length: 8 }).map((_, index) => (
                  <i key={index} />
                ))}
              </div>
              <strong>{seconds}s / 30s</strong>
            </div>
            <div className="demo-actions">
              {recording ? (
                <button type="button" className="btn btn-solid btn-lg" onClick={stopRecording}>
                  Stop
                </button>
              ) : (
                <button type="button" className="btn btn-solid btn-lg" onClick={() => void startRecording()}>
                  Record 30 seconds
                </button>
              )}
              <label className="btn btn-ghost btn-lg file-btn">
                Upload a clip
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) setClip(file);
                  }}
                />
              </label>
            </div>
            {clip ? <p className="wizard-note">Clip ready.</p> : null}
            <label className="consent">
              <input
                type="checkbox"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
              />
              This is my voice and I agree to it being used to create a demo voice. It is deleted after the demo.
            </label>
            <div className="demo-actions">
              <button
                type="button"
                className="btn btn-solid btn-lg"
                disabled={busy || !clip || !consent}
                onClick={() => void sendVoice(false)}
              >
                Use this voice
              </button>
              <button type="button" className="btn btn-ghost btn-lg" disabled={busy} onClick={() => void sendVoice(true)}>
                Skip, use a demo voice
              </button>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="demo-panel">
            <h3>Your business</h3>
            <label>
              Business name
              <input value={businessName} onChange={(event) => setBusinessName(event.target.value)} required />
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
            <button
              type="button"
              className="btn btn-solid btn-lg"
              disabled={busy || !businessName.trim()}
              onClick={() => void sendBusiness()}
            >
              Build my call
            </button>
          </div>
        ) : null}

        {step >= 3 ? (
          <div className="demo-panel call-stage">
            <h3>Hear the call</h3>
            <div className="demo call-demo static-demo">
              <div className="demo-top">
                <span className="live-dot" />
                In call
                <span className="wave">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <i key={index} />
                  ))}
                </span>
              </div>
              {lines.slice(0, shown).map((line, index) => (
                <p key={`${line.speaker}-${index}`} className="demo-line">
                  <b>{line.speaker === "agent" ? "Futurix" : "Caller"}</b>
                  <span>{line.text}</span>
                </p>
              ))}
              {bookedOn && summary ? <p className="booked-chip">Booked: {summary.booked}</p> : null}
              {bookedOn && summary ? (
                <p className="crm-row">
                  <span>CRM</span>
                  {summary.caller} · {summary.need} · {summary.booked}
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        {step === 4 && summary ? (
          <div className="demo-panel">
            <h3>The summary on your phone</h3>
            <div className="phone-frame">
              <p className="phone-label">Summary sent to your phone</p>
              <div className="chat-bubbles">
                <p>{summary.caller} called about {summary.need}.</p>
                <p>Area: {summary.area}. Urgency: {summary.urgency}.</p>
                <p>Booked {summary.booked}. Next: {summary.next}.</p>
              </div>
              {clips?.[0] || sample ? (
                <audio controls src={sample || clips?.[0] || undefined}>
                  Listen to call
                </audio>
              ) : (
                <p className="wizard-note">Transcript only in this preview. Add an ElevenLabs key for audio.</p>
              )}
            </div>
            <button type="button" className="btn btn-solid btn-lg" onClick={() => setBooking(true)}>
              Want this on your real phone line? Book setup
            </button>
            {booking ? (
              <Wizard
                id="book"
                initialGoals={["phone", "book"]}
                initialBusiness={industry}
                initialDetails={{ businessName, website }}
                startAtContact
                extra={{
                  Need: summary.need,
                  Booked: summary.booked,
                  Next: summary.next,
                }}
              />
            ) : null}
          </div>
        ) : null}
        {error ? <p className="form-error">{error}</p> : null}
      </div>
    </section>
  );
}
