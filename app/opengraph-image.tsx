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
          background: "#f3efe6",
          color: "#161616",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          fontFamily: "Georgia",
        }}
      >
        <div style={{ fontSize: 28 }}>Futurix</div>
        <div style={{ fontSize: 64, lineHeight: 1.05, letterSpacing: -1, maxWidth: 980 }}>
          Voice agents, AI assistants, and custom AI projects.
        </div>
        <div style={{ display: "flex", gap: 28, fontSize: 24 }}>
          <span>Voice Agents</span>
          <span>Custom Projects</span>
          <span>AI Assistants</span>
          <span>AI Enablement</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
