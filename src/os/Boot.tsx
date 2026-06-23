import { useEffect, useState } from "react";
import { profile } from "../data/content";

const BIOS = [
  "SurajOS BIOS v4.10 — Suraj Corp.",
  "Detecting hardware ............ OK",
  "Memory test: 640K base, 64M extended .. OK",
  "Initializing portfolio modules ...... OK",
  "Mounting C:\\suraj ................... OK",
  "Starting SurajOS ...",
];

export default function Boot({ onEnter }: { onEnter: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setLines((prev) => [...prev, BIOS[i]]);
      i += 1;
      if (i >= BIOS.length) {
        clearInterval(t);
        setTimeout(() => setReady(true), 500);
      }
    }, 320);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="boot" onClick={() => ready && onEnter()}>
      {!ready ? (
        <pre className="boot__bios">
          {lines.join("\n")}
          <span className="boot__cursor">█</span>
        </pre>
      ) : (
        <div className="boot__login">
          <div className="boot__logo">
            🪟 Suraj<span>OS</span>
          </div>
          <div className="boot__avatar">{profile.avatar}</div>
          <div className="boot__user">{profile.name}</div>
          <div className="boot__sub">{profile.title}</div>
          <button className="w95-btn boot__enter" onClick={onEnter}>
            ► Click to log in
          </button>
          <div className="boot__hint">Double-click desktop icons to explore</div>
        </div>
      )}
    </div>
  );
}
