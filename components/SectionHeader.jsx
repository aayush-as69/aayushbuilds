import Reveal from "./Reveal";

export default function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  className = "mb-12 max-w-2xl sm:mb-16",
}) {
  return (
    <Reveal className={className}>
      <p className="eyebrow">
        <span className="text-accent">{index}</span>
        <span className="mx-2 text-line" aria-hidden="true">
          /
        </span>
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-mute sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
