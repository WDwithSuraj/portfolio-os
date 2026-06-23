# SurajOS — an interactive portfolio

A personal portfolio built as a **Windows-95 style desktop operating system** in the
browser. It boots, shows a desktop with icons, and every category (About, Projects,
Skills, Experience, Interests, Resume, Contact) opens in a draggable, resizable window.
There's even a working terminal.

Built with **Vite + React + TypeScript**. Compiles to a static `dist/` folder, so it
hosts anywhere — designed to be deployed on **AWS EC2 + nginx** (see `DEPLOY.md`).

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # static output in ./dist
npm run preview    # preview the production build
```

## Editing your content

**All portfolio content lives in one file:** [`src/data/content.ts`](src/data/content.ts).
Change your name, bio, projects, skills, experience, interests, and links there — no
component code needs to change.

- **Resume:** drop a `resume.pdf` into [`public/`](public/) (the Resume window loads it).
- **GitHub / LinkedIn / email:** edit the `links` object in `content.ts`.

## How it's structured

```
src/
  data/content.ts      ← ★ your info (edit this)
  os/
    OS.tsx             top-level: boot screen → desktop
    Boot.tsx           BIOS + login screen
    Desktop.tsx        wallpaper, icon grid, window surface, taskbar
    windowManager.tsx  open/close/focus/min/max window state (React context)
    Window.tsx         draggable/resizable window chrome (react-rnd)
    Taskbar.tsx        Start button, open-window buttons, clock
    StartMenu.tsx      Start menu
    apps.tsx           registry: which icon opens which app
  apps/                one component per app window
    About / Projects / Skills / Experience / Interests / Resume / Contact / Terminal
  styles/win95.css     reusable Win95 primitives (buttons, bevels, title bars)
  index.css            design tokens (the 95 palette + bevels) + reset
  os/os.css            desktop / taskbar / start menu / boot styles
```

### Adding a new "app"

1. Create `src/apps/MyApp.tsx`.
2. Register it in `src/os/apps.tsx` (`id`, `title`, `icon`, `component`, `defaultSize`).

It automatically gets a desktop icon, a Start-menu entry, a taskbar button, and a
`open myapp` terminal command.

## Try the terminal

Open the **Terminal** app and type `help`. Commands include `whoami`, `ls`,
`open projects`, `skills`, `contact`, `github`, `clear`.

## Deployment

See [`DEPLOY.md`](DEPLOY.md) for step-by-step AWS EC2 + nginx hosting (no secrets needed
— it's a static site).
