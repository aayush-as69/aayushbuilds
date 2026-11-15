"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/*
 * Glass-break reveal: when the wrapped card scrolls into view, a bright
 * crack web draws across it, then "glass" shards burst outward and fade.
 * Purely decorative (aria-hidden, pointer-events-none), deterministic
 * geometry so SSR and hydration agree, and skipped entirely for
 * reduced-motion users.
 *
 * Sequencing: starts ~0.35s after the card enters view so the card's own
 * Reveal fade-in has finished first — the break is then clearly visible.
 */

const CX = 50;
const CY = 34;
const SQUASH = 0.6; // slight vertical squash so shards read well on wide cards

const BASE_DELAY = 0.35;

const SHARDS = Array.from({ length: 16 }, (_, i) => {
  const a0 = (i / 16) * Math.PI * 2;
  const a1 = ((i + 1) / 16) * Math.PI * 2;
  const am = (a0 + a1) / 2;
  const rIn = 4 + 2 * Math.abs(Math.sin(i * 12.9));
  const rOut = 26 + 10 * Math.abs(Math.sin(i * 7.7));
  const p1 = [CX + rIn * Math.cos(a0), CY + rIn * Math.sin(a0) * SQUASH];
  const p2 = [CX + rOut * Math.cos(a0), CY + rOut * Math.sin(a0) * SQUASH];
  const p3 = [CX + rOut * Math.cos(a1), CY + rOut * Math.sin(a1) * SQUASH];
  const fly = 55 + 35 * Math.abs(Math.sin(i * 3.3));
  return {
    points: `${p1[0].toFixed(2)},${p1[1].toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)} ${p3[0].toFixed(2)},${p3[1].toFixed(2)}`,
    x: Math.cos(am) * fly,
    y: Math.sin(am) * fly * SQUASH,
    rotate: (i % 2 ? 1 : -1) * (18 + (i % 4) * 12),
    delay: BASE_DELAY + 0.25 + (i % 5) * 0.04,
  };
});

const CRACKS = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2 + 0.35;
  const kink = 0.55 + 0.12 * Math.sin(i * 9.1);
  const len = 46 + 8 * Math.abs(Math.cos(i * 4.7));
  const mid = [
    CX + len * kink * Math.cos(a),
    CY + len * kink * Math.sin(a) * SQUASH,
  ];
  const end = [
    CX + len * Math.cos(a + 0.12),
    CY + len * Math.sin(a + 0.12) * SQUASH,
  ];
  return `M${CX},${CY} L${mid[0].toFixed(2)},${mid[1].toFixed(2)} L${end[0].toFixed(2)},${end[1].toFixed(2)}`;
});

const flyEase = [0.15, 0.6, 0.3, 1];
const TOTAL_MS = 2400;

export default function GlassBreak() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState(false);

  // Reduced-motion users keep the plain card: unmount only after hydration
  // so server and first client render agree (avoids React error #418).
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!inView || reduce) return undefined;
    const t = setTimeout(() => setDone(true), TOTAL_MS);
    return () => clearTimeout(t);
  }, [inView, reduce]);

  if ((mounted && reduce) || done) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-2xl"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 68"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="glass-shard" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.25)" />
            <stop offset="0.5" stopColor="rgba(57,255,136,0.14)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
        </defs>

        {/* Crack web — bright accent lines drawing fast from the impact point */}
        {CRACKS.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            strokeWidth="0.38"
            strokeLinecap="round"
            style={{ stroke: "var(--accent)" }}
            initial={{ pathLength: 0, opacity: 0.85 }}
            animate={
              inView
                ? { pathLength: 1, opacity: [0, 0.85, 0.85, 0] }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              pathLength: {
                duration: 0.35,
                delay: BASE_DELAY + i * 0.03,
                ease: "easeOut",
              },
              opacity: {
                duration: 1.3,
                delay: BASE_DELAY,
                times: [0, 0.25, 0.6, 1],
              },
            }}
          />
        ))}

        {/* Shards — appear on impact, fly outward, fade */}
        {SHARDS.map((s, i) => (
          <motion.polygon
            key={i}
            points={s.points}
            strokeWidth="0.3"
            style={{
              fill: "url(#glass-shard)",
              stroke: "var(--accent-border)",
            }}
            initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
            animate={
              inView
                ? {
                    opacity: [0, 1, 0.9, 0],
                    x: s.x,
                    y: s.y,
                    rotate: s.rotate,
                  }
                : { opacity: 0 }
            }
            transition={{
              x: { duration: 1.05, delay: s.delay, ease: flyEase },
              y: { duration: 1.05, delay: s.delay, ease: flyEase },
              rotate: { duration: 1.05, delay: s.delay, ease: flyEase },
              opacity: {
                duration: 1.25,
                delay: s.delay,
                times: [0, 0.08, 0.45, 1],
              },
            }}
          />
        ))}
      </svg>

      {/* Impact flash at the point of break */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="block h-28 w-28 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, var(--accent-dim), transparent 70%)",
          }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={inView ? { opacity: [0, 1, 0], scale: [0.4, 1.7, 2.2] } : {}}
          transition={{ duration: 0.6, delay: BASE_DELAY, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
