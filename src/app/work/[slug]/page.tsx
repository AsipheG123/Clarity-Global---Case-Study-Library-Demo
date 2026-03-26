import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudyFull } from "@/app/lib/caseStudies";
import ExecutiveSpeechesDetail from "@/app/components/executive-speeches/ExecutiveSpeechesDetail";

type Props = {
  params: Promise<{ slug: string }>;
};

type ClientLogo = {
  name: string;
  src: string;
};

const clientLogosByTag: Record<string, ClientLogo[]> = {
  "Internal Development Communications": [
    { name: "World Bank Group", src: "/clients/WorldBankGroup_Logo.png" },
    { name: "African Development Bank", src: "/clients/AfricanDevelopmentBank.png" },
    { name: "IFC", src: "/clients/IFC_Logo.png" },
    { name: "GIZ", src: "/clients/GIZ_Logo.png" },
    { name: "JICA", src: "/clients/JICA_Logo.png" },
  ],
  "Public Finance Communications": [
    { name: "National Treasury", src: "/clients/RSA_NationalTreasury_Logo.png" },
    { name: "CABRI", src: "/clients/CABRI_Logo.png" },
    { name: "GTAC", src: "/clients/GTAC_Logo.png" },
    { name: "National Planning Commission", src: "/clients/RSA_NPC_Logo.png" },
    { name: "Auditor-General South Africa", src: "/clients/AuditorGeneral_Logo.png" },
  ],
  "Internal Communications": [
    { name: "Absa", src: "/clients/Absa_Logo.png" },
    { name: "Discovery", src: "/clients/Discovery_Logo.png" },
    { name: "Standard Bank", src: "/clients/StandardBank_Logo.png" },
    { name: "Nedbank", src: "/clients/Nedbank_Logo.png" },
    { name: "Sanlam", src: "/clients/Sanlam_Logo.png" },
  ],
  "Speechwriting & Thought Leadership": [
    { name: "World Bank Group", src: "/clients/WorldBankGroup_Logo.png" },
    { name: "IFC", src: "/clients/IFC_Logo.png" },
    { name: "Standard Bank", src: "/clients/StandardBank_Logo.png" },
    { name: "Discovery", src: "/clients/Discovery_Logo.png" },
    { name: "BUSA", src: "/clients/BUSA_Logo.png" },
  ],
  "Reporting": [
    { name: "Absa", src: "/clients/Absa_Logo.png" },
    { name: "Standard Bank", src: "/clients/StandardBank_Logo.png" },
    { name: "Discovery", src: "/clients/Discovery_Logo.png" },
    { name: "World Bank Group", src: "/clients/WorldBankGroup_Logo.png" },
    { name: "National Treasury", src: "/clients/RSA_NationalTreasury_Logo.png" },
  ],
  "Training & Facilitation": [
    { name: "JICA", src: "/clients/JICA_Logo.png" },
    { name: "GIZ", src: "/clients/GIZ_Logo.png" },
    { name: "CABRI", src: "/clients/CABRI_Logo.png" },
    { name: "ILO", src: "/clients/ILO_Logo.png" },
    { name: "SIWI", src: "/clients/SIWI_Logo.png" },
  ],
  "Editorial": [
    { name: "Mail & Guardian", src: "/clients/Mail&Guardian_Logo.png" },
    { name: "Business Report", src: "/clients/BusinessReport_Logo.png" },
    { name: "World Bank Group", src: "/clients/WorldBankGroup_Logo.png" },
    { name: "African Development Bank", src: "/clients/AfricanDevelopmentBank.png" },
    { name: "IFC", src: "/clients/IFC_Logo.png" },
  ],
  "Design": [
    { name: "World Bank Group", src: "/clients/WorldBankGroup_Logo.png" },
    { name: "IFC", src: "/clients/IFC_Logo.png" },
    { name: "Discovery", src: "/clients/Discovery_Logo.png" },
    { name: "Absa", src: "/clients/Absa_Logo.png" },
    { name: "National Treasury", src: "/clients/RSA_NationalTreasury_Logo.png" },
  ],
};

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudyFull(slug);

  if (!cs) {
    notFound();
  }

  const clientLogos =
    clientLogosByTag[cs.tag] ?? [
      { name: "World Bank Group", src: "/clients/WorldBankGroup_Logo.png" },
      { name: "IFC", src: "/clients/IFC_Logo.png" },
      { name: "Absa", src: "/clients/Absa_Logo.png" },
      { name: "Discovery", src: "/clients/Discovery_Logo.png" },
      { name: "Standard Bank", src: "/clients/StandardBank_Logo.png" },
    ];

  // Editorial redesign for the executive-speeches-proof case study
  if (slug === "executive-speeches-proof") {
    return <ExecutiveSpeechesDetail cs={cs} />;
  }

  return (
    <main className="min-h-screen bg-transparent text-black">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8">
          <Link
            href="/work"
            className="inline-flex rounded-full border border-black/15 bg-white/70 px-5 py-2 text-sm font-medium backdrop-blur hover:bg-black/5"
          >
            ← Back to Library
          </Link>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white/80 p-8 shadow-sm backdrop-blur">
          <p className="text-sm font-medium text-black/60">{cs.tag}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            {cs.title}
          </h1>
        </div>

        <div className="mt-4 rounded-2xl border border-black/10 bg-white/80 p-6 shadow-sm backdrop-blur">
          <p className="text-base leading-7 text-black/80">{cs.clientContext}</p>
        </div>

        <div className="mt-8 grid gap-4 rounded-2xl border border-black/10 bg-white/80 p-6 shadow-sm backdrop-blur md:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-black/50">
              Sector
            </p>
            <p className="mt-1 text-sm">{cs.sector}</p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-black/50">
              Geography
            </p>
            <p className="mt-1 text-sm">{cs.geography}</p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-black/50">
              Duration
            </p>
            <p className="mt-1 text-sm">{cs.duration}</p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-black/50">
              Services
            </p>
            <p className="mt-1 text-sm">{cs.services.join(", ")}</p>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs font-medium uppercase tracking-wide text-black/50">
              Audiences
            </p>
            <p className="mt-1 text-sm">{cs.audiences.join(", ")}</p>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <section className="rounded-2xl border border-black/10 bg-white/80 p-8 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold">Problem / challenge</h2>
            <p className="mt-4 text-base leading-7 text-black/80">{cs.challenge}</p>
          </section>

          <section className="rounded-2xl border border-black/10 bg-white/80 p-8 shadow-sm backdrop-blur">
            <h2 className="text-xl font-semibold">Approach</h2>
            <p className="mt-4 text-base leading-7 text-black/80">{cs.approach}</p>
          </section>
        </div>

{cs.featuredVideo && (
  <section className="mt-10 rounded-2xl border border-black/10 bg-white/80 p-8 shadow-sm backdrop-blur">
    <div className="max-w-3xl">
      <p className="text-xs font-medium uppercase tracking-wide text-black/50">
        Featured media
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">
        {cs.featuredVideo.title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-black/65">
        {cs.featuredVideo.note}
      </p>
    </div>

    <div className="mt-6 overflow-hidden rounded-2xl border border-black/10 bg-black">
      <div className="aspect-video w-full">
        <iframe
          src={cs.featuredVideo.embedUrl}
          title={cs.featuredVideo.title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  </section>
)}

{cs.gallery && cs.gallery.length > 0 && (
  <section className="mt-10 rounded-2xl border border-black/10 bg-white/80 p-8 shadow-sm backdrop-blur">
    <div className="max-w-3xl">
      <p className="text-xs font-medium uppercase tracking-wide text-black/50">
        Visual gallery
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">
        Representative visual treatment
      </h2>
      <p className="mt-3 text-sm leading-6 text-black/65">
        Example imagery showing how speechwriting and thought-leadership work can
        be supported with richer, responsive visuals.
      </p>
    </div>

    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {cs.gallery.map((item) => (
        <figure
          key={item.src}
          className="overflow-hidden rounded-2xl border border-black/10 bg-white"
        >
          <div className="relative aspect-[4/3] w-full bg-black/5">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
            />
          </div>
          <figcaption className="p-4 text-sm leading-6 text-black/70">
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  </section>
)}

{cs.outcomes && cs.outcomes.length > 0 && (
  <section className="mt-10 rounded-2xl border border-black/10 bg-white/80 p-8 shadow-sm backdrop-blur">
    <div className="max-w-3xl">
      <p className="text-xs font-medium uppercase tracking-wide text-black/50">
        Outcomes
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight">
        How this work can be presented digitally
      </h2>
    </div>

    <div className="mt-6 grid gap-4 md:grid-cols-3">
      {cs.outcomes.map((outcome) => (
        <div
          key={outcome}
          className="rounded-2xl border border-black/10 bg-white/70 p-5"
        >
          <p className="text-sm leading-6 text-black/80">{outcome}</p>
        </div>
      ))}
    </div>
  </section>
)}

{cs.testimonialPlaceholder && (
  <section className="mt-10 rounded-2xl border border-black/10 bg-white/80 p-8 shadow-sm backdrop-blur">
    <p className="text-xs font-medium uppercase tracking-wide text-black/50">
      Testimonial placeholder
    </p>

    <blockquote className="mt-4 max-w-3xl text-2xl font-medium tracking-tight text-black/85">
      “{cs.testimonialPlaceholder.quote}”
    </blockquote>

    <p className="mt-4 text-sm text-black/55">
      {cs.testimonialPlaceholder.attribution}
    </p>
  </section>
)}

        <section className="mt-10 rounded-2xl border border-black/10 bg-white/80 p-8 shadow-sm backdrop-blur">
          <h2 className="text-center text-3xl font-medium tracking-tight text-red-500 md:text-5xl">
            Some of our clients
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
            {clientLogos.map((client) => (
              <div
                key={client.name}
                className="flex h-32 items-center justify-center rounded-2xl bg-transparent p-4"
              >
                <Image
                  src={client.src}
                  alt={client.name}
                  width={180}
                  height={90}
                  className="max-h-20 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}