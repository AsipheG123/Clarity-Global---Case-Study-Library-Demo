"use client";

import { motion } from "framer-motion";

interface EditorialFramingProps {
  clientContext: string;
  sector: string;
  geography: string;
  duration: string;
  services: string[];
  audiences: string[];
  briefSignals?: { label: string; text: string }[];
}

const EASE_OUT: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

export default function EditorialFraming({
  clientContext,
  sector,
  geography,
  duration,
  services,
  audiences,
  briefSignals,
}: EditorialFramingProps) {
  const metaItems = [
    { label: "Sector", value: sector },
    { label: "Geography", value: geography },
    { label: "Duration", value: duration },
    { label: "Services", value: services.join(", ") },
    { label: "Audiences", value: audiences.join(", ") },
  ];

  return (
    <section className="bg-white px-6 py-16 md:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 md:grid-cols-[1fr_260px] lg:grid-cols-[1fr_300px]">
          {/* Context block */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-black/35">
              The Brief
            </p>
            <p className="text-xl leading-[1.75] text-black/75 md:text-2xl md:leading-[1.7]">
              {clientContext}
            </p>

            {/* Brief signals — compact editorial cue module */}
            {briefSignals && briefSignals.length > 0 && (
              <div className="mt-10 space-y-5">
                {briefSignals.map(({ label, text }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ delay: 0.35 + i * 0.12, duration: 0.5, ease: EASE_OUT }}
                    className="border-l-[1.5px] border-red-500/35 pl-4"
                  >
                    <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-red-500/55">
                      {label}
                    </p>
                    <p className="mt-1.5 text-sm leading-[1.65] text-black/60">{text}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Meta sidebar */}
          <div className="space-y-7 border-l border-black/8 pl-8 md:pt-10">
            {metaItems.map(({ label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: EASE_OUT }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-black/30">
                  {label}
                </p>
                <p className="mt-1.5 text-sm leading-6 text-black/65">{value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
