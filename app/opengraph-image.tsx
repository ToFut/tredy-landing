import { ImageResponse } from "next/og";

export const alt =
  "Futurix builds voice agents, AI assistants, and custom AI projects, and helps companies enable AI.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#1d1d1f",
              color: "#fff",
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
          We set up AI so you never miss a customer.
        </div>
        <div style={{ fontSize: 24, color: "#0071e3" }}>Book a free 15 min call · futurixs.com</div>
      </div>
    ),
    { ...size },
  );
}
