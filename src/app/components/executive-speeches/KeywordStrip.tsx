"use client";

import { motion } from "framer-motion";

interface KeywordStripProps {
  words: string[];
  variant?: "light" | "dark";
}

export default function KeywordStrip({
  words,
  variant = "light",
}: KeywordStripProps) {
  const isDark = variant === "dark";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className={`overflow-x-auto py-6 ${
        isDark
          ? "bg-[#080808] border-b border-white/5"
          : "border-y border-black/8 bg-[#f5f5f5]"
      }`}
    >
      <div className="flex justify-center px-6 md:px-16">
        <div className="flex min-w-max items-center">
        {words.map((word, i) => (
          <motion.div
            key={word}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.06,
              duration: 0.45,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="flex items-center"
          >
            <span
              className={`text-[11px] font-semibold uppercase tracking-[0.3em] whitespace-nowrap ${
                isDark ? "text-white/30" : "text-black/35"
              }`}
            >
              {word}
            </span>
            {i < words.length - 1 && (
              <span
                className="mx-5 text-red-500/50 select-none"
                aria-hidden
              >
                ·
              </span>
            )}
          </motion.div>
        ))}
        </div>
      </div>
    </motion.div>
  );
}
