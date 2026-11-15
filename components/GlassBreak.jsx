"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/*
 * Glass-break reveal: when the wrapped card scrolls into view, a crack web
 * draws across it, then "glass" shards burst outward and fade. Purely
 * decorative (aria-hidden, pointer-events-none), deterministic geometry so
 * SSR and hydration agree, and skipped entirely for reduced-motion users.
 */

const CX = 50;
const CY = 34;
const SQUASH = 0.6; // slight vertical squash so shards read well on wide cards

const SHARDS = Array.from({ length: 14 }, (_, i) => {
  const a0 = (i / 14) * Math.PI * 2;
  const a1 = ((i + 1) / 14) * Math.PI * 2;
  const am = (a0 + a1) / 2;
  const rIn = 4 + 2 * Math.abs(Math.sin(i * 12.9));
  const rOut = 26 + 9 * Math.abs(Math.sin(i * 7.7));
  const p1 = [CX + rIn * Math.cos(a0), CY + rIn * Math.sin(a0) * SQUASH];
  const p2 = [CX + rOut * Math.cos(a0), CY + rOut * Math.sin(a0) * SQUASH];
  const p3 = [CX + rOut * Math.cos(a1), CY + rOut * Math.sin(a1) * SQUASH];
  const fly = 46 + 28 * Math.abs(Math.sin(i * 3.3));
  return {
    points: `${p1[0].toFixed(2)},${p1[1].toFixed(2)} ${p2[0].toFixed(2)},${p2[1].toFixed(2)} ${p3[0].toFixed(2)},${p3[1].toFixed(2)}`,
    x: Math.cos(am) * fly,
    y: Math.sin(am) * fly * SQUASH,
    rotate: (i % 2 ? 1 : -1) * (16 + (i % 4) * 11),
    delay: 0.4 + (i % 5) * 0.035,
  };
});

const CRACKS = Array.from({ length: 7 }, (_, i) => {
  const a = (i / 7) * Math.PI * 2 + 0.35;
  const kink = 0.55 + 0.12 * Math.sin(i * 9.1);
  const len = 46 + 6 * Math.abs(Math.cos(i * 4.7));
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

export default function GlassBreak() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
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
    const t = setTimeout(() => setDone(true), 1600);
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
            <stop offset="0" stopColor="rgba(255,255,255,0.17)" />
            <stop offset="0.5" stopColor="rgba(57,255,136,0.08)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.03)" />
          </linearGradient>
        </defs>

        {/* Crack web — draws fast, fades with the shatter */}
        {CRACKS.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="var(--accent-border)"
            strokeWidth="0.28"
            initial={{ pathLength: 0, opacity: 0.9 }}
            animate={
              inView
                ? { pathLength: 1, opacity: [0.9, 0.9, 0] }
                : { pathLength: 0, opacity: 0 }
            }
            transition={{
              pathLength: {
                duration: 0.3,
                delay: i * 0.025,
                ease: "easeOut",
              },
              opacity: { duration: 1.0, delay: 0.4, times: [0, 0.3, 1] },
            }}
          />
        ))}

        {/* Shards — appear on impact, fly outward, fade */}
        {SHARDS.map((s, i) => (
          <motion.polygon
            key={i}
            points={s.points}
            fill="url(#glass-shard)"
            stroke="var(--accent-border)"
            strokeWidth="0.22"
            initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
            animate={
              inView
                ? {
                    opacity: [0, 0.95, 0.8, 0],
                    x: s.x,
                    y: s.y,
                    rotate: s.rotate,
                  }
                : { opacity: 0 }
            }
            transition={{
              x: { duration: 0.9, delay: s.delay, ease: flyEase },
              y: { duration: 0.9, delay: s.delay, ease: flyEase },
              rotate: { duration: 0.9, delay: s.delay, ease: flyEase },
              opacity: {
                duration: 1.05,
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
          className="block h-24 w-24 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, var(--accent-dim), transparent)",
          }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={inView ? { opacity: [0, 1, 0], scale: [0.4, 1.6, 2] } : {}}
          transition={{ duration: 0.55, delay: 0.42, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
