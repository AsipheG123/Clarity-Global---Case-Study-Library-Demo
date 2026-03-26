"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
}

interface GallerySectionProps {
  items: GalleryItem[];
}

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];
const AUTO_ADVANCE_MS = 5000;

export default function GallerySection({ items }: GallerySectionProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const next = () =>
    setActive((prev) => (prev + 1) % items.length);

  const goTo = (i: number) => setActive(i);

  // Auto-advance; pauses while the user is interacting
  useEffect(() => {
    if (paused) return;
    timer.current = setTimeout(next, AUTO_ADVANCE_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused]);

  const current = items[active];

  return (
    <section
      className="bg-white px-6 py-16 md:px-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-4xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex items-end justify-between"
        >
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/35">
              04 — Leadership moments
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-black md:text-3xl">
              In the room
            </h2>
          </div>

          {/* Counter — also acts as the next trigger affordance */}
          <button
            onClick={() => { next(); setPaused(true); }}
            aria-label="Next image"
            className="group flex items-baseline gap-2 text-black/30 transition-colors hover:text-black/65"
          >
            <span className="font-mono text-base tabular-nums">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="text-xs text-black/20">/</span>
            <span className="font-mono text-xs tabular-nums text-black/20">
              {String(items.length).padStart(2, "0")}
            </span>
            <span className="ml-1 translate-x-0 text-sm transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </button>
        </motion.div>

        {/* Image frame */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65 }}
          className="overflow-hidden rounded-xl border border-black/8 bg-neutral-100"
        >
          {/* Image */}
          <div className="relative aspect-[3/2] w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-0"
              >
                <Image
                  src={current.src}
                  alt={current.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 75vw"
                  priority={active === 0}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Caption — full text, no truncation */}
          <div className="border-t border-black/6 px-6 py-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={`cap-${active}`}
                initial={{ opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm leading-[1.65] text-black/45"
              >
                {current.caption}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Progress lines — navigation only, no duplicate text controls */}
        <div
          className="mt-4 flex items-center gap-1.5"
          role="group"
          aria-label="Gallery navigation"
        >
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Show image ${i + 1}: ${item.alt}`}
              aria-current={i === active ? "true" : undefined}
              className={`h-[2px] flex-1 rounded-full transition-all duration-500 ${
                i === active ? "bg-black/45" : "bg-black/10"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
