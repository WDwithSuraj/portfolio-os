import { useState } from "react";
import Boot from "./Boot";
import Desktop from "./Desktop";
import { WindowManagerProvider } from "./windowManager";
import "./os.css";

export default function OS() {
  const [booted, setBooted] = useState(false);

  if (!booted) return <Boot onEnter={() => setBooted(true)} />;

  return (
    <WindowManagerProvider>
      <Desktop />
    </WindowManagerProvider>
  );
}
