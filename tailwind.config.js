/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./data/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        surface2: "var(--surface-2)",
        ink: "var(--text)",
        mute: "var(--text-secondary)",
        line: "var(--border)",
        "line-soft": "var(--border-soft)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        "accent-ink": "var(--accent-contrast)",
        "accent-border": "var(--accent-border)",
        "accent-dim": "var(--accent-dim)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        "7xl": "80rem",
      },
      boxShadow: {
        glow: "0 0 0 1px var(--border), 0 0 44px -14px var(--glow)",
        card: "0 1px 0 0 var(--border-soft), 0 24px 48px -24px var(--shadow)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.45" },
        },
        "caret-blink": {
          "0%, 45%": { opacity: "1" },
          "50%, 95%": { opacity: "0" },
        },
        "gallery-scroll": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-25%)" },
        },
      },
      animation: {
        "pulse-soft": "pulse-soft 2.6s ease-in-out infinite",
        "caret-blink": "caret-blink 1.1s steps(1) infinite",
        gallery: "gallery-scroll 60s linear infinite",
      },
    },
  },
  plugins: [],
};
