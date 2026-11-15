# AayushBuilds

Aayush Singh's personal developer portfolio — dark-first, Matrix-boot inspired, built as a real production application.

**Stack:** Next.js 15 (App Router) · React 19 · JavaScript only (`.js` / `.jsx`) · Tailwind CSS 3 · Framer Motion · Lucide React

## Features

- **Matrix-inspired boot screen** — canvas glyph rain, terminal status lines, progress bar. Plays once per browser session, skipped for `prefers-reduced-motion` users, keyboard-skippable, auto-completes in ~2s.
- **Premium dark-first design system** — CSS-variable tokens (dark default + optional light theme), Space Grotesk / Inter / JetBrains Mono.
- **Hero with a self-typing terminal** that starts after the boot screen finishes.
- **Verified project showcase** — 7 featured projects, all descriptions verified against the actual public repositories; real screenshots where they exist; live-demo links only where deployments were confirmed.
- **Live GitHub section** — public repo count, primary languages and recent pushes fetched from the GitHub API at runtime, with skeleton loading, error timeout and a curated fallback. No fabricated statistics.
- **Full SEO** — metadata, Open Graph image (generated via `next/og`), sitemap, robots, JSON-LD Person schema, semantic headings.
- **Accessibility** — skip link, keyboard navigation, visible focus states, ARIA labels/live regions, reduced-motion support, contrast-checked palette.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
```

## Environment

Copy `.env.example` to `.env` and set the public site URL (used for canonical/sitemap/OG URLs):

```
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

No secrets are required — the site fetches only public GitHub API data client-side. Never commit real `.env` files.

## Structure

```
app/          layout, page, globals.css, SEO (sitemap/robots/OG), icon
components/   Navbar, MatrixLoader, Hero, About, Skills, Projects,
              Experience, GithubSection, Contact, Footer, ...
data/         site.js (profile/skills/experience), projects.js (verified project data)
public/       images (project screenshots)
```

## Deployment

Any Next.js host (Vercel recommended). Set `NEXT_PUBLIC_SITE_URL` to the deployed domain. `next start` serves the production build; image optimization is enabled by default.

## Accuracy

Project descriptions, technologies and statuses were audited against the repositories at `github.com/aayush-as69` in November 2026. Personal details come from the supplied resume. Nothing is inflated — no fake metrics, awards or deployments.
