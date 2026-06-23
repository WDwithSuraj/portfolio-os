import { links, profile } from "../data/content";

export default function Contact() {
  const rows = [
    { icon: "✉", label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: "🐙", label: "GitHub", value: links.github, href: links.github },
    { icon: "💼", label: "LinkedIn", value: links.linkedin, href: links.linkedin },
  ];

  return (
    <div className="app-body">
      <h2 style={{ marginBottom: 4 }}>Let's talk 👋</h2>
      <p style={{ marginBottom: 14 }}>{profile.tagline}</p>

      {rows.map((r) => (
        <div
          key={r.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "var(--w95-gray)",
            boxShadow: "var(--bevel-raised)",
            padding: "8px 12px",
            marginBottom: 8,
          }}
        >
          <span style={{ fontSize: 20 }}>{r.icon}</span>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div style={{ fontSize: 11, color: "#555" }}>{r.label}</div>
            <a
              href={r.href}
              target="_blank"
              rel="noreferrer"
              style={{
                color: "var(--w95-navy)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "block",
              }}
            >
              {r.value}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
