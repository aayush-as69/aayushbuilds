import { ArrowUpRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { experience, profile } from "@/data/site";

export default function Experience() {
  return (
    <section
      id="experience"
      className="section-pad border-t border-line-soft"
    >
      <div className="container-x">
        <SectionHeader
          index="04"
          eyebrow="Experience"
          title="Where I'm building and leading."
          description="A bit about where I've been spending my time — campus leadership, hackathons and the projects in between."
        />

        <ol className="relative ml-2 space-y-10 border-l border-line pl-6 sm:ml-4 sm:pl-8">
          {experience.map((item, i) => (
            <li key={item.role} className="relative">
              <span
                aria-hidden="true"
                className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent sm:-left-[41px]"
              />
              <Reveal delay={i * 0.06}>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-soft">
                  {item.type}
                </p>
                <h3 className="mt-2 text-xl font-semibold sm:text-2xl">
                  {item.role}
                </h3>
                <p className="mt-1 text-sm text-mute">
                  {item.org}
                  <span className="mx-2 text-line" aria-hidden="true">
                    ·
                  </span>
                  <span className="font-mono text-xs">{item.context}</span>
                </p>
                <ul className="mt-4 space-y-2">
                  {item.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-mute sm:text-[15px]"
                    >
                      <span
                        className="dot mt-[7px] bg-accent"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li key={tag} className="chip">
                      {tag}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <a
            href={`${profile.github}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-1.5 font-mono text-xs text-accent-soft transition-colors hover:text-accent"
          >
            Browse all repositories on GitHub
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
