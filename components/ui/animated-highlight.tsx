"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

const HIGHLIGHT_EASE = [0.22, 1, 0.36, 1] as const;
const HIGHLIGHT_DURATION = 7.2;
const HIGHLIGHT_STROKE_OFFSET = 0.28;
const VIEWPORT = { once: true, amount: 0.24 } as const;

type HighlightProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function UnderlineHighlight({ children, delay = 0.24, className }: HighlightProps) {
  return (
    <span className={joinClassNames("hl-root", className)}>
      <span className="relative z-10">{children}</span>
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: HIGHLIGHT_DURATION, delay, ease: HIGHLIGHT_EASE }}
        className="hl-layer hl-underline-a"
      />
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.8 }}
        viewport={VIEWPORT}
        transition={{ duration: HIGHLIGHT_DURATION, delay: delay + HIGHLIGHT_STROKE_OFFSET, ease: HIGHLIGHT_EASE }}
        className="hl-layer hl-underline-b"
      />
    </span>
  );
}

export function MarkerHighlight({ children, delay = 0.24, className }: HighlightProps) {
  return (
    <span className={joinClassNames("hl-root", className)}>
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: HIGHLIGHT_DURATION, delay, ease: HIGHLIGHT_EASE }}
        className="hl-layer hl-marker-fill"
      />
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.35 }}
        viewport={VIEWPORT}
        transition={{ duration: HIGHLIGHT_DURATION, delay: delay + HIGHLIGHT_STROKE_OFFSET, ease: HIGHLIGHT_EASE }}
        className="hl-layer hl-marker-grain"
      />
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.85 }}
        viewport={VIEWPORT}
        transition={{
          duration: HIGHLIGHT_DURATION,
          delay: delay + HIGHLIGHT_STROKE_OFFSET * 2,
          ease: HIGHLIGHT_EASE,
        }}
        className="hl-layer hl-marker-stroke"
      />
      <span className="hl-marker-text">{children}</span>
    </span>
  );
}

export function BoxHighlight({ children, delay = 0.24, className }: HighlightProps) {
  return (
    <span className={joinClassNames("hl-root", className)}>
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: HIGHLIGHT_DURATION, delay, ease: HIGHLIGHT_EASE }}
        className="hl-layer hl-box-a"
      />
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.82 }}
        viewport={VIEWPORT}
        transition={{ duration: HIGHLIGHT_DURATION, delay: delay + HIGHLIGHT_STROKE_OFFSET, ease: HIGHLIGHT_EASE }}
        className="hl-layer hl-box-b"
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
}
