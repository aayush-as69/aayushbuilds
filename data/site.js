// Central site data — personal identity, navigation, skills, experience.
// Every fact here comes from the supplied resume information or was verified
// directly against Aayush's public GitHub repositories.

export const profile = {
  name: "Aayush Singh",
  brand: "AayushBuilds",
  role: "Computer Science Engineering Student · Developer · Builder",
  tagline: "Building software that solves problems, not just demos.",
  email: "aayush669.as@gmail.com",
  github: "https://github.com/aayush-as69",
  githubHandle: "aayush-as69",
  linkedin: "https://www.linkedin.com/in/ays669",
  linkedinHandle: "ays669",
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aayushbuilds.vercel.app";

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export const hero = {
  eyebrow: "Computer Science Engineering Student · Developer · Builder",
  titleTop: "Building ideas into",
  titleAccent: "working software.",
  copy: "I'm Aayush Singh. I build web applications, AI-powered systems, and developer-focused products. I enjoy turning complex ideas into practical, usable software.",
  actions: [
    { label: "Explore My Work", href: "#projects", primary: true },
    { label: "Let's Connect", href: "#contact" },
    { label: "View GitHub", href: profile.github, external: true },
  ],
  terminal: {
    user: "aayush@builds",
    blocks: [
      { cmd: "whoami", out: ["aayush.singh"] },
      { cmd: "focus", out: ["full-stack", "AI systems", "product engineering"] },
      { cmd: "status", out: ["building..."] },
    ],
  },
};

export const about = {
  title: "A little about the builder.",
  paragraphs: [
    "I'm a Computer Science Engineering student at Galgotias College of Engineering and Technology. I enjoy building software across the stack, exploring AI integrations, and designing systems that go beyond surface-level functionality.",
    "My interests include full-stack development, backend engineering, AI-assisted workflows, system design, and building useful products.",
  ],
  interestChips: [
    "Full-stack development",
    "Backend engineering",
    "AI-assisted workflows",
    "System design",
    "Useful products",
  ],
  note: "Facts on this page come from Aayush's resume and his public GitHub repositories — nothing inflated.",
};

export const education = {
  degree: "Bachelor of Technology — Computer Science Engineering",
  school: "Galgotias College of Engineering and Technology",
  years: "2025–2029",
};

export const leadership = {
  role: "Class Representative",
  org: "Galgotias College of Engineering and Technology",
  points: [
    "Serve as the primary communication link between faculty and students",
    "Organise classmates around schedules, submissions and academic activities",
    "Encourage collaborative learning and peer support across the batch",
  ],
};

export const quickFacts = [
  { label: "Languages", value: "English · Hindi" },
  { label: "Currently", value: "Building AI-integrated products and this portfolio" },
];

// Skill sources: "resume" = confirmed from the resume,
// "repo" = verified in public repositories, "site" = used to build this site.
export const skillGroups = [
  {
    title: "Languages",
    icon: "code",
    blurb: "Core languages my repositories are actually written in.",
    items: [
      { label: "Python", src: "resume" },
      { label: "C", src: "resume" },
      { label: "JavaScript", src: "repo" },
      { label: "HTML", src: "resume" },
      { label: "CSS", src: "resume" },
      { label: "SQL", src: "repo" },
    ],
  },
  {
    title: "Frontend",
    icon: "window",
    blurb: "React and Next.js apps — including this site.",
    items: [
      { label: "React", src: "repo" },
      { label: "Next.js", src: "repo" },
      { label: "Vite", src: "repo" },
      { label: "Tailwind CSS", src: "site" },
    ],
  },
  {
    title: "Backend",
    icon: "server",
    blurb: "APIs and realtime services across three frameworks.",
    items: [
      { label: "Node.js", src: "repo" },
      { label: "Express", src: "repo" },
      { label: "Flask", src: "resume" },
      { label: "FastAPI", src: "repo" },
      { label: "REST APIs", src: "repo" },
      { label: "Socket.IO", src: "repo" },
    ],
  },
  {
    title: "Databases",
    icon: "database",
    blurb: "Relational, document and vector stores used across builds.",
    items: [
      { label: "MySQL", src: "resume" },
      { label: "PostgreSQL", src: "repo" },
      { label: "pgvector", src: "repo" },
      { label: "MongoDB", src: "repo" },
      { label: "SQLite", src: "repo" },
      { label: "SQLAlchemy", src: "repo" },
      { label: "Drizzle ORM", src: "repo" },
    ],
  },
  {
    title: "AI & Retrieval",
    icon: "brain",
    wide: true,
    blurb:
      "The focus of recent builds — grounded LLM systems where retrieval is verified and the human approves the output.",
    items: [
      { label: "RAG pipelines", src: "repo" },
      { label: "Gemini API", src: "repo" },
      { label: "OpenAI-compatible LLMs", src: "repo" },
      { label: "Anthropic API", src: "repo" },
      { label: "TF-IDF / cosine retrieval", src: "repo" },
      { label: "Speech STT / TTS", src: "repo" },
    ],
  },
  {
    title: "Tooling & Infra",
    icon: "wrench",
    blurb: "CI, containers, testing and deployment, repo-verified.",
    items: [
      { label: "Git & GitHub", src: "repo" },
      { label: "GitHub Actions CI", src: "repo" },
      { label: "Docker", src: "repo" },
      { label: "Vercel", src: "repo" },
      { label: "Render", src: "repo" },
      { label: "Pytest / Playwright", src: "repo" },
      { label: "IoT fundamentals", src: "resume" },
    ],
  },
];

export const skillLegend = [
  { src: "repo", label: "verified in public repositories" },
  { src: "resume", label: "from the resume" },
  { src: "site", label: "used to build this site" },
];

export const experience = [
  {
    role: "Class Representative",
    org: "Galgotias College of Engineering and Technology",
    type: "Campus leadership",
    context: "B.Tech CSE · 2025–2029",
    points: [
      "Act as the day-to-day communication link between faculty and the batch",
      "Organise classmates around schedules, deadlines and academic activities",
      "Foster collaborative learning and peer coordination across the batch",
    ],
    tags: ["Coordination", "Communication", "Teamwork"],
  },
  {
    role: "Team Leader · Backend & Agent Architecture",
    org: "Team BitBenders",
    type: "Hackathon & project builds",
    context: "Verified across public repositories",
    points: [
      "Led backend and agent architecture across the team's builds",
      "TerraSync — Gemini-assisted civic reporting platform built for HackBase HackDays (Edition 2)",
      "CivicSync — natural-language civic complaints routed into traceable service tickets",
      "VoiceOps — AI voice customer-support capstone with retrieval evaluation",
    ],
    tags: ["Python", "Flask", "FastAPI", "Gemini", "Agents"],
  },
];
