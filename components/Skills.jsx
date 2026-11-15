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
          index="03"
          eyebrow="Skills"
          title="Tools I build with."
          description="The stack I reach for day to day. Highlighted skills are ones I've shipped in the projects below — hover to see which."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = icons[group.icon] || Code2;

            return (
              <Reveal key={group.title} delay={(i % 3) * 0.06}>
                <article
                  className={`card group flex h-full flex-col p-5 transition-colors duration-300 hover:border-accent-border sm:p-6 ${
                    group.featured
                      ? "border-accent-border bg-[var(--accent-dim)]"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                        group.featured
                          ? "border-accent-border bg-surface text-accent"
                          : "border-line bg-surface2 text-accent"
                      }`}
                    >
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <h3 className="text-base font-semibold">{group.title}</h3>
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
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
