/* ============================================================
   ★ EDIT THIS FILE ★
   Everything visitors see on SurajOS comes from here.
   Swap in your real details — no component code needs to change.
   ============================================================ */

export const profile = {
  name: "Suraj",
  handle: "suraj",
  title: "Full-Stack & Cloud Developer",
  tagline: "I build backends that scale and interfaces people remember.",
  location: "India",
  email: "suraj@byldd.com",
  avatar: "🧑‍💻",
};

export const about = {
  headline: "Hi, I'm Suraj 👋",
  paragraphs: [
    "I'm a developer who lives somewhere between the database and the pixel. I enjoy designing systems that are clean under the hood and delightful on the surface.",
    "Lately I've been deep in backend architecture — modular storage layers, audit logging, and cloud deployments — while keeping a soft spot for playful frontend experiments (like this one).",
    "When I'm not shipping, I'm usually breaking something on purpose to understand how it works.",
  ],
  quickFacts: [
    { label: "Role", value: "Full-Stack / Cloud" },
    { label: "Focus", value: "Node, Cloud, System Design" },
    { label: "Status", value: "Open to interesting problems" },
  ],
};

export type Project = {
  name: string;
  blurb: string;
  tech: string[];
  link?: string;
  year: string;
};

export const projects: Project[] = [
  {
    name: "SurajOS Portfolio",
    blurb:
      "This very site — a Windows-95 desktop simulated in React, deployed as a static build on AWS EC2 behind nginx.",
    tech: ["React", "TypeScript", "Vite", "EC2"],
    link: "#",
    year: "2026",
  },
  {
    name: "Audit Logging Platform",
    blurb:
      "Tamper-evident, DB-layer audit logging with a hash chain over Mongoose hooks. Pluggable storage (Mongo / S3 / Athena).",
    tech: ["Node.js", "MongoDB", "S3", "Athena"],
    year: "2026",
  },
  {
    name: "Modular Boilerplate",
    blurb:
      "A backend boilerplate with swappable storage providers behind clean interfaces — add a backend without touching business logic.",
    tech: ["Node.js", "TypeScript", "Design Patterns"],
    year: "2025",
  },
];

export type Skill = { name: string; level: number /* 0–100 */; group: string };

export const skills: Skill[] = [
  { name: "TypeScript / JavaScript", level: 90, group: "Languages" },
  { name: "Node.js", level: 88, group: "Backend" },
  { name: "React", level: 82, group: "Frontend" },
  { name: "MongoDB", level: 80, group: "Data" },
  { name: "AWS (EC2, S3)", level: 72, group: "Cloud" },
  { name: "System Design", level: 78, group: "Architecture" },
  { name: "CSS / UI", level: 75, group: "Frontend" },
];

export type Job = {
  role: string;
  company: string;
  period: string;
  points: string[];
};

export const experience: Job[] = [
  {
    role: "Software Developer",
    company: "BYLDD",
    period: "2024 — Present",
    points: [
      "Designed a modular storage layer with swappable Mongo / S3 / Athena backends.",
      "Built a tamper-evident audit-logging system using DB hooks and hash chains.",
      "Owned cloud deployments on AWS EC2.",
    ],
  },
  {
    role: "Junior Developer",
    company: "Previous Co.",
    period: "2022 — 2024",
    points: [
      "Shipped REST APIs and internal tooling.",
      "Improved CI build times and developer experience.",
    ],
  },
];

export const interests = [
  { icon: "🎮", label: "Retro computing & UI design" },
  { icon: "📷", label: "Photography" },
  { icon: "🧩", label: "System design puzzles" },
  { icon: "☕", label: "Coffee + late-night debugging" },
  { icon: "🎸", label: "Music" },
];

export const resume = {
  // Put a real PDF in /public and point here, e.g. "/resume.pdf"
  fileUrl: "/resume.pdf",
  summary:
    "Full-stack developer specializing in scalable backends, cloud deployment, and crafted frontends.",
};

export const links = {
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-username",
  email: "suraj@byldd.com",
};