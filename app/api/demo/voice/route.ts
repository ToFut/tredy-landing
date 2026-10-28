import { NextResponse } from "next/server";
import { allowDemo, clientIp } from "@/lib/demo/guard";

const MAX_BYTES = 1_500_000;

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (!(await allowDemo(ip))) {
    return NextResponse.json({ error: "Demo limit reached. Try again in an hour." }, { status: 429 });
  }

  const form = await request.formData();
  const skip = form.get("skip") === "yes";
  const consent = form.get("consent") === "yes";
  const key = process.env.ELEVENLABS_API_KEY;

  if (!key) {
    return NextResponse.json({ mode: "preview", voiceId: null, cloned: false });
  }

  if (skip) {
    const voiceId = process.env.ELEVENLABS_DEFAULT_VOICE_ID || null;
    if (!voiceId) {
      return NextResponse.json({ mode: "preview", voiceId: null, cloned: false });
    }
    return NextResponse.json({ mode: "live", voiceId, cloned: false });
  }

  if (!consent) {
    return NextResponse.json(
      { error: "Confirm this is your voice before a demo clone is created." },
      { status: 400 },
    );
  }

  const audio = form.get("audio");
  if (!(audio instanceof File) || audio.size === 0) {
    return NextResponse.json({ error: "Record or upload a short clip first." }, { status: 400 });
  }
  if (audio.size > MAX_BYTES) {
    return NextResponse.json({ error: "That clip is too long. Keep it under 30 seconds." }, { status: 400 });
  }

  const body = new FormData();
  body.set("name", `futurix-demo-${crypto.randomUUID().slice(0, 8)}`);
  body.set("files", audio, audio.name || "clip.webm");
  const response = await fetch("https://api.elevenlabs.io/v1/voices/add", {
    method: "POST",
    headers: { "xi-api-key": key },
    body,
  });
  if (!response.ok) {
    return NextResponse.json({ error: "Voice clone did not start. You can skip and use a demo voice." }, { status: 502 });
  }
  const payload = (await response.json()) as { voice_id?: string };
  if (!payload.voice_id) {
    return NextResponse.json({ error: "Voice clone did not start. You can skip and use a demo voice." }, { status: 502 });
  }
  return NextResponse.json({ mode: "live", voiceId: payload.voice_id, cloned: true });
}
