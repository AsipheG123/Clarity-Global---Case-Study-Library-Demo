"use client";

import { motion } from "framer-motion";

interface MediaSectionProps {
  title: string;
  embedUrl: string;
  note: string;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function MediaSection({ title, embedUrl, note }: MediaSectionProps) {
  return (
    <section className="bg-[#080808] px-6 py-16 md:px-16">
      {/* Constrain to max-w-4xl so video has natural breathing room on wide screens */}
      <div className="mx-auto max-w-4xl">

        {/* Chapter header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-8"
        >
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-6 bg-red-500/70" aria-hidden />
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-red-500/80">
              03 — The delivery
            </p>
          </div>

          <h2 className="text-2xl font-semibold leading-snug text-white md:text-3xl">
            {title}
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-[1.7] text-white/38">
            {note}
          </p>
        </motion.div>

        {/* Video frame */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.12, duration: 0.7, ease: EASE }}
          className="overflow-hidden rounded-xl border border-white/8 bg-black"
        >
          <div className="aspect-video w-full">
            <iframe
              src={embedUrl}
              title={title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
