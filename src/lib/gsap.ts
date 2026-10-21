"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, ScrambleTextPlugin, useGSAP);
}

/** Seconds the hero waits so its intro plays as the loader lifts. */
export const INTRO_DELAY = 1.35;

/** Glyph set for the "decoding" text effect. */
export const SCRAMBLE_CHARS = "01<>/\_#$%&*+=ABCDEFXYZ";

export { gsap, ScrollTrigger, SplitText, useGSAP };
