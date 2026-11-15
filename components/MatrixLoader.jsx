"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Matrix-inspired boot screen — a developer terminal boot sequence, not a
 * movie imitation. Subtle glyph rain on a nearly-black canvas, AayushBuilds
 * branding, a progress indicator and technical status lines.
 *
 * Behaviour:
 * - Plays once per browser session (sessionStorage), then never again.
 * - Skipped entirely for prefers-reduced-motion users.
 * - Lightweight: capped FPS, capped DPR, fewer columns on small/low-power
 *   devices, paused when the tab is hidden.
 * - Always auto-completes (≈2s); a keyboard-accessible Skip button is shown.
 * - Falls back to a text-only boot if the canvas is unavailable.
 */

const GLYPHS =
  "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEF<>{}[]/\\|=+*";

const BOOT_LINES = [
  "INITIALIZING ENVIRONMENT...",
  "LOADING MODULES...",
  "ESTABLISHING SESSION...",
  "READY",
];

const DURATION = 2050;
const DURATION_LOW_POWER = 1300;
const FPS = 22;

export default function MatrixLoader() {
  const [phase, setPhase] = useState("visible"); // visible -> exiting -> done
  const [pct, setPct] = useState(0);
  const canvasRef = useRef(null);
  const exitingRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const raf = { id: 0 };
    const timers = [];

    const finish = (fast = false) => {
      if (exitingRef.current) return;
      exitingRef.current = true;
      setPhase("exiting");
      timers.push(
        setTimeout(() => {
          document.body.classList.remove("booting");
          window.dispatchEvent(new Event("ab:booted"));
          setPhase("done");
        }, fast ? 420 : 650)
      );
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let booted = false;
    try {
      booted = sessionStorage.getItem("ab:booted") === "1";
    } catch {
      booted = false;
    }

    if (reduced || booted || document.documentElement.classList.contains("boot-skip")) {
      setPhase("done");
      return () => {
        cancelled = true;
        cancelAnimationFrame(raf.id);
        timers.forEach(clearTimeout);
      };
    }

    document.body.classList.add("booting");
    try {
      sessionStorage.setItem("ab:booted", "1");
    } catch {
      // private mode — the intro simply replays per page load, still bounded
    }

    // Progress state (~12 fps is plenty for a progress bar)
    const duration =
      (navigator.hardwareConcurrency || 8) <= 2 ? DURATION_LOW_POWER : DURATION;
    const start = performance.now();
    const ui = setInterval(() => {
      const p = Math.min(100, Math.round(((performance.now() - start) / duration) * 100));
      if (!cancelled) setPct(p);
      if (p >= 100) clearInterval(ui);
    }, 80);
    timers.push(ui);

    // Canvas glyph rain (subtle by design)
    const canvas = canvasRef.current;
    let ctx = null;
    if (canvas && canvas.getContext) {
      try {
        ctx = canvas.getContext("2d");
      } catch {
        ctx = null;
      }
    }

    const lowPower = (navigator.hardwareConcurrency || 8) <= 2;
    const colWidth = lowPower ? 38 : 27;
    let columns = [];

    const setup = () => {
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#090B0A";
      ctx.fillRect(0, 0, w, h);
      const count = Math.ceil(w / colWidth);
      columns = Array.from({ length: count }, (_, i) => ({
        x: i * colWidth,
        y: Math.random() * -h * 0.5,
        speed: 55 + Math.random() * 70,
        gap: 14 + Math.floor(Math.random() * 6),
      }));
    };

    setup();
    window.addEventListener("resize", setup);

    const font =
      '13px "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';
    let last = 0;

    const step = (ts) => {
      raf.id = requestAnimationFrame(step);
      if (cancelled) return;
      if (document.hidden) {
        last = ts;
        return;
      }
      if (ts - last < 1000 / FPS) return;
      last = ts;

      if (ctx) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        // Trail fade
        ctx.fillStyle = "rgba(9, 11, 10, 0.17)";
        ctx.fillRect(0, 0, w, h);
        ctx.font = font;
        for (const col of columns) {
          // Sparse by design — some columns stay quiet each tick
          if (Math.random() > 0.62) continue;
          col.y += col.speed / FPS;
          if (col.y > h + 80 && Math.random() > 0.975) {
            col.y = Math.random() * -h * 0.4;
            col.speed = 55 + Math.random() * 70;
          }
          if (col.y < 0) continue;
          const ch = GLYPHS[(Math.random() * GLYPHS.length) | 0];
          // Head
          ctx.fillStyle = "rgba(126, 244, 168, 0.62)";
          ctx.fillText(ch, col.x, col.y);
          // Occasional trailing glyph, very dim
          if (Math.random() > 0.5) {
            ctx.fillStyle = "rgba(46, 143, 92, 0.28)";
            ctx.fillText(
              GLYPHS[(Math.random() * GLYPHS.length) | 0],
              col.x,
              col.y - col.gap
            );
          }
        }
      }

      if (ts - start >= duration) finish();
    };

    raf.id = requestAnimationFrame(step);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf.id);
      clearInterval(ui);
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", setup);
      document.body.classList.remove("booting");
    };
  }, []);

  if (phase === "done") return null;

  const statusIndex = Math.min(
    BOOT_LINES.length - 1,
    Math.floor((pct / 100) * BOOT_LINES.length)
  );

  return (
    <div
      className={`matrix-overlay fixed inset-0 z-[100] flex items-center justify-center bg-bg transition-opacity duration-700 ease-out ${
        phase === "exiting" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">
        Loading AayushBuilds — initializing environment
      </span>
      {phase === "visible" && (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 46%, rgba(9,11,10,0) 0%, rgba(9,11,10,0.86) 100%)",
        }}
      />

      <div
        className={`relative flex flex-col items-center px-6 text-center transition-all duration-500 ${
          phase === "exiting" ? "translate-y-2 opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex items-center gap-3 rounded-lg border border-line bg-surface2 px-3 py-2 font-mono text-sm text-accent">
          <span aria-hidden="true">A/&gt;</span>
        </div>
        <h2 className="mt-6 font-mono text-lg tracking-[0.42em] text-ink sm:text-xl">
          AAYUSHBUILDS
        </h2>

        <div className="mt-8 h-[2px] w-56 overflow-hidden rounded-full bg-surface2">
          <div
            className="h-full bg-accent transition-[width] duration-150 ease-linear"
            style={{ width: `${pct}%` }}
          />
        </div>

        <p className="mt-4 h-4 font-mono text-[11px] tracking-[0.18em] text-mute">
          {BOOT_LINES[statusIndex]}
        </p>
      </div>

      <button
        type="button"
        onClick={() => {
          exitingRef.current = false; // allow the skip path to run finish()
          finish(true);
        }}
        className="absolute bottom-6 right-6 rounded-lg border border-line px-4 py-2 font-mono text-xs text-mute transition-colors hover:border-accent-border hover:text-accent"
      >
        Skip intro
      </button>
    </div>
  );
}
