export function ColorLegend() {
  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        marginBottom: "1rem",
        alignItems: "center",
        color: "white"
      }}
    >
      <LegendItem color="#2563EB" label="Your Classes" />
      <LegendItem color="green" label="Available Classes" />
      <LegendItem color="red" label="Full Classes" />
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <span
        style={{
          display: "inline-block",
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          backgroundColor: color,
        }}
      ></span>
      <span>{label}</span>
    </div>
  );
}
