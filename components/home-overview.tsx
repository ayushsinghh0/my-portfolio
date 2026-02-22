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
  { alt: "Zod & JSON", src: "/projects/ic-zod-json.svg" },
];

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
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.15, ease: [0.22, 1, 0.36, 1] as const },
};

type HomeOverviewProps = {
  chatMode?: boolean;
  initialQuestion?: string;
};

export function HomeOverview({ chatMode = false, initialQuestion }: HomeOverviewProps) {
  const router = useRouter();
  const marqueeItems = [...projectLogos, ...projectLogos, ...projectLogos];
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
    <section className={chatMode ? "pt-6 sm:pt-8" : "pb-[15.5rem] pt-6 sm:pb-[14.8rem] sm:pt-8"}>
      {!chatMode ? (
        <div className="mx-auto max-w-7xl overflow-auto px-1 sm:px-3">
          <div className="mb-4 grid w-full auto-rows-[5rem] grid-cols-3 gap-3 pt-3 md:mt-8 lg:auto-rows-[11rem] lg:grid-rows-2 lg:gap-4 lg:pt-1">
            <motion.div
              {...cardMotion}
              className="col-span-3 row-span-2 lg:col-start-1 lg:row-start-1 lg:col-span-1 lg:row-span-1"
            >
              <Link
                href="/about"
                data-premium
                data-premium-variant="card"
                data-premium-strength="0.07"
                data-premium-zoom="0.04"
                className="ref-card group block h-full p-4"
              >
                <div className="absolute inset-0 -bottom-6 flex items-end justify-end overflow-hidden pb-4">
                  <div className="relative h-24 w-40 sm:h-28 sm:w-48">
                    <Image
                      src="/finalincon.png"
                      alt=""
                      fill
                      className="absolute top-0 h-auto w-full object-contain"
                      style={{ clipPath: "inset(0 0 42% 0)" }}
                    />
                  </div>
                </div>

                <div className="pointer-events-none relative z-10 flex h-full flex-col justify-end gap-1 transition-all duration-300 lg:group-hover:-translate-y-1.5">
                  <div className="flex flex-col items-start gap-1.5">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--panel-border)] text-[var(--foreground)]">
                      <FiUser className="h-6 w-6" />
                    </span>
                    <h3 data-premium-text className="font-display text-[2.05rem] leading-none tracking-[-0.015em] lg:text-[2.12rem]">
                      About
                    </h3>
                  </div>
                  <p className="text-[0.95rem] text-[var(--muted-foreground)]">A bit about myself.</p>
                </div>
              </Link>
            </motion.div>

            <motion.div
              {...cardMotion}
              transition={{ ...cardMotion.transition, delay: 0.06 }}
              className="col-span-3 row-span-2 lg:col-start-1 lg:row-start-2 lg:col-span-1 lg:row-span-1"
            >
              <Link
                href="/experience"
                data-premium
                data-premium-variant="card"
                data-premium-strength="0.07"
                data-premium-zoom="0.04"
                className="ref-card group block h-full p-4"
              >
                <div className="absolute inset-0 flex items-start justify-end overflow-hidden">
                  <div className="relative h-24 w-40 sm:h-24 sm:w-48">
                    <Image
                      src="/finalincon.png"
                      alt=""
                      fill
                      className="absolute bottom-4 h-auto w-full rounded-bl-lg object-contain"
                      style={{ clipPath: "inset(55% 0 0 0)" }}
                    />
                    <div className="pointer-events-none absolute bottom-4 left-0 right-0 h-12 bg-gradient-to-t from-[var(--background)] to-transparent" />
                    <div className="pointer-events-none absolute bottom-4 left-0 top-0 w-12 bg-gradient-to-r from-[var(--background)] to-transparent" />
                  </div>
                </div>

                <div className="pointer-events-none relative z-10 flex h-full flex-col justify-end gap-1 pr-24 transition-all duration-300 lg:group-hover:-translate-y-1.5">
                  <div className="flex flex-col items-start gap-1.5">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--panel-border)] text-[var(--foreground)]">
                      <FiBriefcase className="h-6 w-6" />
                    </span>
                    <h3 data-premium-text className="font-display text-[1.95rem] leading-[0.86] tracking-[-0.015em] lg:text-[2.1rem]">
                      Work
                      <br />
                      Experience
                    </h3>
                  </div>
                  <p className="text-[0.95rem] text-[var(--muted-foreground)]">My career as a Software Engineer.</p>
                </div>
              </Link>
            </motion.div>

            <motion.div
              {...cardMotion}
              transition={{ ...cardMotion.transition, delay: 0.1 }}
              className="col-span-3 row-span-4 lg:col-start-2 lg:row-start-1 lg:col-span-1 lg:row-span-2"
            >
              <Link
                href="/projects"
                data-premium
                data-premium-variant="card"
                data-premium-strength="0.07"
                data-premium-zoom="0.04"
                className="ref-card group block h-full p-4"
              >
                <div className="absolute inset-x-0 -top-2 flex h-[9.2rem] items-start overflow-hidden">
                  <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                    className="mr-10 ml-auto flex w-max gap-4 px-3 pt-6 lg:mr-0 lg:ml-0 lg:px-4"
                  >
                    {marqueeItems.map((item, index) => (
                      <div
                        key={`${item.alt}-${index}`}
                        className="size-16 shrink-0 self-start transition-transform duration-300 ease-in-out md:size-20"
                      >
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={120}
                          height={120}
                          className="-my-2 block size-28 object-contain md:size-[7.5rem]"
                        />
                      </div>
                    ))}
                  </motion.div>

                  <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[var(--background)] to-transparent lg:inset-y-0 lg:inset-x-auto lg:left-0 lg:h-auto lg:w-1/4 lg:bg-gradient-to-r" />
                  <div className="pointer-events-none absolute inset-x-0 -bottom-4 h-16 bg-gradient-to-t from-[var(--background)] to-transparent lg:inset-y-0 lg:inset-x-auto lg:right-0 lg:h-auto lg:w-1/4 lg:bg-gradient-to-l" />
                </div>

                <div className="absolute inset-x-0 top-[9.2rem] h-px bg-[var(--panel-border)]" />

                <div className="pointer-events-none relative z-10 flex h-full flex-col justify-end gap-1 pt-[9.95rem] transition-all duration-300 lg:group-hover:-translate-y-1.5">
                  <div className="flex flex-col items-start gap-1.5">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--panel-border)] text-[var(--foreground)]">
                      <FiFolder className="h-6 w-6" />
                    </span>
                    <h3 data-premium-text className="font-edgy text-[2.35rem] leading-none tracking-[-0.018em] lg:text-[2.5rem]">
                      Projects
                    </h3>
                  </div>
                  <p className="max-w-lg text-[0.95rem] text-[var(--muted-foreground)]">
                    Personal projects I&apos;ve been working on.
                  </p>
                </div>
              </Link>
            </motion.div>

            <motion.div
              {...cardMotion}
              transition={{ ...cardMotion.transition, delay: 0.14 }}
              className="col-span-3 row-span-4 lg:col-start-3 lg:row-start-1 lg:col-span-1 lg:row-span-2"
            >
              <Link
                href="/contact"
                data-premium
                data-premium-variant="card"
                data-premium-strength="0.07"
                data-premium-zoom="0.04"
                className="ref-card group block h-full p-4"
              >
                <div className="absolute inset-0">
                  <div className="ml-auto mr-6 w-1/3 lg:mr-0 lg:w-1/2">
                    <div className="relative h-80 w-full max-w-md overflow-hidden bg-transparent p-6">
                      {[0, 1, 2, 3].map((index) => {
                        const isBlue = index % 2 === 0;
                        const alignEnd = index % 2 === 1;

                        return (
                          <motion.div
                            key={`chat-bubble-${index}`}
                            initial={false}
                            animate={{ opacity: [0.8, 1, 0.8], y: [0, -2.8, 0] }}
                            transition={{ duration: 3.6, repeat: Infinity, delay: index * 0.2, ease: "easeInOut" }}
                            className={`mb-3 flex ${alignEnd ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`relative max-w-[85%] rounded-2xl p-2 md:max-w-[75%] md:px-3 md:py-2 ${
                                isBlue ? "rounded-tl-sm bg-sky-600" : "rounded-tr-sm bg-green-600"
                              } text-white`}
                            >
                              <div className="flex items-center gap-1 md:gap-1.5">
                                {[0, 1, 2].map((dotIndex) => (
                                  <motion.div
                                    key={`chat-dot-${index}-${dotIndex}`}
                                    animate={{ opacity: [0.4, 0.9, 0.4], y: [0, -1.1, 0] }}
                                    transition={{
                                      duration: 2.2,
                                      repeat: Infinity,
                                      delay: index * 0.16 + dotIndex * 0.08,
                                      ease: "easeInOut",
                                    }}
                                    className="size-1.5 rounded-full bg-white"
                                  />
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pointer-events-none relative z-10 flex h-full flex-col justify-end gap-1 pt-[9.95rem] transition-all duration-300 lg:group-hover:-translate-y-1.5">
                  <div className="flex flex-col items-start gap-1.5">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--panel-border)] text-[var(--foreground)]">
                      <FiSend className="h-6 w-6" />
                    </span>
                    <h3 data-premium-text className="font-display text-[2.2rem] leading-none tracking-[-0.015em] lg:text-[2.35rem]">
                      Contact
                    </h3>
                  </div>
                  <p className="max-w-lg text-[0.95rem] text-[var(--muted-foreground)]">Email, LinkedIn, carrier pigeon...</p>
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      ) : null}

      {!chatMode ? (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 z-30 -left-0.5 -right-0.5 sm:mb-[env(safe-area-inset-bottom)] md:left-16 md:right-16 lg:bottom-8 lg:left-32 lg:right-32"
        >
          <h2 className="w-full py-2 text-center text-sm font-medium sm:text-xl">
            <span className="mx-auto max-w-md text-[color-mix(in_oklab,var(--foreground)_65%,transparent)] shiny-text">
              Ask AyushGPT
            </span>
          </h2>

          <div className="mb-2 flex flex-wrap justify-center gap-2 px-2">
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

          <form onSubmit={handleSubmit} className="w-full bg-[var(--background)] pb-[env(safe-area-inset-bottom)]">
            <div className="group/input panel relative flex w-full min-w-0 flex-col rounded-t-3xl rounded-b-none border border-[var(--input)] shadow-xs sm:rounded-md">
              <textarea
                rows={4}
                placeholder="What would you like to know?"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                className="field-sizing-content max-h-48 min-h-16 w-full resize-none border-0 bg-transparent px-5 pb-0 pt-5 text-base text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)] md:px-4 md:pt-4 md:text-sm"
              />
              <div className="order-last flex w-full items-center justify-between gap-1 px-3 pb-4 pt-2">
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
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
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
                  initial={{ opacity: 0, y: 8 }}
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
                    initial={{ opacity: 0, y: 10 }}
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

          <form onSubmit={handleSubmit} className="mt-3 w-full bg-[var(--background)] pb-[env(safe-area-inset-bottom)]">
            <div className="group/input panel relative flex w-full min-w-0 flex-col rounded-t-3xl rounded-b-none border border-[var(--input)] shadow-xs sm:rounded-md">
              <textarea
                rows={4}
                placeholder="What would you like to know?"
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                className="field-sizing-content max-h-48 min-h-16 w-full resize-none border-0 bg-transparent px-5 pb-0 pt-5 text-base text-[var(--foreground)] outline-none placeholder:text-[var(--muted-foreground)] md:px-4 md:pt-4 md:text-sm"
              />
              <div className="order-last flex w-full items-center justify-between gap-1 px-3 pb-4 pt-2">
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
