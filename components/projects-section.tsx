"use client";

import { type CSSProperties, useRef } from "react";
import { motion } from "framer-motion";
import { projects } from "@/data/portfolio";
import { PageTitle } from "@/components/page-title";
import { ProjectCard } from "./project-card";
import { useHydratedReducedMotion } from "@/components/ui/use-hydrated-reduced-motion";

type StackItem =
  | {
      type: "project";
      key: string;
      project: (typeof projects)[number];
    }
  | {
      type: "contact";
      key: "new-project-contact";
    };

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useHydratedReducedMotion();
  const stackItems: StackItem[] = [
    ...projects.map((project) => ({
      type: "project" as const,
      key: project.slug,
      project,
    })),
    { type: "contact", key: "new-project-contact" },
  ];

  return (
    <section id="projects" ref={sectionRef} className="relative overflow-visible pt-4 md:pt-6">
      <PageTitle subtitle="Software Engineer" />

      {!reduceMotion ? (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-10 top-40 h-56 w-56 rounded-full bg-amber-200/8 blur-3xl"
            animate={{ x: [0, 18, -8, 0], y: [0, -16, 6, 0], opacity: [0.08, 0.18, 0.11, 0.08] }}
            transition={{ duration: 28, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute right-0 top-60 h-72 w-72 rounded-full bg-blue-300/10 blur-3xl"
            animate={{ x: [0, -24, 10, 0], y: [0, 14, -8, 0], opacity: [0.08, 0.16, 0.1, 0.08] }}
            transition={{ duration: 32, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.55 }}
          />
        </>
      ) : null}

      <div className="mx-auto mt-5 w-full max-w-[46rem] space-y-4 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:mt-7 sm:space-y-5 sm:pb-[calc(7rem+env(safe-area-inset-bottom))] md:mt-9 md:space-y-0 md:pb-[calc(12rem+env(safe-area-inset-bottom))]">
        {stackItems.map((item, index) => (
          <div
            key={item.key}
            className="relative h-[15.5rem] sm:h-[16.5rem] md:sticky md:top-[calc(9.75rem+env(safe-area-inset-top))] md:h-[min(72vh,32rem)]"
          >
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: Math.min(index * 0.08, 0.36), ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full origin-top md:h-[15.9rem] md:top-[var(--stack-offset)] lg:h-[16.95rem]"
              style={{
                "--stack-offset": `${Math.min(index * 4, 12)}%`,
                zIndex: index + 10,
              } as CSSProperties}
            >
              {item.type === "project" ? (
                <ProjectCard project={item.project} index={index} />
              ) : (
                <ProjectCard variant="contact" index={index} />
              )}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
