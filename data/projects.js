// Featured projects — every field below was verified against the actual
// public repository (README, file tree and declared demo URLs) on Nov 2026.
// liveDemo is only set where the deployment URL was declared in the repo
// AND confirmed to respond with HTTP 200 during the audit.

export const projects = [
  {
    name: "Handover",
    slug: "handover",
    number: "01",
    featured: true,
    category: "AI · Knowledge Transfer",
    tagline: "Evidence-backed project knowledge transfer",
    problem:
      "When a teammate leaves, the context behind their code — decisions, ownership, risks — usually leaves with them.",
    description:
      "Handover turns scattered project sources into a reviewable handover record. It extracts candidate claims, links every claim to its supporting evidence, checks that evidence mechanically, and requires human approval before anything is published.",
    tech: [
      "Python",
      "FastAPI",
      "SQLAlchemy",
      "PostgreSQL",
      "Jinja2",
      "Alembic",
      "OpenAI-compatible LLM",
      "GitHub REST API",
      "Pytest",
      "Playwright",
      "GitHub Actions",
    ],
    status: "Live demo · actively developed",
    github: "https://github.com/aayush-as69/Handover",
    liveDemo: "https://handover-2hpd.onrender.com",
    image: null,
    imageAlt: null,
    secondaryImage: null,
    secondaryAlt: null,
  },
  {
    name: "BrandGuard",
    slug: "brandguard",
    number: "02",
    category: "AI · Brand Governance",
    tagline: "Brand consistency, grounded in evidence",
    problem:
      "Brand reviews depend on scattered documents, memory and subjective feedback — so mistakes slip through unexplained.",
    description:
      "An explainable brand-governance workspace that checks content against approved guidelines and facts. Every finding points to a rule, an approved fact and a source quote — and people, not AI, make the final call.",
    tech: [
      "Python",
      "Flask",
      "Pillow",
      "NumPy",
      "Pytest",
      "Docker",
      "GitHub Actions",
    ],
    status: "Functional application · CI + ~225 tests",
    github: "https://github.com/aayush-as69/BrandGuard",
    liveDemo: null,
    image: null,
  },
  {
    name: "MaskChat",
    slug: "maskchat",
    number: "03",
    category: "Full-Stack · Social Good",
    tagline: "Privacy-first peer mentorship for campus communities",
    problem:
      "Students hesitate to ask for mentorship help when it means exposing their identity to seniors or strangers.",
    description:
      "A MERN platform that connects students with approved senior mentors without exposing identities to each other — with institution-scoped matching, realtime sessions, mentor verification and moderation, built around the server as the security boundary.",
    tech: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "MongoDB",
      "Mongoose",
      "Socket.IO",
    ],
    status: "Pilot-stage · deployed demo",
    github: "https://github.com/aayush-as69/MaskChat-MERN",
    liveDemo: "https://mask-chat-mern.vercel.app",
    image: null,
  },
  {
    name: "Meetloop",
    slug: "meetloop",
    number: "04",
    category: "AI Agents · Productivity",
    tagline: "Meeting transcripts into confirmed execution",
    problem:
      "Decisions made in meetings vanish into transcripts — action items lose owners, dates and follow-through.",
    description:
      "A meeting-to-execution agent that extracts decisions, owners and deadlines from messy spoken transcripts, remembers earlier decisions, flags contradictions — and only turns items the human explicitly approves into GitHub issues.",
    tech: [
      "Python",
      "Flask",
      "SQLite",
      "Gemini API",
      "Anthropic API",
      "GitHub API",
    ],
    status: "Functional prototype",
    github: "https://github.com/aayush-as69/meet-loop",
    liveDemo: null,
    image: null,
  },
  {
    name: "BharatCode Atlas",
    slug: "bharatcode-atlas",
    number: "05",
    category: "Full-Stack · Developer Tools",
    tagline: "A research workspace for a 294-project build league",
    problem:
      "When hundreds of projects ship at once, the hard question is what to investigate next — and what to learn from how other teams built it.",
    description:
      "A JavaScript-only Next.js workspace that loads the full BharatCode Build League corpus and turns it into a research workflow — search, recommendations, architecture fingerprints from repository evidence, side-by-side comparison and a personal study tracker.",
    tech: [
      "Next.js 15",
      "React 19",
      "JavaScript (JSX-only)",
      "Node.js",
      "GitHub REST API",
      "node:test",
      "GitHub Actions",
    ],
    status: "Active development",
    github: "https://github.com/aayush-as69/BharatCode-Atlas",
    liveDemo: null,
    image: null,
  },
  {
    name: "ExceptionPilot",
    slug: "exceptionpilot",
    number: "06",
    category: "Full-Stack · Finance Ops",
    tagline: "Explainable invoice exception management",
    problem:
      "Invoice exceptions become payment problems when the investigation trail — matching, policy, approvals — lives in disconnected systems.",
    description:
      "A finance workflow workspace for investigating invoice exceptions before they escalate — three-way matching and risk signals on one side, version-aware policy retrieval and optional grounded AI on the other, with human approval and an append-only audit trail underneath.",
    tech: [
      "Next.js",
      "React",
      "Node.js",
      "PostgreSQL",
      "Drizzle ORM",
      "pgvector",
      "Gemini / OpenAI",
      "Docker",
    ],
    status: "Functional demonstration",
    github: "https://github.com/aayush-as69/exceptionpilot",
    liveDemo: null,
    image: null,
  },
  {
    name: "VoiceOps — ZentroMart",
    slug: "voiceops",
    number: "07",
    category: "AI · Voice & RAG",
    tagline: "Grounded customer support through text and voice",
    problem:
      "Support bots frustrate customers when they make things up — I'd rather say \"I don't know\" than guess.",
    description:
      "A FastAPI support agent for a fictional store that answers from a knowledge base, looks up orders safely, and speaks and listens through voice.",
    tech: [
      "Python",
      "FastAPI",
      "TF-IDF RAG",
      "Gnani.ai STT / TTS",
      "OpenAI-compatible LLM",
      "Pytest",
    ],
    status: "Capstone prototype · evaluated",
    github: "https://github.com/aayush-as69/voiceops-zentromart",
    liveDemo: null,
    image: null,
  },
];

// Related / secondary repositories shown in the GitHub section.
// TerraSync and CivicSync are two builds of the same civic-platform idea;
// MaskChat (v1) predates the current MERN rebuild.
export const moreRepos = [
  {
    name: "terrasync",
    description:
      "Gemini-assisted civic reporting with a server-side AI trust layer — built for HackBase HackDays (Edition 2) with Team BitBenders.",
    tech: ["Python", "Flask", "MySQL", "Gemini", "Docker"],
    github: "https://github.com/aayush-as69/terrasync",
    liveDemo: null,
  },
  {
    name: "civicsync",
    description:
      "Lighter civic-platform iteration — natural-language complaints routed into departments as service tickets citizens can follow.",
    tech: ["Python", "Flask", "React", "SQLAlchemy", "Gemini"],
    github: "https://github.com/aayush-as69/civicsync",
    liveDemo: "https://civicsync-topaz.vercel.app",
  },
  {
    name: "maskchat",
    description:
      "The original MaskChat build — realtime anonymous mentorship with Socket.IO, moderation and feedback loops.",
    tech: ["JavaScript", "React", "Express", "Socket.IO", "PostgreSQL"],
    github: "https://github.com/aayush-as69/maskchat",
    liveDemo: "https://maskchat-rose.vercel.app",
  },
];
