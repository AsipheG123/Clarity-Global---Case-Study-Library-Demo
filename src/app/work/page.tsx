"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { caseStudies, type CaseStudyCard } from "@/app/lib/caseStudies";

export default function WorkPage() {
  const [showHeader, setShowHeader] = useState(true);
  const [query, setQuery] = useState("");
const lastY = useRef(0);
  const filtered = caseStudies.filter((cs: CaseStudyCard) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;

    return (
      cs.title.toLowerCase().includes(q) ||
      cs.tag.toLowerCase().includes(q) ||
      cs.summary.toLowerCase().includes(q)
    );
  });

useEffect(() => {
lastY.current = window.scrollY;

  const onScroll = () => {
    const y = window.scrollY;
    const delta = y - lastY.current;

    if (Math.abs(delta) < 6) return;

    if (y < 40) {
      setShowHeader(true);
      lastY.current = y;
      return;
    }

    if (delta > 0) setShowHeader(false); // scrolling down
    else setShowHeader(true);            // scrolling up

    lastY.current = y;
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);
  return (
    <main className="relative isolate min-h-screen bg-transparent text-black">
   
{/* Header */}
<div
  className={[
    "sticky top-0 z-50 transition-transform duration-300 ease-out",
    showHeader ? "translate-y-0" : "-translate-y-full",
  ].join(" ")}
>
  <header className="bg-white/95 px-6 py-4 backdrop-blur border-b border-black/10 shadow-sm">
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <img
          src="/CG_Logo.png"
          alt="Clarity Global logo"
          className="h-10 w-10 rounded-xl object-contain"
        />
        <div>
          <p className="text-lg font-semibold leading-none">Clarity Global</p>
          <p className="text-base text-black/60">Case Study Library</p>
        </div>
      </div>

<div className="hidden flex-1 justify-center md:flex">
  <div className="w-full max-w-md">
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search case studies..."
      className="w-full rounded-full border border-black/15 bg-white/90 py-2.5 pl-12 pr-4 text-sm text-black outline-none backdrop-blur placeholder:text-black/45 focus:border-red-400"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.3-4.3'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "16px center",
        backgroundSize: "16px 16px",
      }}
    />
  </div>
</div>

      <nav className="hidden items-center gap-6 text-sm md:flex">
        <a className="hover:underline" href="#cases">
          Case Studies
        </a>
        <a className="hover:underline" href="#process">
          Process
        </a>
        <a className="hover:underline" href="/contact">
          Contact
        </a>
        <a
          className="rounded-full bg-red-500 px-4 py-2 text-white hover:opacity-90"
          href="/contact"
        >
          Become a Better Writer
        </a>
      </nav>
    </div>
  </header>
</div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-0 pb-12">

        {/* Hero */}
        <section className="mt-12 grid gap-8 md:grid-cols-2 md:items-center">
          <div>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Real Case Studies.
              </h1>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl text-red-500"> 
              Real Outcomes.
              </h2>

            <p className="mt-4 text-base text-black/70">
              A simple demo library to showcase Clarity Global’s work and process. Easy to browse, easy to share,
              and ready to be deployed.
            </p>
            <p className="mt-4 text-base font-semibold text-red-500">
              Say What You Mean
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#cases"
                className="rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
              >
                Browse Case Studies
              </a>
              <a
                href="/contact"
                className="rounded-full border border-black/15 bg-white/60 px-5 py-2.5 text-sm font-medium hover:bg-black/5 backdrop-blur"
              >
                Submit a Case Study
              </a>
            </div>
          </div>

          {/* Feature card */}
          <div className="rounded-2xl border border-black/10 bg-white/80 p-6 shadow-sm backdrop-blur">
            <p className="text-sm font-semibold">What this demo includes</p>
            <ul className="mt-4 space-y-2 text-sm text-black/70">
              <li>• 8 Case Study cards</li>
              <li>• Clean search + Filters </li>
              <li>• Detailed pages per case study</li>
              <li>• “Become a Better Writer” CTA section</li>
            </ul>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section id="cases" className="mt-16">
          <h2 className="text-2xl font-semibold">Case Studies</h2>
          <p className="mt-2 text-black/60">Browse 8 sample case studies for this demo library.</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {filtered.map((cs) => (
              <Link
                key={cs.slug}
                href={`/work/${cs.slug}`}
                className="rounded-2xl border border-black/10 bg-white/70 p-6 transition hover:border-black/20 hover:shadow-sm backdrop-blur"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-medium text-black/60">{cs.tag}</p>
                    <p className="mt-2 text-base font-semibold">{cs.title}</p>
                    <p className="mt-2 text-sm text-black/60">{cs.summary}</p>
                    <ul className="mt-3 space-y-1 text-sm text-black/60">
  {cs.outcomes.map((o, i) => (
    <li key={i}>• {o}</li>
  ))}
</ul>
                  </div>
                  <span className="text-sm font-medium text-black/60">View →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="process" className="mt-16">
  <h2 className="text-2xl font-semibold">How we work</h2>
  <p className="mt-2 text-black/60">
    We work as thinking partners—helping organisations communicate complex ideas with clarity, simplicity, and integrity.
  </p>

  <div className="mt-6 grid gap-4 md:grid-cols-2">
    <div className="rounded-2xl border border-black/10 bg-white/70 p-6 backdrop-blur">
      <p className="text-sm font-semibold">Discovery & immersion</p>
      <p className="mt-2 text-sm text-black/70">
        We read deeply, clarify audiences, and identify what matters most—what must be understood and what must be decided.
      </p>
    </div>

    <div className="rounded-2xl border border-black/10 bg-white/70 p-6 backdrop-blur">
      <p className="text-sm font-semibold">Message alignment</p>
      <p className="mt-2 text-sm text-black/70">
        We run focused workshops to agree the through-line, key messages, and proof points before drafting starts.
      </p>
    </div>

    <div className="rounded-2xl border border-black/10 bg-white/70 p-6 backdrop-blur">
      <p className="text-sm font-semibold">Creation & craft</p>
      <p className="mt-2 text-sm text-black/70">
        We write, edit, and design communications that are accurate, engaging, and suited to the channel.
      </p>
    </div>

    <div className="rounded-2xl border border-black/10 bg-white/70 p-6 backdrop-blur">
      <p className="text-sm font-semibold">Quality & delivery</p>
      <p className="mt-2 text-sm text-black/70">
        We manage disciplined review windows and deliver publication-ready outputs supported by clear standards.
      </p>
    </div>
  </div>

  <div className="mt-6 rounded-2xl border border-black/10 bg-white/70 p-6 backdrop-blur">
    <p className="text-sm font-semibold">What clients can expect</p>
    <ul className="mt-3 space-y-1 text-sm text-black/70">
      <li>• Clear scope, owners, and review windows</li>
      <li>• Regular check-ins during drafting and production</li>
      <li>• A high bar for accuracy, consistency, and readability</li>
    </ul>
  </div>
</section>

        <section
          id="contact"
          className="mt-16 rounded-2xl border border-black/10 bg-white/70 p-8 backdrop-blur"
        >
          <h2 className="text-2xl font-semibold">Become a Better Writer</h2>
          <p className="mt-2 text-black/60">Get in touch to explore writing support, case study development, or collaboration with Clarity Global.</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="rounded-full bg-red-500 px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
              href="#"
            >
              Apply to Write
            </a>
            <a
              className="rounded-full border border-black/15 bg-white/60 px-5 py-2.5 text-sm font-medium hover:bg-black/5 backdrop-blur"
              href="#cases"
            >
              View Library
            </a>
          </div>
        </section>

        <footer className="mt-16 border-t border-black/10 py-8 text-sm text-black/50">
          © {new Date().getFullYear()} Clarity Global — Demo Case Study Library
        </footer>
      </div>
    </main>
  );
}