"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  FiActivity,
  FiCpu,
  FiGitBranch,
  FiLayers,
  FiTarget,
  FiZap,
} from "react-icons/fi";
import { CinematicRevealText } from "@/components/ui/cinematic-text";
import { useHydratedReducedMotion } from "@/components/ui/use-hydrated-reduced-motion";

const creativityBlocks = [
  {
    icon: FiCpu,
    title: "Systems-First Thinking",
    detail:
      "Designed event-driven microservice flows with Kafka, secure auth boundaries, and measurable API performance gains.",
  },
  {
    icon: FiLayers,
    title: "End-to-End Product Shipping",
    detail:
      "Built full-stack features from architecture to UI polish, including resilient backend APIs and production-like deployment setup.",
  },
  {
    icon: FiGitBranch,
    title: "Engineering Discipline",
    detail:
      "Worked with typed contracts, clean Git practices, and modular services to keep code scalable and maintainable as projects grow.",
  },
  {
    icon: FiActivity,
    title: "Realtime Problem Solving",
    detail:
      "Implemented low-latency collaboration patterns with WebSockets and conflict-aware interaction models for fluid UX.",
  },
];

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headingDepthRaw = useTransform(scrollYProgress, [0, 1], [-7, 7]);
  const bodyDepthRaw = useTransform(scrollYProgress, [0, 1], [-16, 16]);
  const headingDepth = useSpring(headingDepthRaw, { stiffness: 108, damping: 24, mass: 0.72 });
  const bodyDepth = useSpring(bodyDepthRaw, { stiffness: 94, damping: 26, mass: 0.8 });

  return (
    <section id="experience" ref={sectionRef} className="pt-7 md:pt-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-5xl"
      >
        <motion.h2 style={{ y: reduceMotion ? 0 : headingDepth }} className="font-edgy text-3xl sm:text-4xl">
          <CinematicRevealText className="inline-block" duration={2.8}>
            Experience
          </CinematicRevealText>
        </motion.h2>
        <motion.p
          style={{ y: reduceMotion ? 0 : bodyDepth }}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 1.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mt-3 max-w-3xl text-[clamp(0.95rem,1.02vw,1.08rem)] leading-relaxed text-[var(--muted-foreground)]"
        >
          No formal industry experience yet, but strong execution in real project environments. As a fresher, I focus
          on building systems that feel production-ready, measurable, and useful.
        </motion.p>
      </motion.div>

      <div className="mx-auto mt-6 grid max-w-5xl gap-3.5 md:grid-cols-2">
        {creativityBlocks.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.2, delay: index * 0.11, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            data-premium
            data-premium-variant="card"
            data-premium-strength="0.08"
            className="panel-strong rounded-2xl p-4"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--panel-border)] text-[var(--foreground)]">
              <item.icon className="h-5 w-5" />
            </span>
            <h3 data-premium-text className="font-edgy mt-3.5 text-lg text-[var(--foreground)]">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-[0.95rem]">{item.detail}</p>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.2, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        data-premium
        data-premium-variant="card"
        data-premium-strength="0.07"
        className="panel mx-auto mt-4.5 flex max-w-5xl flex-wrap items-center gap-3 rounded-2xl px-4 py-3.5"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--panel-border)]">
          <FiTarget className="h-5 w-5" />
        </span>
        <p className="flex-1 text-sm text-[var(--foreground)] sm:text-base">
          Current goal: convert project depth into first high-impact professional role by delivering engineering quality
          above fresher expectations.
        </p>
        <span className="inline-flex items-center gap-2 rounded-full border border-[var(--panel-border)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted-foreground)]">
          <FiZap className="h-3.5 w-3.5" />
          Fresher Mode
        </span>
      </motion.div>
    </section>
  );
}
