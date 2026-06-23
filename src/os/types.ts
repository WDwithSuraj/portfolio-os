import type { ComponentType } from "react";

export type Rect = { x: number; y: number; width: number; height: number };

export type AppDef = {
  id: string;
  title: string;
  icon: string; // emoji
  /** Render an external link instead of a window when set */
  externalUrl?: string;
  component?: ComponentType;
  defaultSize?: { width: number; height: number };
  /** Hide from the desktop grid (still openable from elsewhere) */
  hidden?: boolean;
};

export type WindowState = {
  id: string;
  appId: string;
  title: string;
  icon: string;
  rect: Rect;
  z: number;
  minimized: boolean;
  maximized: boolean;
  prevRect?: Rect;
};
