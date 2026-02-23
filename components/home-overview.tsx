"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiBriefcase,
  FiFolder,
  FiMic,
  FiSend,
  FiUser,
} from "react-icons/fi";

const projectLogos = [
  { alt: "Scraaatch", src: "/projects/ic-scraaatch.svg" },
  { alt: "AnAss", src: "/projects/ic-anass.svg" },
  { alt: "Daily Story", src: "/projects/ic-daily-story.svg" },
  { alt: "Zod & JSON Schema Builder", src: "/projects/ic-zod-json.svg" },
];

const contactBubblePattern = [true, false, true, false, true] as const;

const questionPills = [
  "Who is Ayush?",
  "How much experience does he have?",
  "Which languages does he use?",
  "What are his strengths?",
  "How can I contact him?",
];

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
  suggestion?: {
    title: string;
    description: string;
    href: string;
  };
};

const quickAnswers: Record<string, string> = {
  "Who is Ayush?":
    "Ayush Raj is a Backend Engineer and Full Stack Developer from Noida, focused on distributed systems, microservices, and scalable architectures.",
  "How much experience does he have?":
    "Ayush is currently a fresher with strong project-based experience. He has built multiple production-style systems, including WorkWizard, AegisID, and a real-time collaborative drawing app.",
  "Which languages does he use?":
    "Ayush works with JavaScript, TypeScript, C++, SQL, HTML, and CSS. He also uses Node.js and React/Next.js heavily for backend and full stack work.",
  "What are his strengths?":
    "His strengths are backend architecture, microservices design, API performance optimization, event-driven systems with Kafka, and strong DSA/problem-solving.",
  "How can I contact him?":
    "You can reach Ayush at ayushraj4820@gmail.com. Social links for GitHub, LinkedIn, and LeetCode are available in the contact section.",
};

function getAssistantReply(prompt: string) {
  const text = prompt.trim();
  if (!text) {
    return {
      text: "Please type a question about Ayush's profile, projects, skills, or contact details.",
    };
  }

  const exact = quickAnswers[text];
  if (exact) {
    if (text === "Who is Ayush?") {
      return {
        text: `${exact} Would you like to know more about his background, projects, or experience?`,
        suggestion: {
          title: "About Ayush",
          description: "Learn more about Ayush's background, profile, and technical strengths.",
          href: "/about",
        },
      };
    }

    if (text === "How much experience does he have?") {
      return {
        text: `${exact} He focuses on production-style engineering quality and practical delivery.`,
        suggestion: {
          title: "Experience Highlights",
          description: "See his engineering mindset, delivery approach, and execution depth.",
          href: "/experience",
        },
      };
    }

    if (text === "How can I contact him?") {
      return {
        text: exact,
        suggestion: {
          title: "Contact Ayush",
          description: "Open contact page for direct email and professional profile links.",
          href: "/contact",
        },
      };
    }

    return { text: exact };
  }

  const normalized = text.toLowerCase();

  if (normalized.includes("project")) {
    return {
      text: "Highlighted projects include WorkWizard (intelligent job portal), AegisID centralized auth service, and a real-time collaborative drawing app.",
      suggestion: {
        title: "Project Portfolio",
        description: "Open project cards and detailed case studies for all core builds.",
        href: "/projects",
      },
    };
  }

  if (normalized.includes("skill") || normalized.includes("stack") || normalized.includes("tech")) {
    return {
      text: "Ayush's stack includes Node.js, Express.js, Kafka, WebSockets, PostgreSQL, Redis, Docker, React, Next.js, and TypeScript.",
      suggestion: {
        title: "Skills & Tech Stack",
        description: "Review skills grouped by backend, frontend, databases, and core CS.",
        href: "/about",
      },
    };
  }

  if (normalized.includes("education") || normalized.includes("college")) {
    return {
      text: "Ayush is pursuing B.Tech in Computer Science at Jaypee Institute of Information Technology (2022-2026).",
      suggestion: {
        title: "Education & Specs",
        description: "See education details and profile summary in the About section.",
        href: "/about",
      },
    };
  }

  if (normalized.includes("leetcode") || normalized.includes("achievement")) {
    return {
      text: "Achievements: 400+ LeetCode problems solved, and 95th percentile in JEE Mains among 1M+ candidates.",
      suggestion: {
        title: "Achievements",
        description: "Open About page to view key milestones and competitive outcomes.",
        href: "/about",
      },
    };
  }

  if (normalized.includes("contact") || normalized.includes("email")) {
    return {
      text: "Contact: ayushraj4820@gmail.com. You can also use the social links in the contact section.",
      suggestion: {
        title: "Go to Contact",
        description: "Send a direct message or open social profiles from the contact page.",
        href: "/contact",
      },
    };
  }

  return {
    text: "I can help with Ayush's background, projects, skills, education, achievements, and contact details. Try one of the suggested questions above.",
    suggestion: {
      title: "Explore About Section",
      description: "Start with profile summary, core strengths, and technology stack.",
      href: "/about",
    },
  };
}

const cardMotion = {
  initial: false as const,
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.15, ease: [0.22, 1, 0.36, 1] as const },
};

type HomeOverviewProps = {
  chatMode?: boolean;
  initialQuestion?: string;
};

export function HomeOverview({ chatMode = false, initialQuestion }: HomeOverviewProps) {
  const router = useRouter();
  const marqueeItems = [
    ...projectLogos,
    ...projectLogos,
    ...projectLogos,
    ...projectLogos,
  ];
  const contactBubbleStream = [
    ...contactBubblePattern,
    ...contactBubblePattern,
    ...contactBubblePattern,
    ...contactBubblePattern,
  ];
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const baseMessages: ChatMessage[] = [
      {
        role: "assistant",
        text: "Ask me anything about Ayush's profile, projects, skills, or contact details.",
      },
    ];

    if (!chatMode || !initialQuestion?.trim()) {
      return baseMessages;
    }

    const cleanPrompt = initialQuestion.trim();
    const assistantReply = getAssistantReply(cleanPrompt);
    return [
      ...baseMessages,
      { role: "user", text: cleanPrompt },
      { role: "assistant", text: assistantReply.text, suggestion: assistantReply.suggestion },
    ];
  });

  function sendToChat(rawPrompt: string) {
    const cleanPrompt = rawPrompt.trim();
    if (!cleanPrompt) {
      return;
    }

    router.push(`/chat?q=${encodeURIComponent(cleanPrompt)}`);
    setPrompt("");
  }

  function submitQuestion(rawPrompt: string) {
    const cleanPrompt = rawPrompt.trim();
    if (!cleanPrompt) {
      return;
    }

    const assistantReply = getAssistantReply(cleanPrompt);
    setMessages((prev) => [
      ...prev.slice(-5),
      { role: "user", text: cleanPrompt },
      { role: "assistant", text: assistantReply.text, suggestion: assistantReply.suggestion },
    ]);
    setPrompt("");
  }

  function handleQuestionClick(question: string) {
    if (chatMode) {
      submitQuestion(question);
      return;
    }

    sendToChat(question);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (chatMode) {
      submitQuestion(prompt);
      return;
    }

    sendToChat(prompt);
  }

  return (
    <section
      className={
        chatMode
          ? "pt-6 sm:pt-8"
          : "pb-48 pt-6 sm:pb-52 sm:pt-8 lg:pb-56"
      }
    >
      {!chatMode ? (
        <div className="mx-auto w-full max-w-full overflow-auto px-1 sm:px-3">
          <div className="mb-4 grid w-full auto-rows-[4.5rem] grid-cols-3 gap-3 pt-4 md:mt-12 lg:auto-rows-[9.25rem] lg:grid-rows-[repeat(4,9.25rem)] lg:gap-4 lg:pt-0">
            <motion.div
              {...cardMotion}
              className="col-span-3 row-span-2 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-2"
            >
              <Link
                href="/about"
                data-premium
                data-premium-variant="card"
                data-premium-strength="0.07"
                data-premium-zoom="0.04"
                className="cursor-pointer group relative flex h-full flex-col overflow-hidden rounded-xl bg-[var(--background)] [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu md:justify-between dark:bg-[var(--background)] dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
              >
                <div className="home-card-layer group absolute inset-0">
                  <div className="absolute inset-0 -bottom-6 flex items-end justify-end overflow-hidden pb-4">
                    <div className="relative h-24 w-40 sm:h-28 sm:w-48">
                      <Image
                        src="/finalincon.png"
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 12rem, 10rem"
                        className="absolute top-0 h-auto w-full object-contain"
                        style={{ clipPath: "inset(0 0 42% 0)" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="px-4 py-2 lg:py-4">
                  <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-2">
                    <div className="flex flex-row items-center gap-2 lg:flex-col lg:items-start lg:gap-1">
                      <FiUser className="size-5 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:text-[var(--primary)] dark:text-neutral-300 lg:size-12 lg:group-hover:scale-75" />
                      <h3
                        data-premium-text
                        className="font-serif text-lg font-semibold text-neutral-700 dark:text-neutral-300 lg:text-xl"
                      >
                        About
                      </h3>
                      <div className="ml-auto lg:hidden">
                        <span className="inline-flex size-9 items-center justify-center text-[var(--primary)]">
                          <FiArrowRight className="size-6" />
                        </span>
                      </div>
                    </div>
                    <p className="max-w-lg text-xs text-neutral-400 lg:text-sm">A bit about myself.</p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300" />
              </Link>
            </motion.div>

            <motion.div
              {...cardMotion}
              transition={{ ...cardMotion.transition, delay: 0.06 }}
              className="col-span-3 row-span-2 lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3"
            >
              <Link
                href="/experience"
                data-premium
                data-premium-variant="card"
                data-premium-strength="0.07"
                data-premium-zoom="0.04"
                className="cursor-pointer group relative flex h-full flex-col overflow-hidden rounded-xl bg-[var(--background)] [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu md:justify-between dark:bg-[var(--background)] dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
              >
                <div className="home-card-layer group absolute inset-0">
                  <div className="absolute inset-0 flex items-start justify-end overflow-hidden">
                    <div className="relative h-24 w-40 sm:h-24 sm:w-48">
                      <Image
                        src="/finalincon.png"
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 12rem, 10rem"
                        className="absolute bottom-4 h-auto w-full rounded-bl-lg object-contain"
                        style={{ clipPath: "inset(55% 0 0 0)" }}
                      />
                      <div className="pointer-events-none absolute bottom-4 left-0 right-0 h-12 bg-gradient-to-t from-[var(--background)] to-transparent" />
                      <div className="pointer-events-none absolute bottom-4 left-0 top-0 w-12 bg-gradient-to-r from-[var(--background)] to-transparent" />
                    </div>
                  </div>
                </div>

                <div className="px-4 py-2 lg:py-4">
                  <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-2">
                    <div className="flex flex-row items-center gap-2 lg:flex-col lg:items-start lg:gap-1">
                      <FiBriefcase className="size-5 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:text-[var(--primary)] dark:text-neutral-300 lg:size-12 lg:group-hover:scale-75" />
                      <h3
                        data-premium-text
                        className="font-serif text-lg font-semibold text-neutral-700 dark:text-neutral-300 lg:text-xl"
                      >
                        Work Experience
                      </h3>
                      <div className="ml-auto lg:hidden">
                        <span className="inline-flex size-9 items-center justify-center text-[var(--primary)]">
                          <FiArrowRight className="size-6" />
                        </span>
                      </div>
                    </div>
                    <p className="max-w-lg text-xs text-neutral-400 lg:text-sm">
                      My career as a Software Engineer.
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300" />
              </Link>
            </motion.div>

            <motion.div
              {...cardMotion}
              transition={{ ...cardMotion.transition, delay: 0.1 }}
              className="col-span-3 row-span-4 lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-3"
            >
              <Link
                href="/projects"
                data-premium
                data-premium-variant="card"
                data-premium-strength="0.07"
                data-premium-zoom="0.04"
                className="cursor-pointer group relative flex h-full flex-col overflow-hidden rounded-xl bg-[var(--background)] [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu md:justify-between dark:bg-[var(--background)] dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
              >
                <div className="home-card-layer group absolute inset-0">
                  <div className="absolute inset-x-0 top-0 h-[56%] flex items-center overflow-hidden">
                    <div
                      className="project-strip-track group-hover:[animation-play-state:paused]"
                    >
                      {marqueeItems.map((item, index) => (
                        <div
                          key={`${item.alt}-${index}`}
                          className="self-start flex-shrink-0 size-16 scale-90 transition-transform duration-300 ease-in-out md:size-20"
                        >
                          <Image
                            src={item.src}
                            alt={item.alt}
                            width={112}
                            height={112}
                            className="-my-2 block size-28 md:size-[7.5rem]"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[var(--background)] to-transparent md:inset-y-0 md:inset-x-auto md:left-0 md:h-auto md:w-1/4 md:bg-gradient-to-r" />
                    <div className="pointer-events-none absolute inset-x-0 -bottom-4 h-16 bg-gradient-to-t from-[var(--background)] to-transparent md:inset-y-0 md:inset-x-auto md:right-0 md:h-auto md:w-1/4 md:bg-gradient-to-l" />
                  </div>
                </div>

                <div className="relative z-10 flex h-full flex-col justify-end px-4 py-2 lg:py-4">
                  <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-2">
                    <div className="flex flex-row items-center gap-2 lg:flex-col lg:items-start lg:gap-1">
                      <FiFolder className="size-5 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:text-[var(--primary)] dark:text-neutral-300 lg:size-12 lg:group-hover:scale-75" />
                      <h3
                        data-premium-text
                        className="font-serif text-lg font-semibold text-neutral-700 dark:text-neutral-300 lg:text-xl"
                      >
                        Projects
                      </h3>
                      <div className="ml-auto lg:hidden">
                        <span className="inline-flex size-9 items-center justify-center text-[var(--primary)]">
                          <FiArrowRight className="size-6" />
                        </span>
                      </div>
                    </div>
                    <p className="max-w-lg text-xs text-neutral-400 lg:text-sm">
                      Personal projects I&apos;ve been working on.
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300" />
              </Link>
            </motion.div>

            <motion.div
              {...cardMotion}
              transition={{ ...cardMotion.transition, delay: 0.14 }}
              className="col-span-3 row-span-4 lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-3"
            >
              <Link
                href="/contact"
                data-premium
                data-premium-variant="card"
                data-premium-strength="0.07"
                data-premium-zoom="0.04"
                className="cursor-pointer group relative flex h-full flex-col overflow-hidden rounded-xl bg-[var(--background)] [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu md:justify-between dark:bg-[var(--background)] dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
              >
                <div className="home-card-layer group absolute inset-0">
                  <div className="absolute inset-x-0 top-0 h-[56%] overflow-hidden">
                    <div className="ml-auto mr-6 h-full w-1/3 lg:mr-0 lg:w-1/2">
                      <div className="relative mx-auto h-full w-full max-w-md overflow-hidden bg-transparent p-4 lg:p-6">
                        <div className="contact-message-track">
                          {contactBubbleStream.map((isGreen, index) => {
                            return (
                              <div
                                key={`chat-bubble-${index}`}
                                className={`flex ${isGreen ? "justify-end" : "justify-start"}`}
                              >
                                <div
                                  className={`relative max-w-[85%] rounded-2xl p-2 md:max-w-[75%] md:px-3 md:py-2 ${
                                    isGreen ? "rounded-tr-sm bg-green-600" : "rounded-tl-sm bg-sky-600"
                                  } text-white`}
                                >
                                  <div className="flex items-center gap-1 md:gap-1.5">
                                    {[0, 1, 2].map((dotIndex) => (
                                      <span
                                        key={`chat-dot-${index}-${dotIndex}`}
                                        className="contact-dot size-1.5 rounded-full bg-white"
                                        style={{ animationDelay: `${index * 0.18 + dotIndex * 0.08}s` }}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 flex h-full flex-col justify-end px-4 py-2 lg:py-4">
                  <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-2">
                    <div className="flex flex-row items-center gap-2 lg:flex-col lg:items-start lg:gap-1">
                      <FiSend className="size-5 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:text-[var(--primary)] dark:text-neutral-300 lg:size-12 lg:group-hover:scale-75" />
                      <h3
                        data-premium-text
                        className="font-serif text-lg font-semibold text-neutral-700 dark:text-neutral-300 lg:text-xl"
                      >
                        Contact
                      </h3>
                      <div className="ml-auto lg:hidden">
                        <span className="inline-flex size-9 items-center justify-center text-[var(--primary)]">
                          <FiArrowRight className="size-6" />
                        </span>
                      </div>
                    </div>
                    <p className="max-w-lg text-xs text-neutral-400 lg:text-sm">
                      Email, LinkedIn, carrier pigeon...
                    </p>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300" />
              </Link>
            </motion.div>
          </div>
        </div>
      ) : null}

      {!chatMode ? (
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 w-full pb-[calc(env(safe-area-inset-bottom)+0.5rem)]"
        >
          <div className="relative mx-auto w-full max-w-6xl px-1 sm:px-2 md:px-4 md:pl-[calc(6rem+0.75rem)] lg:px-8 lg:pl-[calc(7.5rem+1rem)]">
            <div className="pointer-events-none absolute inset-x-3 bottom-0 top-0 rounded-t-3xl bg-gradient-to-t from-[color-mix(in_oklab,var(--background)_14%,transparent)] via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-x-10 -top-3 h-10 rounded-full bg-[color-mix(in_oklab,var(--primary)_14%,transparent)] blur-2xl" />
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_oklab,var(--foreground)_18%,transparent)] to-transparent" />
            <h2 className="w-full py-1 text-center text-sm font-medium sm:text-xl">
              <span className="mx-auto max-w-md text-[color-mix(in_oklab,var(--foreground)_65%,transparent)] shiny-text">
                Ask AyushGPT
              </span>
            </h2>

            <div className="mb-1.5 flex flex-wrap justify-center gap-2 px-2">
              {questionPills.map((pill) => (
                <button
                  key={pill}
                  type="button"
                  onClick={() => handleQuestionClick(pill)}
                  data-premium
                  data-premium-variant="button"
                  className="rounded-full border border-[var(--panel-border)] bg-[var(--panel)] px-4 py-1.5 text-[0.88rem] text-[var(--foreground)] hover:bg-[var(--panel-strong)]"
                >
                  <span data-premium-text>{pill}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="w-full pb-[env(safe-area-inset-bottom)]">
              <div className="group/input panel relative flex w-full min-w-0 flex-col rounded-2xl border border-[var(--input)] shadow-xs">
                <textarea
                  rows={1}
                  placeholder="What would you like to know?"
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  className="max-h-48 min-h-14 w-full resize-none border-0 bg-transparent px-5 pb-0 pt-4 text-base text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)] md:px-4 md:text-sm"
                />
                <div className="order-last flex w-full items-center justify-between gap-1 px-3 pb-3 pt-2">
                  <button
                    type="button"
                    aria-label="Voice input"
                    data-premium
                    data-premium-variant="button"
                    className="inline-flex size-8 items-center justify-center rounded-md text-[var(--muted-foreground)] transition-all duration-200 hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
                  >
                    <FiMic className="size-4" />
                  </button>
                  <button
                    type="submit"
                    aria-label="Open chat"
                    data-premium
                    data-premium-variant="button"
                    className="inline-flex size-8 items-center justify-center rounded-md bg-[var(--primary)] text-[var(--primary-foreground)] transition-all hover:brightness-95"
                  >
                    <FiSend className="size-4" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-6 flex min-h-[63vh] max-w-6xl flex-col"
        >
          <h2 className="py-2 text-center text-xl font-medium sm:text-[2rem]">
            <span className="relative mx-auto inline-block text-[color-mix(in_oklab,var(--foreground)_64%,transparent)]">
              Ask AyushGPT
              <span aria-hidden className="pointer-events-none absolute inset-0 shiny-overlay-text">
                Ask AyushGPT
              </span>
            </span>
          </h2>

          <div className="mt-2 flex flex-wrap justify-center gap-2 px-2">
            {questionPills.map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => handleQuestionClick(pill)}
                data-premium
                data-premium-variant="button"
                className="rounded-full border border-[var(--panel-border)] bg-[var(--panel)] px-4 py-2 text-[0.88rem] text-[var(--foreground)] hover:bg-[var(--panel-strong)]"
              >
                <span data-premium-text>{pill}</span>
              </button>
            ))}
          </div>

          <div className="mb-5 mt-3 flex-1 space-y-3">
            {messages.slice(-5).map((message, index) => (
              <div key={`${message.role}-${index}-${message.text.slice(0, 30)}`}>
                <motion.div
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className={`panel rounded-xl px-4 py-3 text-sm ${
                    message.role === "user"
                      ? "ml-auto max-w-[80%] text-[var(--foreground)]"
                      : "mr-auto max-w-[96%] text-[var(--muted-foreground)]"
                  }`}
                >
                  <p>{message.text}</p>
                </motion.div>

                {message.role === "assistant" && message.suggestion ? (
                  <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
                    className="panel-strong mt-2 mr-auto flex w-full max-w-[48rem] flex-col gap-3 rounded-xl px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-[1.32rem] font-semibold tracking-[-0.01em] text-[var(--foreground)]">
                        {message.suggestion.title}
                      </p>
                      <p className="mt-1 text-sm text-[var(--muted-foreground)]">{message.suggestion.description}</p>
                    </div>
                    <Link
                      href={message.suggestion.href}
                      data-premium
                      data-premium-variant="button"
                      className="inline-flex items-center gap-2 self-start rounded-xl bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-[var(--primary-foreground)] hover:brightness-95 sm:self-center"
                    >
                      <span data-premium-text>Visit Page</span>
                      <FiArrowRight className="h-4 w-4" />
                    </Link>
                  </motion.div>
                ) : null}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-3 w-full pb-[env(safe-area-inset-bottom)]">
            <div className="group/input panel relative flex w-full min-w-0 flex-col rounded-t-3xl rounded-b-none border border-[var(--input)] shadow-xs sm:rounded-md">
              <textarea
                rows={1}
                placeholder="What would you like to know?"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                className="max-h-48 min-h-14 w-full resize-none border-0 bg-transparent px-5 pb-0 pt-4 text-base text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)] md:px-4 md:text-sm"
              />
              <div className="order-last flex w-full items-center justify-between gap-1 px-3 pb-3 pt-2">
                <button
                  type="button"
                  aria-label="Voice input"
                  data-premium
                  data-premium-variant="button"
                  className="inline-flex size-8 items-center justify-center rounded-md text-[var(--muted-foreground)] transition-all duration-200 hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)]"
                >
                  <FiMic className="size-4" />
                </button>
                <button
                  type="submit"
                  aria-label="Send question"
                  data-premium
                  data-premium-variant="button"
                  className="inline-flex size-8 items-center justify-center rounded-md bg-[var(--primary)] text-[var(--primary-foreground)] transition-all hover:brightness-95"
                >
                  <FiSend className="size-4" />
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      )}
    </section>
  );
}
