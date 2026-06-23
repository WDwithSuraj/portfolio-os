import { APPS } from "./apps";
import DesktopIcon from "./DesktopIcon";
import Window from "./Window";
import Taskbar from "./Taskbar";
import { useWM } from "./windowManager";

export default function Desktop() {
  const wm = useWM();
  const icons = APPS.filter((a) => !a.hidden);

  return (
    <div className="desktop">
      <div className="desktop__icons">
        {icons.map((app) => (
          <DesktopIcon key={app.id} app={app} />
        ))}
      </div>

      <div className="desktop__surface">
        {wm.windows.map((w) => (
          <Window key={w.id} win={w} />
        ))}
      </div>

      <Taskbar />
    </div>
  );
}
