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

type CardTheme = {
  background: string;
  textColor: string;
  descriptionColor: string;
  borderColor: string;
  thumbSurface: string;
  thumbBorderColor: string;
  iconColor: string;
};

const shellShadow =
  "rgba(34, 42, 53, 0.12) 0px 10px 32px, rgba(0, 0, 0, 0.05) 0px 1px 1px, rgba(34, 42, 53, 0.05) 0px 0px 0px 1px, rgba(34, 42, 53, 0.08) 0px 4px 6px, rgba(47, 48, 55, 0.1) 0px 24px 108px";

const projectThemes: CardTheme[] = [
  {
    background: "linear-gradient(135deg, #ca8a04 0%, #eab308 54%, #ca8a04 100%)",
    textColor: "#111827",
    descriptionColor: "rgba(17, 24, 39, 0.9)",
    borderColor: "rgba(109, 76, 8, 0.38)",
    thumbSurface: "rgba(15, 23, 42, 0.92)",
    thumbBorderColor: "rgba(249, 230, 171, 0.62)",
    iconColor: "rgba(17, 24, 39, 0.9)",
  },
  {
    background: "linear-gradient(135deg, #6b21a8 0%, #7e22ce 52%, #5b1f94 100%)",
    textColor: "#ffffff",
    descriptionColor: "rgba(255, 255, 255, 0.93)",
    borderColor: "rgba(238, 225, 255, 0.3)",
    thumbSurface: "rgba(102, 66, 176, 0.46)",
    thumbBorderColor: "rgba(239, 230, 255, 0.5)",
    iconColor: "rgba(255, 255, 255, 0.95)",
  },
  {
    background: "linear-gradient(135deg, #166534 0%, #15803d 52%, #14532d 100%)",
    textColor: "#ffffff",
    descriptionColor: "rgba(255, 255, 255, 0.93)",
    borderColor: "rgba(222, 247, 231, 0.3)",
    thumbSurface: "rgba(233, 246, 238, 0.94)",
    thumbBorderColor: "rgba(228, 248, 235, 0.7)",
    iconColor: "rgba(255, 255, 255, 0.95)",
  },
];

const contactTheme: CardTheme = {
  background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 48%, #1e3a8a 100%)",
  textColor: "#ffffff",
  descriptionColor: "rgba(255, 255, 255, 0.95)",
  borderColor: "rgba(211, 224, 255, 0.3)",
  thumbSurface: "rgba(183, 201, 255, 0.38)",
  thumbBorderColor: "rgba(227, 236, 255, 0.5)",
  iconColor: "rgba(255, 255, 255, 0.95)",
};

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
    offset: ["start 92%", "end 16%"],
  });
  const depthYRaw = useTransform(scrollYProgress, [0, 0.28, 0.84, 1], [16, 0, 0, -9]);
  const opacityRaw = useTransform(scrollYProgress, [0, 0.12, 1], [0.74, 1, 1]);
  const scaleRaw = useTransform(scrollYProgress, [0, 0.2, 0.84, 1], [0.982, 1, 1, 0.995]);
  const depthY = useSpring(depthYRaw, { stiffness: 165, damping: 34, mass: 0.78 });
  const opacity = useSpring(opacityRaw, { stiffness: 170, damping: 36, mass: 0.8 });
  const scale = useSpring(scaleRaw, { stiffness: 170, damping: 36, mass: 0.8 });

  const theme = isContactCard ? contactTheme : projectThemes[index % projectThemes.length];
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
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.008 }}
      className="group grain project-sheen relative h-full cursor-pointer overflow-hidden rounded-2xl border px-4 pb-4 pt-2 outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:px-6 sm:pb-4"
      style={{
        background: theme.background,
        color: theme.textColor,
        borderColor: theme.borderColor,
        boxShadow: shellShadow,
        y: reduceMotion ? 0 : depthY,
        opacity: reduceMotion ? 1 : opacity,
        scale: reduceMotion ? 1 : scale,
      }}
      aria-label={isContactCard ? "Open contact page" : `Open ${cardTitle} project`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))]" />

      <div className="relative flex h-full items-center gap-4">
        <motion.div
          className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border shadow-[0_12px_22px_rgba(0,0,0,0.28)] md:h-[7.5rem] md:w-[7.5rem]"
          style={{ backgroundColor: theme.thumbSurface, borderColor: theme.thumbBorderColor }}
          animate={reduceMotion ? undefined : { y: [0, -2, 0], rotate: [0, -0.6, 0.6, 0] }}
          transition={reduceMotion ? undefined : { duration: 4.8, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY }}
        >
          {isContactCard ? (
            <FiPlus className="h-10 w-10 sm:h-12 sm:w-12" style={{ color: theme.iconColor }} />
          ) : project?.logoPath ? (
            <Image src={project.logoPath} alt={`${cardTitle} logo`} fill className="object-contain p-2.5" />
          ) : (
            <span className="text-[2rem] font-semibold uppercase" style={{ color: theme.iconColor }}>
              {cardTitle.charAt(0)}
            </span>
          )}
        </motion.div>

        <div className="min-w-0 max-w-[24rem] self-center sm:max-w-[25.5rem] md:max-w-[28rem]">
          <h3 className="text-balance text-2xl font-bold tracking-tight transition-transform duration-200 group-hover:scale-[1.02] md:text-3xl">
            {cardTitle}
          </h3>
          <p className="mt-1 text-pretty text-sm leading-snug md:text-[1.08rem]" style={{ color: theme.descriptionColor }}>
            {cardDescription}
          </p>
          {isContactCard ? (
            <p className="mt-3 text-base font-medium" style={{ color: theme.descriptionColor }}>
              Let&apos;s connect
            </p>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
