import { NextResponse } from "next/server";
import { allowDemo, clientIp } from "@/lib/demo/guard";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = process.env.ELEVENLABS_TTS_MODEL || "eleven_flash_v2_5";

export async function POST(request: Request) {
  const ip = clientIp(request);
  console.log("demo/tts start", { ip });
  if (!(await allowDemo(ip, "tts", 9))) {
    console.error("demo/tts rate limit", ip);
    return NextResponse.json({ error: "Demo limit reached. Try again in an hour." }, { status: 429 });
  }

  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) {
    console.error("demo/tts missing ELEVENLABS_API_KEY");
    return NextResponse.json(
      { error: "Speech is not configured on this server (missing ELEVENLABS_API_KEY)." },
      { status: 503 },
    );
  }

  let body: { voiceId?: string; text?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send the line to speak as JSON." }, { status: 400 });
  }
  const voiceId = String(body.voiceId || "");
  const text = String(body.text || "").slice(0, 280);
  if (!voiceId || !text) {
    return NextResponse.json({ error: "Missing voice or line." }, { status: 400 });
  }

  try {
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
      console.error("demo/tts ElevenLabs", response.status, detail.slice(0, 800));
      return NextResponse.json(
        { error: `Speech failed (${response.status}).` },
        { status: 502 },
      );
    }
    const bytes = Buffer.from(await response.arrayBuffer());
    return NextResponse.json({ audio: `data:audio/mpeg;base64,${bytes.toString("base64")}` });
  } catch (error) {
    console.error("demo/tts network", error instanceof Error ? error.message : "fetch failed");
    return NextResponse.json({ error: "Could not reach the speech service." }, { status: 502 });
  }
}
