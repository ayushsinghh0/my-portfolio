"use client";

import { useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

export function useHydratedReducedMotion() {
  const prefersReducedMotion = useReducedMotion();
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return hydrated ? prefersReducedMotion : false;
}
