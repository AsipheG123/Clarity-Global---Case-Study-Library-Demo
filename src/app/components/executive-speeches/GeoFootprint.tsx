"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Continent path data ───────────────────────────────────────────────────────
//
// Projection: equirectangular (plate carrée)
// ViewBox: 0 0 360 180
// Coordinate mapping:  x = lon + 180   y = 90 − lat
//
// Vertices are derived from real geographic coordinates so proportions match
// the reference flat world map. Key recognition features prioritised:
//   Africa:       Gulf of Guinea westward bulge, Somalia horn, Cape
//   N. America:   Gulf of Mexico U-shape, California coast, Florida
//   S. America:   Brazil NE bulge, Patagonian taper, Cape Horn
//   Europe:       Iberian peninsula, Mediterranean coast, Scandinavia
//   Asia:         India peninsula southward bump, SE Asia coast
//   Greenland:    Separate polygon — important for N Atlantic scene-setting
//   Madagascar:   Small polygon to anchor Africa's east side
// ─────────────────────────────────────────────────────────────────────────────

const CONTINENTS: { key: string; d: string }[] = [
  {
    // ── North America ────────────────────────────────────────────────────────
    // Alaska → Pacific coast → Mexico Pacific → Central America tip →
    // Gulf of Mexico (Yucatan left, Texas deep-left, Louisiana right, Florida) →
    // East coast → Maritime Canada → Hudson Strait → Arctic → Alaska return
    key: "n-america",
    d:
      "M 13,26 L 28,28 " +
      "Q 46,33 56,42 " +        // BC / Pacific NW
      "Q 59,51 62,57 " +        // California
      "Q 69,65 80,73 " +        // Mexico Pacific coast
      "L 94,77 " +              // Central America (Pacific side)
      "L 90,70 L 83,63 " +      // Gulf of Mexico: Yucatan → Texas (U left arm)
      "L 91,60 L 98,65 " +      // Louisiana → Florida (U right arm + tip)
      "Q 101,60 104,55 " +      // East coast (Carolinas)
      "Q 108,49 116,44 " +      // New England / Maritime Canada
      "L 124,39 " +             // Labrador
      "Q 116,28 100,26 " +      // Hudson Strait → NW Canada
      "Q 72,22 39,26 " +        // Far NW Canada / Yukon
      "Q 24,20 13,26 Z",        // Alaska return
  },
  {
    // ── Greenland ─────────────────────────────────────────────────────────────
    key: "greenland",
    d: "M 136,30 L 142,26 L 158,18 L 162,13 L 148,7 L 128,10 L 126,22 L 130,27 Z",
  },
  {
    // ── South America ────────────────────────────────────────────────────────
    // Colombia NW → Venezuela coast → Brazil NE bulge (Recife) →
    // Brazil SE → Uruguay → Patagonia → Cape Horn → Chile → Peru → return
    key: "s-america",
    d:
      "M 103,82 " +
      "Q 113,79 119,79 " +      // Venezuela N coast
      "Q 130,85 145,98 " +      // Brazil NE (Recife bulge)
      "Q 141,106 137,113 " +    // Brazil SE coast (Rio area)
      "Q 127,124 115,136 " +    // Uruguay → Patagonia
      "Q 113,144 112,146 " +    // Tierra del Fuego / Cape Horn
      "Q 108,140 108,120 " +    // Chile Pacific coast
      "Q 110,105 100,90 " +     // Peru / Ecuador
      "L 103,82 Z",             // Colombia return
  },
  {
    // ── Europe ───────────────────────────────────────────────────────────────
    // Portugal SW → N Spain → France/Brittany → Denmark/Jutland →
    // Scandinavia tip → Finland → Russia W → Ukraine / Black Sea →
    // Greece / Turkey area → Sicily / S Italy → French Riviera →
    // E Spain → S Spain → Portugal return
    key: "europe",
    d:
      "M 171,53 L 175,47 " +    // Portugal SW → N Spain
      "Q 178,42 175,40 " +      // France / Brittany
      "Q 186,34 189,32 " +      // North Sea / Denmark
      "Q 204,20 207,20 " +      // Scandinavia tip
      "L 210,28 " +             // Finland / Russia NW
      "Q 210,38 209,44 " +      // Russia W → Ukraine
      "Q 207,50 205,55 " +      // Black Sea → Greece / Aegean
      "Q 197,54 195,52 " +      // Sicily / S Italy area
      "Q 193,46 186,47 " +      // N Italy → French Riviera
      "Q 183,48 175,53 " +      // E Spain → S Spain
      "Q 173,53 171,53 Z",      // S Portugal return
  },
  {
    // ── Africa ───────────────────────────────────────────────────────────────
    // Morocco NW → N Africa coast (individual vertices) → Egypt / Sinai →
    // Somalia horn (Q, accurately placed) → E Africa / Kenya (Q bow east) →
    // Tanzania → Mozambique → SA east coast → Cape (Q smooth) →
    // Namibia → Angola → Congo mouth → Cameroon shoulder →
    // Nigeria → Ghana → Ivory Coast → Liberia → Sierra Leone →
    // Senegal / Dakar (westernmost) → Mauritania → Morocco W return
    key: "africa",
    d:
      "M 174,54 L 180,53 L 191,52 L 203,57 L 212,59 L 215,60 " +
      "Q 223,77 231,78 " +      // Sinai → Somalia horn (horn at lon 51)
      "Q 228,86 220,94 " +      // Horn → Kenya coast (slight eastward bow)
      "L 219,97 L 216,112 L 214,117 " + // Tanzania → Mozambique
      "L 206,124 Q 202,127 199,125 " +  // SA east coast → Cape Agulhas
      "L 195,118 L 193,99 L 192,96 " +  // Namibia → Angola → Congo mouth
      "L 189,86 L 183,84 " +    // Cameroon shoulder → Nigeria (Lagos coast)
      "L 177,85 L 171,85 L 168,84 L 166,80 " + // Ghana → Ivory Coast → Liberia → Sierra Leone
      "L 163,75 L 163,69 L 167,60 Z",   // Senegal (Dakar) → Mauritania → Morocco
  },
  {
    // ── Madagascar ────────────────────────────────────────────────────────────
    key: "madagascar",
    d: "M 230,102 L 230,109 L 227,116 L 224,116 L 224,108 L 225,103 Z",
  },
  {
    // ── Asia (W. Asia + India + E. Asia) ────────────────────────────────────
    // Ukraine / Black Sea → Turkey/Syria → Persian Gulf → India NW →
    // India SW coast (Q south) → India S tip → India E coast (Q north) →
    // SE Asia coast → China coast → Korea / Japan area →
    // Siberia (Bering) → W Siberia → W Russia → Ukraine return
    key: "asia",
    d:
      "M 210,44 " +
      "Q 218,52 230,60 " +      // Turkey / Syria → Persian Gulf
      "Q 238,68 248,68 " +      // Arabian coast → India NW
      "Q 256,82 257,82 " +      // India W coast → S tip (lon 77, lat 8)
      "Q 261,77 272,68 " +      // India E coast → Bangladesh / Myanmar
      "Q 280,75 283,88 " +      // SE Asia (Thailand / Malaysia)
      "Q 295,72 301,58 " +      // China coast
      "L 310,50 L 320,44 " +    // Korea / Japan area
      "L 350,26 " +             // Bering Strait / Chukotka
      "L 330,17 L 300,17 L 248,22 L 218,22 " + // Siberia W
      "L 210,28 " +             // W Russia / Finland border
      "Q 210,38 210,44 Z",      // Ukraine / Black Sea return
  },
  {
    // ── Australia ────────────────────────────────────────────────────────────
    key: "australia",
    d:
      "M 294,112 " +
      "Q 308,102 310,102 " +    // NW → N coast (Darwin area)
      "Q 316,104 325,107 " +    // Gulf of Carpentaria → NE Queensland
      "Q 331,121 327,128 " +    // SE coast (Sydney → Victoria)
      "Q 318,125 305,122 " +    // Great Australian Bight
      "Q 302,124 295,124 " +    // SW coast (Perth area)
      "Q 294,118 294,112 Z",    // WA return
  },
];

// Great-circle arc approximation: Africa center → Washington DC
// Curves northward over West Europe / North Atlantic — the realistic route.
// Start: lon 20, lat 0 → (200, 90)  [Nigeria/Congo region]
// CP1:  lon −5, lat 60 → (175, 30)  [W. Africa / Atlantic edge pulling northward]
// CP2:  lon −52, lat 72 → (128, 18) [Mid-Atlantic, near Greenland edge]
// End:  lon −77, lat 39 → (103, 51) [Washington DC]
const ARC = "M 200,90 C 175,30 128,18 103,51";

// ── Pin definitions ───────────────────────────────────────────────────────────
// cx/cy: pin location in SVG coords
// lx/ly: cue-line endpoint (where the label line terminates)
// tx/ty: text anchor position
// anchor: SVG text-anchor attribute

interface PinDef {
  key: string;
  cx: number;
  cy: number;
  label: string;
  lx: number;
  ly: number;
  tx: number;
  ty: number;
  anchor: "start" | "end" | "middle";
  delay: number;
}

const PINS: PinDef[] = [
  {
    // Lagos, Nigeria — lon 3.4, lat 6.5 → (183, 84)
    // Label placed south of pin, into the Gulf of Guinea (ocean, outside polygon)
    key: "ng",
    cx: 183, cy: 84,
    label: "Lagos, Nigeria",
    lx: 183, ly: 89,
    tx: 183, ty: 92,
    anchor: "middle",
    delay: 1.0,
  },
  {
    // Nairobi, Kenya — lon 36.8, lat −1.3 → (217, 91)
    // Label placed east of pin, into the Indian Ocean (outside polygon at this latitude)
    key: "ke",
    cx: 217, cy: 91,
    label: "Nairobi, Kenya",
    lx: 228, ly: 88,
    tx: 229, ty: 88,
    anchor: "start",
    delay: 1.7,
  },
  {
    // Pretoria, South Africa — lon 28.2, lat −25.7 → (208, 116)
    // Label placed east of pin into the Indian Ocean (past the east coast boundary)
    key: "za",
    cx: 208, cy: 116,
    label: "S. Africa",
    lx: 218, ly: 112,
    tx: 219, ty: 112,
    anchor: "start",
    delay: 2.4,
  },
  {
    // Washington DC — lon −77, lat 38.9 → (103, 51)
    // Label above pin (inland — standard convention for interior cities)
    key: "dc",
    cx: 103, cy: 51,
    label: "Washington, DC",
    lx: 103, ly: 45,
    tx: 103, ty: 44,
    anchor: "middle",
    delay: 3.7,
  },
];

/**
 * GeoFootprint — editorial geography module.
 *
 * Sits directly after EditorialFraming (which already surfaces "Geography:
 * Africa / United States / Global" in the metadata sidebar). This section
 * expands that single metadata line into a presentation-grade visual moment.
 *
 * A simplified SVG world map (equirectangular projection) with four animated
 * pin markers and an arc drawing from Africa to Washington DC — styled as a
 * strategy presentation graphic, not a map widget.
 *
 * Animation sequence (all viewport-triggered, once):
 *   0.3s  — continent polygons fade in
 *   1.0s  — Lagos pin
 *   1.7s  — Nairobi pin
 *   2.4s  — South Africa pin
 *   3.0s  — Atlantic arc draws (pathLength 0 → 1)
 *   3.7s  — Washington DC pin
 *   4.2s  — caption
 */
export default function GeoFootprint() {
  return (
    <section className="border-t border-black/5 bg-[#f5f5f3] px-6 py-12 md:px-16">
      <div className="mx-auto max-w-4xl">

        {/* Section eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-8 flex items-center gap-4"
        >
          <span className="h-px w-6 bg-red-500/50" aria-hidden />
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/38">
            Geographic footprint
          </p>
        </motion.div>

        {/* SVG world map */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.1, duration: 1.0 }}
        >
          <svg
            viewBox="0 0 360 180"
            width="100%"
            preserveAspectRatio="xMidYMid meet"
            aria-label="World map showing Clarity Global's geographic reach: Africa, United States, and global operations"
            role="img"
          >
            {/* Reference graticule — equator + prime meridian */}
            <line
              x1="0" y1="90" x2="360" y2="90"
              stroke="rgba(0,0,0,0.05)"
              strokeWidth="0.4"
              strokeDasharray="1.5 3"
            />
            <line
              x1="180" y1="0" x2="180" y2="180"
              stroke="rgba(0,0,0,0.05)"
              strokeWidth="0.4"
              strokeDasharray="1.5 3"
            />

            {/* Continent polygons — fade in together */}
            {CONTINENTS.map((c) => (
              <motion.path
                key={c.key}
                d={c.d}
                fill="rgba(0,0,0,0.075)"
                stroke="rgba(0,0,0,0.17)"
                strokeWidth="0.55"
                strokeLinejoin="round"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: 0.3, duration: 0.9 }}
              />
            ))}

            {/* Atlantic arc — pathLength draw animation */}
            <motion.path
              d={ARC}
              fill="none"
              stroke="rgb(220,38,38)"
              strokeWidth="0.65"
              strokeOpacity={0.35}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 3.0, duration: 1.05, ease: "easeInOut" }}
            />

            {/* Pin markers — each appears on its own delay */}
            {PINS.map((pin) => (
              <motion.g
                key={pin.key}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: pin.delay, duration: 0.4, ease: EASE }}
              >
                {/* Cue line from pin center to label */}
                <line
                  x1={pin.cx} y1={pin.cy}
                  x2={pin.lx} y2={pin.ly}
                  stroke="rgba(220,38,38,0.55)"
                  strokeWidth="0.4"
                />

                {/* Outer ring — static halo */}
                <circle
                  cx={pin.cx} cy={pin.cy} r={3.5}
                  fill="none"
                  stroke="rgb(220,38,38)"
                  strokeWidth="0.4"
                  strokeOpacity={0.28}
                />

                {/* Filled pin dot */}
                <circle
                  cx={pin.cx} cy={pin.cy} r={1.8}
                  fill="rgb(220,38,38)"
                  fillOpacity={0.9}
                />

                {/* City label */}
                <text
                  x={pin.tx}
                  y={pin.ty}
                  fontSize="3.4"
                  textAnchor={pin.anchor}
                  dominantBaseline="auto"
                  fill="rgba(0,0,0,0.58)"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                  letterSpacing="0.02em"
                >
                  {pin.label}
                </text>
              </motion.g>
            ))}

          </svg>
        </motion.div>

        {/* Footer caption */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 4.2, duration: 0.6 }}
          className="mt-3 text-center text-[9px] font-semibold uppercase tracking-[0.3em] text-black/30"
        >
          Africa · United States · Global
        </motion.p>

      </div>
    </section>
  );
}
