"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, RefreshCcw } from "lucide-react";
import { GithubIcon } from "./icons";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { profile } from "@/data/site";
import { moreRepos } from "@/data/projects";

/*
 * GitHub section — live public API data with graceful degradation.
 * Everything shown is fetched from api.github.com (unauthenticated).
 * If the API fails, times out or is rate-limited, the section falls back to
 * a curated snapshot. No statistic is ever fabricated.
 */

const FALLBACK_NOTE =
  "GitHub's API is being shy right now — here are a few of my repositories in the meantime.";

function relativeDays(iso) {
  const days = Math.max(
    0,
    Math.round((Date.now() - new Date(iso).getTime()) / 86400000)
  );
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.round(days / 30);
  return `${months}mo ago`;
}

export default function GithubSection() {
  const [status, setStatus] = useState("loading"); // loading | ok | error
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [langs, setLangs] = useState([]);

  useEffect(() => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 9000);

    Promise.all([
      fetch(`https://api.github.com/users/${profile.githubHandle}`, {
        signal: ctrl.signal,
        headers: { Accept: "application/vnd.github+json" },
      }).then((r) => {
        if (!r.ok) throw new Error("user");
        return r.json();
      }),
      fetch(
        `https://api.github.com/users/${profile.githubHandle}/repos?per_page=100&sort=pushed`,
        { signal: ctrl.signal, headers: { Accept: "application/vnd.github+json" } }
      ).then((r) => {
        if (!r.ok) throw new Error("repos");
        return r.json();
      }),
    ])
      .then(([u, rs]) => {
        if (!Array.isArray(rs)) throw new Error("shape");
        const counts = {};
        rs.forEach((repo) => {
          if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1;
        });
        setUser(u);
        setRepos(rs);
        setLangs(
          Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .map(([name, count]) => ({ name, count }))
        );
        setStatus("ok");
      })
      .catch(() => {
        setStatus("error");
      })
      .finally(() => clearTimeout(timer));

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, []);

  const latest = repos.slice(0, 4);

  return (
    <section id="github" className="section-pad border-t border-line-soft">
      <div className="container-x">
        <SectionHeader
          index="05"
          eyebrow="GitHub"
          title="Everything ships to GitHub."
          description="This is where I live as a developer — my public repositories, the languages I use and what I've been pushing lately, all fetched live from the GitHub API."
        />

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Profile / stats card */}
          <Reveal>
            <div className="card flex h-full flex-col p-6 sm:p-8">
              <div className="flex items-center gap-4">
                {status === "ok" && user?.avatar_url ? (
                  <Image
                    src={user.avatar_url}
                    alt="Aayush Singh's GitHub avatar"
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-full border border-line"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-surface2 font-mono text-lg text-accent"
                  >
                    A/&gt;
                  </span>
                )}
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold">{profile.name}</h3>
                  <p className="font-mono text-xs text-mute">
                    @{profile.githubHandle}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-mute">
                {profile.tagline}
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-line bg-surface2 p-3">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
                    Public repos
                  </dt>
                  <dd className="mt-1 font-mono text-xl text-ink">
                    {status === "loading" ? (
                      <span className="inline-block h-6 w-10 animate-pulse rounded bg-surface2" />
                    ) : status === "ok" ? (
                      user?.public_repos
                    ) : (
                      "—"
                    )}
                  </dd>
                </div>
                <div className="rounded-lg border border-line bg-surface2 p-3">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
                    Primary languages
                  </dt>
                  <dd className="mt-1 flex flex-wrap gap-1.5">
                    {status === "ok" && langs.length > 0 ? (
                      langs.slice(0, 4).map((l) => (
                        <span
                          key={l.name}
                          className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[10px] text-mute"
                          title={`${l.count} ${l.count === 1 ? "repository" : "repositories"} with ${l.name} as the primary language`}
                        >
                          {l.name}
                        </span>
                      ))
                    ) : status === "loading" ? (
                      <span className="inline-block h-5 w-24 animate-pulse rounded bg-surface2" />
                    ) : (
                      <span className="font-mono text-sm text-mute">—</span>
                    )}
                  </dd>
                </div>
              </dl>

              <p className="mt-3 font-mono text-[10px] leading-relaxed text-mute">
                live from my GitHub profile
              </p>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6"
              >
                <GithubIcon size={16} aria-hidden="true" />
                Open GitHub profile
                <ArrowUpRight size={14} aria-hidden="true" className="opacity-70" />
              </a>

              {status === "error" ? (
                <p className="mt-4 flex items-start gap-2 rounded-lg border border-line bg-surface2 p-3 font-mono text-[10.5px] leading-relaxed text-mute">
                  <RefreshCcw size={12} aria-hidden="true" className="mt-0.5 shrink-0" />
                  {FALLBACK_NOTE}
                </p>
              ) : null}
            </div>
          </Reveal>

          {/* Recent activity / curated list */}
          <Reveal delay={0.08}>
            <div className="card h-full p-6 sm:p-8">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft">
                {status === "error" ? "More repositories" : "Recently pushed"}
              </h3>

              {status === "loading" ? (
                <div className="mt-5 space-y-3" aria-hidden="true">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-[68px] animate-pulse rounded-lg border border-line bg-surface2 opacity-60"
                    />
                  ))}
                </div>
              ) : status === "ok" ? (
                <ul className="mt-5 space-y-3">
                  {latest.map((repo) => (
                    <li key={repo.id}>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-lg border border-line bg-surface2 p-3.5 transition-colors hover:border-accent-border"
                      >
                        <span
                          className="dot"
                          aria-hidden="true"
                          style={{ backgroundColor: "var(--accent)" }}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-mono text-sm text-ink transition-colors group-hover:text-accent">
                            {repo.name}
                          </span>
                          <span className="block truncate text-xs text-mute">
                            {repo.language || "—"}
                          </span>
                        </span>
                        <span className="font-mono text-[10px] text-mute">
                          {relativeDays(repo.pushed_at)}
                        </span>
                        <ArrowUpRight
                          size={14}
                          aria-hidden="true"
                          className="text-mute transition-colors group-hover:text-accent"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="mt-5 space-y-3">
                  {moreRepos.map((repo) => (
                    <li key={repo.name}>
                      <a
                        href={repo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 rounded-lg border border-line bg-surface2 p-3.5 transition-colors hover:border-accent-border"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-mono text-sm text-ink transition-colors group-hover:text-accent">
                            {repo.name}
                          </span>
                          <span className="mt-1 block line-clamp-2 text-xs leading-relaxed text-mute">
                            {repo.description}
                          </span>
                        </span>
                        <ArrowUpRight
                          size={14}
                          aria-hidden="true"
                          className="mt-1 shrink-0 text-mute transition-colors group-hover:text-accent"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              <p className="mt-5 border-t border-line-soft pt-4 font-mono text-[10px] leading-relaxed text-mute">
                Related builds: terrasync → civicsync are two generations of the
                same civic-platform idea; maskchat predates the current MERN
                rebuild.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

