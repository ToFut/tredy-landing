import { NextResponse } from "next/server";
import { allowDemo, clientIp } from "@/lib/demo/guard";
import { audioDataUrl, speakViaProxy, speechProxyConfigured } from "@/lib/demo/speech-proxy";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_BYTES = 800_000;

function publicError(status: number, body: string) {
  console.error("demo/voice ElevenLabs", status, body.slice(0, 800));
  try {
    const json = JSON.parse(body) as { detail?: unknown; message?: string };
    const detail = json.detail;
    if (typeof detail === "string") return detail;
    if (detail && typeof detail === "object" && "message" in detail) {
      return String((detail as { message?: string }).message);
    }
    if (json.message) return json.message;
  } catch {
    /* body was not JSON */
  }
  return `Voice service returned ${status}.`;
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  console.log("demo/voice start", { ip });
  if (!(await allowDemo(ip, "voice", 3))) {
    console.error("demo/voice rate limit", ip);
    return NextResponse.json({ error: "Demo limit reached. Try again in an hour." }, { status: 429 });
  }

  const key = process.env.ELEVENLABS_API_KEY;
  if (!key) {
    if (!speechProxyConfigured()) {
      console.error("demo/voice speech is not configured");
      return NextResponse.json({ error: "Speech is not configured on this server." }, { status: 503 });
    }
    try {
      const bytes = await speakViaProxy("agent", "Thanks for calling. How can I help you today?");
      if (request.headers.get("accept")?.includes("audio/mpeg")) {
        return new NextResponse(new Uint8Array(bytes), {
          status: 200,
          headers: { "Content-Type": "audio/mpeg", "Cache-Control": "no-store" },
        });
      }
      return NextResponse.json({ voiceId: "demo", cloned: false, audio: audioDataUrl(bytes) });
    } catch {
      console.error("demo/voice speech proxy failed");
      return NextResponse.json({ error: "Could not reach the speech service." }, { status: 502 });
    }
  }

  const form = await request.formData();
  const fallback = form.get("fallback") === "yes";
  if (fallback) {
    const voiceId = process.env.ELEVENLABS_DEFAULT_VOICE_ID;
    if (!voiceId) {
      console.error("demo/voice missing ELEVENLABS_DEFAULT_VOICE_ID");
      return NextResponse.json(
        { error: "The demo voice is not configured (missing ELEVENLABS_DEFAULT_VOICE_ID)." },
        { status: 503 },
      );
    }
    console.log("demo/voice fallback voice");
    return NextResponse.json({ voiceId, cloned: false });
  }

  if (form.get("consent") !== "yes") {
    return NextResponse.json(
      { error: "Confirm this is your voice before a demo clone is created." },
      { status: 400 },
    );
  }

  const audio = form.get("audio");
  if (!(audio instanceof File) || audio.size === 0) {
    return NextResponse.json({ error: "Record about 10 seconds first." }, { status: 400 });
  }
  if (audio.size > MAX_BYTES) {
    return NextResponse.json({ error: "That clip is too long. Keep it to 10 seconds." }, { status: 400 });
  }

  const body = new FormData();
  body.set("name", `futurix-demo-${crypto.randomUUID().slice(0, 8)}`);
  body.append("files", audio, audio.name || "clip.webm");
  body.set("remove_background_noise", "true");

  let response: Response;
  try {
    response = await fetch("https://api.elevenlabs.io/v1/voices/add", {
      method: "POST",
      headers: { "xi-api-key": key },
      body,
    });
  } catch (error) {
    console.error("demo/voice network", error instanceof Error ? error.message : "fetch failed");
    return NextResponse.json({ error: "Could not reach the voice service." }, { status: 502 });
  }

  if (!response.ok) {
    const message = publicError(response.status, await response.text());
    return NextResponse.json({ error: message }, { status: 502 });
  }

  const payload = (await response.json()) as { voice_id?: string };
  if (!payload.voice_id) {
    console.error("demo/voice response missing voice_id");
    return NextResponse.json({ error: "Voice clone did not return an id." }, { status: 502 });
  }
  console.log("demo/voice cloned", payload.voice_id);
  return NextResponse.json({ voiceId: payload.voice_id, cloned: true });
}
