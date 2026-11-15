import Link from "next/link";
import {
  Code2,
  AppWindow,
  Server,
  Database,
  Brain,
  Wrench,
} from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { skillGroups } from "@/data/site";
import { projects } from "@/data/projects";

const icons = {
  code: Code2,
  window: AppWindow,
  server: Server,
  database: Database,
  brain: Brain,
  wrench: Wrench,
};

const projectBySlug = Object.fromEntries(
  projects.map((project) => [project.slug, project])
);

// A skill counts as "shipped" when one of its `tech` names appears in a
// project's tech list. Derived from data/projects.js so it can't drift.
const projectsUsing = (item) =>
  projects.filter((project) =>
    (item.tech || []).some((name) => project.tech.includes(name))
  );

export default function Skills() {
  return (
    <section id="skills" className="section-pad border-t border-line-soft">
      <div className="container-x">
        <SectionHeader
          index="02"
          eyebrow="Skills"
          title="Tools I build with."
          description="Here's the stack I reach for day to day. Highlighted skills are ones I've used in the projects below."
        />

        <p className="-mt-6 mb-6 flex items-center sm:-mt-10 gap-2 font-mono text-[11px] text-mute">
          <span
            aria-hidden="true"
            className="inline-block h-3 w-5 rounded-full border border-accent-border bg-[var(--accent-dim)]"
          />
          used in a project below · hover a skill to see which
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = icons[group.icon] || Code2;
            const linked = (group.projects || [])
              .map((slug) => projectBySlug[slug])
              .filter(Boolean);
            const provenCount = group.items.filter(
              (item) => projectsUsing(item).length > 0
            ).length;

            return (
              <Reveal
                key={group.title}
                delay={(i % 3) * 0.06}
                className={group.wide ? "sm:col-span-2" : undefined}
              >
                <article
                  className={`card group flex h-full flex-col p-5 transition-colors duration-300 hover:border-accent-border sm:p-6 ${
                    group.wide
                      ? "border-accent-border bg-[var(--accent-dim)]"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                        group.wide
                          ? "border-accent-border bg-surface text-accent"
                          : "border-line bg-surface2 text-accent"
                      }`}
                    >
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <h3 className="text-base font-semibold">{group.title}</h3>
                    <span
                      className="ml-auto font-mono text-[10px] text-mute"
                      aria-hidden="true"
                    >
                      {provenCount}/{group.items.length}
                    </span>
                  </div>

                  <p className="mt-3 text-[13px] leading-relaxed text-mute">
                    {group.blurb}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2 pt-1">
                    {group.items.map((item) => {
                      const used = projectsUsing(item);
                      const names = used.map((project) => project.name).join(", ");
                      return (
                        <li
                          key={item.label}
                          className={`chip ${
                            used.length > 0
                              ? "!border-accent-border !bg-[var(--accent-dim)] !text-ink"
                              : ""
                          }`}
                          title={used.length > 0 ? `Used in ${names}` : undefined}
                        >
                          {item.label}
                          {used.length > 0 ? (
                            <span className="sr-only">, used in {names}</span>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>

                  {linked.length > 0 ? (
                    <div className="mt-auto border-t border-line-soft pt-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
                        Used in
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5">
                        {linked.map((project) => (
                          <li key={project.slug}>
                            <Link
                              href={`/projects/${project.slug}`}
                              className="group/link inline-flex items-center gap-1 text-[13px] text-accent-soft transition-colors hover:text-accent"
                            >
                              {project.name}
                              <span
                                aria-hidden="true"
                                className="font-mono text-[11px] opacity-60 transition-transform duration-200 group-hover/link:translate-x-0.5"
                              >
                                →
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
