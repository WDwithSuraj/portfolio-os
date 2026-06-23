import { useEffect, useState } from "react";
import { useWM } from "./windowManager";
import StartMenu from "./StartMenu";

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000 * 15);
    return () => clearInterval(t);
  }, []);
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function Taskbar() {
  const wm = useWM();
  const [menuOpen, setMenuOpen] = useState(false);
  const time = useClock();

  return (
    <>
      {menuOpen && <StartMenu onClose={() => setMenuOpen(false)} />}
      <div className="taskbar">
        <button
          className={`taskbar__start${menuOpen ? " active" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="taskbar__start-logo">🪟</span>
          <span>Start</span>
        </button>

        <div className="taskbar__divider" />

        <div className="taskbar__windows">
          {wm.windows.map((w) => {
            const active = w.z === wm.topZ && !w.minimized;
            return (
              <button
                key={w.id}
                className={`taskbar__item${active ? " active" : ""}`}
                onClick={() => wm.taskbarClick(w.id)}
                title={w.title}
              >
                <span>{w.icon}</span>
                <span className="taskbar__item-label">{w.title}</span>
              </button>
            );
          })}
        </div>

        <div className="taskbar__tray">
          <span className="taskbar__tray-icon">🔊</span>
          <span className="taskbar__clock">{time}</span>
        </div>
      </div>
    </>
  );
}
