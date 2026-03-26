"use client";

import { type CaseStudyFull } from "@/app/lib/caseStudies";
import CampaignBoard from "./CampaignBoard";
import ClosingSection from "./ClosingSection";
import EditorialFraming from "./EditorialFraming";
import GeoFootprint from "./GeoFootprint";
import HeroSection from "./HeroSection";
import KeywordStrip from "./KeywordStrip";
import MediaSection from "./MediaSection";
import NarrativeSection from "./NarrativeSection";
import OutcomesSection from "./OutcomesSection";
import PortraitProof from "./PortraitProof";
import ProofMomentsSection from "./ProofMomentsSection";
import PullQuote from "./PullQuote";

const KEYWORDS = [
  "Clarity",
  "Credibility",
  "Structure",
  "Evidence",
  "Precision",
  "Authority",
  "Integrity",
];

interface Props {
  cs: CaseStudyFull;
}

/**
 * Page section sequence:
 *
 * Light zone ─────────────────────────────────────────
 * 1.  Hero             — dark, typewriter
 * 2.  EditorialFraming — white, brief + metadata + brief signals
 * 3.  GeoFootprint     — light grey, animated SVG world map, Africa → US arc
 * 4.  KeywordStrip     — light, editorial accent
 * 5.  Challenge        — white, chapter 01
 * 6.  Approach         — fafafa, chapter 02, staggered words
 *
 * Dark chapter ────────────────────────────────────────
 * 6.  CampaignBoard    — dark, art-directed deliverables board, slide-like sequence
 * 7.  MediaSection     — dark, bordered video, "03 — The delivery"
 * 8.  PortraitProof    — dark, portrait proof card + methodology, editorial graphic frame
 * 9.  ProofMomentsSection — dark, full-bleed images + text overlay, "04 — Selected moments"
 *
 * Resolution ──────────────────────────────────────────
 * 10. OutcomesSection  — grey, through-line + animated left bar
 * 11. PullQuote        — white
 * 12. ClosingSection   — light logo strip + dark closing
 */
export default function ExecutiveSpeechesDetail({ cs }: Props) {
  return (
    <main className="min-h-screen bg-white text-black">

      {/* Light zone */}
      <HeroSection tag={cs.tag} title={cs.title} />

      <EditorialFraming
        clientContext={cs.clientContext}
        sector={cs.sector}
        geography={cs.geography}
        duration={cs.duration}
        services={cs.services}
        audiences={cs.audiences}
        briefSignals={[
          { label: "Stakes",    text: cs.challenge },
          { label: "Audiences", text: cs.audiences.join(" · ") },
          { label: "Mandate",   text: cs.whatClarityDid[0] },
        ]}
      />

      {/* Geography map — visual expansion of "Geography" metadata in EditorialFraming */}
      <GeoFootprint />

      <KeywordStrip words={KEYWORDS} variant="light" />

      <NarrativeSection
        chapterNumber="01"
        label="Challenge"
        heading="The problem"
        body={cs.challenge}
      />

      <NarrativeSection
        chapterNumber="02"
        label="Approach"
        heading="Our approach"
        body={cs.approach}
        reversed
        staggeredBody
        textOffset
      />

      {/* Dark chapter — CampaignBoard → video → portrait proof → editorial moments */}
      <CampaignBoard deliverables={cs.deliverables} />

      {cs.featuredVideo && (
        <MediaSection
          title={cs.featuredVideo.title}
          embedUrl={cs.featuredVideo.embedUrl}
          note={cs.featuredVideo.note}
        />
      )}

      {/* Portrait proof frame — bridges the delivery video and selected moments */}
      <PortraitProof />

      {cs.gallery && cs.gallery.length > 0 && (
        <ProofMomentsSection items={cs.gallery} />
      )}

      {/* Resolution */}
      {cs.outcomes && cs.outcomes.length > 0 && (
        <OutcomesSection items={cs.outcomes} />
      )}

      {cs.testimonialPlaceholder && (
        <PullQuote
          quote={cs.testimonialPlaceholder.quote}
          attribution={cs.testimonialPlaceholder.attribution}
        />
      )}

      <ClosingSection />

    </main>
  );
}
