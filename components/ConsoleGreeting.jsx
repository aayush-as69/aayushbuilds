"use client";

import { useEffect } from "react";
import { profile } from "@/data/site";

/*
 * A small hello for anyone who opens DevTools. Prints once per page load, not
 * on every re-render (and not twice under React strict mode in development).
 * Renders nothing.
 */
export default function ConsoleGreeting() {
  useEffect(() => {
    if (window.__abGreeted) return;
    window.__abGreeted = true;

    try {
      console.log(
        "%cA/> AayushBuilds",
        "font: 600 16px ui-monospace, SFMono-Regular, Menlo, monospace; color: #2fb872;"
      );
      console.log(
        "%cOpening DevTools? I like people who check the source, so here it is.\n\n" +
          `  Source   ${profile.github}/aayushbuilds\n` +
          `  Say hi   ${profile.email}\n`,
        "font: 12px ui-monospace, SFMono-Regular, Menlo, monospace; line-height: 1.6;"
      );
    } catch {
      // console unavailable — nothing to do
    }
  }, []);

  return null;
}
