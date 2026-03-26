"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// Speechwriting & Thought Leadership client set — files verified in /public/clients/
const CLIENT_LOGOS = [
  { name: "World Bank Group",  src: "/clients/WorldBankGroup_Logo.png" },
  { name: "IFC",               src: "/clients/IFC_Logo.png" },
  { name: "Standard Bank",     src: "/clients/StandardBank_Logo.png" },
  { name: "Discovery",         src: "/clients/Discovery_Logo.png" },
  { name: "BUSA",              src: "/clients/BUSA_Logo.png" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ClosingSection() {
  return (
    <>
      {/* ── Light logo strip ─────────────────────────────────────────────────
          Logos are shown on a near-white background — no CSS filter required.
          This preserves actual logo detail rather than reducing them to
          featureless silhouettes.
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="border-t border-black/6 bg-[#f7f7f7] px-6 py-14 md:px-16">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <p className="mb-9 text-center text-xs font-semibold uppercase tracking-[0.3em] text-red-500/60">
              Some of our clients
            </p>

            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-14">
              {CLIENT_LOGOS.map((client, i) => (
                <motion.div
                  key={client.name}
                  // Framer Motion owns opacity — no Tailwind opacity class
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.68 }}
                  whileHover={{ opacity: 0.92 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: EASE }}
                >
                  <Image
                    src={client.src}
                    alt={client.name}
                    width={130}
                    height={55}
                    className="max-h-10 w-auto object-contain"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Dark closing chapter ──────────────────────────────────────────── */}
      <section className="bg-[#080808] px-6 pb-20 pt-16 md:px-16">
        <div className="mx-auto max-w-4xl">

          {/* End-of-case-study marker */}
          <div className="mb-16 flex items-center gap-5">
            <div className="h-px flex-1 bg-white/12" />
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-red-500/60">
              End of case study
            </span>
            <div className="h-px flex-1 bg-white/12" />
          </div>

          {/* Continuation block */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: EASE }}
            className="grid gap-12 md:grid-cols-2 md:items-start"
          >
            {/* Archive return */}
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-red-500/65">
                Continue
              </p>
              <p className="text-xl font-medium leading-snug tracking-tight text-white/80 md:text-2xl">
                Explore the full work archive.
              </p>
              <Link
                href="/work"
                className="group mt-7 inline-flex items-center gap-2.5 text-sm font-medium text-white/55 transition-colors duration-300 hover:text-white"
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
                  ←
                </span>
                Back to Case Study Library
              </Link>
            </div>

            {/* CTA */}
            <div>
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-red-500/65">
                Work with us
              </p>
              <p className="mb-6 text-sm leading-[1.75] text-white/52">
                For leadership writing, thought-leadership positioning, or editorial
                governance at a high-stakes moment — we can help.
              </p>
              <Link
                href="/contact"
                className="inline-flex rounded-full border border-white/20 bg-white/8 px-5 py-2.5 text-sm font-medium text-white/75 transition-all duration-300 hover:border-white/30 hover:bg-white/12 hover:text-white"
              >
                Get in touch
              </Link>
            </div>
          </motion.div>

          {/* Colophon */}
          <p className="mt-20 text-center text-xs font-medium uppercase tracking-[0.25em] text-red-500/45">
            © {new Date().getFullYear()} Clarity Global
          </p>

        </div>
      </section>
    </>
  );
}
