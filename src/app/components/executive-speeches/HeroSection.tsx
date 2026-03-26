"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PHRASES = [
  "Words that carry weight.",
  "Writing that earns trust.",
  "Authority built on evidence.",
];

const TYPE_SPEED = 52;
const ERASE_SPEED = 28;
const PAUSE_AFTER_TYPE = 2200;
const PAUSE_AFTER_ERASE = 400;

type Phase = "typing" | "paused-full" | "erasing" | "paused-empty";

export default function HeroSection({
  tag,
  title,
}: {
  tag: string;
  title: string;
}) {
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>("paused-empty");

  // Start typewriter after hero fade-in
  useEffect(() => {
    const boot = setTimeout(() => setPhase("typing"), 1200);
    return () => clearTimeout(boot);
  }, []);

  useEffect(() => {
    const phrase = PHRASES[phraseIdx];

    if (phase === "typing") {
      if (displayed.length < phrase.length) {
        const t = setTimeout(
          () => setDisplayed(phrase.slice(0, displayed.length + 1)),
          TYPE_SPEED,
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("paused-full"), 0);
        return () => clearTimeout(t);
      }
    }

    if (phase === "paused-full") {
      const t = setTimeout(() => setPhase("erasing"), PAUSE_AFTER_TYPE);
      return () => clearTimeout(t);
    }

    if (phase === "erasing") {
      if (displayed.length > 0) {
        const t = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          ERASE_SPEED,
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("paused-empty"), 0);
        return () => clearTimeout(t);
      }
    }

    if (phase === "paused-empty") {
      const t = setTimeout(() => {
        setPhraseIdx((i) => (i + 1) % PHRASES.length);
        setPhase("typing");
      }, PAUSE_AFTER_ERASE);
      return () => clearTimeout(t);
    }
  }, [displayed, phraseIdx, phase]);

  return (
    <section className="relative flex min-h-[92vh] flex-col justify-between overflow-hidden bg-[#080808] px-6 pb-16 pt-10 md:px-16 md:pb-20">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white/40 transition-colors hover:border-white/20 hover:text-white/70"
        >
          <span aria-hidden>←</span>
          Back to Library
        </Link>

        <span className="hidden text-xs font-medium uppercase tracking-[0.2em] text-red-500/40 md:block">
          Clarity Global
        </span>
      </div>

      {/* Main content */}
      <div className="mt-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55 }}
          className="flex items-center gap-4"
        >
          <span className="h-px w-8 bg-red-500" aria-hidden />
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-red-500">
            {tag}
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-5xl font-semibold leading-[1.08] tracking-tight text-white md:text-7xl lg:text-8xl"
        >
          {title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="mt-8 flex h-9 items-center gap-2"
          aria-live="polite"
          aria-label={`${displayed}`}
        >
          <span className="text-xl font-light text-white/55 md:text-2xl">
            {displayed}
          </span>
          <span
            className="inline-block h-[1.1em] w-[2px] translate-y-[1px] animate-pulse bg-red-500"
            aria-hidden
          />
        </motion.div>
      </div>

      {/* Bottom decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="mt-12 flex items-end justify-between"
      >
        <div className="h-px w-24 bg-white/10" />
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-red-500/40">
          Scroll to explore
        </p>
      </motion.div>
    </section>
  );
}
