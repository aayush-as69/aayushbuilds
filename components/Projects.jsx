"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { GithubIcon } from "./icons";
import { projects } from "@/data/projects";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const githubBtn =
  "inline-flex items-center gap-1.5 rounded-lg border border-line px-4 py-2 font-mono text-xs text-mute transition-colors hover:border-accent-border hover:text-accent";
const demoBtn =
  "inline-flex items-center gap-1.5 rounded-lg border border-accent-border bg-[var(--accent-dim)] px-4 py-2 font-mono text-xs text-accent transition-colors hover:border-accent";
const caseBtn =
  "inline-flex items-center gap-1.5 rounded-lg border border-accent-border bg-[var(--accent-dim)] px-4 py-2 font-mono text-xs text-accent transition-colors hover:border-accent";

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const lead = rest.slice(0, 3);
  const more = rest.slice(3);

  return (
    <section id="projects" className="section-pad border-t border-line-soft">
      <div className="container-x">
        <SectionHeader
          index="03"
          eyebrow="Projects"
          title="My Projects."
          description="A collection of things I've loved building — each one started as a problem I wanted to solve, and each one taught me something new. Have a look around."
        />

        {/* Featured project — Handover */}
        <Reveal>
          <article className="card glass-card group">
            <div className="flex flex-col p-6 sm:p-8">
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

              <p className="mt-5 max-w-3xl text-sm leading-relaxed text-mute sm:text-[15px]">
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
                <Link
                  href={`/projects/${featured.slug}`}
                  className={caseBtn}
                >
                  Read case study
                  <ArrowUpRight size={13} aria-hidden="true" />
                </Link>
                {featured.liveDemo ? (
                  <a
                    href={featured.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={demoBtn}
                  >
                    Live demo
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </a>
                ) : null}
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
          </article>
        </Reveal>

        {/* Lead projects — best three after the featured build */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lead.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.06}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        {/* Everything else — behind a toggle so the section stays scannable */}
        {more.length > 0 ? (
          <>
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((v) => !v)}
                aria-expanded={showAll}
                aria-controls="more-projects"
                className="btn-ghost !px-5 !py-2.5 font-mono text-xs"
              >
                {showAll
                  ? "Show fewer projects"
                  : `More projects (${more.length})`}
                <ChevronDown
                  size={15}
                  aria-hidden="true"
                  className={`transition-transform duration-300 ${
                    showAll ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            <div id="more-projects">
              {showAll ? (
                <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {more.map((p, i) => (
                    <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                      <ProjectCard project={p} />
                    </Reveal>
                  ))}
                </div>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  return (
    <article className="card glass-card group flex h-full flex-col p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent-border hover:shadow-glow sm:p-5">
      <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-1">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-accent">{project.number}</span>
          <span className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
            {project.category}
          </span>
        </div>

        <h3 className="mt-3 text-xl font-semibold">
          <Link
            href={`/projects/${project.slug}`}
            className="transition-colors hover:text-accent"
          >
            {project.name}
          </Link>
        </h3>
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

        <p className="mt-4 flex items-center gap-1.5 font-mono text-[10px] text-mute">
          <span
            className={`dot ${project.liveDemo ? "bg-accent" : "bg-accent-soft"}`}
            aria-hidden="true"
          />
          {project.status}
        </p>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 rounded-lg border border-accent-border bg-[var(--accent-dim)] px-3 py-1.5 font-mono text-[11px] text-accent transition-colors hover:border-accent"
          >
            Case study
            <ArrowUpRight size={12} aria-hidden="true" />
          </Link>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 font-mono text-[11px] text-mute transition-colors hover:border-accent-border hover:text-accent"
          >
            <GithubIcon size={12} aria-hidden="true" />
            GitHub
          </a>
          {project.liveDemo ? (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 font-mono text-[11px] text-mute transition-colors hover:border-accent-border hover:text-accent"
            >
              Demo
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
