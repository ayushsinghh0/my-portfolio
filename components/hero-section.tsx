"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { CinematicRevealText } from "@/components/ui/cinematic-text";
import { useHydratedReducedMotion } from "@/components/ui/use-hydrated-reduced-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

type HeroSectionProps = {
  chatMode?: boolean;
};

export function HeroSection({ chatMode = false }: HeroSectionProps) {
  const reduceMotion = useHydratedReducedMotion();
  const { scrollY } = useScroll();
  const headingDepthRaw = useTransform(scrollY, [0, 900], [0, 18]);
  const subtitleDepthRaw = useTransform(scrollY, [0, 900], [0, 36]);
  const headingDepth = useSpring(headingDepthRaw, { stiffness: 102, damping: 24, mass: 0.72 });
  const subtitleDepth = useSpring(subtitleDepthRaw, { stiffness: 96, damping: 25, mass: 0.76 });

  return (
    <section id="hero" className={chatMode ? "pt-7 md:pt-9" : "pt-5 md:pt-7"}>
      <div className="mx-auto w-fit max-w-5xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: easeOut }}
          className="font-display whitespace-pre-wrap text-[clamp(3.2rem,8vw,6.2rem)] font-medium leading-[0.9] tracking-[-0.02em]"
          style={{ y: reduceMotion ? 0 : headingDepth }}
        >
          <CinematicRevealText className="inline-block" duration={3.2}>
            Ayush Raj
          </CinematicRevealText>
        </motion.h1>

        <motion.div
          style={{ y: reduceMotion ? 0 : subtitleDepth }}
          className="mt-1 flex items-center justify-center gap-2 text-[clamp(1.05rem,1.35vw,1.6rem)] font-semibold tracking-[-0.01em]"
        >
          {chatMode ? (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.16, ease: easeOut }}
            >
              <CinematicRevealText className="inline-block" delay={0.06} duration={2.8}>
                Software Engineer
              </CinematicRevealText>
            </motion.span>
          ) : (
            <>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.16, ease: easeOut }}
              >
                <CinematicRevealText className="inline-block" delay={0.06} duration={2.75}>
                  Backend
                </CinematicRevealText>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.24, ease: easeOut }}
              >
                <CinematicRevealText className="inline-block" delay={0.08} duration={2.65}>
                  Engineer
                </CinematicRevealText>
              </motion.span>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
