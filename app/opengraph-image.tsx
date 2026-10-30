import { ImageResponse } from "next/og";

export const alt =
  "Futurix builds AI voice receptionists that answer every call, book appointments, and follow up for local businesses.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
              fontWeight: 700,
            }}
          >
            F
          </div>
          Futurix
        </div>
        <div style={{ fontSize: 60, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>
          AI receptionists that answer every call.
        </div>
        <div style={{ fontSize: 24, color: "#dff56a" }}>Book a free 15-minute live setup</div>
      </div>
    ),
    { ...size },
  );
}
