"use client";

import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";
import { useMounted } from "@/components/ui/use-mounted";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      data-premium
      data-premium-variant="button"
      className={
        className ??
        "panel inline-flex h-10 w-10 items-center justify-center rounded-xl text-[var(--foreground)] hover:-translate-y-0.5"
      }
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted ? (
        isDark ? (
          <FiSun className="h-4 w-4" />
        ) : (
          <FiMoon className="h-4 w-4" />
        )
      ) : (
        <span className="h-4 w-4" />
      )}
    </button>
  );
}
