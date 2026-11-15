"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MousePointerClick } from "lucide-react";

/*
 * Interactive frosted-glass pane over a project card.
 *
 * - Intact: the card sits behind a frosted pane with a "break the glass"
 *   hint. Clicking (or tapping) the card breaks it.
 * - Breaking: flash, crack web draws outward, glass shards burst and fade.
 * - Broken: the crack web stays etched on the card permanently (until
 *   reload) and the card's links become clickable.
 *
 * Keyboard users are unaffected — the pane is aria-hidden and never traps
 * focus, so tabbing to the links underneath works even while it's intact.
 * Reduced-motion users get no pane at all.
 */

const CX = 50;
const CY = 34;
const SQ = 0.6;

const seedOf = (s) => {
  let h = 7;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 9973;
  return h;
};

// Deterministic per-seed pseudo-random in [0, 1)
const rnd = (seed, n) => {
  const x = Math.sin(seed * 0.137 + n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

function geometry(seedStr) {
  const seed = seedOf(seedStr || "glass");
  const shards = [];
  const N = 12;
  for (let i = 0; i < N; i += 1) {
    const a0 = ((i + rnd(seed, i) * 0.6) / N) * Math.PI * 2;
    const a1 = ((i + 1 + rnd(seed, i + 40) * 0.4) / N) * Math.PI * 2;
    const am = (a0 + a1) / 2;
    const rIn = 3 + rnd(seed, i + 7) * 4;
    const rOut = 24 + rnd(seed, i + 13) * 14;
    const p1 = [CX + rIn * Math.cos(a0), CY + rIn * Math.sin(a0) * SQ];
    const p2 = [CX + rOut * Math.cos(a0), CY + rOut * Math.sin(a0) * SQ];
    const p3 = [CX + rOut * Math.cos(a1), CY + rOut * Math.sin(a1) * SQ];
    const fly = 50 + rnd(seed, i + 21) * 40;
    shards.push({
      points: `${p1[0].toFixed(2)},${p1[1].toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)} ${p3[0].toFixed(2)},${p3[1].toFixed(2)}`,
      x: Math.cos(am) * fly,
      y: Math.sin(am) * fly * SQ,
      rotate: (rnd(seed, i + 31) > 0.5 ? 1 : -1) * (14 + rnd(seed, i + 33) * 30),
      delay: 0.34 + rnd(seed, i + 3) * 0.18,
    });
  }
  const cracks = [];
  for (let i = 0; i < 7; i += 1) {
    const a = (i / 7) * Math.PI * 2 + rnd(seed, i + 55) * 0.5;
    const kink = 0.5 + rnd(seed, i + 61) * 0.25;
    const len = 44 + rnd(seed, i + 67) * 12;
    const mid = [CX + len * kink * Math.cos(a), CY + len * kink * Math.sin(a) * SQ];
    const end = [
      CX + len * Math.cos(a + 0.12),
      CY + len * Math.sin(a + 0.12) * SQ,
    ];
    cracks.push(
      `M${CX},${CY} L${mid[0].toFixed(2)},${mid[1].toFixed(2)} L${end[0].toFixed(2)},${end[1].toFixed(2)}`
    );
  }
  return { shards, cracks };
}

const flyEase = [0.15, 0.6, 0.3, 1];

export default function GlassPane({ seed }) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState("intact"); // intact | breaking | broken
  const { shards, cracks } = geometry(seed);

  useEffect(() => {
    if (phase !== "breaking") return undefined;
    const t = setTimeout(() => setPhase("broken"), 1250);
    return () => clearTimeout(t);
  }, [phase]);

  if (reduce) return null;

  // Broken: the permanent crack web stays etched over the card.
  if (phase === "broken") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-2xl"
      >
        <svg
          viewBox="0 0 100 68"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {cracks.map((d) => (
            <path
              key={d}
              d={d}
              fill="none"
              strokeWidth="0.34"
              strokeLinecap="round"
              style={{ stroke: "var(--accent-border)", opacity: 0.55 }}
            />
          ))}
        </svg>
      </div>
    );
  }

  const breaking = phase === "breaking";

  return (
    <div
      aria-hidden="true"
      onClick={() => {
        if (!breaking) setPhase("breaking");
      }}
      className={`absolute inset-0 z-10 overflow-hidden rounded-2xl select-none ${
        breaking ? "pointer-events-none" : "cursor-pointer"
      }`}
    >
      {/* Frosted pane over the card */}
      <motion.div
        className="absolute inset-0 backdrop-blur-[2px]"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(57,255,136,0.06) 45%, rgba(0,0,0,0.25))",
        }}
        initial={{ opacity: 1 }}
        animate={breaking ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl border border-white/10"
        initial={{ opacity: 1 }}
        animate={breaking ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Hint */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 1 }}
        animate={breaking ? { opacity: 0, scale: 0.92 } : { opacity: 1 }}
        transition={{ duration: 0.18 }}
      >
        <p className="flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
          <MousePointerClick size={12} aria-hidden="true" />
          break the glass
        </p>
      </motion.div>

      <svg
        viewBox="0 0 100 68"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {/* Impact flash */}
        <motion.circle
          cx={CX}
          cy={CY}
          r="7"
          fill="var(--accent-dim)"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={breaking ? { opacity: [0, 1, 0], scale: [0.3, 2.4, 3.4] } : {}}
          transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* Cracks — draw fast, then persist via the "broken" render above */}
        {cracks.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            strokeWidth="0.36"
            strokeLinecap="round"
            style={{ stroke: "var(--accent)" }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              breaking
                ? { pathLength: 1, opacity: [0, 0.9, 0.9] }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              pathLength: {
                duration: 0.3,
                delay: 0.12 + i * 0.025,
                ease: "easeOut",
              },
              opacity: { duration: 0.25, delay: 0.12 + i * 0.025 },
            }}
          />
        ))}

        {/* Shards burst outward and fade */}
        {shards.map((s, i) => (
          <motion.polygon
            key={i}
            points={s.points}
            strokeWidth="0.3"
            style={{
              fill: "url(#glass-pane-shard)",
              stroke: "var(--accent-border)",
            }}
            initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
            animate={
              breaking
                ? {
                    opacity: [0, 1, 0.85, 0],
                    x: s.x,
                    y: s.y,
                    rotate: s.rotate,
                  }
                : { opacity: 0 }
            }
            transition={{
              x: { duration: 1.0, delay: s.delay, ease: flyEase },
              y: { duration: 1.0, delay: s.delay, ease: flyEase },
              rotate: { duration: 1.0, delay: s.delay, ease: flyEase },
              opacity: {
                duration: 1.15,
                delay: s.delay,
                times: [0, 0.07, 0.45, 1],
              },
            }}
          />
        ))}
        <defs>
          <linearGradient id="glass-pane-shard" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.28)" />
            <stop offset="0.5" stopColor="rgba(57,255,136,0.15)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.06)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
