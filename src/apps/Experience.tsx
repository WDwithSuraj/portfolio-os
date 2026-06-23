import { experience } from "../data/content";

export default function Experience() {
  return (
    <div className="app-body">
      <p style={{ marginBottom: 12, fontSize: 11, color: "#333" }}>
        📜 experience.log — career history
      </p>
      {experience.map((job) => (
        <fieldset className="w95-fieldset" key={job.role + job.company}>
          <legend>
            {job.role} @ {job.company}
          </legend>
          <div style={{ fontSize: 11, color: "#555", marginBottom: 8 }}>🕑 {job.period}</div>
          <ul style={{ paddingLeft: 18 }}>
            {job.points.map((pt, i) => (
              <li key={i} style={{ marginBottom: 4 }}>
                {pt}
              </li>
            ))}
          </ul>
        </fieldset>
      ))}
    </div>
  );
}
