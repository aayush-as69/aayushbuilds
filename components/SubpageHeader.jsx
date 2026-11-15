import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile } from "@/data/site";

/*
 * Compact header for case-study pages. Replaces the homepage navbar so the
 * brand always leads home and the only in-page destination is the project
 * list, without scroll-spy links that don't exist on these routes.
 */

export default function SubpageHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-overlay backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between gap-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-[17px] font-semibold tracking-tight"
        >
          <span
            aria-hidden="true"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-line bg-surface font-mono text-xs text-accent"
          >
            A/&gt;
          </span>
          <span>
            Aayush<span className="text-accent">Builds</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 font-mono text-[11px] text-mute transition-colors hover:border-accent-border hover:text-accent"
          >
            <ArrowLeft size={13} aria-hidden="true" />
            All projects
          </Link>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-line text-mute transition-colors hover:border-accent-border hover:text-accent sm:flex"
          >
            <GithubIcon size={16} aria-hidden="true" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="hidden h-9 w-9 items-center justify-center rounded-lg border border-line text-mute transition-colors hover:border-accent-border hover:text-accent sm:flex"
          >
            <LinkedinIcon size={16} aria-hidden="true" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
