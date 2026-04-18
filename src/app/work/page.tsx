"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { caseStudies, type CaseStudyCard } from "@/app/lib/caseStudies";

const FEATURED_SLUG = "executive-speeches-proof";

// ── Archive card ─────────────────────────────────────────────────────────────
// Light resting state: category tag + title + red ⊕ marker only.
// Hover (desktop) or tap the ⊕ (mobile) reveals summary, outcomes, and a
// "View" link with a smooth height + opacity animation.
//
// `primary` variant: slightly more padding and a larger title — used only for
// the leading card in row 1 of the editorial layout.
//
// State logic:
//   hovered  — set by onMouseEnter/Leave (desktop)
//   open     — toggled by clicking the ⊕ button (mobile; also "locks" on desktop)
//   isRevealed = hovered || open
function ArchiveCard({
  cs,
  primary = false,
}: {
  cs: CaseStudyCard;
  primary?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isRevealed = hovered || open;

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen((v) => !v);
  };

  return (
    <div
      className={[
        "relative rounded-2xl border transition-[border-color,background-color,box-shadow] duration-200",
        isRevealed
          ? "border-black/16 bg-white shadow-sm"
          : "border-black/10 bg-white/70",
        primary ? "p-7 md:p-8" : "p-6",
      ].join(" ")}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* ── Always visible: tag + title ── */}
      <Link href={`/work/${cs.slug}`} className="block">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
          {cs.tag}
        </p>
        <p
          className={[
            "mt-2.5 font-semibold leading-snug tracking-tight text-black transition-colors duration-200",
            isRevealed ? "text-black/80" : "",
            primary ? "text-base md:text-lg" : "text-base",
          ].join(" ")}
        >
          {cs.title}
        </p>
      </Link>

      {/* ── Revealed: summary + outcomes ── */}
      <AnimatePresence initial={false}>
        {isRevealed && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.22, ease: "easeOut" },
            }}
            className="overflow-hidden"
          >
            <p className="mt-5 text-sm leading-[1.78] text-black/60">
              {cs.summary}
            </p>

            {cs.outcomes.length > 0 && (
              <ul className="mt-3.5 space-y-1.5">
                {cs.outcomes.map((o, j) => (
                  <li
                    key={j}
                    className="flex items-baseline gap-2 text-xs leading-[1.65] text-black/42"
                  >
                    <span className="shrink-0 text-red-500/55" aria-hidden>—</span>
                    {o}
                  </li>
                ))}
              </ul>
            )}

            {/* Rule divider before bottom row */}
            <div className="mt-5 h-px bg-black/6" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom row: ⊕ marker + View link ── */}
      <div className="mt-4 flex items-center justify-between">

        {/* ⊕ button — red circle, rotates 45° to × when revealed */}
        <button
          onClick={handleToggle}
          aria-label={isRevealed ? "Collapse details" : "Reveal details"}
          aria-expanded={isRevealed}
          className={[
            "flex h-7 w-7 shrink-0 select-none items-center justify-center rounded-full border text-sm font-light transition-all duration-200",
            isRevealed
              ? "border-red-500/50 bg-red-500 text-white"
              : "border-black/18 bg-white text-black/45 hover:border-red-500/40 hover:text-red-500",
          ].join(" ")}
        >
          <motion.span
            animate={{ rotate: isRevealed ? 45 : 0 }}
            transition={{ duration: 0.22 }}
            className="block leading-none"
          >
            +
          </motion.span>
        </button>

        {/* View link — fades in with revealed content */}
        <AnimatePresence initial={false}>
          {isRevealed && (
            <motion.div
              key="view"
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={`/work/${cs.slug}`}
                className="text-xs font-medium text-black/45 transition-colors duration-200 hover:text-black"
              >
                View case study →
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

// ── Process steps data ────────────────────────────────────────────────────────
const PROCESS_STEPS = [
  {
    num: "01",
    title: "Discovery & immersion",
    body: "We read deeply, clarify audiences, and identify what matters most — what must be understood and what must be decided.",
  },
  {
    num: "02",
    title: "Message alignment",
    body: "We run focused workshops to agree the through-line, key messages, and proof points before drafting starts.",
  },
  {
    num: "03",
    title: "Creation & craft",
    body: "We write, edit, and design communications that are accurate, engaging, and suited to the channel.",
  },
  {
    num: "04",
    title: "Quality & delivery",
    body: "We manage disciplined review windows and deliver publication-ready outputs supported by clear standards.",
  },
];

// ── Writing typewriter — "Become a Better Writer" CTA ────────────────────────
const WRITING_PHRASES = [
  "Improve your writing.",
  "Sharpen your message.",
  "Strengthen your speechwriting.",
  "Write with clarity.",
  "Lead with words that land.",
];
const TW_TYPE_SPEED = 48;
const TW_ERASE_SPEED = 26;
const TW_PAUSE_FULL = 2000;
const TW_PAUSE_EMPTY = 380;
type TwPhase = "typing" | "paused-full" | "erasing" | "paused-empty";

function WritingTyper() {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [phase, setPhase] = useState<TwPhase>("typing");
  const phrase = WRITING_PHRASES[phraseIdx];

  useEffect(() => {
    if (phase === "typing") {
      if (text.length < phrase.length) {
        const t = setTimeout(
          () => setText(phrase.slice(0, text.length + 1)),
          TW_TYPE_SPEED,
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("paused-full"), 0);
      return () => clearTimeout(t);
    }
    if (phase === "paused-full") {
      const t = setTimeout(() => setPhase("erasing"), TW_PAUSE_FULL);
      return () => clearTimeout(t);
    }
    if (phase === "erasing") {
      if (text.length > 0) {
        const t = setTimeout(
          () => setText(text.slice(0, -1)),
          TW_ERASE_SPEED,
        );
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("paused-empty"), 0);
      return () => clearTimeout(t);
    }
    if (phase === "paused-empty") {
      const t = setTimeout(() => {
        setPhraseIdx((i) => (i + 1) % WRITING_PHRASES.length);
        setPhase("typing");
      }, TW_PAUSE_EMPTY);
      return () => clearTimeout(t);
    }
  }, [text, phraseIdx, phase, phrase]);

  return (
    <p
      className="mt-2 flex h-7 items-center gap-1.5"
      aria-live="polite"
      aria-label={text}
    >
      <span className="text-base font-medium italic text-red-500/70">{text}</span>
      <span
        className="inline-block h-[0.9em] w-[2px] translate-y-px animate-pulse bg-red-500/55"
        aria-hidden
      />
    </p>
  );
}

export default function WorkPage() {
  const [showHeader, setShowHeader] = useState(true);
  const [query, setQuery] = useState("");
  const lastY = useRef(0);

  const featured = caseStudies.find((cs) => cs.slug === FEATURED_SLUG);

  const filtered = caseStudies.filter((cs: CaseStudyCard) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      cs.title.toLowerCase().includes(q) ||
      cs.tag.toLowerCase().includes(q) ||
      cs.summary.toLowerCase().includes(q)
    );
  });

  // When no query: grid excludes the featured card (shown above)
  // When searching: grid shows all matches including the featured slug
  const gridCases = query ? filtered : filtered.filter((cs) => cs.slug !== FEATURED_SLUG);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (Math.abs(delta) < 6) return;
      if (y < 40) { setShowHeader(true); lastY.current = y; return; }
      if (delta > 0) setShowHeader(false);
      else setShowHeader(true);
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative isolate min-h-screen bg-transparent text-black">

      {/* ── Sticky header ── */}
      <div
        className={[
          "sticky top-0 z-50 transition-transform duration-300 ease-out",
          showHeader ? "translate-y-0" : "-translate-y-full",
        ].join(" ")}
      >
        <header className="border-b border-black/10 bg-white/95 px-6 py-4 shadow-sm backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
            {/* Wordmark */}
            <div className="flex items-center gap-3">
              <img
                src="/CG_Logo.png"
                alt="Clarity Global"
                className="h-9 w-9 rounded-lg object-contain"
              />
              <div className="leading-none">
                <p className="text-sm font-semibold">Clarity Global</p>
                <p className="mt-0.5 text-xs text-black/50">Work Archive</p>
              </div>
            </div>

            {/* Search */}
            <div className="hidden flex-1 justify-center md:flex">
              <div className="w-full max-w-sm">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by topic, sector, or service…"
                  className="w-full rounded-full border border-black/15 bg-white/90 py-2 pl-10 pr-4 text-sm text-black outline-none placeholder:text-black/40 focus:border-red-400"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.3-4.3'/%3E%3C/svg%3E\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "14px center",
                    backgroundSize: "14px 14px",
                  }}
                />
              </div>
            </div>

            {/* Nav */}
            <nav className="hidden items-center gap-5 text-sm md:flex">
              <a className="text-black/60 hover:text-black" href="#cases">
                Case Studies
              </a>
              <a className="text-black/60 hover:text-black" href="#process">
                Process
              </a>
              <a className="text-black/60 hover:text-black" href="/contact">
                Contact
              </a>
              <a
                className="rounded-full bg-red-500 px-4 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                href="/contact"
              >
                Become a Better Writer
              </a>
            </nav>
          </div>
        </header>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-16 pt-0">

        {/* ── Editorial intro ── */}
        <section className="border-b border-black/8 pb-16 pt-16">
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/40">
            Work Archive
          </p>
          <div className="grid gap-10 md:grid-cols-[1fr_320px] md:items-end">
            <div>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-black md:text-5xl lg:text-6xl">
                Strategic communications,
                <br />
                <span className="text-red-500">Clearly made.</span>
              </h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-black/60">
                A curated selection of case studies from Clarity Global — covering
                speechwriting, public finance, internal communications, reporting,
                training, and editorial work.
              </p>
            </div>

            <div className="space-y-5 md:text-right">
              <div>
                <p className="text-3xl font-semibold tabular-nums text-black">8</p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-widest text-black/40">
                  Case studies
                </p>
              </div>
              <div>
                <p className="text-3xl font-semibold text-black">6+</p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-widest text-black/40">
                  Sectors covered
                </p>
              </div>
              <div>
                <p className="font-semibold italic text-red-500">
                  Say What You Mean
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Featured case study (hidden when searching) ── */}
        {!query && featured && (
          <section className="mt-14">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/40">
              Featured
            </p>
            <Link
              href={`/work/${featured.slug}`}
              className="group block overflow-hidden rounded-2xl bg-[#0c0c0c] p-8 transition-all duration-300 hover:bg-[#111] md:p-12"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-px w-6 bg-red-500" aria-hidden />
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-red-500">
                      {featured.tag}
                    </p>
                  </div>
                  <h2 className="text-2xl font-semibold leading-snug tracking-tight text-white md:text-3xl lg:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 text-base leading-7 text-white/50">
                    {featured.summary}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="inline-flex rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/40">
                    Rich media
                  </span>
                  <span className="text-sm font-medium text-white/40 transition-colors duration-300 group-hover:text-white">
                    View →
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* ── Case studies grid ── */}
        <section id="cases" className="mt-14">
          {!query ? (
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="text-base font-semibold text-black">In the archive</h2>
              <p className="text-xs text-black/40">{gridCases.length} entries</p>
            </div>
          ) : (
            <div className="mb-6 flex items-baseline justify-between">
              <h2 className="text-base font-semibold text-black">Search results</h2>
              <p className="text-xs text-black/40">
                {filtered.length} {filtered.length === 1 ? "match" : "matches"}
              </p>
            </div>
          )}

          {gridCases.length === 0 ? (
            <p className="text-sm text-black/45">
              No case studies match &ldquo;{query}&rdquo;. Try a different search.
            </p>
          ) : query ? (
            // Search results — flat scannable grid, no editorial positioning
            <div className="grid gap-4 md:grid-cols-2">
              {gridCases.map((cs) => (
                <ArchiveCard key={cs.slug} cs={cs} />
              ))}
            </div>
          ) : (
            <>
              {/*
               * Desktop zigzag — two independent flex columns.
               * Left:  cards 0, 2, 4, 6  (starts at top)
               * Right: cards 1, 3, 5     (offset ~140px down so each sits
               *                           between its two left-column neighbours)
               * This is explicit art direction, not a repeating algorithm.
               */}
              <div className="hidden md:flex md:gap-6">
                {/* Left column */}
                <div className="flex flex-1 flex-col gap-4">
                  {gridCases[0] && <ArchiveCard cs={gridCases[0]} primary />}
                  {gridCases[2] && <ArchiveCard cs={gridCases[2]} />}
                  {gridCases[4] && <ArchiveCard cs={gridCases[4]} />}
                  {gridCases[6] && <ArchiveCard cs={gridCases[6]} />}
                </div>
                {/* Right column — pushed down to interleave with left cards */}
                <div className="flex flex-1 flex-col gap-4 mt-[140px]">
                  {gridCases[1] && <ArchiveCard cs={gridCases[1]} />}
                  {gridCases[3] && <ArchiveCard cs={gridCases[3]} />}
                  {gridCases[5] && <ArchiveCard cs={gridCases[5]} />}
                </div>
              </div>

              {/* Mobile — single-column stack in natural reading order */}
              <div className="flex flex-col gap-4 md:hidden">
                {gridCases.map((cs, i) => (
                  <ArchiveCard key={cs.slug} cs={cs} primary={i === 0} />
                ))}
              </div>
            </>
          )}
        </section>

        {/* ── How we work ── */}
        <section id="process" className="mt-20 border-t border-black/8 pt-16">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/40">
            Process
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">How we work</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-black/55">
            We work as thinking partners — helping organisations communicate complex
            ideas with clarity, simplicity, and integrity.
          </p>

          {/* Desktop — horizontal timeline */}
          <div className="mt-12 hidden md:block">
            {/* Step markers with animated connector line */}
            <div className="relative grid grid-cols-4">
              {/* Connector line — draws left to right on scroll entry */}
              <motion.div
                className="absolute top-4 left-[12.5%] right-[12.5%] h-px origin-left bg-black/12"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: "linear", delay: 0.1 }}
                aria-hidden
              />
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className="flex justify-center">
                  <motion.div
                    className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-red-500/28 bg-white"
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: 0.25 + i * 0.13, duration: 0.3 }}
                  >
                    <span className="text-[10px] font-semibold tabular-nums text-red-500/65">
                      {step.num}
                    </span>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Step content — staggered fade-in below markers */}
            <div className="mt-7 grid grid-cols-4 gap-8">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                >
                  <p className="text-sm font-semibold leading-snug">{step.title}</p>
                  <p className="mt-2 text-xs leading-[1.65] text-black/55">{step.body}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile — vertical numbered steps with connector lines */}
          <div className="mt-8 md:hidden">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.num} className="flex gap-5 pb-7 last:pb-0">
                <div className="flex shrink-0 flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500/28 bg-white/90">
                    <span className="text-[10px] font-semibold tabular-nums text-red-500/65">
                      {step.num}
                    </span>
                  </div>
                  {i < PROCESS_STEPS.length - 1 && (
                    <div className="mt-2 w-px flex-1 bg-black/10" />
                  )}
                </div>
                <div className="pb-1">
                  <p className="text-sm font-semibold">{step.title}</p>
                  <p className="mt-2 text-sm leading-6 text-black/55">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          id="contact"
          className="mt-14 rounded-2xl border border-black/10 bg-white/70 p-10 backdrop-blur"
        >
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/40">
            Work with us
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">
            Become a better writer.
          </h2>
          <WritingTyper />
          <p className="mt-4 max-w-md text-sm leading-7 text-black/55">
            Get in touch to explore writing support, case study development, or
            collaboration with Clarity Global.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="rounded-full bg-red-500 px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
              href="/contact"
            >
              Get in touch
            </a>
            <a
              className="rounded-full border border-black/15 bg-white/60 px-5 py-2.5 text-sm font-medium hover:bg-black/5 backdrop-blur"
              href="#cases"
            >
              Browse the archive
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 border-t border-black/8 py-8 text-center text-xs text-black/35">
          © {new Date().getFullYear()} Clarity Global — Work Archive. Built by AutoGrowth Agency.
        </footer>
      </div>
    </main>
  );
}
