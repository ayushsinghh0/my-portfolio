"use client";

import { useState, type PointerEvent as ReactPointerEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiFolder,
  FiHome,
  FiMessageSquare,
  FiSend,
  FiUser,
} from "react-icons/fi";
import { navLinks } from "@/data/portfolio";
import { ThemeToggle } from "./theme-toggle";
import { useMounted } from "@/components/ui/use-mounted";
import { useHydratedReducedMotion } from "@/components/ui/use-hydrated-reduced-motion";

const sideLinks = [
  { href: "/projects", label: "Projects", icon: FiFolder },
  { href: "/about", label: "About", icon: FiUser },
  { href: "/", label: "Home", icon: FiHome },
  { href: "/chat", label: "Chat", icon: FiMessageSquare },
  { href: "/experience", label: "Experience", icon: FiBriefcase },
  { href: "/contact", label: "Contact", icon: FiSend },
];

export function Navbar() {
  const pathname = usePathname();
  const reduceMotion = useHydratedReducedMotion();
  const mounted = useMounted();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [pointerMap, setPointerMap] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const normalizedPath = pathname === "/account" ? "/about" : pathname;
  const shouldReduceMotion = !mounted || reduceMotion;

  const handlePointerMove = (
    href: string,
    event: ReactPointerEvent<HTMLAnchorElement>,
  ) => {
    if (shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setPointerMap((prev) => ({
      ...prev,
      [href]: {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      },
    }));
  };

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 md:block"
      >
        <motion.nav
          className="panel-strong relative overflow-hidden rounded-[1.7rem] px-2 py-2.5 backdrop-blur-[2px]"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -4, 0],
                }
          }
          transition={{
            duration: 11.8,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          {!shouldReduceMotion ? (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -left-6 -top-12 h-20 w-24 bg-gradient-to-b from-white/18 via-white/6 to-transparent blur-md"
              animate={{ x: ["0%", "190%"] }}
              transition={{
                duration: 8.4,
                ease: [0.22, 1, 0.36, 1],
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3.2,
              }}
            />
          ) : null}

          <ul className="relative flex flex-col gap-0.5">
            {sideLinks.map((link) => {
              const isActive = normalizedPath === link.href;
              const isHovered = hoveredLink === link.href;
              const pointer = pointerMap[link.href] ?? { x: 24, y: 24 };

              return (
                <motion.li
                  key={link.href}
                  layout
                  className="relative"
                  onHoverStart={() => setHoveredLink(link.href)}
                  onHoverEnd={() =>
                    setHoveredLink((current) =>
                      current === link.href ? null : current,
                    )
                  }
                  onFocusCapture={() => setHoveredLink(link.href)}
                  onBlurCapture={() =>
                    setHoveredLink((current) =>
                      current === link.href ? null : current,
                    )
                  }
                  whileHover={shouldReduceMotion ? undefined : { x: 1.8 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="side-nav-active"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                        mass: 0.65,
                      }}
                      className="absolute inset-0 rounded-full bg-[var(--primary)] shadow-[0_6px_22px_rgba(0,0,0,0.24)]"
                    />
                  ) : null}

                  {!isActive && isHovered ? (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 rounded-full bg-white/6"
                    />
                  ) : null}

                  {!shouldReduceMotion && (isHovered || isActive) ? (
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                      <motion.span
                        aria-hidden
                        className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)]/35 blur-[17px]"
                        style={{ left: pointer.x, top: pointer.y }}
                        animate={{
                          opacity: isHovered
                            ? [0.25, 0.46, 0.25]
                            : [0.18, 0.34, 0.18],
                        }}
                        transition={{
                          duration: 2.3,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "easeInOut",
                        }}
                      />
                      {isHovered
                        ? [0, 1, 2].map((particle) => (
                            <motion.span
                              key={`${link.href}-particle-${particle}`}
                              className="absolute size-[3px] rounded-full bg-[var(--primary)]"
                              style={{ left: pointer.x, top: pointer.y }}
                              animate={{
                                x: [0, (particle - 1) * 7, (particle - 1) * 12],
                                y: [
                                  0,
                                  -6 - particle * 1.4,
                                  -11 - particle * 2.2,
                                ],
                                opacity: [0.9, 0.45, 0],
                                scale: [1, 0.85, 0.32],
                              }}
                              transition={{
                                duration: 1.42,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 0.1 * particle,
                                ease: "easeOut",
                              }}
                            />
                          ))
                        : null}
                    </div>
                  ) : null}

                  <motion.div
                    whileTap={
                      shouldReduceMotion ? undefined : { y: 2.2, scale: 0.91 }
                    }
                    whileHover={
                      shouldReduceMotion ? undefined : { y: -1.2, scale: 1.03 }
                    }
                    transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.href}
                      aria-label={link.label}
                      onPointerMove={(event) =>
                        handlePointerMove(link.href, event)
                      }
                      data-premium
                      data-premium-variant="button"
                      data-premium-strength="0.09"
                      data-premium-zoom="0.055"
                      data-premium-radius="1.45"
                      className={`relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-full transition-all duration-200 ${
                        isActive
                          ? "text-[var(--primary-foreground)] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_10px_18px_rgba(0,0,0,0.34)]"
                          : "bg-[color-mix(in_oklab,var(--panel)_82%,transparent)] text-[color-mix(in_oklab,var(--foreground)_74%,transparent)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_6px_12px_rgba(0,0,0,0.24)] hover:text-[var(--foreground)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_10px_16px_rgba(0,0,0,0.28)] focus-visible:bg-transparent active:bg-transparent"
                      } premium-nav-button`}
                    >
                      <motion.span
                        data-premium-text
                        animate={
                          shouldReduceMotion
                            ? undefined
                            : isActive
                              ? { scale: [1, 1.06, 1] }
                              : isHovered
                                ? { y: [0, -2, 0], x: [0, 0.8, -0.8, 0] }
                                : { scale: 1, y: 0, x: 0 }
                        }
                        transition={{
                          duration: isActive ? 6.2 : 1.05,
                          ease: "easeInOut",
                          repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                        }}
                        className="inline-flex"
                      >
                        <link.icon className="h-[1.52rem] w-[1.52rem]" />
                      </motion.span>
                    </Link>
                  </motion.div>
                </motion.li>
              );
            })}
          </ul>
        </motion.nav>
      </motion.aside>

      <motion.header
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="sticky top-0 z-40 px-3 pb-2 pt-3 md:hidden"
      >
        <nav className="panel-strong flex items-center justify-between rounded-2xl px-3 py-2">
          <Link
            href="/"
            data-premium
            data-premium-variant="button"
            className="text-sm font-semibold tracking-[0.1em] uppercase"
          >
            <span data-premium-text>Ayush Raj</span>
          </Link>

          <div className="flex max-w-[78vw] items-center gap-1 overflow-x-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-premium
                data-premium-variant="button"
                className={`rounded-lg px-2 py-1 text-xs whitespace-nowrap ${
                  normalizedPath === link.href
                    ? "text-[var(--foreground)]"
                    : "text-[var(--muted)]"
                }`}
              >
                <span data-premium-text>{link.label}</span>
              </Link>
            ))}
            <ThemeToggle className="panel inline-flex h-9 w-9 items-center justify-center rounded-lgtext-foreground" />
          </div>
        </nav>
      </motion.header>
    </>
  );
}
