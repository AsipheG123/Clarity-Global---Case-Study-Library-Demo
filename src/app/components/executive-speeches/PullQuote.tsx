"use client";

import { motion } from "framer-motion";

interface PullQuoteProps {
  quote: string;
  attribution: string;
}

export default function PullQuote({ quote, attribution }: PullQuoteProps) {
  return (
    <section className="bg-white px-6 py-16 md:px-16">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {/* Red accent rule */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10 h-[2px] w-14 origin-left bg-red-500"
            aria-hidden
          />

          <blockquote>
            <p className="text-2xl font-medium leading-[1.5] tracking-tight text-black/80 md:text-3xl md:leading-[1.45]">
              &ldquo;{quote}&rdquo;
            </p>
            <footer className="mt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-black/35">
                {attribution}
              </p>
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
