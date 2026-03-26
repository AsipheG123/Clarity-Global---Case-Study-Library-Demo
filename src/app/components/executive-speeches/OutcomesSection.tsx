"use client";

import { motion } from "framer-motion";

interface OutcomesSectionProps {
  items: string[];
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * The through-line sentence is the editorial anchor that frames the outcomes.
 * It appears as a large-type statement before the numbered items, giving the
 * section a presentation-like opening beat before the proof follows.
 */
const THROUGH_LINE =
  "The message holds because the architecture was built first.";

export default function OutcomesSection({ items }: OutcomesSectionProps) {
  return (
    <section className="border-t border-black/6 bg-[#f5f5f5] px-6 py-16 md:px-16">
      <div className="mx-auto max-w-4xl">

        {/* Section label + heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-8"
        >
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/35">
            What this work delivers
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-black md:text-4xl">
            Credibility under scrutiny
          </h2>
        </motion.div>

        {/* Through-line — large editorial statement before the items */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.12, duration: 0.7, ease: EASE }}
          className="mb-14 text-xl font-medium leading-snug tracking-tight text-black/62 md:text-2xl"
        >
          {THROUGH_LINE}
        </motion.p>

        {/* Items with animated vertical line on the left */}
        <div className="relative">

          {/* Vertical bar — draws down as section enters view */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
            className="absolute left-0 top-0 h-full w-px origin-top bg-black/12"
            aria-hidden
          />

          <div className="divide-y divide-black/8 pl-8">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  delay: 0.2 + i * 0.14,
                  duration: 0.6,
                  ease: EASE,
                }}
                className="flex items-start gap-6 py-7"
              >
                <span className="mt-1 shrink-0 font-mono text-xs font-semibold text-red-500/55">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base leading-[1.8] text-black/68 md:text-lg">
                  {item}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
