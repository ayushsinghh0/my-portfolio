"use client";

import { useReducedMotion } from "framer-motion";
import { useMounted } from "@/components/ui/use-mounted";

export function useHydratedReducedMotion() {
  const prefersReducedMotion = useReducedMotion();
  const mounted = useMounted();

  return mounted ? prefersReducedMotion : false;
}
