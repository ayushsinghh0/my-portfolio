"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useHydratedReducedMotion } from "@/components/ui/use-hydrated-reduced-motion";

type CinematicRevealTextProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  staggerWords?: boolean;
};

export function CinematicRevealText({
  children,
  className,
  delay = 0,
  duration = 2.8,
  once = true,
  staggerWords = false,
}: CinematicRevealTextProps) {
  const reduceMotion = useHydratedReducedMotion();
  const childText = typeof children === "string" ? children : null;
  const words = childText ? childText.split(" ") : null;
  const staggerWordsList = words ?? [];
  const canStagger = Boolean(words && words.length > 1 && staggerWords);

  return (
    <motion.span
      initial={
        reduceMotion
          ? { opacity: 1, y: 0 }
          : {
              opacity: 1,
              filter: "blur(0.9px)",
              y: 2,
              backgroundPosition: "140% 50%",
            }
      }
      whileInView={
        reduceMotion
          ? { opacity: 1, y: 0 }
          : {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              backgroundPosition: "0% 50%",
            }
      }
      viewport={{ once, amount: 0.18 }}
      transition={{
        duration: reduceMotion ? 0.01 : duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`cinematic-text-root ${className ?? ""}`.trim()}
      style={
        reduceMotion
          ? undefined
          : {
              backgroundImage:
                "linear-gradient(108deg, color-mix(in oklab, var(--foreground) 28%, transparent) 0%, var(--foreground) 32%, color-mix(in oklab, white 62%, var(--foreground) 38%) 52%, var(--foreground) 72%, color-mix(in oklab, var(--foreground) 18%, transparent) 100%)",
              backgroundSize: "320% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "var(--foreground)",
              willChange: "background-position, filter, opacity, transform",
            }
      }
    >
      {!reduceMotion && canStagger ? (
        <span className="cinematic-text-stagger" aria-label={childText ?? undefined}>
          {staggerWordsList.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ opacity: 1, y: 3, filter: "blur(1px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once, amount: 0.24 }}
              transition={{
                duration: Math.max(1.05, duration * 0.62),
                delay: delay + 0.05 + index * 0.07,
                ease: [0.2, 1, 0.3, 1],
              }}
              className="cinematic-word"
            >
              {word}
              {index < staggerWordsList.length - 1 ? "\u00A0" : ""}
            </motion.span>
          ))}
        </span>
      ) : (
        children
      )}

      {!reduceMotion ? (
        <motion.span
          aria-hidden
          initial={{ opacity: 0, x: "-135%" }}
          whileInView={{ opacity: [0, 0.88, 0], x: "140%" }}
          viewport={{ once, amount: 0.2 }}
          transition={{
            duration: Math.max(1.6, duration * 0.85),
            delay: delay + 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="cinematic-text-light"
        >
          {children}
        </motion.span>
      ) : null}
    </motion.span>
  );
}
