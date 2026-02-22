"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { projects } from "@/data/portfolio";
import { ProjectCard } from "./project-card";
import { CinematicRevealText } from "@/components/ui/cinematic-text";
import { useHydratedReducedMotion } from "@/components/ui/use-hydrated-reduced-motion";

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headingDepthRaw = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const subtitleDepthRaw = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const headingDepth = useSpring(headingDepthRaw, { stiffness: 112, damping: 24, mass: 0.72 });
  const subtitleDepth = useSpring(subtitleDepthRaw, { stiffness: 96, damping: 26, mass: 0.8 });

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-visible pt-8 md:pt-10">
      {!reduceMotion ? (
        <>
          <motion.div
            aria-hidden
            className="project-orb pointer-events-none absolute -left-16 top-20 h-56 w-56 rounded-full bg-amber-200/10 blur-3xl"
            animate={{ x: [0, 28, -12, 0], y: [0, -22, 10, 0], opacity: [0.12, 0.26, 0.18, 0.12] }}
            transition={{ duration: 32, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="project-orb pointer-events-none absolute -right-12 top-40 h-64 w-64 rounded-full bg-violet-300/10 blur-3xl"
            animate={{ x: [0, -24, 14, 0], y: [0, 18, -10, 0], opacity: [0.1, 0.2, 0.14, 0.1] }}
            transition={{ duration: 38, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
          />
        </>
      ) : null}

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mb-7 max-w-4xl text-center"
      >
        <motion.h2
          style={{ y: reduceMotion ? 0 : headingDepth }}
          className="font-edgy text-[clamp(2.7rem,4.8vw,4.6rem)] leading-[0.94] tracking-[-0.018em]"
        >
          <CinematicRevealText className="inline-block" duration={3}>
            Projects
          </CinematicRevealText>
        </motion.h2>
        <motion.p
          style={{ y: reduceMotion ? 0 : subtitleDepth }}
          className="mt-2.5 text-sm text-[var(--muted-foreground)] sm:text-base"
        >
          <CinematicRevealText className="inline-block" delay={0.12} duration={2.5} staggerWords={false}>
            Distributed systems, secure infrastructure, and realtime collaboration tools.
          </CinematicRevealText>
        </motion.p>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{ duration: 1.55, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-3 h-px w-32 origin-left rounded-full bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent"
        />
      </motion.div>

      <div className="mx-auto max-w-5xl pb-24">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 32, filter: reduceMotion ? "blur(0px)" : "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 1.1, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[56vh] min-h-[20rem] sm:h-[60vh] sm:min-h-[22rem] lg:h-[68vh] lg:min-h-[24rem]"
            style={{ zIndex: index + 2 }}
          >
            <ProjectCard project={project} index={index} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
