"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { achievements, skillGroups } from "@/data/portfolio";
import {
  BoxHighlight,
  MarkerHighlight,
  UnderlineHighlight,
} from "@/components/ui/animated-highlight";
import { CinematicRevealText } from "@/components/ui/cinematic-text";
import { useHydratedReducedMotion } from "@/components/ui/use-hydrated-reduced-motion";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headingDepthRaw = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const bodyDepthRaw = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const headingDepth = useSpring(headingDepthRaw, {
    stiffness: 108,
    damping: 24,
    mass: 0.72,
  });
  const bodyDepth = useSpring(bodyDepthRaw, {
    stiffness: 92,
    damping: 26,
    mass: 0.8,
  });

  return (
    <section id="about" ref={sectionRef} className="pt-13 md:pt-15">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-[48rem]"
      >
        <motion.h2
          style={{ y: reduceMotion ? 0 : headingDepth }}
          className="text-[clamp(2.2rem,2.85vw,3.05rem)] font-semibold leading-[1.08] tracking-[-0.014em]"
        >
          <CinematicRevealText className="inline-block" duration={2.8}>
            About Me
          </CinematicRevealText>
        </motion.h2>

        <motion.div
          style={{ y: reduceMotion ? 0 : bodyDepth }}
          className="mt-6 space-y-4.5 text-[clamp(1rem,1.04vw,1.18rem)] leading-[1.44] tracking-[-0.006em]text-foreground"
        >
          <motion.p
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1.5,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            I am Ayush Raj, a software engineer based in Noida, Uttar Pradesh,
            India with a passion for building resilient backend systems and
            scalable products.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1.5,
              delay: 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            I enjoy designing{" "}
            <UnderlineHighlight>distributed architectures</UnderlineHighlight>,
            optimizing API performance, and shipping features that improve real
            user workflows.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1.5,
              delay: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            I built <BoxHighlight>WorkWizard</BoxHighlight> and improved query
            performance to deliver{" "}
            <MarkerHighlight>about 35% faster API responses</MarkerHighlight>.
          </motion.p>
        </motion.div>

        <div className="mt-9">
          <h3 className="text-[clamp(2.2rem,2.85vw,3.05rem)] font-semibold leading-[1.08] tracking-[-0.014em]">
            <CinematicRevealText
              className="inline-block"
              delay={0.06}
              duration={2.6}
            >
              The Specs
            </CinematicRevealText>
          </h3>
          <motion.ul
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1.35,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-3.5 list-disc space-y-1.5 pl-6 text-[clamp(0.99rem,0.95vw,1.1rem)] leading-[1.5] tracking-[-0.004em]text-foreground"
          >
            <li>
              <span className="text-[var(--foreground)]">Location:</span> Noida,
              Uttar Pradesh, India
            </li>
            <li>
              <span className="text-[var(--foreground)]">Education:</span>{" "}
              B.Tech Computer Science - Jaypee Institute of Information
              Technology (2022-2026)
            </li>
            <li>
              <span className="text-[var(--foreground)]">Core Focus:</span>{" "}
              Backend engineering, microservices, system design, and full stack
              delivery
            </li>
          </motion.ul>
        </div>

        <div className="mt-9">
          <h3 className="text-[clamp(2.2rem,2.85vw,3.05rem)] font-semibold leading-[1.08] tracking-[-0.014em]">
            <CinematicRevealText
              className="inline-block"
              delay={0.06}
              duration={2.6}
            >
              Tech Stack
            </CinematicRevealText>
          </h3>
          <motion.ul
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1.35,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-3.5 list-disc space-y-1.5 pl-6 text-[clamp(0.99rem,0.95vw,1.1rem)] leading-[1.5] tracking-[-0.004em]text-foreground"
          >
            {skillGroups.map((group) => (
              <li key={group.title}>
                <span className="font-semiboldtext-foreground">
                  {group.title}:
                </span>{" "}
                {group.skills.join(", ")}
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="mt-9">
          <h3 className="text-[clamp(2.2rem,2.85vw,3.05rem)] font-semibold leading-[1.08] tracking-[-0.014em]">
            <CinematicRevealText
              className="inline-block"
              delay={0.06}
              duration={2.6}
            >
              Achievements
            </CinematicRevealText>
          </h3>
          <motion.ul
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1.35,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-3.5 list-disc space-y-1.5 pl-6 text-[clamp(0.99rem,0.95vw,1.1rem)] leading-[1.5] tracking-[-0.004em]text-foreground"
          >
            {achievements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </section>
  );
}
