"use client";

import { motion, useScroll, useTransform } from "motion/react";
import type { RefObject } from "react";

const R = 22;
const CIRC = 2 * Math.PI * R;

interface CircularProgressProps {
  /** Container de scroll (mobile). Sem ele, usa o scroll da janela (desktop). */
  containerRef?: RefObject<HTMLElement | null>;
}

/** Anel de progresso do scroll — fixo, acompanha a página inteira. */
export default function CircularProgress({
  containerRef,
}: CircularProgressProps) {
  const { scrollYProgress } = useScroll(
    containerRef ? { container: containerRef } : undefined,
  );
  const dashoffset = useTransform(scrollYProgress, [0, 1], [CIRC, 0]);

  return (
    <svg width="56" height="56" viewBox="0 0 56 56" className="-rotate-90">
      <circle
        cx="28"
        cy="28"
        r={R}
        fill="none"
        stroke="var(--color-muted)"
        strokeOpacity="0.35"
        strokeWidth="2"
      />
      <motion.circle
        cx="28"
        cy="28"
        r={R}
        fill="none"
        stroke="var(--color-white)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={CIRC}
        style={{ strokeDashoffset: dashoffset }}
      />
    </svg>
  );
}
