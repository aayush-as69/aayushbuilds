# AayushBuilds

Aayush Singh's personal developer portfolio — dark-first, Matrix-boot inspired, built as a real production application.

**Stack:** Next.js 15 (App Router) · React 19 · JavaScript only (`.js` / `.jsx`) · Tailwind CSS 3 · Framer Motion · Lucide React

## Features

- **Matrix-inspired boot screen** — canvas glyph rain, terminal status lines, progress bar. Plays once per browser session, skipped for `prefers-reduced-motion` users, keyboard-skippable, auto-completes in ~3s.
- **Premium dark-first design system** — CSS-variable tokens (dark default + optional light theme), Space Grotesk / Inter / JetBrains Mono.
- **Hero with a self-typing terminal** that starts after the boot screen finishes.
- **Project showcase with case studies** — the strongest four builds lead, the rest sit behind a "more projects" toggle, and every project has its own `/projects/[slug]` page with a distinct description, generated OG image and sitemap entry.
- **Interactive glass break** on the featured project — click to crack the pane; the cracks stay for the rest of the session.
- **Server-side GitHub section** — pinned repositories, repo count and primary languages fetched in a server component with hourly revalidation, so the API is called once per hour instead of once per visitor. Falls back to a curated list if GitHub is unavailable.
- **Full SEO** — per-page metadata, generated Open Graph images with alt text, expanded sitemap, robots, JSON-LD Person + CreativeWork schemas, semantic headings.
- **Accessibility** — skip link, keyboard navigation, visible focus states, ARIA labels, reduced-motion support, contrast-checked palette.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
```

## Environment

Copy `.env.example` to `.env`:

```
NEXT_PUBLIC_SITE_URL=https://your-domain.example
GITHUB_TOKEN=            # optional
```

`NEXT_PUBLIC_SITE_URL` powers canonical, sitemap and OG URLs. `GITHUB_TOKEN` is optional — without it the GitHub API is unauthenticated (60 requests/hour); with a token, the server-side fetch gets a much higher limit. Never commit real `.env` files.

## Structure

```
app/                  layout, homepage, globals.css, icon, SEO (sitemap/robots/OG)
app/projects/[slug]/  per-project case study + generated OG image
components/           Navbar, MatrixLoader, Hero, About, Skills, Projects,
                      Experience, GithubSection, Contact, Footer, ...
data/                 site.js (profile/skills/experience), projects.js (project data)
lib/                  github.js (server-side GitHub fetch + pinned repos)
```

## Deployment

Any Next.js host (Vercel recommended). Set `NEXT_PUBLIC_SITE_URL` to the deployed domain. The GitHub section revalidates hourly, so project updates appear without a redeploy; add `GITHUB_TOKEN` in the host's environment settings to raise the API limit.
