"use client";

import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useMounted } from "@/components/ui/use-mounted";

export function HangingThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted && resolvedTheme === "dark";
  const beads = Array.from({ length: 12 });

  return (
    <motion.button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      initial={false}
      animate={{ opacity: 1, y: 0, rotate: [-0.24, 0.12, -0.08, 0] }}
      transition={{
        opacity: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 0.95, ease: [0.22, 1, 0.36, 1] },
        rotate: { duration: 1.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
      }}
      whileTap={{ y: 6 }}
      className="pull-chain-toggle group fixed -top-11 right-6 z-[120] block select-none sm:right-12 md:right-24"
    >
      <div className="w-3 h-3 rounded-full border border-gray-500 bg-gradient-to-b from-gray-600 to-gray-800 shadow-sm" />

      <div className="flex flex-col items-center">
        {beads.map((_, index) => (
          <div key={`bead-${index}`} className="relative" style={{ transform: `rotate(${-0.045 * (index + 1)}deg)` }}>
            <div className="my-0 size-2 rounded-full border-2 border-gray-600 bg-gradient-to-r from-gray-500 to-gray-600 shadow-sm dark:border-gray-400 dark:from-gray-400 dark:to-gray-500" />
          </div>
        ))}
      </div>

      <div className="relative mt-1">
        <div className="-mt-1 mx-auto h-1 w-1 rounded-full bg-gray-600 dark:bg-gray-400" />
        <span
          data-premium-text
          className="relative mx-auto inline-flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg border border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)] shadow-lg transition-transform duration-200 group-hover:translate-y-0.5"
        >
          {mounted ? isDark ? <FiSun className="h-3.5 w-3.5" /> : <FiMoon className="h-3.5 w-3.5" /> : null}
        </span>
      </div>
    </motion.button>
  );
}
