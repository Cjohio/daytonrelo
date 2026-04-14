import { ImageResponse } from "next/og";

export const runtime     = "edge";
export const alt         = "Dayton Relo — All things Dayton Ohio";
export const size        = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1A1A1A",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
        }}
      >
        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://daytonrelo.com/logo.png"
          width={420}
          height={120}
          style={{ objectFit: "contain" }}
          alt="Dayton Relo"
        />

        {/* Tagline */}
        <div
          style={{
            color: "#C9A84C",
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: "-0.01em",
          }}
        >
          All things Dayton Ohio
        </div>

        {/* URL hint */}
        <div
          style={{
            color: "#666",
            fontSize: 22,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          daytonrelo.com
        </div>
      </div>
    ),
    { ...size }
  );
}
