import { about, profile } from "../data/content";

export default function About() {
  return (
    <div className="app-body">
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div
          style={{
            fontSize: 48,
            lineHeight: 1,
            background: "var(--w95-white)",
            boxShadow: "var(--bevel-sunken)",
            padding: 10,
          }}
        >
          {profile.avatar}
        </div>
        <div>
          <h2 style={{ marginBottom: 2 }}>{about.headline}</h2>
          <div style={{ color: "var(--w95-navy)", fontWeight: "bold" }}>
            {profile.title}
          </div>
          <div style={{ fontSize: 11, color: "#333" }}>
            📍 {profile.location} · ✉ {profile.email}
          </div>
        </div>
      </div>

      <hr style={{ margin: "12px 0", border: 0, borderTop: "1px solid var(--w95-gray-dark)" }} />

      {about.paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}

      <fieldset className="w95-fieldset" style={{ marginTop: 10 }}>
        <legend>Quick facts</legend>
        <table style={{ width: "100%", fontSize: 12 }}>
          <tbody>
            {about.quickFacts.map((f) => (
              <tr key={f.label}>
                <td style={{ fontWeight: "bold", padding: "2px 12px 2px 0", whiteSpace: "nowrap" }}>
                  {f.label}
                </td>
                <td style={{ padding: "2px 0" }}>{f.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </fieldset>
    </div>
  );
}
