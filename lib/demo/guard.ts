import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

const hits = new Map<string, number[]>();
const HOUR = 60 * 60 * 1000;
const LIMIT = 3;

export function clientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") || "unknown";
}

export async function allowDemo(ip: string, bucket = "voice", limit = LIMIT) {
  const key = `${bucket}:${ip}`;
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return allowUpstash(key, limit);
  }
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((time) => now - time < HOUR);
  if (recent.length >= limit) return false;
  recent.push(now);
  hits.set(key, recent);
  return true;
}

async function allowUpstash(keyName: string, limit: number) {
  const key = `futurix-demo:${keyName}`;
  const base = process.env.UPSTASH_REDIS_REST_URL!;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN!;
  const headers = { Authorization: `Bearer ${token}` };
  const count = await fetch(base, {
    method: "POST",
    headers,
    body: JSON.stringify(["INCR", key]),
  });
  const data = (await count.json()) as { result?: number };
  const value = Number(data.result || 0);
  if (value === 1) {
    await fetch(base, {
      method: "POST",
      headers,
      body: JSON.stringify(["EXPIRE", key, 3600]),
    });
  }
  return value <= limit;
}

export function isPrivateAddress(ip: string) {
  const normalized = ip.toLowerCase().replace(/^::ffff:/, "");
  if (normalized === "::1" || normalized === "0.0.0.0") return true;
  if (normalized.startsWith("fe80:") || normalized.startsWith("fc") || normalized.startsWith("fd")) {
    return true;
  }
  const parts = normalized.split(".").map((part) => Number(part));
  if (parts.length !== 4 || parts.some((part) => Number.isNaN(part))) return false;
  const [a, b] = parts;
  if (a === 10 || a === 127 || a === 0) return true;
  if (a === 169 && b === 254) return true;
  if (a === 192 && b === 168) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 100 && b >= 64 && b <= 127) return true;
  return false;
}

export async function assertPublicHttpUrl(raw: string) {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error("Enter a full website address, including https.");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Only http and https websites can be read.");
  }
  if (url.username || url.password) throw new Error("That website address is not allowed.");
  const host = url.hostname.toLowerCase();
  if (host === "localhost" || host.endsWith(".local") || host.endsWith(".internal")) {
    throw new Error("That website address is not allowed.");
  }
  if (isIP(host) && isPrivateAddress(host)) throw new Error("That website address is not allowed.");
  if (!isIP(host)) {
    const records = await lookup(host, { all: true });
    if (records.length === 0 || records.some((record) => isPrivateAddress(record.address))) {
      throw new Error("That website address is not allowed.");
    }
  }
  return url;
}

function decodeBasic(value: string) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/[—–]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function metaContent(html: string, name: string) {
  const attr = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const patterns = [
    new RegExp(`<meta[^>]+(?:name|property)=["']${attr}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:name|property)=["']${attr}["']`, "i"),
  ];
  for (const pattern of patterns) {
    const found = html.match(pattern)?.[1];
    if (found) return found;
  }
  return "";
}

export async function readPublicSite(raw: string) {
  let current = await assertPublicHttpUrl(raw);
  for (let hop = 0; hop < 3; hop += 1) {
    const response = await fetch(current, {
      redirect: "manual",
      signal: AbortSignal.timeout(8000),
      headers: { "User-Agent": "FuturixDemo/1.0" },
    });
    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location) throw new Error("The website did not return a page.");
      current = await assertPublicHttpUrl(new URL(location, current).toString());
      continue;
    }
    if (!response.ok) throw new Error("The website did not return a page.");
    const reader = response.body?.getReader();
    if (!reader) throw new Error("The website did not return a page.");
    const chunks: Uint8Array[] = [];
    let total = 0;
    const max = 400_000;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > max) {
        await reader.cancel();
        break;
      }
      chunks.push(value);
    }
    const html = new TextDecoder().decode(Buffer.concat(chunks));
    const title = decodeBasic(html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "");
    const description = decodeBasic(
      metaContent(html, "description") || metaContent(html, "og:description") || metaContent(html, "og:title"),
    );
    const text = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 4000);
    if (!text && !title && !description) throw new Error("The website had no readable text.");
    return { title: title.slice(0, 140), description: description.slice(0, 240), text };
  }
  throw new Error("The website redirected too many times.");
}
