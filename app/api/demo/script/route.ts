import { NextResponse } from "next/server";
import { allowDemo, clientIp, readPublicSite } from "@/lib/demo/guard";
import { buildScript } from "@/lib/demo/script";

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (!(await allowDemo(ip, "script", 6))) {
    return NextResponse.json({ error: "Demo limit reached. Try again in an hour." }, { status: 429 });
  }

  let body: { website?: string; industry?: string; businessName?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send the business details as JSON." }, { status: 400 });
  }

  const businessName = String(body.businessName || "").trim().slice(0, 80);
  const industry = String(body.industry || "other").trim().slice(0, 40);
  if (!businessName) {
    return NextResponse.json({ error: "Add a business name." }, { status: 400 });
  }

  let websiteText = "";
  let siteTitle = "";
  let siteDescription = "";
  const website = String(body.website || "").trim();
  if (website) {
    try {
      const page = await readPublicSite(website);
      websiteText = page.text;
      siteTitle = page.title;
      siteDescription = page.description;
    } catch {
      websiteText = "";
    }
  }

  const script = await buildScript({ industry, businessName, websiteText, siteTitle, siteDescription });
  return NextResponse.json(script);
}
