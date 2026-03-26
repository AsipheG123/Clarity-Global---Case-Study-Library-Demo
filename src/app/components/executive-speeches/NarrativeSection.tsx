"use client";

import { motion } from "framer-motion";

interface NarrativeSectionProps {
  chapterNumber: string;
  label: string;
  heading: string;
  body: string;
  reversed?: boolean;
  /** When true the body paragraph builds word-by-word — use on Approach only */
  staggeredBody?: boolean;
  /** Indent body content right on desktop to create editorial offset */
  textOffset?: boolean;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Split text into words and animate each one in with a tight stagger */
function StaggeredBody({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <p className="mt-7 text-lg leading-[1.8] text-black/65">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.2 + i * 0.022, duration: 0.35 }}
          className="inline"
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </p>
  );
}

export default function NarrativeSection({
  chapterNumber,
  label,
  heading,
  body,
  reversed = false,
  staggeredBody = false,
  textOffset = false,
}: NarrativeSectionProps) {
  return (
    <section
      className={`px-6 py-16 md:px-16 ${reversed ? "bg-[#fafafa]" : "bg-white"}`}
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: EASE }}
          className={`max-w-3xl ${textOffset ? "md:ml-24" : ""}`}
        >
          {/* Chapter marker */}
          <div className="mb-8 flex items-center gap-5">
            <span className="font-mono text-xs font-medium text-red-500">
              {chapterNumber}
            </span>
            <div className="h-px max-w-[3rem] flex-1 bg-black/12" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-black/35">
              {label}
            </span>
          </div>

          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-black md:text-4xl">
            {heading}
          </h2>

          {staggeredBody ? (
            <StaggeredBody text={body} />
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.65, ease: EASE }}
              className="mt-7 text-lg leading-[1.8] text-black/65"
            >
              {body}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
