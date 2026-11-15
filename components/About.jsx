import { GraduationCap, Users, Compass } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { about, education, leadership, quickFacts } from "@/data/site";

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container-x">
        <SectionHeader
          index="01"
          eyebrow="About"
          title={about.title}
        />

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <Reveal>
            <div className="space-y-5">
              {about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed text-mute sm:text-lg"
                >
                  {p}
                </p>
              ))}
              <div className="flex flex-wrap gap-2 pt-2" aria-label="Interests">
                {about.interestChips.map((c) => (
                  <span key={c} className="chip">
                    {c}
                  </span>
                ))}
              </div>
              <p className="pt-4 font-mono text-[11px] leading-relaxed text-mute">
                {about.note}
              </p>
            </div>
          </Reveal>

          <div className="space-y-4">
            <Reveal delay={0.05}>
              <div className="card p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface2 text-accent">
                    <GraduationCap size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold leading-snug">
                      {education.degree}
                    </h3>
                    <p className="mt-1 text-sm text-mute">{education.school}</p>
                    <p className="mt-3 font-mono text-xs text-accent-soft">
                      {education.years}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="card p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface2 text-accent">
                    <Users size={18} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold leading-snug">
                      {leadership.role}
                    </h3>
                    <p className="mt-1 text-sm text-mute">{leadership.org}</p>
                    <ul className="mt-4 space-y-2">
                      {leadership.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-2.5 text-sm text-mute"
                        >
                          <span
                            className="dot mt-[7px] bg-accent"
                            aria-hidden="true"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="card p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface2 text-accent">
                    <Compass size={18} aria-hidden="true" />
                  </span>
                  <dl className="min-w-0 flex-1 space-y-3">
                    {quickFacts.map((f) => (
                      <div key={f.label}>
                        <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
                          {f.label}
                        </dt>
                        <dd className="mt-1 text-sm text-ink">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
