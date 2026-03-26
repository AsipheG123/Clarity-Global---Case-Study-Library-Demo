"use client";

import { motion } from "framer-motion";

interface CampaignBoardProps {
  deliverables: string[];
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Each deliverable has an editorial "document type" label and a one-line
 * purpose description — this turns the list into a composed communications
 * package laid out as a strategist's board.
 */
const DOCUMENT_META: Record<string, { type: string; description: string }> = {
  "Speech + talking points package": {
    type: "Primary document",
    description:
      "Central narrative structured for delivery — claim, evidence, and call to action in sequence.",
  },
  "Evidence/proof points sheet": {
    type: "Supporting evidence",
    description:
      "Claims anchored in verifiable, defensible source material.",
  },
  "Op-ed style draft": {
    type: "Long-form argument",
    description:
      "The leader's voice extended into public written discourse.",
  },
  "Q&A briefing note": {
    type: "Anticipation brief",
    description:
      "Prepared positions for contested or sensitive questions.",
  },
  "Tone sheet": {
    type: "Editorial register",
    description:
      "Language discipline maintained consistently across all outputs.",
  },
};

export default function CampaignBoard({ deliverables }: CampaignBoardProps) {
  return (
    <section className="bg-[#080808] px-6 py-16 md:px-16">
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

        {/*
         * Board layout — art-directed, not an equal grid.
         * Row 1: primary card (2-col emphasis) + secondary card (1-col).
         * Row 2: remaining cards, equal columns.
         * On mobile: stacks into a single column.
         */}
        <div className="grid gap-3 md:grid-cols-3">
          {deliverables[0] && (
            <BoardCard item={deliverables[0]} index={0} className="md:col-span-2" />
          )}
          {deliverables[1] && (
            <BoardCard item={deliverables[1]} index={1} />
          )}
          {deliverables.slice(2).map((item, i) => (
            <BoardCard key={item} item={item} index={i + 2} />
          ))}
        </div>

        {/* Trailing rule — signals transition into the delivery sections */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: Math.min(deliverables.length, 5) * 0.09 + 0.3,
            duration: 0.6,
            ease: EASE,
          }}
          className="mt-10 h-px origin-left bg-white/6"
          aria-hidden
        />

      </div>
    </section>
  );
}

function BoardCard({
  item,
  index,
  className = "",
}: {
  item: string;
  index: number;
  className?: string;
}) {
  const meta = DOCUMENT_META[item] ?? {
    type: "Document",
    description: "Part of the communications package.",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ delay: index * 0.09, duration: 0.55, ease: EASE }}
      className={`group relative border border-white/7 bg-white/[0.025] p-6 transition-colors duration-300 hover:bg-white/[0.045] ${className}`}
    >
      {/* Top bar: index number + red rule + type label */}
      <div className="mb-5 flex items-center gap-3">
        <span className="shrink-0 font-mono text-[10px] font-medium text-red-500/55">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="h-px flex-1 bg-red-500/18" />
        <span className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.24em] text-white/25">
          {meta.type}
        </span>
      </div>

      {/* Document name — primary card is larger */}
      <h3
        className={`font-semibold leading-snug text-white/80 ${
          index === 0 ? "text-xl md:text-2xl" : "text-base md:text-lg"
        }`}
      >
        {item}
      </h3>

      {/* Purpose description */}
      <p className="mt-3 text-xs leading-[1.7] text-white/38">
        {meta.description}
      </p>

      {/* Bottom-right corner bracket — editorial graphic mark */}
      <div className="absolute bottom-3 right-3" aria-hidden>
        <div className="relative h-5 w-5">
          <div className="absolute bottom-0 right-0 h-px w-full bg-red-500/25 transition-colors duration-300 group-hover:bg-red-500/45" />
          <div className="absolute bottom-0 right-0 h-full w-px bg-red-500/25 transition-colors duration-300 group-hover:bg-red-500/45" />
        </div>
      </div>
    </motion.div>
  );
}
