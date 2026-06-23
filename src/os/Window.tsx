import { Rnd } from "react-rnd";
import type { Rect, WindowState } from "./types";
import { getApp } from "./apps";
import { useWM } from "./windowManager";

const TASKBAR_H = 36;

export default function Window({ win }: { win: WindowState }) {
  const wm = useWM();
  const app = getApp(win.appId);
  const Comp = app?.component;
  if (!Comp) return null;

  const isTop = win.z === wm.topZ;

  const viewport: Rect = {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight - TASKBAR_H,
  };

  return (
    <Rnd
      size={{ width: win.rect.width, height: win.rect.height }}
      position={{ x: win.rect.x, y: win.rect.y }}
      bounds="parent"
      dragHandleClassName="w95-titlebar"
      minWidth={260}
      minHeight={160}
      disableDragging={win.maximized}
      enableResizing={!win.maximized}
      style={{
        zIndex: win.z,
        display: win.minimized ? "none" : "flex",
      }}
      onMouseDown={() => !isTop && wm.focus(win.id)}
      onDragStop={(_e, d) => wm.setRect(win.id, { ...win.rect, x: d.x, y: d.y })}
      onResizeStop={(_e, _dir, ref, _delta, pos) =>
        wm.setRect(win.id, {
          x: pos.x,
          y: pos.y,
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        })
      }
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "var(--w95-gray)",
          boxShadow: "var(--bevel-raised)",
          display: "flex",
          flexDirection: "column",
          padding: 3,
        }}
      >
        <div
          className={`w95-titlebar${isTop ? "" : " inactive"}`}
          onDoubleClick={() => wm.toggleMax(win.id, viewport)}
        >
          <span className="w95-titlebar__icon" style={{ fontSize: 13 }}>
            {win.icon}
          </span>
          <span className="w95-titlebar__text">{win.title}</span>
          <span className="w95-titlebar__controls">
            <button
              className="w95-ctrl-btn"
              title="Minimize"
              onClick={() => wm.minimize(win.id)}
            >
              _
            </button>
            <button
              className="w95-ctrl-btn"
              title="Maximize"
              onClick={() => wm.toggleMax(win.id, viewport)}
            >
              □
            </button>
            <button
              className="w95-ctrl-btn"
              title="Close"
              onClick={() => wm.close(win.id)}
            >
              ✕
            </button>
          </span>
        </div>

        <div style={{ flex: 1, overflow: "hidden", marginTop: 2 }}>
          <Comp />
        </div>
      </div>
    </Rnd>
  );
}
