import { APPS } from "./apps";
import { profile, links } from "../data/content";
import { useWM } from "./windowManager";

export default function StartMenu({ onClose }: { onClose: () => void }) {
  const wm = useWM();

  function launch(id: string) {
    const app = APPS.find((a) => a.id === id);
    if (app?.externalUrl) window.open(app.externalUrl, "_blank", "noreferrer");
    else wm.open(id);
    onClose();
  }

  return (
    <>
      <div className="startmenu-backdrop" onClick={onClose} />
      <div className="startmenu" role="menu">
        <div className="startmenu__rail">
          Suraj<span>OS</span>
        </div>
        <ul className="startmenu__items">
          {APPS.map((a) => (
            <li key={a.id} onClick={() => launch(a.id)}>
              <span className="startmenu__glyph">{a.icon}</span>
              {a.title}
              {a.externalUrl ? <span className="startmenu__ext">↗</span> : null}
            </li>
          ))}
          <li className="startmenu__sep" />
          <li onClick={() => { window.location.href = `mailto:${profile.email}`; onClose(); }}>
            <span className="startmenu__glyph">✉</span>
            Email me
          </li>
          <li onClick={() => { window.open(links.github, "_blank", "noreferrer"); onClose(); }}>
            <span className="startmenu__glyph">🐙</span>
            GitHub
          </li>
        </ul>
      </div>
    </>
  );
}
