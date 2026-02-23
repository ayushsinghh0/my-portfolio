"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useHydratedReducedMotion } from "@/components/ui/use-hydrated-reduced-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;
const rotatingRoles = ["Software Engineer", "Full Stack Engineer", "Backend Developer"] as const;
const headingText = "Ayush Raj";

type HeroSectionProps = {
  chatMode?: boolean;
};

export function HeroSection({ chatMode = false }: HeroSectionProps) {
  const reduceMotion = useHydratedReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const { scrollY } = useScroll();
  const headingDepthRaw = useTransform(scrollY, [0, 900], [0, 18]);
  const subtitleDepthRaw = useTransform(scrollY, [0, 900], [0, 36]);
  const headingDepth = useSpring(headingDepthRaw, { stiffness: 102, damping: 24, mass: 0.72 });
  const subtitleDepth = useSpring(subtitleDepthRaw, { stiffness: 96, damping: 25, mass: 0.76 });

  useEffect(() => {
    if (chatMode) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % rotatingRoles.length);
    }, 3000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [chatMode]);

  const displayedRole = rotatingRoles[chatMode ? 0 : roleIndex];
  const roleTransitionDuration = reduceMotion ? 0.25 : 0.78;

  return (
    <section id="hero" className={chatMode ? "pt-7 md:pt-9" : "pt-5 md:pt-7"}>
      <div className="mx-auto w-fit max-w-5xl text-center">
        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: easeOut }}
          className="font-display whitespace-pre-wrap text-[clamp(3.2rem,8vw,6.2rem)] font-medium leading-[0.9] tracking-[-0.02em]"
          style={{ y: reduceMotion ? 0 : headingDepth }}
        >
          <span className="inline-flex flex-wrap justify-center">
            {Array.from(headingText).map((char, index) => (
              <motion.span
                key={`hero-char-${char}-${index}`}
                initial={{ opacity: 0, y: 9, filter: "blur(9px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 1.02,
                  delay: 0.12 + index * 0.085,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={char === " " ? "mx-[0.08em]" : undefined}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.div
          style={{ y: reduceMotion ? 0 : subtitleDepth }}
          className="mt-1.5 flex items-center justify-center text-[clamp(1.02rem,1.2vw,1.4rem)]"
        >
          <AnimatePresence mode="wait" initial={!reduceMotion}>
            <motion.span
              key={displayedRole}
              initial={reduceMotion ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 12, filter: "blur(5px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduceMotion ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: roleTransitionDuration, ease: easeOut }}
              className="relative inline-block whitespace-nowrap text-[0.95rem] font-semibold tracking-[0.02em] text-[color-mix(in_oklab,white_88%,#94a3b8_12%)] sm:text-[1.05rem]"
            >
              <motion.span
                aria-hidden
                initial={false}
                animate={reduceMotion ? undefined : { opacity: [0.06, 0.18, 0.06], x: [-8, 8, -8] }}
                transition={reduceMotion ? undefined : { duration: 2.8, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
                className="pointer-events-none absolute -inset-x-6 -inset-y-2 bg-[radial-gradient(ellipse_at_center,rgba(148,163,184,0.18)_0%,transparent_62%)] blur-md"
              />
              <span className="relative z-10">{displayedRole}</span>
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
