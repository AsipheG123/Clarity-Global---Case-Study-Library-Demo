"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * PortraitProof — a social/vertical-format proof frame between the delivery
 * video (03) and the editorial moments sequence (04).
 *
 * Compositionally inspired by portrait/story-card content: a single proof
 * statement, isolated inside a bordered frame on a dark surface, surrounded
 * by intentional negative space. The frame carries thin red corner brackets —
 * the editorial graphic device used to signal a designed, authored moment.
 *
 * The card is narrow and centred on desktop (portrait-card proportions) so
 * it reads as a standalone proof beat — a pause between delivery and moments.
 */
export default function PortraitProof() {
  return (
    <section className="border-t border-white/5 bg-[#0a0a0a] px-6 py-16 md:px-16 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center md:flex-row md:items-stretch md:gap-16">

          {/* ── Portrait card ─────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative w-full max-w-sm border border-white/10 bg-white/[0.028] px-8 py-12 md:max-w-xs"
          >
            {/* Corner bracket marks — the primary editorial graphic device */}

            {/* Top-left */}
            <span className="pointer-events-none absolute left-0 top-0" aria-hidden>
              <span className="absolute left-0 top-0 h-px w-5 bg-red-500/40" />
              <span className="absolute left-0 top-0 h-5 w-px bg-red-500/40" />
            </span>

            {/* Top-right */}
            <span className="pointer-events-none absolute right-0 top-0" aria-hidden>
              <span className="absolute right-0 top-0 h-px w-5 bg-red-500/40" />
              <span className="absolute right-0 top-0 h-5 w-px bg-red-500/40" />
            </span>

            {/* Bottom-left */}
            <span className="pointer-events-none absolute bottom-0 left-0" aria-hidden>
              <span className="absolute bottom-0 left-0 h-5 w-px bg-red-500/40" />
              <span className="absolute bottom-0 left-0 h-px w-5 bg-red-500/40" />
            </span>

            {/* Bottom-right */}
            <span className="pointer-events-none absolute bottom-0 right-0" aria-hidden>
              <span className="absolute bottom-0 right-0 h-5 w-px bg-red-500/40" />
              <span className="absolute bottom-0 right-0 h-px w-5 bg-red-500/40" />
            </span>

            {/* Card content */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="mb-8 text-[9px] font-semibold uppercase tracking-[0.32em] text-red-500/50"
            >
              In practice
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.65, ease: EASE }}
              className="text-2xl font-semibold leading-[1.32] tracking-tight text-white/85"
            >
              When the architecture holds, delivery follows.
            </motion.p>

            {/* Internal rule — graphic divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, duration: 0.45, ease: EASE }}
              className="my-7 h-px origin-left bg-red-500/25"
              aria-hidden
            />

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.55, ease: EASE }}
              className="text-sm leading-[1.78] text-white/42"
            >
              Structured arguments withstand cross-examination.
              Evidence-grounded claims survive scrutiny.
              Conviction in the room is a product of preparation outside it.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.75, duration: 0.4 }}
              className="mt-9 text-[9px] uppercase tracking-[0.28em] text-white/20"
            >
              Clarity Global — executive communications
            </motion.p>
          </motion.div>

          {/* ── Annotation ruler — desktop only ──────────────────────────── */}
          {/*
           * A vertical editorial cue line with graduated tick marks —
           * signals precision and measurement; reinforces the "structured"
           * brand idea without adding decorative noise.
           */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hidden md:flex md:flex-col md:items-center md:self-stretch"
            aria-hidden
          >
            {/* Top tick — widest */}
            <div className="h-px w-5 bg-red-500/38" />
            {/* Upper segment */}
            <div className="w-px flex-1 bg-red-500/16" />
            {/* Mid tick — medium */}
            <div className="h-px w-3 bg-red-500/30" />
            {/* Mid segment */}
            <div className="w-px flex-1 bg-red-500/16" />
            {/* Lower tick — narrow */}
            <div className="h-px w-2 bg-red-500/24" />
            {/* Bottom segment */}
            <div className="w-px flex-1 bg-red-500/16" />
            {/* Bottom tick — widest */}
            <div className="h-px w-5 bg-red-500/38" />
          </motion.div>

          {/* ── Supporting copy — desktop right column ───────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
            className="mt-10 flex flex-col justify-center md:mt-0 md:flex-1"
          >
            <p className="mb-4 text-[9px] font-semibold uppercase tracking-[0.28em] text-white/72">
              The approach
            </p>
            <p className="text-base leading-[1.8] text-white/82 md:text-lg">
              We build the message before the moment arrives — claim, evidence,
              call to action, in that order.
            </p>

            {/* Methodology line — typographic accent */}
            <div className="mt-8 space-y-3">
              {[
                "Claim",
                "Why it matters",
                "Proof",
                "Action",
              ].map((step, i) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.65 + i * 0.1, duration: 0.45, ease: EASE }}
                  className="flex items-center gap-3"
                >
                  <span className="h-px w-3 shrink-0 bg-red-500/65" aria-hidden />
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/78">
                    {step}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
