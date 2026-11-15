"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pause, Play } from "lucide-react";

/*
 * Project gallery — staggered columns of landing-page cards that drift up and
 * down in opposite directions.
 *
 * - A card shows `project.shot` (a landing-page screenshot in /public) when it
 *   is set, and a generated placeholder otherwise, so the section already
 *   works before any screenshots exist.
 * - Motion is a CSS transform loop (compositor only). Each column renders its
 *   cards COPIES times and scrolls by exactly one copy (-25%), so the loop is
 *   seamless whatever the number of projects. Copies after the first are
 *   aria-hidden and not focusable.
 * - It pauses on hover, on keyboard focus, when scrolled out of view, and via a
 *   visible pause button. Under prefers-reduced-motion it becomes a static
 *   grid with no animation.
 */

const COPIES = 4; // the loop distance is 1 / COPIES of the track
const SPEEDS = [56, 68, 62]; // seconds per loop, per column
const DELAYS = [0, -22, -11]; // negative delays stagger where each column starts
const CARD_GAP = "pb-3 sm:pb-4"; // padding, not flex gap, so the loop distance is exact

function splitColumns(items, count) {
  const columns = Array.from({ length: count }, () => []);
  items.forEach((item, i) => columns[i % count].push(item));
  return columns;
}

export default function ProjectGallery({ projects }) {
  const rootRef = useRef(null);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(true);

  // Stop animating while the gallery is off-screen.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const paused = userPaused || hovered || focused || !inView;

  return (
    <div>
      <div
        ref={rootRef}
        role="group"
        aria-label="Landing pages of my projects"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="relative rounded-2xl border border-line bg-surface p-3 sm:p-4 motion-safe:h-[360px] motion-safe:overflow-hidden motion-safe:sm:h-[520px]"
      >
        <button
          type="button"
          onClick={() => setUserPaused((v) => !v)}
          aria-label={
            userPaused ? "Play project preview motion" : "Pause project preview motion"
          }
          className="absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1.5 font-mono text-[11px] text-mute transition-colors hover:border-accent-border hover:text-accent motion-reduce:hidden sm:right-4 sm:top-4"
        >
          {userPaused ? (
            <Play size={12} aria-hidden="true" />
          ) : (
            <Pause size={12} aria-hidden="true" />
          )}
          {userPaused ? "Play" : "Pause"}
        </button>

        <div className="h-full motion-safe:[-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_88%,transparent)] motion-safe:[mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_88%,transparent)]">
          {/* Phones: two columns */}
          <div className="flex h-full gap-3 sm:hidden">
            {splitColumns(projects, 2).map((items, i) => (
              <Column key={i} items={items} index={i} paused={paused} />
            ))}
          </div>
          {/* Tablet and up: three columns */}
          <div className="hidden h-full gap-4 sm:flex">
            {splitColumns(projects, 3).map((items, i) => (
              <Column key={i} items={items} index={i} paused={paused} />
            ))}
          </div>
        </div>
      </div>

      <p className="mt-3 font-mono text-[11px] text-mute">
        Select a card for its case study.
        <span className="motion-reduce:hidden"> Hover or focus to pause.</span>
      </p>
    </div>
  );
}

function Column({ items, index, paused }) {
  const goesDown = index % 2 === 1;

  return (
    <div className="min-w-0 flex-1">
      <ul
        className="animate-gallery will-change-transform motion-reduce:animate-none"
        style={{
          animationDuration: `${SPEEDS[index % SPEEDS.length]}s`,
          animationDelay: `${DELAYS[index % DELAYS.length]}s`,
          animationDirection: goesDown ? "reverse" : "normal",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {Array.from({ length: COPIES }).flatMap((_, copy) =>
          items.map((project) => (
            <Card
              key={`${copy}-${project.slug}`}
              project={project}
              duplicate={copy > 0}
            />
          ))
        )}
      </ul>
    </div>
  );
}

function Card({ project, duplicate }) {
  const label = project.category.split(" · ").pop();

  return (
    <li
      aria-hidden={duplicate ? "true" : undefined}
      className={duplicate ? `hidden motion-safe:block ${CARD_GAP}` : CARD_GAP}
    >
      <Link
        href={`/projects/${project.slug}`}
        tabIndex={duplicate ? -1 : undefined}
        className="relative block aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface2 transition-colors hover:border-accent-border"
      >
        {project.shot ? (
          <Image
            src={project.shot}
            alt={duplicate ? "" : `${project.name} landing page`}
            fill
            sizes="(min-width: 640px) 360px, 180px"
            className="object-cover object-top"
          />
        ) : (
          <Placeholder project={project} />
        )}

        <div
          className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 px-3 pb-2.5 pt-9 sm:px-4 sm:pb-3"
          style={{
            background: "linear-gradient(to top, var(--overlay), transparent)",
          }}
        >
          <span className="truncate font-display text-sm font-semibold text-ink sm:text-base">
            {project.name}
          </span>
          <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] text-mute sm:text-[10px]">
            {project.number}
            <span className="hidden sm:inline"> / {label}</span>
          </span>
        </div>
      </Link>
    </li>
  );
}

// A generated stand-in for a landing-page screenshot.
function Placeholder({ project }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(120% 90% at 100% 0%, var(--accent-dim), transparent 62%), var(--surface-2)",
      }}
    >
      <div className="flex items-center gap-1 border-b border-line-soft px-2.5 py-1.5 sm:gap-1.5 sm:px-3 sm:py-2">
        <span className="dot bg-line" />
        <span className="dot bg-line" />
        <span className="dot bg-line" />
      </div>
      <div className="px-3 pt-3 sm:px-4 sm:pt-4">
        <p className="truncate font-mono text-[8px] uppercase tracking-[0.18em] text-accent-soft sm:text-[10px]">
          {project.category}
        </p>
        <div className="hidden sm:block">
          <p className="mt-2 line-clamp-2 font-display text-[15px] font-semibold leading-snug text-ink">
            {project.tagline}
          </p>
        </div>
        <div className="mt-2 space-y-1.5 sm:hidden">
          <span className="block h-1.5 w-4/5 rounded bg-line" />
          <span className="block h-1.5 w-3/5 rounded bg-line" />
        </div>
        <div className="mt-2 hidden flex-wrap gap-1 sm:flex">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-line px-2 py-0.5 font-mono text-[9px] text-mute"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
