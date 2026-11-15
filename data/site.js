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
      { cmd: "whoami", out: ["aayush.singh — builder of things"] },
      { cmd: "focus", out: ["full-stack", "AI systems", "product engineering"] },
      { cmd: "status", out: ["always building something new..."] },
    ],
  },
};

export const about = {
  title: "A little about the builder.",
  paragraphs: [
    "I'm a Computer Science Engineering student at Galgotias College of Engineering and Technology, and honestly — I just love building things. From quick weekend prototypes to full products, I enjoy working across the stack and figuring out how everything fits together.",
    "Lately I've been deep into full-stack development and backend engineering, exploring where AI can actually be useful, and getting a little better at system design with every project.",
  ],
  interestChips: [
    "Full-stack development",
    "Backend engineering",
    "AI-assisted workflows",
    "System design",
    "Useful products",
  ],
  note: "Thanks for stopping by — I'm always happy to talk about ideas, projects or collaborations.",
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
];

// Skill sources: "resume" = confirmed from the resume,
// "repo" = verified in public repositories, "site" = used to build this site.
export const skillGroups = [
  {
    title: "Languages",
    icon: "code",
    blurb: "Core languages my repositories are actually written in.",
    items: [
      { label: "Python" },
      { label: "C" },
      { label: "JavaScript" },
      { label: "HTML" },
      { label: "CSS" },
      { label: "SQL" },
    ],
  },
  {
    title: "Frontend",
    icon: "window",
    blurb: "React and Next.js apps — including this site.",
    items: [
      { label: "React" },
      { label: "Next.js" },
      { label: "Vite" },
      { label: "Tailwind CSS" },
    ],
  },
  {
    title: "Backend",
    icon: "server",
    blurb: "APIs and realtime services across three frameworks.",
    items: [
      { label: "Node.js" },
      { label: "Express" },
      { label: "Flask" },
      { label: "FastAPI" },
      { label: "REST APIs" },
      { label: "Socket.IO" },
    ],
  },
  {
    title: "Databases",
    icon: "database",
    blurb: "Relational, document and vector stores used across builds.",
    items: [
      { label: "MySQL" },
      { label: "PostgreSQL" },
      { label: "pgvector" },
      { label: "MongoDB" },
      { label: "SQLite" },
      { label: "SQLAlchemy" },
      { label: "Drizzle ORM" },
    ],
  },
  {
    title: "AI & Retrieval",
    icon: "brain",
    wide: true,
    blurb:
      "The focus of recent builds — LLM systems where I make retrieval show its sources and a human stays in the loop.",
    items: [
      { label: "RAG pipelines" },
      { label: "Gemini API" },
      { label: "OpenAI-compatible LLMs" },
      { label: "Anthropic API" },
      { label: "TF-IDF / cosine retrieval" },
      { label: "Speech STT / TTS" },
    ],
  },
  {
    title: "Tooling & Infra",
    icon: "wrench",
    blurb: "CI, containers, testing and deployment — the glue around my projects.",
    items: [
      { label: "Git & GitHub" },
      { label: "GitHub Actions CI" },
      { label: "Docker" },
      { label: "Vercel" },
      { label: "Render" },
      { label: "Pytest / Playwright" },
    ],
  },
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
    context: "HackBase HackDays & team builds",
    points: [
      "Led backend and agent architecture across the team's builds",
      "TerraSync — Gemini-assisted civic reporting platform built for HackBase HackDays (Edition 2)",
      "CivicSync — natural-language civic complaints routed into departments as service tickets",
      "VoiceOps — AI voice customer-support capstone with retrieval evaluation",
    ],
    tags: ["Python", "Flask", "FastAPI", "Gemini", "Agents"],
  },
];
