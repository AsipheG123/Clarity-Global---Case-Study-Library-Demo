// src/app/lib/caseStudies.ts

// --- Card type (homepage) ---
export type CaseStudyCard = {
  slug: string;
  tag: string; // category label on the card
  title: string;
  summary: string; // 1–2 sentences
  outcomes: string[]; // short bullets
};

// --- Full case study type (detail page) ---
export type CaseStudyFull = {
  slug: string;
  tag: string;
  title: string;

  clientContext: string;
  sector: string;
  geography: string;
  audiences: string[];
  services: string[];
  duration: string;
  featuredVideo?: {
  title: string;
  embedUrl: string;
  note: string;
};

gallery?: {
  src: string;
  alt: string;
  caption: string;
}[];

outcomes?: string[];

testimonialPlaceholder?: {
  quote: string;
  attribution: string;
};

  challenge: string;
  approach: string;

  whatClarityDid: string[];
  deliverables: string[];
  results: string[];

  timeline: { phase: string; details: string }[];
  teamRoles: string[];
  toolsMethods: string[];
  keyLearnings: string[];
};

// -----------------------------
// 8 CARDS (HOMEPAGE GRID)
// -----------------------------
export const caseStudies: CaseStudyCard[] = [
  {
    slug: "internal-development-communications",
    tag: "International Development Communications",
    title: "Clear communication for global water priorities",
    summary:
      "We helped a multilateral institution translate technical water-sector work into clear, audience-specific communications without losing accuracy.",
    outcomes: [
      "Unified message platform reused across products (Indicative)",
      "Shorter time-to-publish via repeatable formats (Indicative)",
      "Improved cross-team alignment through workshops (Indicative)",
    ],
  },
  {
    slug: "budget-publications-clarity",
    tag: "Public Finance Communications",
    title: "Budget documentation citizens and investors can use",
    summary:
      "We strengthened clarity, structure, and consistency across flagship budget publications—pairing rigorous editing with strategic advisory and training.",
    outcomes: [
      "Editorial governance across complex publication suites (Indicative)",
      "Clear-writing capability built through training (Indicative)",
      "Improved consistency across multi-author content (Indicative)",
    ],
  },
  {
    slug: "bank-language-standards",
    tag: "Internal Communications",
    title: "One voice across a complex bank",
    summary:
      "We supported a large financial services group to improve clarity and consistency across internal communications through shared standards and templates.",
    outcomes: [
      "Language guide rolled out across teams (Indicative)",
      "Reduced rework through templates and standards (Indicative)",
      "Clearer internal accountability via better messaging (Indicative)",
    ],
  },
  {
    slug: "executive-speeches-proof",
    tag: "Speechwriting & Thought Leadership",
    title: "Evidence-based leadership writing for high-stakes moments",
    summary:
      "We helped leaders communicate complex growth, investment, and policy messages with credibility—through speeches, briefings, and opinion-ready drafts.",
    outcomes: [
      "Faster approvals using message architecture (Indicative)",
      "Consistent narrative across public moments (Indicative)",
      "Reduced late-stage rewrite churn (Indicative)",
    ],
  },
  {
    slug: "sustainability-investor-story",
    tag: "Reporting",
    title: "A sustainability and investor story that holds together",
    summary:
      "We translated multi-team inputs into a coherent report—focused on materiality, brevity, and clarity for decision-makers.",
    outcomes: [
      "Stronger structure and scan-ability (Indicative)",
      "Earlier alignment reduced late rewrites (Indicative)",
      "Improved readability and consistency (Indicative)",
    ],
  },
  {
    slug: "ai-era-writing-training",
    tag: "Training & Facilitation",
    title: "Clear writing training for the age of AI",
    summary:
      "We delivered practical training that improved writing quality and judgment—helping teams use tools responsibly while protecting credibility.",
    outcomes: [
      "Shared writing standard adopted across teams (Indicative)",
      "Fewer rewrite loops for recurring documents (Indicative)",
      "Faster time-to-approval due to clearer structure (Indicative)",
    ],
  },
  {
    slug: "plain-language-policy",
    tag: "Editorial",
    title: "Turning technical policy into plain-language guidance",
    summary:
      "We reshaped complex policy and compliance content into clear, usable guidance—removing ambiguity and making responsibilities explicit.",
    outcomes: [
      "Fewer interpretation questions from end-users (Indicative)",
      "Improved consistency across document suites (Indicative)",
      "Reduced communication risk via clearer definitions (Indicative)",
    ],
  },
  {
    slug: "visual-clarity-system",
    tag: "Design",
    title: "Visual storytelling that makes complexity usable",
    summary:
      "We paired strong writing with bold, clean design—turning dense ideas into visuals people can absorb quickly in real decision contexts.",
    outcomes: [
      "Reusable visual language across assets (Indicative)",
      "Better comprehension in stakeholder sessions (Indicative)",
      "Reduced design churn through templates (Indicative)",
    ],
  },
];

// -----------------------------
// 8 FULL CASE STUDIES (DETAIL PAGES)
// -----------------------------
export const caseStudiesFull: CaseStudyFull[] = [
  {
    slug: "internal-development-communications",
    tag: "International Development Communications",
    title: "Clear communication for global water priorities",
    clientContext:
      "Client: Multilateral development institution (publicly referenced on Clarity Global’s site). Support focused on making technical water-sector work understandable for decision-makers, partners, and wider audiences.",
    sector: "International development / water",
    geography: "Global",
    audiences: ["Senior leaders", "Partners", "Event audiences", "Stakeholders"],
    services: ["Strategic advisory", "Speechwriting", "Editorial", "Design"],
    duration: "Multi-year support (project cycles)",

    challenge:
      "Technical content was dense, multi-authored, and high-stakes. Communications needed to be clear, engaging, and concise while staying technically accurate and factual.",
    approach:
      "We started by engaging deeply with flagship content and running an alignment workshop with senior staff to agree key messages. That message platform then supported multiple outputs tailored to different stakeholders and channels.",
    whatClarityDid: [
      "Facilitated message alignment and simplified narrative framing",
      "Produced leadership speeches, talking points, and opinion-ready drafts",
      "Edited for clarity and consistency without weakening technical integrity",
      "Designed infographics and brochure-style outputs to support comprehension",
    ],
    deliverables: [
      "Message platform and key-message architecture",
      "Leadership speeches + talking points packs",
      "Blog-style and internal feature content",
      "Op-ed style drafts",
      "Infographics and brochure assets",
    ],
    results: [
      "Consistent through-line across leadership and programme communications (Indicative)",
      "Shorter review cycles by aligning technical experts early (Indicative)",
      "Faster repurposing across channels using reusable modules (Indicative)",
    ],
    timeline: [
      { phase: "Discovery & immersion", details: "Deep reading of flagship material; audience/channel needs mapped." },
      { phase: "Message alignment", details: "Workshop to agree what matters, why, and what proof is required." },
      { phase: "Creation", details: "Drafting, editing, and design of multi-format outputs." },
      { phase: "Quality & delivery", details: "Disciplined review windows, fact checks, and consistency checks." },
    ],
    teamRoles: ["Strategic advisor (workshop lead)", "Lead writer/editor", "Designer", "Project manager", "Client-side reviewers"],
    toolsMethods: ["Strategic workshop", "Message mapping", "Audience/channel matrix", "Editorial QA checklist", "Design templates"],
    keyLearnings: ["Aligning early on meaning and proof reduces rewrites without compromising accuracy."],
  },

  {
    slug: "budget-publications-clarity",
    tag: "Public Finance Communications",
    title: "Budget documentation citizens and investors can use",
    clientContext:
      "Client: National finance ministry (publicly referenced on Clarity Global’s site). Work focused on clarity and consistency across flagship fiscal publications and related materials.",
    sector: "Public sector / public finance",
    geography: "South Africa",
    audiences: ["Parliament", "Investors", "Media", "Civil society", "Citizens"],
    services: ["Editorial", "Reporting", "Strategic advisory", "Training"],
    duration: "Long-term engagement (multi-year)",

    challenge:
      "Budget documentation must be precise, consistent across volumes, and understandable for very different audiences—under intense scrutiny and fixed deadlines.",
    approach:
      "We combined rigorous editorial governance with senior-level advisory discussions to sharpen focus and usability, supported by practical clear-writing training to build internal capability.",
    whatClarityDid: [
      "Edited complex publication suites for clarity, coherence, and consistency",
      "Maintained terminology and style decisions across documents",
      "Advised on narrative focus and usability for different audiences",
      "Delivered clear-writing training and feedback loops for officials",
    ],
    deliverables: [
      "Editorial governance model and workflow",
      "Publication standards (tone, terminology, consistency)",
      "Structured review cycles and decision logs",
      "Training sessions + practice exercises + feedback packs",
    ],
    results: [
      "Higher consistency across multi-author documents (Indicative)",
      "Reduced ambiguity and fewer late-stage rewrites (Indicative)",
      "Improved institutional writing capability through training (Indicative)",
    ],
    timeline: [
      { phase: "Publication mapping", details: "Document relationships mapped; terminology controlled." },
      { phase: "Editing cycles", details: "Structured edits across volumes with tracked decisions." },
      { phase: "Stakeholder reviews", details: "Agreed review windows with named approvers." },
      { phase: "Enablement", details: "Training and feedback to improve recurring outputs." },
    ],
    teamRoles: ["Lead editor", "Public finance comms advisor", "Copy editors", "Project manager", "Client-side content owners"],
    toolsMethods: ["Terminology bank", "Editorial decision log", "Consistency checks", "Clear-writing exercises", "Version control"],
    keyLearnings: ["Clarity at scale requires governance—standards, logs, and disciplined review windows."],
  },

  {
    slug: "bank-language-standards",
    tag: "Internal Communications",
    title: "One voice across a complex bank",
    clientContext:
      "Client: Large financial services group (publicly referenced on Clarity Global’s site). The focus was improving clarity and consistency across internal communications and supporting documents.",
    sector: "Financial services",
    geography: "Africa (multi-market)",
    audiences: ["Executives", "Managers", "Employees"],
    services: ["Strategic advisory", "Editorial", "Training"],
    duration: "Programme-based (multi-phase)",

    challenge:
      "Tone drift, jargon, and inconsistent structure made internal messages harder to act on—creating rework, delays, and avoidable confusion during change.",
    approach:
      "We anchored internal communications to a shared standard, then supported teams with templates, editorial governance, and practical training so clarity became repeatable.",
    whatClarityDid: [
      "Defined internal comms standards for tone, clarity, and structure",
      "Produced a language guide with examples and do/don’t patterns",
      "Edited internal policies, standards, and guidance for usability",
      "Delivered clear-communication training using real document rewrites",
    ],
    deliverables: [
      "Language guide and tone standards",
      "Internal comms templates (emails, notes, announcements)",
      "Edited policy and guidance documents",
      "Training sessions + before/after rewrite examples",
    ],
    results: [
      "Reduced rework through standardised structure and tone (Indicative)",
      "Fewer subjective tone debates due to shared guidance (Indicative)",
      "Clearer accountability through more actionable messages (Indicative)",
    ],
    timeline: [
      { phase: "Audit", details: "Sample comms reviewed; recurring problems identified." },
      { phase: "Standard creation", details: "Guide + templates drafted and tested." },
      { phase: "Rollout", details: "Training delivered across levels." },
      { phase: "Sustainment", details: "Ongoing editorial support and updates to standards." },
    ],
    teamRoles: ["Strategic advisor", "Lead writer/editor", "Policy editor", "Training facilitator", "Project manager"],
    toolsMethods: ["Language guide", "Message hierarchy", "Templates", "Workshop exercises", "Editorial QA"],
    keyLearnings: ["A shared language standard reduces friction and speeds execution—especially during strategy shifts."],
  },

  {
    slug: "executive-speeches-proof",
    tag: "Speechwriting & Thought Leadership",
    title: "Evidence-based leadership writing for high-stakes moments",
    clientContext:
      "Client: Confidential (representative of Clarity Global’s executive writing work). Focus: credible leadership writing under deadline and scrutiny.",
    sector: "Cross-sector",
    geography: "Africa / Global",
    audiences: ["Media", "Investors", "Partners", "Internal leadership"],
    services: ["Strategic advisory", "Speechwriting", "Editorial"],
    duration: "4–8 weeks (platform) + ongoing support",

    featuredVideo: {
  title: "Featured Leadership Content",
  embedUrl: "https://www.youtube.com/embed/aTs7fD9ZB_Q",
  note: "Representative embedded media showing how executive or thought-leadership video content could appear within a case study experience.",
},

gallery: [
  {
    src: "/clients/executive-speaker-1.jpg",
    alt: "Executive speaker addressing an audience",
    caption: "Representative event-stage imagery for leadership communications work.",
  },
  {
    src: "/clients/conference-audience-1.jpg",
    alt: "Conference audience during a leadership presentation",
    caption: "Responsive gallery example for event and audience coverage.",
  },
  {
    src: "/clients/interview-keynote-1.jpg",
    alt: "Professional interview or keynote environment",
    caption: "Example visual support for speechwriting and thought-leadership work.",
  },
  {
  src: "/clients/branded-event-1.jpg",
  alt: "Branded leadership event or presentation setting",
  caption: "Additional representative imagery for executive visibility and thought-leadership presentation.",
  },
],

outcomes: [
  "Supports clearer presentation of executive communication work in a digital format.",
  "Shows how thought-leadership content can be presented beyond static text alone.",
  "Creates space for richer campaign storytelling through video and supporting visuals.",
],

testimonialPlaceholder: {
  quote: "Client testimonial or executive feedback could appear here to reinforce credibility, outcomes, and audience impact.",
  attribution: "Placeholder for future client quote",
},

    challenge:
      "Leaders had fragmented inputs across teams, leading to unclear claims, inconsistent tone, and late-stage approval churn.",
    approach:
      "We built a simple message architecture (claim → why it matters → proof → action), created an evidence bank, and managed disciplined review windows.",
    whatClarityDid: [
      "Clarified narrative goal, audience expectations, and sensitivity points",
      "Built a proof-points bank to support claims",
      "Drafted speeches, remarks, and talking points with one through-line",
      "Edited for logic, clarity, and credibility (no over-claiming)",
    ],
    deliverables: ["Speech + talking points package", "Evidence/proof points sheet", "Op-ed style draft", "Q&A briefing note", "Tone sheet"],
    results: [
      "Faster approvals through reusable building blocks (Indicative)",
      "More consistent narrative across public moments (Indicative)",
      "Reduced last-minute rewrites (Indicative)",
    ],
    timeline: [
      { phase: "Discovery", details: "Goal, audience, constraints; collect source material." },
      { phase: "Architecture", details: "Define claims, proof, and structure." },
      { phase: "Drafting", details: "Write and revise; align to evidence." },
      { phase: "Finalisation", details: "Controlled reviews; final polish." },
    ],
    teamRoles: ["Strategic advisor", "Lead writer", "Editor", "Client-side reviewer"],
    toolsMethods: ["Message map", "Evidence bank", "Stakeholder matrix", "Editorial QA", "Version control"],
    keyLearnings: ["Credibility improves when reasoning is visible and evidence is easy to verify."],
  },

  {
    slug: "sustainability-investor-story",
    tag: "Reporting",
    title: "A sustainability and investor story that holds together",
    clientContext:
      "Client: Confidential (representative of Clarity Global’s reporting work across sustainability/ESG and investor-facing narratives).",
    sector: "Private sector / sustainability & investment",
    geography: "Africa / Global",
    audiences: ["Investors", "Boards", "Regulators", "Partners"],
    services: ["Reporting", "Editorial", "Design"],
    duration: "6–12 weeks (typical)",

    challenge:
      "Multi-team inputs produced stitched-together drafts with inconsistent definitions, uneven evidence, and unclear emphasis for decision-makers.",
    approach:
      "We used a materiality-driven editorial plan, agreed a narrative spine early, then applied clean layout and visuals designed for scan-ability and credibility.",
    whatClarityDid: [
      "Defined the narrative spine and material themes",
      "Rewrote sections for clarity, brevity, and consistency",
      "Built signposting for scan-ability and navigation",
      "Designed layouts and visuals to clarify evidence",
    ],
    deliverables: ["Narrative outline", "Rewritten sections + executive summary", "Infographics set", "Final publication pack (print/digital-ready)"],
    results: [
      "Improved scan-ability and navigation (Indicative)",
      "Fewer late-stage rewrites via earlier alignment (Indicative)",
      "Clearer definitions and more consistent evidence placement (Indicative)",
    ],
    timeline: [
      { phase: "Materiality & outline", details: "Agree what matters and why; define narrative spine." },
      { phase: "Drafting", details: "Consolidate inputs; rewrite for clarity." },
      { phase: "Design", details: "Apply layout system; produce visuals." },
      { phase: "QA", details: "Consistency + readability checks; final proofing." },
    ],
    teamRoles: ["Lead report editor", "Writer", "Designer", "Project manager", "Client-side leads + data owners"],
    toolsMethods: ["Materiality lens", "Style guide", "Terminology controls", "Readability checks", "Design system/templates"],
    keyLearnings: ["Reports work best when treated as products: audience-first, structured, and governed."],
  },

  {
    slug: "ai-era-writing-training",
    tag: "Training & Facilitation",
    title: "Clear writing training for the age of AI",
    clientContext:
      "Client: Confidential (representative of Clarity Global’s customised training). Focus: writing quality, judgment, and responsible tool use.",
    sector: "Cross-sector",
    geography: "South Africa / Global",
    audiences: ["Professional teams", "Managers", "Technical contributors"],
    services: ["Training", "Editorial coaching", "Advisory"],
    duration: "2–6 weeks (plus optional coaching)",

    challenge:
      "Drafts were fast but inconsistent. Even with modern tools, documents failed because audience, action, and proof weren’t clear—leading to rewrites and credibility risk.",
    approach:
      "We taught a repeatable method: define audience and intent first; draft in plain language; edit for structure; stress-test for ambiguity; then polish.",
    whatClarityDid: [
      "Workshops built around participant writing samples",
      "Structured feedback and rewrite demonstrations",
      "A lightweight internal standard + checklist teams kept using",
      "Optional follow-up coaching to sustain improvements",
    ],
    deliverables: ["Workshop series", "Feedback pack + before/after rewrites", "Clarity checklist + mini style guide", "Coaching plan (optional)"],
    results: [
      "Reduced rewrite loops for recurring documents (Indicative)",
      "Improved time-to-approval due to clearer structure (Indicative)",
      "More consistent tone and clarity across teams (Indicative)",
    ],
    timeline: [
      { phase: "Pre-work", details: "Collect samples; diagnose recurring patterns." },
      { phase: "Workshops", details: "Exercises, rewrites, and feedback loops." },
      { phase: "Toolkit", details: "Checklist + standards pack delivered." },
      { phase: "Coaching", details: "Follow-up reviews and guidance (optional)." },
    ],
    teamRoles: ["Lead facilitator", "Editor-coach", "Coordinator/PM", "Client-side sponsor"],
    toolsMethods: ["Sample analysis", "Structured exercises", "Feedback frameworks", "Standards toolkit"],
    keyLearnings: ["Training sticks when the system changes too: standards + workflow, not just skill."],
  },

  {
    slug: "plain-language-policy",
    tag: "Editorial",
    title: "Turning technical policy into plain-language guidance",
    clientContext:
      "Client: Confidential public-interest organisation. Focus: policy/compliance content that needed to be usable by non-specialists without losing precision.",
    sector: "Public interest / policy",
    geography: "South Africa",
    audiences: ["Operational teams", "Stakeholders", "Non-specialist readers"],
    services: ["Editorial", "Strategic advisory"],
    duration: "4–10 weeks (typical)",

    challenge:
      "Documents were technically correct but practically unusable. Ambiguity created interpretation risk and slowed implementation.",
    approach:
      "We treated clarity as risk control: identify the decisions the document must support, then restructure and edit for definitions, responsibilities, and plain language.",
    whatClarityDid: [
      "Restructured documents around decision points and responsibilities",
      "Clarified definitions and removed ambiguous phrasing",
      "Reduced jargon and improved consistency across related docs",
      "Established standards so future updates stayed clear",
    ],
    deliverables: ["Plain-language guidance", "Definitions/glossary", "Executive summary + signposting", "Templates", "Editorial standards"],
    results: [
      "Fewer interpretation questions and less back-and-forth (Indicative)",
      "Clearer accountability via explicit responsibilities (Indicative)",
      "Improved consistency across a document suite (Indicative)",
    ],
    timeline: [
      { phase: "Intent mapping", details: "Clarify decisions the doc must support; map key sections." },
      { phase: "Rewrite", details: "Restructure, simplify, define terms." },
      { phase: "Review", details: "Disciplined review windows; track decisions." },
      { phase: "QA", details: "Consistency + readability checks." },
    ],
    teamRoles: ["Lead editor", "Writer", "Advisor", "Project manager", "Client-side owner + reviewer"],
    toolsMethods: ["Intent mapping", "Terminology controls", "Readability checks", "Editorial QA", "Structured review cycles"],
    keyLearnings: ["Plain language reduces risk by making meaning unmissable."],
  },

  {
    slug: "visual-clarity-system",
    tag: "Design",
    title: "Visual storytelling that makes complexity usable",
    clientContext:
      "Client: Confidential. Focus: turning dense content into visuals and layouts that support real decision-making and stakeholder engagement.",
    sector: "Cross-sector",
    geography: "Africa / Global",
    audiences: ["Stakeholders", "Executives", "Mixed technical/non-technical audiences"],
    services: ["Design", "Editorial", "Reporting discipline"],
    duration: "3–8 weeks (typical)",

    challenge:
      "Materials were visually inconsistent, cluttered, and hard to scan—reducing comprehension in meetings and increasing design churn.",
    approach:
      "We built a visual clarity system: define the story, decide what belongs in words vs visuals, and design around the decisions the audience must make.",
    whatClarityDid: [
      "Designed layouts, templates, and infographics using clean hierarchy",
      "Aligned visuals tightly to the narrative to avoid distortion",
      "Simplified charts and captions so evidence was readable",
      "Set review standards to reduce churn and inconsistency",
    ],
    deliverables: ["Infographic set", "Presentation templates", "Report layout system", "Chart clean-up + captions", "Final asset pack"],
    results: [
      "Better comprehension in stakeholder sessions (Indicative)",
      "Reduced design churn through reusable templates (Indicative)",
      "More effective meetings due to scan-able materials (Indicative)",
    ],
    timeline: [
      { phase: "Story & structure", details: "Message-to-visual mapping; hierarchy defined." },
      { phase: "Design production", details: "Templates, layouts, infographics produced." },
      { phase: "Editorial alignment", details: "Captions/labels checked for clarity and accuracy." },
      { phase: "QA", details: "Legibility + consistency checks." },
    ],
    teamRoles: ["Designer", "Editor", "Lead writer", "Project manager", "Client-side comms lead + reviewers"],
    toolsMethods: ["Message-to-visual mapping", "Template library", "Legibility checks", "Editorial QA for captions/labels"],
    keyLearnings: ["Design reduces cognitive load and strengthens credibility by making evidence readable."],
  },
];

export function getCaseStudyFull(slug: string) {
  return caseStudiesFull.find((c) => c.slug === slug);
}