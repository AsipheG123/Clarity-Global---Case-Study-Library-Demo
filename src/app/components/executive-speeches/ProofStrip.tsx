"use client";

import { motion } from "framer-motion";

interface ProofStripProps {
  deliverables: string[];
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * ProofStrip — a dark typographic frame that lists what was actually built.
 * Sits between the Approach narrative and the media/delivery sections.
 * Feels like a presentation "what we delivered" slide.
 */
export default function ProofStrip({ deliverables }: ProofStripProps) {
  return (
    <section className="bg-[#080808] px-6 py-14 md:px-16">
      <div className="mx-auto max-w-4xl">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-10 flex items-center gap-4"
        >
          <span className="h-px w-6 bg-red-500/60" aria-hidden />
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-red-500/75">
            What we built
          </p>
        </motion.div>

        {/* Deliverables list — presentation-style typographic frame */}
        <div className="divide-y divide-white/5">
          {deliverables.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ delay: i * 0.07, duration: 0.55, ease: EASE }}
              className="flex items-baseline gap-6 py-5"
            >
              <span className="shrink-0 font-mono text-xs font-medium text-red-500/58">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-lg font-medium leading-snug text-white/72 md:text-xl">
                {item}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom rule — visual signal that media section follows */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: deliverables.length * 0.07 + 0.2, duration: 0.6, ease: EASE }}
          className="mt-12 h-px origin-left bg-white/8"
          aria-hidden
        />

      </div>
    </section>
  );
}
