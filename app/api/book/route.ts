import { NextResponse } from "next/server";

export const runtime = "nodejs";

const days = new Set(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]);
const slots = new Set(["Morning", "Afternoon", "Evening"]);

export async function POST(request: Request) {
  let body: { name?: string; contact?: string; day?: string; slot?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name || "").trim().slice(0, 120);
  const contact = String(body.contact || "").trim().slice(0, 160);
  const day = String(body.day || "").trim();
  const slot = String(body.slot || "").trim();
  if (!name || !contact || !days.has(day) || !slots.has(slot)) {
    return NextResponse.json({ error: "Name, contact, day, and time are required." }, { status: 400 });
  }

  const text = [`Name: ${name}`, `Phone or email: ${contact}`, `Day: ${day}`, `Time: ${slot}`].join("\n");
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.BOOK_FROM_EMAIL || "Futurix <onboarding@resend.dev>",
        to: ["segev@futurixs.com"],
        subject: "Book a free 15-minute live setup",
        text,
      }),
    });
    if (!response.ok) {
      const detail = await response.text();
      console.error("book resend failed", response.status, detail.slice(0, 400));
      return NextResponse.json({ error: "Could not send the request. Try again." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, delivered: true });
  }

  console.info("book lead stored in server log. No email provider is configured.", {
    name,
    contact,
    day,
    slot,
  });
  return NextResponse.json({ ok: true, delivered: false, missingProvider: "RESEND_API_KEY" });
}
