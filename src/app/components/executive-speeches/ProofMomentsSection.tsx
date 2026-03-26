"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface MomentItem {
  src: string;
  alt: string;
  caption: string;
}

interface ProofMomentsSectionProps {
  items: MomentItem[];
}

const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];
const AUTO_ADVANCE_MS = 4000;

/**
 * ProofMomentsSection — Section 04.
 * Deliberately differentiated from Section 03 (MediaSection / video):
 *
 * 03 = bordered video player inside a container header — delivery in action
 * 04 = full-bleed image with editorial text overlaid on a gradient — curated moments,
 *      documentary film-still register, social/story-card composition
 *
 * The caption lives ON the image, not below it — this is the key distinction.
 *
 * Auto-advance starts only once the section enters the viewport (once: true),
 * so the user always sees the first image and witnesses the first transition.
 */
export default function ProofMomentsSection({ items }: ProofMomentsSectionProps) {
  const [active, setActive] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const next = useCallback(
    () => setActive((prev) => (prev + 1) % items.length),
    [items.length],
  );
  const goTo = (i: number) => setActive(i);

  useEffect(() => {
    if (!inView) return;
    const id = setTimeout(next, AUTO_ADVANCE_MS);
    return () => clearTimeout(id);
  }, [active, inView, next]);

  const current = items[active];

  return (
    <section
      ref={sectionRef}
      className="border-t border-white/6 bg-[#0c0c0c] px-6 py-14 md:px-16"
    >
      <div className="mx-auto max-w-4xl">

        {/* Chapter label row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <span className="h-px w-6 bg-red-500/60" aria-hidden />
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-red-500/75">
              04 — Selected moments
            </p>
          </div>

          {/* Counter + next affordance */}
          <button
            onClick={next}
            aria-label="Next moment"
            className="group flex items-baseline gap-1.5 text-white/28 transition-colors hover:text-white/60"
          >
            <span className="font-mono text-sm tabular-nums">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="text-xs text-white/18">/</span>
            <span className="font-mono text-xs tabular-nums text-white/18">
              {String(items.length).padStart(2, "0")}
            </span>
            <span className="ml-1.5 text-sm transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </button>
        </motion.div>

        {/* The moment frame — full-bleed image with editorial text ON it */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65 }}
          className="overflow-hidden rounded-xl"
        >
          <div className="relative aspect-[3/2] w-full overflow-hidden">

            {/*
             * Image stack — all images are always mounted as absolute layers.
             * Opacity toggles between 0 and 1 on the active item; enter and exit
             * run simultaneously so the frame is never empty (no black flash).
             * Scale drifts 1.04 → 1.0 over 4.5s while active, snaps back to
             * 1.04 instantly when inactive so the drift resets for the next cycle.
             * Active image sits at zIndex 1 so it blends above the fading-out one.
             */}
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: i === 0 ? 1 : 0, scale: 1.04 }}
                animate={{
                  opacity: i === active ? 1 : 0,
                  scale: i === active ? 1.0 : 1.04,
                }}
                transition={{
                  opacity: { duration: 0.6, ease: EASE },
                  scale: i === active
                    ? { duration: 4.5, ease: "linear" }
                    : { duration: 0.01 },
                }}
                className="absolute inset-0"
                style={{ zIndex: i === active ? 1 : 0 }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 75vw"
                  priority={i === 0}
                />
              </motion.div>
            ))}

            {/* Permanent gradient — sits above the image stack */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/30 to-transparent"
              style={{ zIndex: 2 }}
              aria-hidden
            />

            {/* Editorial caption — sits above gradient */}
            <div className="absolute bottom-0 left-0 right-0 px-7 pb-7 md:px-9 md:pb-8" style={{ zIndex: 2 }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={`caption-${active}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="max-w-md text-base font-medium leading-[1.55] text-white/88 md:text-lg"
                >
                  {current.caption}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Progress lines — white on dark */}
        <div
          className="mt-4 flex items-center gap-1.5"
          role="group"
          aria-label="Moments navigation"
        >
          {items.map((item, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to moment ${i + 1}: ${item.alt}`}
              aria-current={i === active ? "true" : undefined}
              className={`h-[2px] flex-1 rounded-full transition-all duration-500 ${
                i === active ? "bg-white/45" : "bg-white/12"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
