import type { AppDef } from "./types";
import { links } from "../data/content";
import About from "../apps/About";
import Projects from "../apps/Projects";
import Skills from "../apps/Skills";
import Experience from "../apps/Experience";
import Interests from "../apps/Interests";
import Resume from "../apps/Resume";
import Contact from "../apps/Contact";
import Terminal from "../apps/Terminal";

export const APPS: AppDef[] = [
  { id: "about", title: "About Me", icon: "📝", component: About, defaultSize: { width: 460, height: 420 } },
  { id: "projects", title: "Projects", icon: "📁", component: Projects, defaultSize: { width: 560, height: 380 } },
  { id: "skills", title: "Skills", icon: "📊", component: Skills, defaultSize: { width: 440, height: 420 } },
  { id: "experience", title: "Experience", icon: "📜", component: Experience, defaultSize: { width: 500, height: 420 } },
  { id: "interests", title: "Interests", icon: "🎨", component: Interests, defaultSize: { width: 480, height: 320 } },
  { id: "resume", title: "Resume", icon: "📄", component: Resume, defaultSize: { width: 560, height: 480 } },
  { id: "terminal", title: "Terminal", icon: "💻", component: Terminal, defaultSize: { width: 560, height: 360 } },
  { id: "contact", title: "Contact", icon: "✉️", component: Contact, defaultSize: { width: 420, height: 340 } },
  { id: "github", title: "GitHub", icon: "🐙", externalUrl: links.github },
];

const byId = new Map(APPS.map((a) => [a.id, a]));

export function getApp(id: string): AppDef | undefined {
  return byId.get(id);
}
