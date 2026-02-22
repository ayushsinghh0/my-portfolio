"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import type { CSSProperties } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { FiExternalLink, FiGithub, FiShield } from "react-icons/fi";
import type { Project } from "@/data/portfolio";
import { useHydratedReducedMotion } from "@/components/ui/use-hydrated-reduced-motion";

type ProjectCardProps = {
  project: Project;
  index: number;
};

const gradients = [
  "linear-gradient(135deg, #dca11f 0%, #efc459 45%, #e2a92d 100%)",
  "linear-gradient(135deg, #6e29da 0%, #a45ef1 48%, #7530de 100%)",
  "linear-gradient(135deg, #0e9268 0%, #4fb888 52%, #118d65 100%)",
];

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const reduceMotion = useHydratedReducedMotion();
  const gradient = gradients[index % gradients.length];
  const stickyTop = "calc(5.9rem + env(safe-area-inset-top))";
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const rotateX = useSpring(tiltX, { stiffness: 132, damping: 28, mass: 0.68 });
  const rotateY = useSpring(tiltY, { stiffness: 132, damping: 28, mass: 0.68 });
  const glow = useMotionTemplate`radial-gradient(460px circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.32), rgba(255,255,255,0.1) 22%, transparent 58%)`;
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const scrollScale = useTransform(scrollYProgress, [0, 0.2, 0.58, 0.86, 1], [0.95, 0.985, 1, 0.985, 0.95]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.14, 0.84, 1], [0.44, 1, 1, 0.42]);
  const scrollY = useTransform(scrollYProgress, [0, 0.34, 0.68, 1], [40, 6, 0, -34]);
  const scrollBlur = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [8, 0, 0, 7]);
  const blurFilter = useMotionTemplate`blur(${scrollBlur}px)`;
  const compactDescription =
    project.description.length > 165 ? `${project.description.slice(0, 162).trimEnd()}...` : project.description;

  const openCaseStudy = () => {
    router.push(`/projects/${project.slug}`);
  };

  const handleCardClick = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.closest("a,button")) return;
    openCaseStudy();
  };

  const handleCardKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openCaseStudy();
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = ((event.clientX - rect.left) / rect.width) * 100;
    const py = ((event.clientY - rect.top) / rect.height) * 100;
    glowX.set(px);
    glowY.set(py);

    const maxTilt = 4.8;
    tiltY.set(((px - 50) / 50) * maxTilt);
    tiltX.set(((50 - py) / 50) * maxTilt);
  };

  const handlePointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      whileHover={reduceMotion ? { y: -2 } : { y: -6, scale: 1.01 }}
      whileTap={reduceMotion ? undefined : { scale: 0.997 }}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      role="link"
      tabIndex={0}
      aria-label={`Open ${project.title} case study`}
      data-premium
      data-premium-variant="card"
      data-premium-transform="off"
      data-premium-strength="0.06"
      data-premium-zoom="0.03"
      className="group grain relative sticky cursor-pointer overflow-hidden rounded-[1.35rem] border border-black/20 p-3.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 sm:p-4"
      style={{
        background: gradient,
        top: stickyTop,
        zIndex: index + 3,
        scale: reduceMotion ? 1 : scrollScale,
        y: reduceMotion ? 0 : scrollY,
        opacity: reduceMotion ? 1 : scrollOpacity,
        filter: reduceMotion ? "none" : blurFilter,
        rotateX: reduceMotion ? 0 : rotateX,
        rotateY: reduceMotion ? 0 : rotateY,
        transformPerspective: 1200,
      }}
    >
      <div className="project-sheen pointer-events-none absolute inset-0 opacity-85" />
      {!reduceMotion ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glow }}
        />
      ) : null}
      {!reduceMotion ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/14 blur-2xl"
          animate={{ x: [0, -10, 8, 0], y: [0, 12, -8, 0], opacity: [0.12, 0.2, 0.14, 0.12] }}
          transition={{ duration: 12.8 + index * 1.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      ) : null}

      <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center">
        <motion.div
          className="relative shrink-0 overflow-hidden rounded-[1.15rem] border border-black/20 bg-black/25 shadow-[0_12px_24px_rgba(0,0,0,0.22)]"
          animate={reduceMotion ? undefined : { y: [0, -3, 0] }}
          transition={{
            duration: 5.8 + index * 0.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {project.logoPath ? (
            <div className="relative h-[5.7rem] w-[5.7rem] sm:h-[6.85rem] sm:w-[6.85rem]">
              <Image src={project.logoPath} alt={`${project.title} logo`} fill className="object-cover" />
            </div>
          ) : (
            <>
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="h-[5.7rem] w-[5.7rem] object-cover sm:h-[6.85rem] sm:w-[6.85rem]"
              >
                <source src={project.videoPath} type="video/mp4" />
              </video>
              <div className="absolute bottom-1.5 left-1.5 rounded bg-black/45 px-1.5 py-0.5 text-[9px] font-medium text-white/90">
                {project.videoPath}
              </div>
            </>
          )}
        </motion.div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <motion.h3
              data-premium-text
              className="text-balance text-[1.38rem] font-semibold leading-[1.08] tracking-[-0.018em] text-white sm:text-[1.85rem]"
              whileHover={reduceMotion ? undefined : { x: 1.5 }}
            >
              {project.title}
            </motion.h3>
            {project.hasShield ? (
              <motion.span
                className="inline-flex items-center gap-1 rounded-full border border-white/35 bg-black/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-white"
                animate={reduceMotion ? undefined : { y: [0, -2, 0] }}
                transition={{ duration: 4.9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <FiShield className="h-3 w-3" />
                Shielded Auth
              </motion.span>
            ) : null}
          </div>
          <p className="mt-1.5 text-[0.93rem] leading-[1.45] text-white/92 sm:text-[0.99rem]">{compactDescription}</p>

          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {project.tech.map((item, techIndex) => (
              <motion.span
                key={item}
                whileHover={reduceMotion ? undefined : { y: -2, scale: 1.05 }}
                style={
                  reduceMotion
                    ? undefined
                    : ({
                        "--delay": `${techIndex * 0.09}s`,
                      } as CSSProperties)
                }
                className="float-badge rounded-full border border-white/35 bg-black/18 px-2.5 py-1 text-[11px] font-semibold text-white sm:text-xs"
              >
                {item}
              </motion.span>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={reduceMotion ? undefined : { y: -1, scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              data-premium
              data-premium-variant="button"
              data-premium-strength="0.09"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-black/18 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-black/30 sm:px-3 sm:text-sm"
            >
              <FiGithub className="h-4 w-4" />
              <span data-premium-text>GitHub</span>
            </motion.a>
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={reduceMotion ? undefined : { y: -1, scale: 1.03 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              data-premium
              data-premium-variant="button"
              data-premium-strength="0.09"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/35 bg-black/18 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-black/30 sm:px-3 sm:text-sm"
            >
              <FiExternalLink className="h-4 w-4" />
              <span data-premium-text>Live Demo</span>
            </motion.a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
