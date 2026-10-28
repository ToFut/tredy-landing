import { existsSync } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import { allowDemo, clientIp } from "@/lib/demo/guard";
import { asIndustry } from "@/lib/demo/script";
import type { CallLine } from "@/lib/demo/templates";

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
  if (!key || !body.voiceId) {
    return NextResponse.json({
      mode: "preview",
      sample: sampleFor(industry),
      clips: null,
    });
  }

  const callerVoice = process.env.ELEVENLABS_CALLER_VOICE_ID || body.voiceId;
  const clips: string[] = [];
  try {
    for (const line of lines) {
      const voice = line.speaker === "agent" ? body.voiceId : callerVoice;
      const audio = await speak(key, voice, line.text.slice(0, 280));
      clips.push(audio);
    }
  } catch {
    return NextResponse.json({ error: "The call audio did not generate. The transcript still plays." }, { status: 502 });
  } finally {
    if (body.cloned && body.voiceId) {
      await fetch(`https://api.elevenlabs.io/v1/voices/${body.voiceId}`, {
        method: "DELETE",
        headers: { "xi-api-key": key },
      }).catch(() => undefined);
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
  if (!response.ok) throw new Error("tts");
  const bytes = Buffer.from(await response.arrayBuffer());
  return `data:audio/mpeg;base64,${bytes.toString("base64")}`;
}

function sampleFor(industry: string) {
  const file = path.join(process.cwd(), "public", "demo", `${industry}.mp3`);
  return existsSync(file) ? `/demo/${industry}.mp3` : null;
}
