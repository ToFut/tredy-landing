import { ImageResponse } from "next/og";

export function GET(request: Request) {
  const title = new URL(request.url).searchParams.get("title")?.slice(0, 90) || "Futurix";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#ffffff",
          color: "#1d1d1f",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
        }}
      >
        <div style={{ fontSize: 28, color: "#6e6e73" }}>Futurix</div>
        <div style={{ fontSize: 64, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>{title}</div>
        <div style={{ fontSize: 24, color: "#0071e3" }}>futurixs.com</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
