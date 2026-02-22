"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useHydratedReducedMotion } from "@/components/ui/use-hydrated-reduced-motion";

type PremiumElement = {
  el: HTMLElement;
  hovered: boolean;
  pressed: boolean;
  variant: "button" | "card";
  magnetic: number;
  zoom: number;
  maxTilt: number;
  proximityRadius: number;
  transformEnabled: boolean;
  glowSize: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function parseNumberish(value: string | undefined, fallback: number) {
  if (!value) return fallback;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function ensureLayer(el: HTMLElement, className: string) {
  let layer = el.querySelector<HTMLElement>(`:scope > .${className}`);
  if (layer) return layer;

  layer = document.createElement("span");
  layer.className = `pm-layer ${className}`;
  layer.dataset.pmGenerated = "true";
  layer.setAttribute("aria-hidden", "true");
  el.appendChild(layer);
  return layer;
}

function ensureDecorationLayers(el: HTMLElement) {
  ensureLayer(el, "pm-border-flow");
  ensureLayer(el, "pm-shimmer-sweep");
  ensureLayer(el, "pm-cursor-glow");

  const particleLayer = ensureLayer(el, "pm-particles");
  if (particleLayer.childElementCount > 0) return;

  const vectors = [
    { dx: -22, dy: -20, delay: 0.02 },
    { dx: -12, dy: -26, delay: 0.12 },
    { dx: 0, dy: -30, delay: 0.21 },
    { dx: 11, dy: -25, delay: 0.31 },
    { dx: 21, dy: -19, delay: 0.41 },
    { dx: -5, dy: -33, delay: 0.51 },
  ];

  vectors.forEach(({ dx, dy, delay }) => {
    const particle = document.createElement("span");
    particle.className = "pm-particle";
    particle.style.setProperty("--pm-particle-x", `${dx}px`);
    particle.style.setProperty("--pm-particle-y", `${dy}px`);
    particle.style.setProperty("--pm-particle-delay", `${delay}s`);
    particleLayer.appendChild(particle);
  });
}

export function PremiumMotionController() {
  const pathname = usePathname();
  const reduceMotion = useHydratedReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-premium]"));
    if (!elements.length) {
      return;
    }

    const records: PremiumElement[] = elements.map((el) => {
      const variant = (el.dataset.premiumVariant as "button" | "card") ?? "button";
      const defaults =
        variant === "card"
          ? { magnetic: 0.075, zoom: 0.034, maxTilt: 2.9, proximityRadius: 1.35, glowSize: 290 }
          : { magnetic: 0.115, zoom: 0.048, maxTilt: 4.8, proximityRadius: 1.78, glowSize: 190 };

      const transformEnabled = el.dataset.premiumTransform !== "off";
      el.classList.add("premium-interactive", variant === "card" ? "premium-card" : "premium-button");
      if (!transformEnabled) {
        el.classList.add("premium-static");
      }
      ensureDecorationLayers(el);

      return {
        el,
        hovered: false,
        pressed: false,
        variant,
        magnetic: parseNumberish(el.dataset.premiumStrength, defaults.magnetic),
        zoom: parseNumberish(el.dataset.premiumZoom, defaults.zoom),
        maxTilt: parseNumberish(el.dataset.premiumTilt, defaults.maxTilt),
        proximityRadius: parseNumberish(el.dataset.premiumRadius, defaults.proximityRadius),
        transformEnabled,
        glowSize: parseNumberish(el.dataset.premiumGlow, defaults.glowSize),
      };
    });

    let pointerX = -10_000;
    let pointerY = -10_000;
    let rafId = 0;

    const requestUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(updateAll);
    };

    const updateAll = () => {
      rafId = 0;

      for (const item of records) {
        const rect = item.el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = pointerX - centerX;
        const dy = pointerY - centerY;

        const radius = Math.max(rect.width, rect.height) * item.proximityRadius;
        const distance = Math.hypot(dx, dy);
        const proximity = clamp(1 - distance / radius, 0, 1);
        const activeProximity = item.hovered ? Math.max(proximity, 0.14) : proximity;

        const nx = clamp(dx / (rect.width / 2), -1, 1);
        const ny = clamp(dy / (rect.height / 2), -1, 1);
        const transformProximity = item.transformEnabled ? activeProximity : activeProximity * 0.28;
        const tx = nx * rect.width * item.magnetic * transformProximity;
        const ty = ny * rect.height * item.magnetic * transformProximity;
        const rx = -ny * item.maxTilt * transformProximity;
        const ry = nx * item.maxTilt * transformProximity;

        const glowX = clamp(((pointerX - rect.left) / rect.width) * 100, 0, 100);
        const glowY = clamp(((pointerY - rect.top) / rect.height) * 100, 0, 100);

        const pressFactor = item.pressed ? 1 : 0;
        const scale =
          1 + activeProximity * item.zoom + (item.hovered ? 0.008 : 0) - pressFactor * (item.transformEnabled ? 0.022 : 0.012);
        const shadowX = -nx * (item.variant === "card" ? 16 : 12) * activeProximity;
        const shadowY = 12 + ny * 11 * activeProximity - pressFactor * 4;
        const shadowBlur = 20 + activeProximity * 22 - pressFactor * 8;
        const shadowAlpha = 0.2 + activeProximity * 0.22;
        const textX = -tx * 0.18;
        const textY = -ty * 0.18;
        const warpX = nx * 0.7 * activeProximity;
        const warpY = ny * 0.7 * activeProximity;

        item.el.style.setProperty("--pm-prox", activeProximity.toFixed(4));
        item.el.style.setProperty("--pm-hover", item.hovered ? "1" : "0");
        item.el.style.setProperty("--pm-press", pressFactor.toFixed(2));
        item.el.style.setProperty("--pm-tx", `${tx.toFixed(3)}px`);
        item.el.style.setProperty("--pm-ty", `${ty.toFixed(3)}px`);
        item.el.style.setProperty("--pm-rx", `${rx.toFixed(3)}deg`);
        item.el.style.setProperty("--pm-ry", `${ry.toFixed(3)}deg`);
        item.el.style.setProperty("--pm-scale", scale.toFixed(4));
        item.el.style.setProperty("--pm-shadow-x", `${shadowX.toFixed(3)}px`);
        item.el.style.setProperty("--pm-shadow-y", `${shadowY.toFixed(3)}px`);
        item.el.style.setProperty("--pm-shadow-blur", `${shadowBlur.toFixed(3)}px`);
        item.el.style.setProperty("--pm-shadow-alpha", shadowAlpha.toFixed(4));
        item.el.style.setProperty("--pm-x", `${glowX.toFixed(2)}%`);
        item.el.style.setProperty("--pm-y", `${glowY.toFixed(2)}%`);
        item.el.style.setProperty("--pm-glow-size", `${item.glowSize.toFixed(1)}px`);
        item.el.style.setProperty("--pm-text-x", `${textX.toFixed(3)}px`);
        item.el.style.setProperty("--pm-text-y", `${textY.toFixed(3)}px`);
        item.el.style.setProperty("--pm-warp-x", `${warpX.toFixed(3)}deg`);
        item.el.style.setProperty("--pm-warp-y", `${warpY.toFixed(3)}deg`);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      requestUpdate();
    };

    const onPointerLeaveWindow = () => {
      pointerX = -10_000;
      pointerY = -10_000;
      requestUpdate();
    };

    const cleanups: Array<() => void> = [];

    for (const item of records) {
      const onEnter = () => {
        item.hovered = true;
        requestUpdate();
      };
      const onLeave = () => {
        item.hovered = false;
        item.pressed = false;
        requestUpdate();
      };
      const onDown = () => {
        item.pressed = true;
        requestUpdate();
      };
      const onUp = () => {
        item.pressed = false;
        requestUpdate();
      };

      item.el.addEventListener("pointerenter", onEnter, { passive: true });
      item.el.addEventListener("pointerleave", onLeave, { passive: true });
      item.el.addEventListener("pointerdown", onDown, { passive: true });
      item.el.addEventListener("pointerup", onUp, { passive: true });
      item.el.addEventListener("pointercancel", onUp, { passive: true });
      item.el.addEventListener("pointermove", onPointerMove, { passive: true });

      cleanups.push(() => {
        item.el.removeEventListener("pointerenter", onEnter);
        item.el.removeEventListener("pointerleave", onLeave);
        item.el.removeEventListener("pointerdown", onDown);
        item.el.removeEventListener("pointerup", onUp);
        item.el.removeEventListener("pointercancel", onUp);
        item.el.removeEventListener("pointermove", onPointerMove);
      });
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeaveWindow, { passive: true });
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    requestUpdate();

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeaveWindow);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [pathname, reduceMotion]);

  return null;
}
