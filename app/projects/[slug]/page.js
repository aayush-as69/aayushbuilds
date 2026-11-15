import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import SubpageHeader from "@/components/SubpageHeader";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { GithubIcon } from "@/components/icons";
import { projects } from "@/data/projects";
import { profile, siteUrl } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};

  const title = `${project.name} — ${project.tagline}`;

  return {
    title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title,
      description: project.summary,
      url: `/projects/${project.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const nextProject = projects[(index + 1) % projects.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.summary,
    url: `${siteUrl}/projects/${project.slug}`,
    author: {
      "@type": "Person",
      name: profile.name,
      url: siteUrl,
    },
    codeRepository: project.github,
    keywords: project.tech.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SubpageHeader />
      <main id="main" className="pt-16">
        <article className="container-x py-14 sm:py-20">
          <nav
            aria-label="Breadcrumb"
            className="font-mono text-[11px] text-mute"
          >
            <Link href="/" className="transition-colors hover:text-accent">
              Home
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <Link
              href="/#projects"
              className="transition-colors hover:text-accent"
            >
              Projects
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="text-ink">{project.name}</span>
          </nav>

          <header className="mt-8 max-w-3xl">
            <p className="eyebrow">
              {project.number} · {project.category}
            </p>
            <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">
              {project.name}
            </h1>
            <p className="mt-3 text-lg text-accent-soft">{project.tagline}</p>
            <p className="mt-6 text-base leading-relaxed text-mute">
              {project.description}
            </p>
          </header>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="mr-auto inline-flex items-center gap-2 font-mono text-[11px] text-accent-soft">
              <span
                className={`dot ${
                  project.liveDemo ? "bg-accent animate-pulse-soft" : "bg-accent-soft"
                }`}
                aria-hidden="true"
              />
              {project.status}
            </span>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2 font-mono text-xs text-mute transition-colors hover:border-accent-border hover:text-accent"
            >
              <GithubIcon size={13} aria-hidden="true" />
              Repository
            </a>
            {project.liveDemo ? (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-accent-border bg-[var(--accent-dim)] px-4 py-2 font-mono text-xs text-accent transition-colors hover:border-accent"
              >
                Live demo
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            ) : null}
          </div>

          <div className="mt-12 grid gap-12 border-t border-line-soft pt-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft">
                The problem
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-mute">
                {project.problem}
              </p>

              <h2 className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft">
                Stack
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <section aria-labelledby="what-i-built">
              <h2
                id="what-i-built"
                className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft"
              >
                What I built
              </h2>
              <ul className="mt-4 space-y-3">
                {project.highlights.map((highlight, i) => (
                  <li
                    key={highlight}
                    className="flex gap-3 rounded-xl border border-line bg-surface2 p-4"
                  >
                    <span className="pt-0.5 font-mono text-xs text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm leading-relaxed text-mute">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <nav
            aria-label="Project navigation"
            className="mt-14 flex items-center justify-between gap-4 border-t border-line-soft pt-8"
          >
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 font-mono text-xs text-mute transition-colors hover:text-accent"
            >
              <ArrowLeft size={14} aria-hidden="true" />
              All projects
            </Link>

            <Link
              href={`/projects/${nextProject.slug}`}
              className="group text-right"
            >
              <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
                Next project
              </span>
              <span className="mt-1 inline-flex items-center gap-1.5 text-sm text-ink transition-colors group-hover:text-accent">
                {nextProject.name}
                <ArrowUpRight size={14} aria-hidden="true" />
              </span>
            </Link>
          </nav>
        </article>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
