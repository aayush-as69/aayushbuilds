"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Pause, Play } from "lucide-react";

/*
 * Project gallery — staggered columns of landing-page cards that drift up and
 * down in opposite directions.
 *
 * - A card shows `project.shot` (a landing-page screenshot in /public) when it
 *   is set, and a generated placeholder otherwise, so the section already
 *   works before any screenshots exist. Placeholders show more as the card
 *   gets wider (container queries), so they fit any layout that hosts them.
 * - Motion is a CSS transform loop (compositor only). Each column renders its
 *   cards COPIES times and scrolls by exactly one copy (-25%), so the loop is
 *   seamless whatever the number of projects. Copies after the first are
 *   aria-hidden and not focusable.
 * - Hovering a card lifts it and shows a "View case study" tag. The columns
 *   pause on hover, on keyboard focus, when scrolled out of view, and via a
 *   visible pause button. Under prefers-reduced-motion it becomes a static
 *   grid with no animation.
 */

const COPIES = 4; // the loop distance is 1 / COPIES of the track
// Two columns keep the cards big enough to read a landing page, and mean no
// card shows up twice inside the visible window (every column is taller than
// what is on screen).
const COLUMNS = 2;
// Seconds one card takes to scroll past, per column. A column's loop lasts
// (cards in column x this), so every column keeps a steady speed in px/s
// whatever its length. Lower numbers are faster (about 30 px/s on desktop).
const SECONDS_PER_CARD = [6, 7.5];
// How far through its loop each column starts, so they never line up.
const OFFSETS = [0, 0.45];
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
        className="relative rounded-2xl border border-line bg-surface p-3 sm:p-4 motion-safe:h-[360px] motion-safe:overflow-hidden motion-safe:sm:h-[520px] motion-safe:lg:h-[560px]"
      >
        <button
          type="button"
          onClick={() => setUserPaused((v) => !v)}
          aria-label={
            userPaused ? "Play project preview motion" : "Pause project preview motion"
          }
          className="absolute right-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1.5 font-mono text-[11px] text-mute transition-colors hover:border-accent-border hover:text-accent motion-reduce:hidden sm:right-4 sm:top-4"
        >
          {userPaused ? (
            <Play size={12} aria-hidden="true" />
          ) : (
            <Pause size={12} aria-hidden="true" />
          )}
          {userPaused ? "Play" : "Pause"}
        </button>

        <div className="h-full motion-safe:[-webkit-mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_88%,transparent)] motion-safe:[mask-image:linear-gradient(to_bottom,transparent,#000_12%,#000_88%,transparent)]">
          <div className="flex h-full gap-3 sm:gap-4">
            {splitColumns(projects, COLUMNS).map((items, i) => (
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
  const duration =
    items.length * SECONDS_PER_CARD[index % SECONDS_PER_CARD.length];
  const delay = -(duration * OFFSETS[index % OFFSETS.length]);

  return (
    <div className="min-w-0 flex-1">
      <ul
        className="animate-gallery will-change-transform motion-reduce:animate-none"
        style={{
          animationDuration: `${duration.toFixed(1)}s`,
          animationDelay: `${delay.toFixed(1)}s`,
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
        className="group relative block aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface2 transition-[transform,border-color,box-shadow] duration-200 [container-type:inline-size] hover:z-10 hover:-translate-y-1 hover:scale-[1.04] hover:border-accent hover:shadow-glow focus-visible:z-10 focus-visible:border-accent"
      >
        {project.shot ? (
          <Image
            src={project.shot}
            alt={duplicate ? "" : `${project.name} landing page`}
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 380px, 180px"
            className="object-cover object-top"
          />
        ) : (
          <Placeholder project={project} />
        )}

        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-2 top-2 inline-flex items-center gap-1 rounded-full border border-accent-border bg-surface px-2 py-0.5 font-mono text-[9px] text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          View case study
          <ArrowUpRight size={10} aria-hidden="true" />
        </span>

        <div
          className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 px-3 pb-2.5 pt-9 [@container_(min-width:240px)]:px-4 [@container_(min-width:240px)]:pb-3"
          style={{
            background: "linear-gradient(to top, var(--overlay), transparent)",
          }}
        >
          <span className="truncate font-display text-sm font-semibold text-ink [@container_(min-width:240px)]:text-base">
            {project.name}
          </span>
          <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.14em] text-mute [@container_(min-width:240px)]:text-[10px]">
            {project.number}
            <span className="hidden [@container_(min-width:340px)]:inline">
              {" "}
              / {label}
            </span>
          </span>
        </div>
      </Link>
    </li>
  );
}

// A generated stand-in for a landing-page screenshot. It reveals more as the
// card gets wider: category + skeleton, then tagline, then tech chips.
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
      <div className="flex items-center gap-1 border-b border-line-soft px-2.5 py-1.5 [@container_(min-width:240px)]:gap-1.5 [@container_(min-width:240px)]:px-3 [@container_(min-width:240px)]:py-2">
        <span className="dot bg-line" />
        <span className="dot bg-line" />
        <span className="dot bg-line" />
      </div>
      <div className="px-3 pt-2.5 [@container_(min-width:240px)]:px-4 [@container_(min-width:240px)]:pt-4">
        <p className="truncate font-mono text-[8px] uppercase tracking-[0.18em] text-accent-soft [@container_(min-width:240px)]:text-[10px]">
          {project.category}
        </p>
        <div className="mt-2 space-y-1.5 [@container_(min-width:200px)]:hidden">
          <span className="block h-1.5 w-4/5 rounded bg-line" />
          <span className="block h-1.5 w-3/5 rounded bg-line" />
        </div>
        <div className="mt-2 hidden [@container_(min-width:200px)]:block">
          <p className="line-clamp-2 font-display text-[12px] font-semibold leading-snug text-ink [@container_(min-width:280px)]:text-[15px]">
            {project.tagline}
          </p>
        </div>
        <div className="mt-2 hidden gap-1 overflow-hidden [@container_(min-width:280px)]:flex">
          {project.tech.slice(0, 3).map((t, i) => (
            <span
              key={t}
              className={`shrink-0 whitespace-nowrap rounded-full border border-line px-2 py-0.5 font-mono text-[9px] text-mute ${
                i === 2 ? "hidden [@container_(min-width:340px)]:block" : ""
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
