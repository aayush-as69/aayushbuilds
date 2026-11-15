"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile } from "@/data/site";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const copyEmail = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(profile.email);
      ok = true;
    } catch {
      // Clipboard API unavailable — fall back to a hidden textarea
      try {
        const ta = document.createElement("textarea");
        ta.value = profile.email;
        ta.setAttribute("readonly", "");
        ta.style.position = "absolute";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        document.body.removeChild(ta);
      } catch {
        ok = false;
      }
    }
    if (ok) {
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section id="contact" className="section-pad border-t border-line-soft">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeader
            index="07"
            eyebrow="Contact"
            title="Have something interesting to build?"
            description="I'm always interested in building useful things, exploring ideas, and connecting with people who enjoy creating."
          />

          <Reveal delay={0.08}>
            <div className="mx-auto flex max-w-md items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3">
              <p className="truncate font-mono text-sm text-ink">
                {profile.email}
              </p>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={
                  copied ? "Email copied to clipboard" : "Copy email address"
                }
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                  copied
                    ? "border-accent-border bg-[var(--accent-dim)] text-accent"
                    : "border-line text-mute hover:border-accent-border hover:text-accent"
                }`}
              >
                {copied ? (
                  <Check size={15} aria-hidden="true" />
                ) : (
                  <Copy size={15} aria-hidden="true" />
                )}
              </button>
            </div>
            <p
              aria-live="polite"
              className={`mt-2 h-4 font-mono text-[11px] text-accent transition-opacity duration-300 ${
                copied ? "opacity-100" : "opacity-0"
              }`}
            >
              {copied ? "copied to clipboard" : ""}
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a href={`mailto:${profile.email}`} className="btn-primary">
                <Mail size={16} aria-hidden="true" />
                Email me
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <LinkedinIcon size={16} aria-hidden="true" />
                LinkedIn
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <GithubIcon size={16} aria-hidden="true" />
                GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
