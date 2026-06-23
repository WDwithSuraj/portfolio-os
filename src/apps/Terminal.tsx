import { useEffect, useRef, useState } from "react";
import { useWM } from "../os/windowManager";
import { APPS } from "../os/apps";
import { profile, links } from "../data/content";

type Line = { kind: "in" | "out"; text: string };

const BANNER = [
  "SurajOS [Version 4.10.1998]",
  "(c) Suraj Corp. All rights reserved.",
  "",
  "Type 'help' for a list of commands.",
];

export default function Terminal() {
  const wm = useWM();
  const [history, setHistory] = useState<Line[]>(
    BANNER.map((text) => ({ kind: "out", text }))
  );
  const [input, setInput] = useState("");
  const [past, setPast] = useState<string[]>([]);
  const [pIdx, setPIdx] = useState(0);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView();
  }, [history]);

  const print = (lines: string[]) =>
    setHistory((h) => [...h, ...lines.map((text) => ({ kind: "out" as const, text }))]);

  const openable = APPS.filter((a) => a.component && !a.hidden);

  function run(raw: string) {
    const cmd = raw.trim();
    setHistory((h) => [...h, { kind: "in", text: `C:\\${profile.handle}> ${cmd}` }]);
    if (!cmd) return;
    setPast((p) => [...p, cmd]);
    setPIdx(past.length + 1);

    const [name, ...args] = cmd.split(/\s+/);
    switch (name.toLowerCase()) {
      case "help":
        print([
          "Available commands:",
          "  help            show this list",
          "  whoami          who am I",
          "  ls              list apps you can open",
          "  open <app>      launch an app window (e.g. open projects)",
          "  about           print bio",
          "  skills          list skills",
          "  contact         show contact links",
          "  github          open GitHub profile",
          "  echo <text>     print text",
          "  clear           clear the screen",
        ]);
        break;
      case "whoami":
        print([`${profile.name} — ${profile.title}`, profile.tagline]);
        break;
      case "ls":
        print(openable.map((a) => `  ${a.icon}  ${a.id.padEnd(12)} ${a.title}`));
        break;
      case "open": {
        const target = args[0]?.toLowerCase();
        const app = openable.find((a) => a.id === target);
        if (app) {
          wm.open(app.id);
          print([`Launching ${app.title}...`]);
        } else {
          print([`open: app '${args[0] ?? ""}' not found. Try 'ls'.`]);
        }
        break;
      }
      case "about":
        wm.open("about");
        print(["Opening About..."]);
        break;
      case "skills":
        wm.open("skills");
        print(["Opening Skills..."]);
        break;
      case "contact":
        print([
          `email    ${profile.email}`,
          `github   ${links.github}`,
          `linkedin ${links.linkedin}`,
        ]);
        break;
      case "github":
        print(["Opening GitHub in a new tab..."]);
        window.open(links.github, "_blank", "noreferrer");
        break;
      case "echo":
        print([args.join(" ")]);
        break;
      case "clear":
        setHistory([]);
        break;
      case "sudo":
        print(["Nice try. 😏"]);
        break;
      default:
        print([`'${name}' is not recognized. Type 'help'.`]);
    }
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const i = Math.max(0, pIdx - 1);
      setPIdx(i);
      setInput(past[i] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const i = Math.min(past.length, pIdx + 1);
      setPIdx(i);
      setInput(past[i] ?? "");
    }
  }

  return (
    <div
      onMouseDown={() => inputRef.current?.focus()}
      style={{
        height: "100%",
        background: "#000",
        color: "#c0c0c0",
        fontFamily: "var(--font-mono)",
        fontSize: 18,
        lineHeight: 1.25,
        padding: 8,
        overflow: "auto",
        cursor: "text",
      }}
    >
      {history.map((l, i) => (
        <div key={i} style={{ whiteSpace: "pre-wrap", color: l.kind === "in" ? "#fff" : "#c0c0c0" }}>
          {l.text}
        </div>
      ))}
      <div style={{ display: "flex" }}>
        <span style={{ color: "#fff" }}>C:\{profile.handle}&gt;&nbsp;</span>
        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          spellCheck={false}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#fff",
            fontFamily: "var(--font-mono)",
            fontSize: 18,
          }}
        />
      </div>
      <div ref={endRef} />
    </div>
  );
}
