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

const icons = {
  code: Code2,
  window: AppWindow,
  server: Server,
  database: Database,
  brain: Brain,
  wrench: Wrench,
};

export default function Skills() {
  return (
    <section id="skills" className="section-pad border-t border-line-soft">
      <div className="container-x">
        <SectionHeader
          index="02"
          eyebrow="Skills"
          title="Tools I build with."
          description="Here's the stack I reach for day to day — the languages, frameworks and tools I've picked up while building things I care about."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = icons[group.icon] || Code2;
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
                      {String(group.items.length).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mt-3 text-[13px] leading-relaxed text-mute">
                    {group.blurb}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2 pt-1">
                    {group.items.map((item) => (
                      <li key={item.label} className="chip">
                        {item.label}
                      </li>
                    ))}
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
