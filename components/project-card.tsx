"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FiPlus } from "react-icons/fi";
import type { Project } from "@/data/portfolio";
import { useHydratedReducedMotion } from "@/components/ui/use-hydrated-reduced-motion";

type ProjectCardProps =
  | {
      variant?: "project";
      project: Project;
      index: number;
    }
  | {
      variant: "contact";
      index: number;
      project?: never;
    };

const projectGradients = [
  "linear-gradient(135deg, #edb23c 0%, #f1c96a 42%, #dfa129 100%)",
  "linear-gradient(135deg, #8f42e6 0%, #b57bf4 45%, #812fdd 100%)",
  "linear-gradient(135deg, #26a97a 0%, #59bf95 50%, #0f9a6c 100%)",
  "linear-gradient(135deg, #e1464f 0%, #f06a70 46%, #d71f29 100%)",
];

const projectThumbSurfaces = [
  "rgba(0, 0, 0, 0.34)",
  "rgba(67, 39, 122, 0.38)",
  "rgba(233, 246, 238, 0.9)",
  "rgba(140, 28, 39, 0.36)",
];

const contactGradient = "linear-gradient(135deg, #4162d8 0%, #7f99f3 46%, #294bd0 100%)";

function summarizeDescription(description: string) {
  const firstSentence = description.split(".")[0]?.trim();
  if (firstSentence && firstSentence.length >= 58) {
    return `${firstSentence}.`;
  }

  return description.length > 118 ? `${description.slice(0, 115).trimEnd()}...` : description;
}

export function ProjectCard(props: ProjectCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const router = useRouter();
  const reduceMotion = useHydratedReducedMotion();
  const isContactCard = props.variant === "contact";
  const project = isContactCard ? null : props.project;
  const { index } = props;
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 88%", "end 20%"],
  });
  const depthYRaw = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [30, 0, 0, -16]);
  const opacityRaw = useTransform(scrollYProgress, [0, 0.14, 1], [0.5, 1, 1]);
  const scaleRaw = useTransform(scrollYProgress, [0, 0.2, 0.84, 1], [0.965, 1, 1, 0.99]);
  const depthY = useSpring(depthYRaw, { stiffness: 130, damping: 28, mass: 0.72 });
  const opacity = useSpring(opacityRaw, { stiffness: 130, damping: 30, mass: 0.76 });
  const scale = useSpring(scaleRaw, { stiffness: 130, damping: 30, mass: 0.76 });

  const stickyTop = `calc(clamp(5.9rem, 27vh, 16.9rem) + ${index * 4}px + env(safe-area-inset-top))`;
  const gradient = isContactCard ? contactGradient : projectGradients[index % projectGradients.length];
  const thumbSurface = isContactCard
    ? "rgba(183, 201, 255, 0.38)"
    : projectThumbSurfaces[index % projectThumbSurfaces.length];
  const cardTitle = isContactCard ? "New Project" : project?.cardTitle ?? project?.title ?? "Project";
  const cardDescription = isContactCard
    ? "I'm always exploring new ideas."
    : project?.stackDescription ?? summarizeDescription(project?.description ?? "");
  const destination = isContactCard ? "/contact" : `/projects/${project?.slug}`;

  const openDestination = () => {
    router.push(destination);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openDestination();
  };

  return (
    <motion.article
      ref={cardRef}
      role="link"
      tabIndex={0}
      onClick={openDestination}
      onKeyDown={handleKeyDown}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      className="group grain relative sticky h-[15.9rem] cursor-pointer overflow-hidden rounded-[1.45rem] border border-white/18 px-4 py-5 text-white shadow-[0_18px_44px_rgba(0,0,0,0.42)] outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:h-[16.95rem] sm:px-6 sm:py-6"
      style={{
        top: stickyTop,
        zIndex: index + 20,
        background: gradient,
        y: reduceMotion ? 0 : depthY,
        opacity: reduceMotion ? 1 : opacity,
        scale: reduceMotion ? 1 : scale,
      }}
      aria-label={isContactCard ? "Open contact page" : `Open ${cardTitle} project`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.08)_42%,transparent_72%)] opacity-75" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(128deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0.02)_34%,rgba(0,0,0,0.14)_100%)]" />

      <div className="relative flex h-full items-center gap-3.5 sm:gap-5">
        <div
          className="relative flex h-[5.8rem] w-[5.8rem] shrink-0 items-center justify-center overflow-hidden rounded-[1.1rem] border border-white/28 shadow-[0_12px_22px_rgba(0,0,0,0.28)] sm:h-[6.95rem] sm:w-[6.95rem]"
          style={{ backgroundColor: thumbSurface }}
        >
          {isContactCard ? (
            <FiPlus className="h-10 w-10 text-slate-300 sm:h-12 sm:w-12" />
          ) : project?.logoPath ? (
            <Image src={project.logoPath} alt={`${cardTitle} logo`} fill className="object-cover" />
          ) : (
            <span className="text-[2rem] font-semibold uppercase text-white/90">{cardTitle.charAt(0)}</span>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="text-balance text-[clamp(1.8rem,2.6vw,3rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-white">
            {cardTitle}
          </h3>
          <p className="mt-2 max-w-[33rem] text-pretty text-[clamp(0.98rem,1.08vw,1.6rem)] leading-[1.35] text-white/94">
            {cardDescription}
          </p>
          {isContactCard ? (
            <p className="mt-4 text-[clamp(1.05rem,1.12vw,1.35rem)] font-medium text-white/95">Let&apos;s connect</p>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
