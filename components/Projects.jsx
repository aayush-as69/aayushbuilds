import { ArrowUpRight } from "lucide-react";
import ProjectPreview from "./ProjectPreview";
import GlassBreak from "./GlassBreak";
import { GithubIcon } from "./icons";
import { projects } from "@/data/projects";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const githubBtn =
  "inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2 font-mono text-xs text-mute transition-colors hover:border-accent-border hover:text-accent";
const demoBtn =
  "inline-flex items-center gap-1.5 rounded-lg border border-accent-border bg-[var(--accent-dim)] px-4 py-2 font-mono text-xs text-accent transition-colors hover:border-accent";

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-pad border-t border-line-soft">
      <div className="container-x">
        <SectionHeader
          index="03"
          eyebrow="Projects"
          title="Selected work."
          description="Seven builds chosen for depth — AI systems with human approval boundaries, full-stack products, and engineering with real evaluation. Descriptions are verified against the repositories."
        />

        {/* Featured project — Handover */}
        <Reveal>
          <article className="card group relative overflow-hidden">
            <GlassBreak />
            <div className="grid lg:grid-cols-[1fr_1.12fr]">
              <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-accent">
                    {featured.number}
                  </span>
                  <span className="rounded-full border border-accent-border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    Featured
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-semibold sm:text-3xl">
                  {featured.name}
                </h3>
                <p className="mt-1.5 text-accent-soft">{featured.tagline}</p>

                <p className="mt-5 text-sm leading-relaxed text-mute sm:text-[15px]">
                  {featured.description}
                </p>

                <ul className="mt-7 flex flex-wrap gap-2">
                  {featured.tech.map((t) => (
                    <li key={t} className="chip">
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
                  <p className="mr-auto flex items-center gap-2 font-mono text-[11px] text-accent-soft">
                    <span className="dot bg-accent animate-pulse-soft" aria-hidden="true" />
                    {featured.status}
                  </p>
                  <a
                    href={featured.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={demoBtn}
                  >
                    Live demo
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                  <a
                    href={featured.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={githubBtn}
                  >
                    <GithubIcon size={13} aria-hidden="true" />
                    GitHub
                  </a>
                </div>
              </div>

              {/* Original schematic — no screenshots needed */}
              <div className="border-t border-line bg-[var(--code-bg)] p-5 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
                <div className="flex h-full flex-col justify-center">
                  <ProjectPreview slug={featured.slug} />
                  <p className="mt-4 font-mono text-[10px] leading-relaxed text-mute">
                    schematic of the review queue — claims with confidence
                    labels, awaiting human approval
                  </p>
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        {/* Remaining projects */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {rest.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.07}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="card group flex h-full flex-col p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent-border hover:shadow-glow sm:p-5">
      <ProjectPreview slug={project.slug} />

      <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-accent">{project.number}</span>
          <span className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
            {project.category}
          </span>
          {project.liveDemo ? (
            <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-accent-soft">
              <span className="dot bg-accent" aria-hidden="true" />
              live
            </span>
          ) : null}
        </div>

        <h3 className="mt-3 text-xl font-semibold">{project.name}</h3>
        <p className="mt-1 text-sm text-accent-soft">{project.tagline}</p>

        <p className="mt-3 text-[13px] leading-relaxed text-mute">
          {project.description}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li key={t} className="chip !px-2.5 !py-0.5">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center gap-3 pt-5">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className={githubBtn}
          >
            <GithubIcon size={13} aria-hidden="true" />
            GitHub
          </a>
          {project.liveDemo ? (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className={demoBtn}
            >
              Demo
              <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          ) : (
            <span className="font-mono text-[10px] text-mute">
              {project.status}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

