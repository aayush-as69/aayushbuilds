import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { skillGroups, skillLegend } from "@/data/site";

const dotColor = {
  repo: "bg-accent",
  resume: "bg-mute",
  site: "bg-accent-soft",
};

export default function Skills() {
  return (
    <section id="skills" className="section-pad border-t border-line-soft">
      <div className="container-x">
        <SectionHeader
          index="02"
          eyebrow="Skills"
          title="Tools I build with."
          description="A honest snapshot — resume-confirmed fundamentals plus technologies verified in my public repositories. No invented proficiency percentages."
        />

        <Reveal>
          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.title}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft">
                  {group.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item.label} className="chip">
                      <span
                        className={`dot ${dotColor[item.src]}`}
                        aria-hidden="true"
                      />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-line-soft pt-6">
            {skillLegend.map((l) => (
              <li
                key={l.src}
                className="flex items-center gap-2 font-mono text-[11px] text-mute"
              >
                <span className={`dot ${dotColor[l.src]}`} aria-hidden="true" />
                {l.label}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
