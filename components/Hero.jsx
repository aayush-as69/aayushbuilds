"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { GithubIcon } from "./icons";
import { hero, profile } from "@/data/site";

/*
 * Hero with a self-typing terminal. The typing waits for the Matrix boot
 * screen to finish (listens for the "ab:booted" event) so the animation is
 * actually visible. Reduced-motion users get the full output instantly.
 */

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Background: faint grid + green radial glow */}
      <div
        aria-hidden="true"
        className="grid-bg mask-fade-b pointer-events-none absolute inset-0 opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-15%] h-[560px] w-[560px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(closest-side, var(--accent-dim), transparent)",
        }}
      />

      <div className="container-x relative flex min-h-[100svh] flex-col justify-center pb-16 pt-28 sm:pt-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <Reveal>
              <p className="eyebrow">{hero.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.06] sm:text-5xl lg:text-6xl">
                {hero.titleTop}{" "}
                <span className="text-accent text-glow">
                  {hero.titleAccent}
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
                {hero.copy}
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <a href="#projects" className="btn-primary">
                  Explore My Work
                </a>
                <a href="#contact" className="btn-ghost">
                  Let&apos;s Connect
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <GithubIcon size={16} aria-hidden="true" />
                  View GitHub
                  <ArrowUpRight
                    size={14}
                    aria-hidden="true"
                    className="opacity-60"
                  />
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-10 flex items-center gap-2.5 font-mono text-[11px] tracking-wider text-mute">
                <span className="dot bg-accent animate-pulse-soft" aria-hidden="true" />
                building in public — github.com/{profile.githubHandle}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} y={26}>
            <Terminal />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Terminal() {
  const [typed, setTyped] = useState([]); // [{cmd, out[], done}]
  const [done, setDone] = useState(false);
  const liveRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setTyped(hero.terminal.blocks.map((b) => ({ ...b, done: true })));
      setDone(true);
      return undefined;
    }

    let cancelled = false;
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));

    const run = () => {
      let t = 300;
      hero.terminal.blocks.forEach((block) => {
        // Type the command character by character
        for (let i = 1; i <= block.cmd.length; i += 1) {
          const slice = block.cmd.slice(0, i);
          later(() => {
            if (cancelled) return;
            setTyped((prev) => {
              const next = prev.slice(0, -1);
              return [...next, { cmd: slice, out: [], done: false }];
            });
          }, t);
          t += 46;
        }
        // Then reveal the output lines
        block.out.forEach((line, li) => {
          t += 210;
          later(() => {
            if (cancelled) return;
            setTyped((prev) => {
              const cur = prev[prev.length - 1];
              const updated = {
                ...cur,
                out: [...block.out.slice(0, li + 1)],
                done: li === block.out.length - 1,
              };
              return [...prev.slice(0, -1), updated];
            });
          }, t);
        });
        // New prompt line
        t += 320;
        later(() => {
          if (cancelled) return;
          setTyped((prev) => {
            const finished = prev.map((b) => ({ ...b, done: true }));
            const isLast =
              finished.length === hero.terminal.blocks.length &&
              finished[finished.length - 1].out.length === block.out.length;
            return isLast ? finished : [...finished, { cmd: "", out: [], done: false }];
          });
        }, t);
      });
      later(() => {
        if (cancelled) return;
        setTyped(
          hero.terminal.blocks.map((b) => ({ ...b, done: true })).slice(0, hero.terminal.blocks.length)
        );
        setDone(true);
      }, t + 200);
    };

    // Wait for the boot screen to complete before typing
    let started = false;
    const start = () => {
      if (started || cancelled) return;
      started = true;
      run();
    };

    if (
      !document.body.classList.contains("booting") &&
      document.documentElement.classList.contains("boot-skip")
    ) {
      start();
    } else {
      window.addEventListener("ab:booted", start, { once: true });
      // Safety: start anyway after 4.5s in case the event never arrives
      const safety = setTimeout(start, 4500);
      timers.push(safety);
    }

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      window.removeEventListener("ab:booted", start);
    };
  }, []);

  return (
    <div className="card relative overflow-hidden" ref={liveRef}>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--accent-border), transparent)",
        }}
      />
      <div className="flex items-center gap-2 border-b border-line bg-surface2 px-4 py-3">
        <span className="dot bg-line" aria-hidden="true" />
        <span className="dot bg-line" aria-hidden="true" />
        <span className="dot bg-accent opacity-60" aria-hidden="true" />
        <p className="ml-2 font-mono text-[11px] text-mute">
          {hero.terminal.user}: ~ — zsh
        </p>
      </div>
      <div
        className="min-h-[248px] space-y-1 px-4 py-4 font-mono text-[12.5px] leading-relaxed sm:text-[13px]"
        aria-label="Terminal introducing Aayush Singh"
      >
        {typed.map((block, i) => (
          <div key={i}>
            <p>
              <span className="text-accent">$</span>{" "}
              <span className="text-ink">{block.cmd}</span>
            </p>
            {block.out.map((line, j) => (
              <p key={j} className="pl-3 text-mute">
                {line}
              </p>
            ))}
          </div>
        ))}
        <p className={done ? "caret" : undefined} aria-hidden="true">
          <span className="text-accent">$</span>
        </p>
      </div>
    </div>
  );
}
