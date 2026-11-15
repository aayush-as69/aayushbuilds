<div align="center">

# AayushBuilds

**The personal developer portfolio of Aayush Singh — AI tools that show their evidence and keep humans in the loop, plus the full-stack products around them.**

[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-20232A?logo=react&logoColor=61DAFB)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![JavaScript](https://img.shields.io/badge/JavaScript-JSX_only-F7DF1E?logo=javascript&logoColor=black)](#tech-stack)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?logo=vercel&logoColor=white)](https://aayushbuilds.vercel.app)

[**Live site**](https://aayushbuilds.vercel.app) · [Case studies](https://aayushbuilds.vercel.app/projects/handover) · [GitHub](https://github.com/aayush-as69) · [LinkedIn](https://www.linkedin.com/in/ays669)

</div>

---

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Configuration](#configuration)
- [Customising the content](#customising-the-content)
- [Project structure](#project-structure)
- [How it works](#how-it-works)
- [Deployment](#deployment)
- [Contact](#contact)
- [License](#license)

## Overview

A dark-first, single-page portfolio with a dedicated case-study page for every project. It is a production Next.js application rather than a template: server-rendered GitHub data, generated Open Graph images, structured data, and a boot-screen intro that respects reduced-motion settings.

All content lives in two plain data files, so adding a project or editing a section never means touching a component.

## Features

- **Boot-screen intro** — canvas glyph rain with terminal status lines and a progress bar. It plays once per browser session, is skipped for `prefers-reduced-motion` users, has a keyboard-accessible **Skip intro** button, and finishes on its own in about three seconds (shorter on low-core devices). Animation pauses while the tab is hidden.
- **Self-typing terminal hero** that starts as soon as the intro finishes.
- **Dark-first theming** with an optional light theme. The choice is saved in `localStorage` and applied before first paint, so there is no flash of the wrong theme.
- **Project showcase** — seven projects, the four strongest up front and the rest behind a "More projects" toggle. Each project has its own statically generated `/projects/[slug]` page with a problem statement, highlights, stack, status and links.
- **Server-side GitHub section** — pinned repositories, public repo count and top languages, fetched on the server and revalidated hourly, so the GitHub API is hit once an hour instead of once per visitor.
- **SEO** — per-page metadata and canonical URLs, generated Open Graph images (home and every project), `sitemap.xml`, `robots.txt`, and JSON-LD (`Person` on the home page, `CreativeWork` on project pages).
- **Accessibility** — skip link, visible `:focus-visible` styles, ARIA labels on navigation and controls, `lang="en"`, semantic heading structure, and reduced-motion handling.
- **Frosted-glass project cards** that adapt to both themes.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| UI | React 19 |
| Language | JavaScript only (`.js` / `.jsx`, no TypeScript) |
| Styling | Tailwind CSS 3 with CSS-variable design tokens |
| Motion | Framer Motion |
| Icons | Lucide React |
| Fonts | Space Grotesk, Inter, JetBrains Mono via `next/font` |
| Linting | ESLint 9 with `eslint-config-next` |
| Hosting | Vercel |

## Getting started

**Prerequisites:** Node.js 18.18 or newer (Node 20 LTS recommended) and npm.

```bash
git clone https://github.com/aayush-as69/aayushbuilds.git
cd aayushbuilds
npm ci
cp .env.example .env.local
npm run dev
```

Open <http://localhost:3000>.

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

> **Note:** `next/font/google` downloads the three fonts at build time, so the build environment needs outbound access to `fonts.googleapis.com`.

## Configuration

Copy `.env.example` to `.env.local`. Both `.env` and `.env*.local` are git-ignored — never commit real secrets.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Public origin of the site, used for canonical links, Open Graph URLs, the sitemap and `robots.txt`. Defaults to `https://aayushbuilds.vercel.app`. Set it to your custom domain if you attach one. |
| `GITHUB_TOKEN` | No | Raises the GitHub API rate limit for the server-side fetch (60 requests/hour unauthenticated). It only reads public data, so no extra scopes are needed. |

## Customising the content

| To change… | Edit |
| --- | --- |
| Name, links, hero copy, About, Hobbies, Skills, Experience | `data/site.js` |
| Projects and case studies (each `slug` becomes `/projects/<slug>`), related repos | `data/projects.js` |
| Which repositories are pinned in the GitHub section, and how often it refreshes | `lib/github.js` |
| Colours and themes (dark default, optional light) | `app/globals.css` |

Projects are listed strongest-first: the first four appear above the fold and the rest sit behind the toggle.

## Project structure

```text
app/
  layout.js            root layout, fonts, metadata, pre-paint theme script
  page.js              home page and Person JSON-LD
  globals.css          design tokens, themes, global styles
  sitemap.js           sitemap.xml
  robots.js            robots.txt
  opengraph-image.jsx  generated Open Graph image
  projects/[slug]/     case-study page + generated Open Graph image
components/           Navbar, MatrixLoader, Hero, About, Hobbies, Skills,
                      Projects, Experience, GithubSection, Contact, Footer, …
data/
  site.js              profile, navigation, skills, experience
  projects.js          project and related-repo data
lib/
  github.js            server-side GitHub fetch and pinned repositories
```

## How it works

- **Boot intro and theme.** An inline script in `layout.js` runs before first paint. It restores the saved theme and, if the intro was already seen this session (or reduced motion is requested), marks the document so the overlay is skipped instantly.
- **GitHub data.** `lib/github.js` fetches the profile and repositories in a server component with a one-hour `revalidate`. A failed request is caught and returned as an empty result rather than thrown, so a GitHub outage or rate limit cannot fail a build.
- **Case studies.** `/projects/[slug]` pages are generated at build time from `data/projects.js`, each with its own metadata, Open Graph image and sitemap entry.

## Deployment

The site is deployed on [Vercel](https://vercel.com), but any Next.js host works.

1. Import the repository and keep the detected **Next.js** framework preset.
2. Add `NEXT_PUBLIC_SITE_URL` (and optionally `GITHUB_TOKEN`) under the project's environment variables.
3. Deploy. Pushes to `main` redeploy automatically.

The GitHub section revalidates hourly, so repository updates appear without a redeploy.

## Contact

Built by **Aayush Singh** — a B.Tech Computer Science student at Galgotias College of Engineering and Technology.

- Portfolio: [aayushbuilds.vercel.app](https://aayushbuilds.vercel.app) (contact section)
- GitHub: [@aayush-as69](https://github.com/aayush-as69)
- LinkedIn: [ays669](https://www.linkedin.com/in/ays669)

## License

No license has been applied to this repository yet.
