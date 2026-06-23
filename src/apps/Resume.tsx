import { useState } from "react";
import { resume, profile } from "../data/content";

export default function Resume() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="app-body" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 8,
          alignItems: "center",
        }}
      >
        <a
          className="w95-btn"
          href={resume.fileUrl}
          download
          style={{ textDecoration: "none", textAlign: "center" }}
        >
          ⬇ Download PDF
        </a>
        <a
          className="w95-btn"
          href={resume.fileUrl}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none", textAlign: "center" }}
        >
          Open in tab ↗
        </a>
        <span style={{ fontSize: 11, color: "#555", marginLeft: "auto" }}>
          {profile.name}_resume.pdf
        </span>
      </div>

      <p style={{ marginBottom: 8 }}>{resume.summary}</p>

      <div style={{ flex: 1, boxShadow: "var(--bevel-sunken)", background: "var(--w95-white)" }}>
        {failed ? (
          <div style={{ padding: 20, textAlign: "center", color: "#555" }}>
            <p style={{ fontSize: 24, marginBottom: 8 }}>📄</p>
            <p>
              No PDF found at <code>{resume.fileUrl}</code>.
            </p>
            <p style={{ fontSize: 11 }}>
              Drop your resume into <code>/public</code> and update
              <code> resume.fileUrl</code> in <code>content.ts</code>.
            </p>
          </div>
        ) : (
          <object
            data={resume.fileUrl}
            type="application/pdf"
            width="100%"
            height="100%"
            onError={() => setFailed(true)}
          >
            <div style={{ padding: 20 }}>Preview unavailable — use the download button above.</div>
          </object>
        )}
      </div>
    </div>
  );
}
