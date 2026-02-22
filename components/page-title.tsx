"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useHydratedReducedMotion } from "@/components/ui/use-hydrated-reduced-motion";
import { CinematicRevealText } from "@/components/ui/cinematic-text";

type PageTitleProps = {
  subtitle?: string;
};

export function PageTitle({ subtitle = "Backend Engineer" }: PageTitleProps) {
  const reduceMotion = useHydratedReducedMotion();
  const { scrollY } = useScroll();
  const headingDepthRaw = useTransform(scrollY, [0, 900], [0, 16]);
  const subtitleDepthRaw = useTransform(scrollY, [0, 900], [0, 34]);
  const headingDepth = useSpring(headingDepthRaw, {
    stiffness: 120,
    damping: 22,
    mass: 0.65,
  });
  const subtitleDepth = useSpring(subtitleDepthRaw, {
    stiffness: 110,
    damping: 24,
    mass: 0.68,
  });

  return (
    <section className="pt-6 text-center md:pt-10">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-3xl font-medium leading-[0.95] tracking-[-0.02em] md:text-5xl lg:text-6xl"
        style={{ y: reduceMotion ? 0 : headingDepth }}
      >
        <CinematicRevealText className="inline-block" duration={2.6}>
          Ayush Raj
        </CinematicRevealText>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
        className="mt-2 text-base font-semibold tracking-[-0.008em]text-foreground md:text-[1.1rem]"
        style={{ y: reduceMotion ? 0 : subtitleDepth }}
      >
        <CinematicRevealText
          className="inline-block"
          delay={0.08}
          duration={2.4}
        >
          {subtitle}
        </CinematicRevealText>
      </motion.p>
    </section>
  );
}
