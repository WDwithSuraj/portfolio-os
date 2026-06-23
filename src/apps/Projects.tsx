import { useState } from "react";
import { projects } from "../data/content";

export default function Projects() {
  const [selected, setSelected] = useState(0);
  const p = projects[selected];

  return (
    <div className="app-body" style={{ padding: 0, display: "flex", height: "100%" }}>
      {/* Folder tree / file list */}
      <div
        style={{
          width: 170,
          flex: "0 0 170px",
          background: "var(--w95-white)",
          boxShadow: "var(--bevel-sunken)",
          margin: 8,
          marginRight: 4,
          overflow: "auto",
        }}
      >
        <ul className="w95-list" style={{ boxShadow: "none", background: "transparent" }}>
          {projects.map((proj, i) => (
            <li
              key={proj.name}
              className={i === selected ? "selected" : ""}
              onClick={() => setSelected(i)}
            >
              📁 {proj.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Detail pane */}
      <div style={{ flex: 1, overflow: "auto", padding: "12px 12px 12px 6px" }}>
        <h2 style={{ marginBottom: 2 }}>{p.name}</h2>
        <div style={{ fontSize: 11, color: "#555", marginBottom: 10 }}>📅 {p.year}</div>
        <p>{p.blurb}</p>
        <div style={{ marginTop: 10 }}>
          {p.tech.map((t) => (
            <span key={t} className="w95-chip">
              {t}
            </span>
          ))}
        </div>
        {p.link && (
          <div style={{ marginTop: 14 }}>
            <a className="w95-btn" href={p.link} target="_blank" rel="noreferrer" style={{ display: "inline-block", textDecoration: "none", textAlign: "center" }}>
              Open ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
