// Project data — copy, stack, links and case-study highlights.
//
// `shot` is the project's landing-page screenshot for the gallery on the
// homepage: a path to a file in /public, e.g. "/projects/handover.webp"
// (16:10, about 1440px wide, WebP or PNG, ideally under ~150 KB). While it is
// null the gallery shows a generated placeholder card instead.
//
// `reflection` is one honest paragraph shown at the bottom of the case study
// under "What I'd do differently": what broke, what I'd redo, what I learned.
// Leave it out (or null) and the section simply doesn't render.
//
// Ordered strongest-first: Handover is featured, the next four sit in the lead
// grid, and the rest live behind the "more projects" toggle on the homepage.

export const projects = [
  {
    name: "Handover",
    slug: "handover",
    number: "01",
    featured: true,
    category: "AI · Knowledge Transfer",
    tagline: "Evidence-backed project knowledge transfer",
    summary:
      "Every claim in a handover links to its source, and a human approves what gets published.",
    problem:
      "When a teammate leaves, the context behind their code — decisions, ownership, risks — usually leaves with them.",
    description:
      "Handover turns scattered project sources into a reviewable handover record. It extracts candidate claims, links every claim to its supporting evidence, checks that evidence mechanically, and requires human approval before anything is published.",
    highlights: [
      "Evidence-first extraction from notes, chat exports, task CSVs and public GitHub activity",
      "Confidence labels on every claim — quote-verified, inferred, conflicting or unsupported",
      "Human approval boundary with immutable claim versions and numbered releases",
      "Conflict detection and a Questions Before I Leave workflow for missing context",
      "Secret masking, sensitivity rules and server-enforced role-based access",
    ],
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
    shot: "/projects/handover.webp",
    reflection:
      "Handover began with research, not code: five survey and eight interview responses before I built anything, so the product started from real handovers. The rule I'd carry into everything I build next is the one it enforces — an AI can propose a claim, but only a person can publish it. What I'd do differently is put it in front of someone outside the project sooner; a tool about handing work over should be tested by someone who wasn't there.",
  },
  {
    name: "BrandGuard",
    slug: "brandguard",
    number: "02",
    category: "AI · Brand Governance",
    tagline: "Brand consistency, grounded in evidence",
    summary:
      "Deterministic rules, pixel-level image checks and human sign-off for brand content.",
    problem:
      "Brand reviews depend on scattered documents, memory and subjective feedback — so mistakes slip through unexplained.",
    description:
      "An explainable brand-governance workspace that checks content against approved guidelines and facts. Every finding points to a rule, an approved fact and a source quote — and people, not AI, make the final call.",
    highlights: [
      "Deterministic rule engine for glossary, tone, prices, dates, claims, alt text and contrast",
      "Pixel-measured image checks — palette share, logo presence, clear space and text contrast",
      "Optional AI judge that must cite a real rule quote and exact content span, or its output is discarded",
      "Server-enforced approval workflow with roles, versioning, comments and an audit trail",
      "Admin quality benchmark with precision and recall per rule, plus undoable suggestions",
    ],
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
    shot: "/projects/brandguard.webp",
    reflection:
      "BrandGuard's rule engine is deterministic on purpose, and the optional AI judge has to quote a real rule or its answer is thrown away. That also makes it easy to test, which is where the ~225 tests in CI come from. What I'd do differently is ship a hosted demo from the start: right now the only way to try it is to clone the repo, and a governance tool people can't open in one click is hard to trust.",
  },
  {
    name: "MaskChat",
    slug: "maskchat",
    number: "03",
    category: "Full-Stack · Social Good",
    tagline: "Privacy-first peer mentorship for campus communities",
    summary:
      "Anonymous peer mentorship that matches students with approved senior mentors in realtime.",
    problem:
      "Students hesitate to ask for mentorship help when it means exposing their identity to seniors or strangers.",
    description:
      "A MERN platform that connects students with approved senior mentors without exposing identities to each other — with institution-scoped matching, realtime sessions, mentor verification and moderation, built around the server as the security boundary.",
    highlights: [
      "Anonymous aliases with identity separation, HttpOnly sessions, bcrypt hashing and CSRF protection",
      "Mentor approval — institutional ID upload with admin review, suspension and revocation",
      "Matching on institution, topic and availability with a persisted queue and ranked offers",
      "Realtime Socket.IO rooms with membership checks, plus 1:1 and group sessions",
      "Institution-scoped forum and moderation with reports, blocks and audit events",
    ],
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
    shot: "/projects/maskchat.webp",
    reflection:
      "My first design kept sessions ephemeral: messages lived in memory and were wiped when a session ended. The MERN rebuild persists the matching queue and keeps audit events, because moderation needs a record of what happened. Holding anonymity and accountability together was the hard part. What I'd do differently is settle that trade-off on paper first, before writing the first socket handler.",
  },
  {
    name: "ExceptionPilot",
    slug: "exceptionpilot",
    number: "04",
    category: "Full-Stack · Finance Ops",
    tagline: "Explainable invoice exception management",
    summary:
      "Invoice exceptions investigated with three-way matching, policy retrieval and audit trails.",
    problem:
      "Invoice exceptions become payment problems when the investigation trail — matching, policy, approvals — lives in disconnected systems.",
    description:
      "A finance workflow workspace for investigating invoice exceptions before they escalate — three-way matching and risk signals on one side, version-aware policy retrieval and optional grounded AI on the other, with human approval and an append-only audit trail underneath.",
    highlights: [
      "Three-way PO / invoice / GRN matching with variance, tolerance and duplicate indicators",
      "Version-aware policy retrieval — lexical plus optional pgvector — feeding grounded generation",
      "Role-aware approvals with thresholds, separation of duties and single-use decisions",
      "Append-only audit trail with holds, procurement tasks and SLA monitoring",
      "Backend RBAC, secure sessions, CSP and security headers, upload validation",
    ],
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
    shot: "/projects/exceptionpilot.webp",
    reflection:
      "The three-way matching gets the attention, but the part I'd defend hardest is the append-only audit trail, single-use approvals and separation of duties — they're what make an exception decision explainable later. What I'd do differently is ship a hosted demo with seeded invoices, so someone can walk one exception from flag to approval without cloning the repo.",
  },
  {
    name: "Meetloop",
    slug: "meetloop",
    number: "05",
    category: "AI Agents · Productivity",
    tagline: "Meeting transcripts into confirmed execution",
    summary:
      "Meeting transcripts turned into owner-tagged action items — filed only after you approve them.",
    problem:
      "Decisions made in meetings vanish into transcripts — action items lose owners, dates and follow-through.",
    description:
      "A meeting-to-execution agent that extracts decisions, owners and deadlines from messy spoken transcripts, remembers earlier decisions, flags contradictions — and only turns items the human explicitly approves into GitHub issues.",
    highlights: [
      "Paste, dictate or upload .txt / .vtt transcripts built for filler words and self-corrections",
      "Cross-meeting memory with conflict detection against earlier decisions",
      "Human approval boundary — nothing posts to GitHub without explicit confirmation, and posting is idempotent",
      "24-hour, 1-hour and overdue reminders plus a weekly per-person digest",
      "Deterministic rule-based fallback keeps the full flow working without an LLM key",
    ],
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
    shot: "/projects/meetloop.webp",
    reflection:
      "I built Meetloop alone inside a four-hour hackathon window. The part I'm gladdest I built is the rule-based fallback: the whole flow still works without an LLM key. What I'd do differently is the order of work — in a time-boxed build I'd run the full flow end to end much earlier, instead of leaving the live test and the demo recording for the final stretch. A demo that can't fail beats a clever feature that can.",
  },
  {
    name: "BharatCode Atlas",
    slug: "bharatcode-atlas",
    number: "06",
    category: "Full-Stack · Developer Tools",
    tagline: "A research workspace for a 294-project build league",
    summary:
      "A research workspace for a 294-project build league, grounded in repository evidence.",
    problem:
      "When hundreds of projects ship at once, the hard question is what to investigate next — and what to learn from how other teams built it.",
    description:
      "A JavaScript-only Next.js workspace that loads the full BharatCode Build League corpus and turns it into a research workflow — search, recommendations, architecture fingerprints from repository evidence, side-by-side comparison and a personal study tracker.",
    highlights: [
      "Search, filtering, rankings and hidden-gem discovery across all 294 projects",
      "For You recommendations from interests and an optional public GitHub profile",
      "Compare 2–4 projects — architecture layers, technologies and the evidence behind each signal",
      "Local Research Workspace with study status, notes, questions and saved evidence snapshots",
      "Retrieval-grounded AI Researcher that shows the projects behind every answer",
    ],
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
    shot: "/projects/bharatcode-atlas.webp",
    reflection:
      "Atlas is still in active development, so this is a progress note rather than a retrospective. The rule I'm holding it to is the one I use everywhere: nothing appears without the evidence behind it, including the AI Researcher, which shows the projects behind every answer. I'll update this once it has had real users and I know what I'd change.",
  },
  {
    name: "VoiceOps — ZentroMart",
    slug: "voiceops",
    number: "07",
    category: "AI · Voice & RAG",
    tagline: "Grounded customer support through text and voice",
    summary:
      "A voice-and-text support agent that answers from its knowledge base and admits when it can't.",
    problem:
      "Support bots frustrate customers when they make things up — I'd rather say \"I don't know\" than guess.",
    description:
      "A FastAPI support agent for a fictional store that answers from a knowledge base, looks up orders safely, and speaks and listens through voice.",
    highlights: [
      "TF-IDF / cosine retrieval over the knowledge base with source and section metadata",
      "Order lookup protected by phone-suffix or delivery-pincode checks",
      "Gnani.ai STT / TTS adapters with a browser microphone workflow and batch audio processing",
      "Multi-turn context with explicit failure states instead of made-up provider results",
      "Evaluation harness — retrieval, conversations, dataset validation and 113 automated tests",
    ],
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
    shot: "/projects/voiceops.webp",
    reflection:
      "VoiceOps follows one rule: say \"I don't know\" rather than guess, so failures are explicit states instead of made-up answers. Retrieval is plain TF-IDF and cosine similarity, which keeps it explainable and easy to test (113 tests) but will miss questions phrased differently from the knowledge base. If I rebuilt it, I'd compare embedding-based retrieval against the same evaluation harness and let the numbers decide.",
  },
  {
    name: "TerraSync",
    slug: "terrasync",
    number: "08",
    category: "AI · Civic Tech",
    tagline: "Civic complaints, triaged by AI and checked by a trust layer",
    summary:
      "Citizen reports routed to the right ward and department — with AI as an advisor whose output is validated before anything is assigned automatically.",
    problem:
      "Civic complaints arrive incomplete and hard to route, and an AI that guesses wrong can send a report to the wrong team.",
    description:
      "A Flask civic-reporting platform built with Team BitBenders for HackBase HackDays (Edition 2). Citizens report an issue with text or voice, a photo and GPS; Gemini proposes a category, severity and department, and a server-side trust layer validates that proposal before any automatic routing.",
    highlights: [
      "Gemini output is treated as untrusted input — schema-validated, checked against live categories, departments and duplicates, and confidence-gated",
      "Low-confidence, duplicate or non-civic reports stay out of auto-assignment and go to a person; the complaint is always stored",
      "Primary model, then fallback model, then a deterministic local fallback — the workflow keeps working when AI is down",
      "Full lifecycle from Reported to Verified, with citizen verification, a staff console, SLA views and a map",
      "Citizen and staff sign-in with OTP flows, SMS through a console provider or Twilio, and Docker / Gunicorn / Caddy deployment configs",
      "24 offline unit tests covering validation, fallback, timeouts, prompt-injection quoting and the review policy",
    ],
    tech: ["Python", "Flask", "MySQL", "Gemini API", "Docker", "Gunicorn"],
    status: "Working prototype · hackathon build",
    github: "https://github.com/aayush-as69/terrasync",
    liveDemo: null,
    shot: "/projects/terrasync.webp",
    reflection:
      "The first schema was thinner than the app that grew on it. I hit MySQL's error 3823 — a CHECK constraint clashing with cascading foreign keys — and only found missing tables and columns once the admin console needed them. A later audit turned up dead code, a hardcoded ward ID and secrets that belonged in an environment file. Next time I'd design the schema and a .env.example on day one, and audit as I go. The AI layer gets the attention, but it only works as well as these boring foundations.",
  },
  {
    name: "CivicSync",
    slug: "civicsync",
    number: "09",
    category: "Full-stack · Civic Tech",
    tagline: "From civic complaint to routed service ticket",
    summary:
      "Plain-language complaints turned into structured, routed tickets that citizens can follow with a private tracking token.",
    problem:
      "Citizens describe a broken streetlight, not a department — and a complaint with no route, record or history goes nowhere.",
    description:
      "A React and Flask civic-maintenance prototype built with Team BitBenders. It turns a plain-language complaint into a structured analysis, routes it to a department and keeps a traceable ticket with its status history. Flask stays in charge; AI only proposes.",
    highlights: [
      "Complaint to analysis to category to department to ticket, with optional Gemini analysis and a deterministic fallback",
      "AI produces a constrained proposal; Flask validates it and is the only thing that writes to the database",
      "Idempotent ticket creation and a private citizen tracking token",
      "Department dashboard and persisted workflow events, behind a clearly labelled demo-admin mode",
      "12 API tests, and a Vercel deployment path: static React front end plus a Flask serverless entry point",
    ],
    tech: ["Python", "Flask", "React", "TypeScript", "SQLAlchemy", "Gemini API"],
    status: "Hackathon prototype · live demo",
    github: "https://github.com/aayush-as69/civicsync",
    liveDemo: "https://civicsync-topaz.vercel.app",
    shot: "/projects/civicsync.webp",
    reflection:
      "CivicSync is my second take on the civic-complaint idea after TerraSync, built with Team BitBenders and deliberately lighter. The lesson I carried over: the AI only proposes and Flask decides, so the app still works when the model doesn't. What I'd do differently is the demo-admin mode — it's clearly labelled, but I'd replace it with proper staff sign-in, as TerraSync has.",
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
