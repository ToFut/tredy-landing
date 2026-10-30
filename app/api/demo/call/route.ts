import { existsSync } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { allowDemo, clientIp } from "@/lib/demo/guard";
import { asIndustry } from "@/lib/demo/script";
import { audioDataUrl, speakViaProxy, speechProxyConfigured } from "@/lib/demo/speech-proxy";
import type { CallLine } from "@/lib/demo/templates";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = process.env.ELEVENLABS_TTS_MODEL || "eleven_flash_v2_5";

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (!(await allowDemo(ip, "call", 3))) {
    return NextResponse.json({ error: "Demo limit reached. Try again in an hour." }, { status: 429 });
  }

  let body: {
    voiceId?: string | null;
    cloned?: boolean;
    industry?: string;
    lines?: CallLine[];
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send the call lines as JSON." }, { status: 400 });
  }

  const lines = Array.isArray(body.lines) ? body.lines.slice(0, 6) : [];
  if (lines.length < 2 || lines.some((line) => !line?.text || (line.speaker !== "caller" && line.speaker !== "agent"))) {
    return NextResponse.json({ error: "The call script is incomplete." }, { status: 400 });
  }

  const key = process.env.ELEVENLABS_API_KEY;
  const industry = asIndustry(String(body.industry || "other"));
  if (!key && speechProxyConfigured()) {
    try {
      const clips: string[] = [];
      for (const line of lines) {
        const role = line.speaker === "agent" ? "agent" : "caller";
        const bytes = await speakViaProxy(role, line.text.slice(0, 280));
        clips.push(audioDataUrl(bytes));
      }
      return NextResponse.json({ mode: "live", sample: null, clips });
    } catch {
      console.error("demo/call speech proxy failed");
      return NextResponse.json({ error: "The call audio did not generate." }, { status: 502 });
    }
  }
  if (!key || !body.voiceId) {
    console.error("demo/call missing key or voice");
    return NextResponse.json(
      {
        error: key ? "No voice is selected for this call." : "Speech is not configured on this server.",
        sample: sampleFor(industry),
      },
      { status: key ? 400 : 503 },
    );
  }

  const callerVoice = process.env.ELEVENLABS_CALLER_VOICE_ID || body.voiceId;
  const clips: string[] = [];
  try {
    for (const line of lines) {
      const voice = line.speaker === "agent" ? body.voiceId : callerVoice;
      const audio = await speak(key, voice, line.text.slice(0, 280));
      clips.push(audio);
    }
  } catch (error) {
    console.error("demo/call tts", error instanceof Error ? error.message : "failed");
    return NextResponse.json({ error: "The call audio did not generate." }, { status: 502 });
  } finally {
    const preset = new Set(
      [process.env.ELEVENLABS_DEFAULT_VOICE_ID, process.env.ELEVENLABS_CALLER_VOICE_ID].filter(Boolean),
    );
    if (body.cloned && body.voiceId && !preset.has(body.voiceId)) {
      const removed = await fetch(`https://api.elevenlabs.io/v1/voices/${body.voiceId}`, {
        method: "DELETE",
        headers: { "xi-api-key": key },
      }).catch((err: unknown) => {
        console.error("demo/call delete voice", err instanceof Error ? err.message : "failed");
        return undefined;
      });
      if (removed && !removed.ok) {
        console.error("demo/call delete voice status", removed.status);
      } else if (removed?.ok) {
        console.log("demo/call deleted clone", body.voiceId);
      }
    }
  }

  return NextResponse.json({ mode: "live", sample: null, clips });
}

async function speak(key: string, voiceId: string, text: string) {
  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
    method: "POST",
    headers: {
      "xi-api-key": key,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({ text, model_id: MODEL }),
  });
  if (!response.ok) {
    const detail = await response.text();
    console.error("demo/call line", response.status, detail.slice(0, 400));
    throw new Error("tts");
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  return `data:audio/mpeg;base64,${bytes.toString("base64")}`;
}

function sampleFor(industry: string) {
  const file = path.join(process.cwd(), "public", "demo", `${industry}.mp3`);
  return existsSync(file) ? `/demo/${industry}.mp3` : null;
}
