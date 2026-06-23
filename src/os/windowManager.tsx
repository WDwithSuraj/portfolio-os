import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { Rect, WindowState } from "./types";
import { getApp } from "./apps";

type State = { windows: WindowState[]; topZ: number; seq: number };

type Action =
  | { type: "OPEN"; appId: string }
  | { type: "CLOSE"; id: string }
  | { type: "FOCUS"; id: string }
  | { type: "MINIMIZE"; id: string }
  | { type: "TOGGLE_MAX"; id: string; viewport: Rect }
  | { type: "TASKBAR_CLICK"; id: string }
  | { type: "SET_RECT"; id: string; rect: Rect };

const SPAWN_BASE = { x: 64, y: 48 };
const SPAWN_STEP = 26;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "OPEN": {
      const existing = state.windows.find((w) => w.appId === action.appId);
      const z = state.topZ + 1;
      if (existing) {
        return {
          ...state,
          topZ: z,
          windows: state.windows.map((w) =>
            w.id === existing.id ? { ...w, minimized: false, z } : w
          ),
        };
      }
      const app = getApp(action.appId);
      if (!app || !app.component) return state;
      const offset = (state.seq % 6) * SPAWN_STEP;
      const size = app.defaultSize ?? { width: 480, height: 360 };
      const win: WindowState = {
        id: `${action.appId}-${state.seq}`,
        appId: app.id,
        title: app.title,
        icon: app.icon,
        rect: {
          x: SPAWN_BASE.x + offset,
          y: SPAWN_BASE.y + offset,
          width: size.width,
          height: size.height,
        },
        z,
        minimized: false,
        maximized: false,
      };
      return {
        windows: [...state.windows, win],
        topZ: z,
        seq: state.seq + 1,
      };
    }
    case "CLOSE":
      return {
        ...state,
        windows: state.windows.filter((w) => w.id !== action.id),
      };
    case "FOCUS": {
      const z = state.topZ + 1;
      return {
        ...state,
        topZ: z,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, z, minimized: false } : w
        ),
      };
    }
    case "MINIMIZE":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, minimized: true } : w
        ),
      };
    case "TASKBAR_CLICK": {
      const w = state.windows.find((x) => x.id === action.id);
      if (!w) return state;
      const isTop = w.z === state.topZ && !w.minimized;
      if (isTop) {
        return {
          ...state,
          windows: state.windows.map((x) =>
            x.id === action.id ? { ...x, minimized: true } : x
          ),
        };
      }
      const z = state.topZ + 1;
      return {
        ...state,
        topZ: z,
        windows: state.windows.map((x) =>
          x.id === action.id ? { ...x, z, minimized: false } : x
        ),
      };
    }
    case "TOGGLE_MAX": {
      const z = state.topZ + 1;
      return {
        ...state,
        topZ: z,
        windows: state.windows.map((w) => {
          if (w.id !== action.id) return w;
          if (w.maximized) {
            return {
              ...w,
              maximized: false,
              rect: w.prevRect ?? w.rect,
              z,
            };
          }
          return {
            ...w,
            maximized: true,
            prevRect: w.rect,
            rect: action.viewport,
            z,
          };
        }),
      };
    }
    case "SET_RECT":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, rect: action.rect } : w
        ),
      };
    default:
      return state;
  }
}

type WM = {
  windows: WindowState[];
  topZ: number;
  open: (appId: string) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  toggleMax: (id: string, viewport: Rect) => void;
  taskbarClick: (id: string) => void;
  setRect: (id: string, rect: Rect) => void;
};

const Ctx = createContext<WM | null>(null);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    windows: [],
    topZ: 10,
    seq: 0,
  });

  const value = useMemo<WM>(
    () => ({
      windows: state.windows,
      topZ: state.topZ,
      open: (appId) => dispatch({ type: "OPEN", appId }),
      close: (id) => dispatch({ type: "CLOSE", id }),
      focus: (id) => dispatch({ type: "FOCUS", id }),
      minimize: (id) => dispatch({ type: "MINIMIZE", id }),
      toggleMax: (id, viewport) => dispatch({ type: "TOGGLE_MAX", id, viewport }),
      taskbarClick: (id) => dispatch({ type: "TASKBAR_CLICK", id }),
      setRect: (id, rect) => dispatch({ type: "SET_RECT", id, rect }),
    }),
    [state]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWM(): WM {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWM must be used within WindowManagerProvider");
  return ctx;
}
