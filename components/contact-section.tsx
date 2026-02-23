"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { socialLinks } from "@/data/portfolio";
import { CinematicRevealText } from "@/components/ui/cinematic-text";
import { useHydratedReducedMotion } from "@/components/ui/use-hydrated-reduced-motion";

export function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useHydratedReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headingDepthRaw = useTransform(scrollYProgress, [0, 1], [-6, 6]);
  const bodyDepthRaw = useTransform(scrollYProgress, [0, 1], [-14, 14]);
  const headingDepth = useSpring(headingDepthRaw, {
    stiffness: 108,
    damping: 24,
    mass: 0.72,
  });
  const bodyDepth = useSpring(bodyDepthRaw, {
    stiffness: 94,
    damping: 26,
    mass: 0.8,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", company: "", message: "" });
    } catch (err: unknown) {
      console.error(err);
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "An unexpected error occurred.",
      );
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="pt-8 md:pt-12">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl"
      >
        <motion.h2
          style={{ y: reduceMotion ? 0 : headingDepth }}
          className="font-display text-3xl sm:text-4xl"
        >
          <CinematicRevealText className="inline-block" duration={2.8}>
            Get In Touch
          </CinematicRevealText>
        </motion.h2>
        <motion.p
          style={{ y: reduceMotion ? 0 : bodyDepth }}
          className="mt-2.5 text-sm text-[var(--muted-foreground)] sm:text-base"
        >
          Email:{" "}
          <a
            href="mailto:ayushraj4820@gmail.com"
            className="text-[var(--foreground)] underline decoration-[var(--accent)]"
          >
            ayushraj4820@gmail.com
          </a>
        </motion.p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your Name"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={status === "loading"}
              className="w-full rounded-xl border border-[var(--panel-border)] bg-[var(--input)] px-4 py-3 text-[var(--foreground)] outline-none placeholder:text-[color-mix(in_oklab,var(--muted-foreground)_75%,transparent)] focus:border-[var(--accent)]"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={status === "loading"}
              className="w-full rounded-xl border border-[var(--panel-border)] bg-[var(--input)] px-4 py-3 text-[var(--foreground)] outline-none placeholder:text-[color-mix(in_oklab,var(--muted-foreground)_75%,transparent)] focus:border-[var(--accent)]"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="company"
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Company
            </label>
            <input
              id="company"
              type="text"
              placeholder="Company Name"
              value={formData.company}
              onChange={handleChange}
              disabled={status === "loading"}
              className="w-full rounded-xl border border-[var(--panel-border)] bg-[var(--input)] px-4 py-3 text-[var(--foreground)] outline-none placeholder:text-[color-mix(in_oklab,var(--muted-foreground)_75%,transparent)] focus:border-[var(--accent)]"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-[var(--foreground)]"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Tell me about the role or project..."
              required
              value={formData.message}
              onChange={handleChange}
              disabled={status === "loading"}
              className="w-full rounded-xl border border-[var(--panel-border)] bg-[var(--input)] px-4 py-3 text-[var(--foreground)] outline-none placeholder:text-[color-mix(in_oklab,var(--muted-foreground)_75%,transparent)] focus:border-[var(--accent)]"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            data-premium
            data-premium-variant="button"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[color-mix(in_oklab,var(--foreground)_14%,transparent)] bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-neutral-900 hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70 transition-all duration-200"
          >
            {status === "loading" ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="h-4 w-4 rounded-full border-2 border-neutral-900 border-t-transparent"
              />
            ) : (
              <FiSend className="h-4 w-4" />
            )}
            <span data-premium-text>
              {status === "loading" ? "Sending..." : "Send Message"}
            </span>
          </button>

          {/* Status Messages */}
          {status === "success" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium text-green-500 text-center mt-2"
            >
              Message sent successfully. I will get back to you soon.
            </motion.p>
          )}
          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm font-medium text-red-500 text-center mt-2"
            >
              {errorMessage}
            </motion.p>
          )}

        </form>

        <div className="mt-5 flex flex-wrap items-center gap-2.5">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-premium
              data-premium-variant="button"
              className="panel inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[var(--muted-foreground)] opacity-95 transition-opacity hover:text-[var(--foreground)] hover:opacity-100"
            >
              <link.icon className="h-4 w-4" />
              <span data-premium-text>{link.label}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
