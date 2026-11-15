import { Gamepad2, BookOpen, FlaskConical } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { hobbies } from "@/data/site";

const icons = {
  gamepad: Gamepad2,
  book: BookOpen,
  flask: FlaskConical,
};

export default function Hobbies() {
  return (
    <section id="hobbies" className="section-pad border-t border-line-soft">
      <div className="container-x">
        <SectionHeader
          index="02"
          eyebrow="Hobbies"
          title={hobbies.title}
          description={hobbies.description}
        />

        <div className="grid gap-4 md:grid-cols-3">
          {hobbies.items.map((item, i) => {
            const Icon = icons[item.icon] || Gamepad2;
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <article className="card group flex h-full flex-col p-6 transition-colors duration-300 hover:border-accent-border sm:p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-surface2 text-accent transition-colors group-hover:border-accent-border">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mute">
                    {item.text}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
