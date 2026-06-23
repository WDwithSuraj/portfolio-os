import { useState } from "react";
import type { AppDef } from "./types";
import { useWM } from "./windowManager";

export default function DesktopIcon({ app }: { app: AppDef }) {
  const wm = useWM();
  const [selected, setSelected] = useState(false);

  function activate() {
    if (app.externalUrl) {
      window.open(app.externalUrl, "_blank", "noreferrer");
    } else {
      wm.open(app.id);
    }
  }

  return (
    <button
      className="desktop-icon"
      aria-pressed={selected}
      onClick={() => setSelected(true)}
      onDoubleClick={activate}
      onBlur={() => setSelected(false)}
      onKeyDown={(e) => e.key === "Enter" && activate()}
    >
      <span className="desktop-icon__glyph">{app.icon}</span>
      <span className={`desktop-icon__label${selected ? " sel" : ""}`}>
        {app.title}
      </span>
    </button>
  );
}
