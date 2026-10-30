const MAX_CHARS = 280;

export function speechProxyConfigured() {
  return Boolean(process.env.DEMO_SPEECH_PROXY_URL && process.env.DEMO_SPEECH_PROXY_SECRET);
}

export async function speakViaProxy(role: "agent" | "caller", text: string) {
  const url = process.env.DEMO_SPEECH_PROXY_URL;
  const secret = process.env.DEMO_SPEECH_PROXY_SECRET;
  if (!url || !secret) {
    throw new Error("speech");
  }
  const line = text.trim().slice(0, MAX_CHARS);
  if (!line) throw new Error("speech");

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-demo-speech-secret": secret,
      },
      body: JSON.stringify({ role, text: line }),
    });
  } catch {
    throw new Error("speech");
  }
  if (!response.ok) throw new Error("speech");
  const bytes = Buffer.from(await response.arrayBuffer());
  if (bytes.length < 64) throw new Error("speech");
  return bytes;
}

export function audioDataUrl(bytes: Buffer) {
  return `data:audio/mpeg;base64,${bytes.toString("base64")}`;
}
