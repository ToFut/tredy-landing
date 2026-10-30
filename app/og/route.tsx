import { ImageResponse } from "next/og";

export function GET(request: Request) {
  const title = new URL(request.url).searchParams.get("title")?.slice(0, 90) || "Futurix";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#07090d",
          color: "#f6f3ec",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#dff56a",
              color: "#12141a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            F
          </div>
          Futurix
        </div>
        <div style={{ fontSize: 60, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>{title}</div>
        <div style={{ fontSize: 24, color: "#dff56a" }}>futurixs.com</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
