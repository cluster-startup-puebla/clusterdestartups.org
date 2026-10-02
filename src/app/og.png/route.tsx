import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#16284f",
        color: "#ffffff",
        padding: "72px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "#e8186a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            color: "#ffffff",
          }}
        >
          C
        </div>
        <div style={{ marginLeft: 20, fontSize: 28, letterSpacing: 2 }}>CSI</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 68, lineHeight: 1.05, maxWidth: 980 }}>
          Clúster de Startups e Innovación
        </div>
        <div style={{ marginTop: 28, fontSize: 36, color: "#ff4d93" }}>Startups en Puebla</div>
      </div>
      <div style={{ fontSize: 26, color: "#b8c0ce" }}>clusterdestartups.org</div>
    </div>,
    { width: 1200, height: 630 },
  );
}
