import Image from "next/image";
import { ArrowUpRight, RefreshCcw } from "lucide-react";
import { GithubIcon } from "./icons";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { profile } from "@/data/site";
import { moreRepos } from "@/data/projects";
import { getGithubData } from "@/lib/github";

/*
 * GitHub section — server-rendered from the public GitHub API with hourly
 * revalidation. Pinned repositories lead, and if GitHub is unreachable the
 * section falls back to a curated list of related builds.
 */

const FALLBACK_NOTE =
  "GitHub's API is being shy right now — here are a few of my repositories in the meantime.";

function relativeDays(iso) {
  if (!iso) return "recently";
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

export default async function GithubSection() {
  const { ok, profile: ghProfile, pinned, languages } = await getGithubData();

  return (
    <section id="github" className="section-pad border-t border-line-soft">
      <div className="container-x">
        <SectionHeader
          index="06"
          eyebrow="GitHub"
          title="Everything ships to GitHub."
          description="A look at what I've been building — pinned repositories, the languages I reach for most, and everything else on my GitHub profile."
        />

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Profile / stats card */}
          <Reveal>
            <div className="card flex h-full flex-col p-6 sm:p-8">
              <div className="flex items-center gap-4">
                {ok && ghProfile?.avatarUrl ? (
                  <Image
                    src={ghProfile.avatarUrl}
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
                    {ok ? ghProfile.publicRepos : "—"}
                  </dd>
                </div>
                <div className="rounded-lg border border-line bg-surface2 p-3">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
                    Primary languages
                  </dt>
                  <dd className="mt-1 flex flex-wrap gap-1.5">
                    {ok && languages.length > 0 ? (
                      languages.map((language) => (
                        <span
                          key={language.name}
                          className="rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[10px] text-mute"
                          title={`${language.count} ${
                            language.count === 1 ? "repository" : "repositories"
                          } with ${language.name} as the primary language`}
                        >
                          {language.name}
                        </span>
                      ))
                    ) : (
                      <span className="font-mono text-sm text-mute">—</span>
                    )}
                  </dd>
                </div>
              </dl>

              <p className="mt-3 font-mono text-[10px] leading-relaxed text-mute">
                my GitHub, kept in sync
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

              {!ok ? (
                <p className="mt-4 flex items-start gap-2 rounded-lg border border-line bg-surface2 p-3 font-mono text-[10.5px] leading-relaxed text-mute">
                  <RefreshCcw size={12} aria-hidden="true" className="mt-0.5 shrink-0" />
                  {FALLBACK_NOTE}
                </p>
              ) : null}
            </div>
          </Reveal>

          {/* Pinned repositories / curated fallback */}
          <Reveal delay={0.08}>
            <div className="card h-full p-6 sm:p-8">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-soft">
                {ok ? "Pinned repositories" : "More repositories"}
              </h3>

              <ul className="mt-5 space-y-3">
                {ok
                  ? pinned.map((repo) => (
                      <li key={repo.name}>
                        <a
                          href={repo.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-start gap-3 rounded-lg border border-line bg-surface2 p-3.5 transition-colors hover:border-accent-border"
                        >
                          <span className="dot mt-1.5 bg-accent" aria-hidden="true" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-mono text-sm text-ink transition-colors group-hover:text-accent">
                              {repo.name}
                            </span>
                            {repo.description ? (
                              <span className="mt-1 block line-clamp-2 text-xs leading-relaxed text-mute">
                                {repo.description}
                              </span>
                            ) : null}
                            <span className="mt-1.5 flex items-center gap-1.5 font-mono text-[10px] text-mute">
                              {repo.language ? (
                                <>
                                  <span>{repo.language}</span>
                                  <span aria-hidden="true">·</span>
                                </>
                              ) : null}
                              <span>updated {relativeDays(repo.pushedAt)}</span>
                            </span>
                          </span>
                          <ArrowUpRight
                            size={14}
                            aria-hidden="true"
                            className="mt-1 shrink-0 text-mute transition-colors group-hover:text-accent"
                          />
                        </a>
                      </li>
                    ))
                  : moreRepos.map((repo) => (
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
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
