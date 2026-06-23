import { interests } from "../data/content";

export default function Interests() {
  return (
    <div className="app-body">
      <p style={{ marginBottom: 14, fontSize: 11, color: "#333" }}>
        🎨 Things that keep me curious outside of work.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
          gap: 10,
        }}
      >
        {interests.map((it) => (
          <div
            key={it.label}
            style={{
              background: "var(--w95-gray)",
              boxShadow: "var(--bevel-raised)",
              padding: 14,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 6 }}>{it.icon}</div>
            <div style={{ fontSize: 12 }}>{it.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
