import { ImageResponse } from "next/og";

export const alt = "AayushBuilds — Aayush Singh, Developer & Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "88px",
          backgroundColor: "#090B0A",
          backgroundImage:
            "linear-gradient(rgba(40,51,44,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(40,51,44,0.55) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#39FF88",
            fontSize: 26,
            letterSpacing: 8,
          }}
        >
          AAYUSHBUILDS
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            color: "#F2F5F2",
            fontSize: 76,
            lineHeight: 1.12,
            maxWidth: 980,
          }}
        >
          Building ideas into working software.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 30,
            color: "#929B94",
            fontSize: 30,
          }}
        >
          Aayush Singh — full-stack | AI systems | product engineering
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            height: 2,
            width: 340,
            backgroundColor: "#28332C",
          }}
        />
        <div
          style={{
            display: "flex",
            marginTop: 24,
            color: "#83C99B",
            fontSize: 24,
            gap: 36,
          }}
        >
          <div style={{ display: "flex" }}>github.com/aayush-as69</div>
          <div style={{ display: "flex" }}>linkedin.com/in/ays669</div>
        </div>
      </div>
    ),
    size
  );
}
