"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile, navLinks } from "@/data/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const menuBtnRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-38% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Mobile menu: scroll lock + Escape to close
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass = (id) =>
    `relative py-1 text-sm transition-colors duration-200 ${
      active === id
        ? "text-ink after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:bg-accent after:content-['']"
        : "text-mute hover:text-ink"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-overlay backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav
        className="container-x flex h-16 items-center justify-between"
        aria-label="Primary"
      >
        <a
          href="#home"
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
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={linkClass(l.id)}
                aria-current={active === l.id ? "true" : undefined}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
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
          <button
            type="button"
            ref={menuBtnRef}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:border-accent-border lg:hidden"
          >
            {open ? (
              <X size={18} aria-hidden="true" />
            ) : (
              <Menu size={18} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-line-soft bg-overlay backdrop-blur-md transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0 invisible"
        }`}
      >
        <ul className="container-x flex flex-col gap-1 py-4">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === l.id ? "true" : undefined}
                className={`block rounded-lg px-3 py-2.5 text-[15px] transition-colors ${
                  active === l.id
                    ? "bg-surface2 text-ink"
                    : "text-mute hover:bg-surface hover:text-ink"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="mt-2 flex items-center gap-3 px-3 pb-1">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-mute hover:text-accent"
            >
              <GithubIcon size={16} aria-hidden="true" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-mute hover:text-accent"
            >
              <LinkedinIcon size={16} aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
