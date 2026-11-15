import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line-soft py-10 sm:py-12">
      <div className="container-x">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <a
              href="/"
              className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-tight"
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
            </a>
            <p className="mt-3 max-w-xs text-sm text-mute">
              Designed with curiosity. Built with code.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              <li>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-mute transition-colors hover:text-accent"
                >
                  <GithubIcon size={14} aria-hidden="true" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-mute transition-colors hover:text-accent"
                >
                  <LinkedinIcon size={14} aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-1.5 text-sm text-mute transition-colors hover:text-accent"
                >
                  <Mail size={14} aria-hidden="true" />
                  Email
                </a>
              </li>
            </ul>
            <p className="mt-4 font-mono text-[11px] text-mute">
              github.com/{profile.githubHandle}
              <ArrowUpRight
                size={11}
                aria-hidden="true"
                className="ml-1 inline opacity-60"
              />
            </p>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-line-soft pt-6 font-mono text-[11px] text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Aayush Singh · AayushBuilds
          </p>
          <p>B.Tech CSE · Galgotias College of Engineering and Technology</p>
        </div>
      </div>
    </footer>
  );
}
