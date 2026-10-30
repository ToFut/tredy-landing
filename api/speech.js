const { createHash, timingSafeEqual } = require("node:crypto");

const MAX_CHARS = 280;
const ROLES = new Set(["agent", "caller"]);

function sameSecret(left, right) {
  const a = createHash("sha256").update(String(left)).digest();
  const b = createHash("sha256").update(String(right)).digest();
  return timingSafeEqual(a, b);
}

function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return {};
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const expected = process.env.DEMO_SPEECH_PROXY_SECRET || "";
  const provided = req.headers["x-demo-speech-secret"] || "";
  if (!expected || !sameSecret(provided, expected)) {
    res.status(401).json({ error: "Unauthorized." });
    return;
  }

  const key = process.env.ELEVENLABS_API_KEY;
  const voices = {
    agent: process.env.ELEVENLABS_DEFAULT_VOICE_ID || "",
    caller: process.env.ELEVENLABS_CALLER_VOICE_ID || "",
  };
  if (!key || !voices.agent || !voices.caller) {
    res.status(503).json({ error: "Speech is not configured." });
    return;
  }

  const body = readBody(req);
  const role = String(body.role || "");
  const text = String(body.text || "").trim().slice(0, MAX_CHARS);
  if (!ROLES.has(role) || !text) {
    res.status(400).json({ error: "Request not allowed." });
    return;
  }

  const model = process.env.ELEVENLABS_TTS_MODEL || "eleven_flash_v2_5";
  let response;
  try {
    response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voices[role]}`, {
      method: "POST",
      headers: {
        "xi-api-key": key,
        "Content-Type": "application/json",
        Accept: "audio/mpeg",
      },
      body: JSON.stringify({ text, model_id: model }),
    });
  } catch {
    res.status(502).json({ error: "Speech failed." });
    return;
  }

  if (!response.ok) {
    res.status(502).json({ error: "Speech failed." });
    return;
  }

  const audio = Buffer.from(await response.arrayBuffer());
  res.status(200);
  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader("Cache-Control", "no-store");
  res.send(audio);
};
