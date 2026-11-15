/*
 * Original, project-specific schematic previews (pure CSS/SVG markup — no
 * fake screenshots). Each one sketches the real application's core surface:
 * the actual entities, flows and language used by the product, based on the
 * repository READMEs.
 */

function Win({ title, children }) {
  return (
    <div
      className="overflow-hidden rounded-xl border border-line bg-[var(--code-bg)] font-mono"
      aria-hidden="true"
    >
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="dot bg-line" />
        <span className="dot bg-line" />
        <span className="dot bg-accent opacity-60" />
        <p className="ml-2 truncate text-[10px] text-mute">{title}</p>
      </div>
      <div className="space-y-2.5 px-3.5 py-3.5 text-[10.5px] leading-relaxed sm:text-[11px]">
        {children}
      </div>
    </div>
  );
}

function Tag({ children, tone = "mute" }) {
  const cls =
    tone === "accent"
      ? "border-accent-border text-accent"
      : tone === "warn"
        ? "border-line text-ink"
        : "border-line text-mute";
  return (
    <span className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[9.5px] ${cls}`}>
      {children}
    </span>
  );
}

function Bar({ pct }) {
  return (
    <span className="inline-flex h-1 w-14 overflow-hidden rounded-full bg-surface2">
      <span
        className="h-full rounded-full bg-accent opacity-80"
        style={{ width: `${pct}%` }}
      />
    </span>
  );
}

export default function ProjectPreview({ slug }) {
  switch (slug) {
    case "handover":
      return (
        <Win title="handover — review queue">
          <p className="flex items-center justify-between text-mute">
            <span>risk-ordered claims · release v3</span>
            <Tag tone="accent">4 pending approval</Tag>
          </p>
          <div className="space-y-1.5 pt-1">
            {[
              ["auth flow uses refresh rotation", "quote-verified"],
              ["payments module owned by infra team", "inferred"],
              ["cron job conflicts with deploy window", "conflicting"],
            ].map(([claim, conf]) => (
              <p key={claim} className="flex items-center gap-2">
                <span className="min-w-0 flex-1 truncate text-ink">{claim}</span>
                <Tag>{conf}</Tag>
              </p>
            ))}
          </div>
          <p className="flex gap-1.5 pt-1">
            <Tag>status filter</Tag>
            <Tag tone="accent">confidence filter</Tag>
            <Tag>approve → numbered release</Tag>
          </p>
          <p className="rounded-lg border border-line bg-surface px-2.5 py-1.5 text-mute">
            every claim links to supporting evidence
            <span className="float-right text-accent-soft">human decides</span>
          </p>
        </Win>
      );

    case "maskchat":
      return (
        <Win title="maskchat — peer mentoring">
          <p className="flex items-center justify-between text-mute">
            <span>#campus-mentoring · matched on topic</span>
            <Tag tone="accent">alias active</Tag>
          </p>
          <div className="space-y-2 pt-1">
            <p className="w-fit max-w-[85%] rounded-lg border border-line bg-surface px-2.5 py-1.5 text-ink">
              anon-4471 — how do I prepare for my first internship application?
            </p>
            <div className="ml-auto w-fit max-w-[90%]">
              <p className="rounded-lg border border-accent-border bg-[var(--accent-dim)] px-2.5 py-1.5 text-ink">
                mentor — start with three projects that solve real problems.
              </p>
              <p className="mt-1 text-right">
                <Tag tone="accent">mentor ✓ verified</Tag>
              </p>
            </div>
          </div>
          <p className="rounded-lg border border-line bg-surface px-2.5 py-1.5 text-mute">
            type a message… <span className="float-right text-accent">send</span>
          </p>
        </Win>
      );

    case "brandguard":
      return (
        <Win title="brandguard — content review">
          <div className="space-y-1.5">
            {[
              ["G-01", "glossary · tone of voice", "pass"],
              ["G-04", "claims · approved facts", "flagged"],
              ["G-08", "image palette · logo use", "warn"],
            ].map(([rule, label, status]) => (
              <p key={rule} className="flex items-center gap-2">
                <span className="text-accent-soft">{rule}</span>
                <span className="min-w-0 flex-1 truncate text-mute">{label}</span>
                <Tag tone={status === "pass" ? "accent" : "warn"}>{status}</Tag>
              </p>
            ))}
          </div>
          <p className="rounded-lg border border-line bg-surface px-2.5 py-1.5 text-mute">
            every finding cites a rule + source quote
            <span className="float-right text-accent-soft">awaiting approval</span>
          </p>
        </Win>
      );

    case "meetloop":
      return (
        <Win title="meetloop — sprint sync">
          <p className="text-mute">
            &ldquo;we ship the beta on the 14th&rdquo;
            <span className="text-ink"> — riya</span>
          </p>
          <p className="text-accent">↓ extract</p>
          <div className="flex flex-wrap gap-1.5">
            <Tag tone="accent">decision ✓</Tag>
            <Tag>owner: kabir · due fri</Tag>
            <Tag tone="warn">conflict w/ earlier scope</Tag>
          </div>
          <p className="rounded-lg border border-line bg-surface px-2.5 py-1.5 text-mute">
            human approval required
            <span className="float-right text-accent-soft">→ GitHub issue #42</span>
          </p>
        </Win>
      );

    case "bharatcode-atlas":
      return (
        <Win title="atlas — build league corpus">
          <p className="flex items-center justify-between text-mute">
            <span>294 projects loaded</span>
            <Tag tone="accent">for you</Tag>
          </p>
          <div className="space-y-1.5 pt-1">
            {[
              ["repo-alpha", 92],
              ["repo-kilo", 74],
              ["repo-zulu", 58],
            ].map(([name, score]) => (
              <p key={name} className="flex items-center gap-2">
                <span className="min-w-0 flex-1 truncate text-ink">{name}</span>
                <Bar pct={score} />
                <span className="w-6 text-right text-accent-soft">{score}</span>
              </p>
            ))}
          </div>
          <p className="text-mute">
            compare 2–4 · architecture fingerprints · study tracker
          </p>
        </Win>
      );

    case "exceptionpilot":
      return (
        <Win title="exceptionpilot — INV-1042">
          <p className="flex items-center gap-2 text-mute">
            <span className="text-ink">PO</span>
            <span className="text-accent">●</span>
            <span className="text-line">———</span>
            <span className="text-ink">INV</span>
            <span className="text-accent">●</span>
            <span className="text-line">———</span>
            <span className="text-ink">GRN</span>
            <span className="text-accent-soft">●</span>
          </p>
          <p className="text-mute">
            variance <span className="text-accent">+4.2%</span> beyond PO
            tolerance · duplicate check clear
          </p>
          <p>
            <Tag>policy v2.3 · effective 2026-01-01</Tag>{" "}
            <Tag tone="accent">lexical match 0.83</Tag>
          </p>
          <p className="flex gap-1.5">
            <Tag>hold</Tag>
            <Tag tone="accent">approve → audit trail</Tag>
          </p>
        </Win>
      );

    case "voiceops":
      return (
        <Win title="voiceops — customer support">
          <p className="flex h-8 items-end gap-1" aria-hidden="true">
            {[10, 16, 22, 14, 26, 18, 30, 20, 12, 24, 16, 10, 20, 14].map(
              (h, i) => (
                <span
                  key={i}
                  className="w-1.5 origin-bottom rounded-sm bg-accent opacity-70"
                  style={{
                    height: `${h}px`,
                    animation: `wave-eq ${0.9 + (i % 5) * 0.14}s ease-in-out ${i * 0.06}s infinite`,
                  }}
                />
              )
            )}
          </p>
          <p className="flex flex-wrap gap-1.5">
            <Tag tone="accent">KB §4.2 · returns policy</Tag>
            <Tag>order ZM-8891 · verified</Tag>
          </p>
          <p className="rounded-lg border border-line bg-surface px-2.5 py-1.5 text-ink">
            Your order ships within 2 business days.
            <span className="float-right text-accent-soft">grounded</span>
          </p>
        </Win>
      );

    default:
      return (
        <Win title="project">
          <p className="text-mute">concept schematic</p>
        </Win>
      );
  }
}
