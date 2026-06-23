import { skills } from "../data/content";

export default function Skills() {
  return (
    <div className="app-body">
      <p style={{ marginBottom: 12, fontSize: 11, color: "#333" }}>
        ⚙ System resource monitor — skill utilization
      </p>
      {skills.map((s) => (
        <div key={s.name} style={{ marginBottom: 10 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              marginBottom: 3,
            }}
          >
            <span>
              <strong>{s.name}</strong>{" "}
              <span style={{ color: "#666", fontSize: 11 }}>· {s.group}</span>
            </span>
            <span>{s.level}%</span>
          </div>
          {/* Sunken track + segmented fill (classic 95 progress bar) */}
          <div
            style={{
              background: "var(--w95-white)",
              boxShadow: "var(--bevel-sunken)",
              padding: 2,
              height: 22,
            }}
          >
            <div
              style={{
                width: `${s.level}%`,
                height: "100%",
                background:
                  "repeating-linear-gradient(90deg, var(--w95-navy) 0 12px, transparent 12px 14px)",
                transition: "width .6s ease",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
