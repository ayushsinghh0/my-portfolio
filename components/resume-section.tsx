"use client";

import { motion } from "framer-motion";
import { FiDownload, FiExternalLink, FiFileText } from "react-icons/fi";

const RESUME_PATH = "/resume/Ayush-Raj-Resume.pdf";

export function ResumeSection() {
  return (
    <section id="resume" className="pt-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-5xl"
      >
        <h2 className="font-edgy text-3xl sm:text-4xl">Resume</h2>
        <p className="mt-2.5 max-w-3xl text-[clamp(0.95rem,1vw,1.08rem)] leading-relaxed text-[var(--muted)]">
          Download or open my latest resume to review project depth, technical
          stack, and problem-solving track record.
        </p>

        <div className="mt-4 flex flex-wrap gap-2.5">
          <a
            href={RESUME_PATH}
            download="Ayush-Raj-Resume.pdf"
            data-premium
            data-premium-variant="button"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-[#1a1a1a] hover:brightness-105"
          >
            <FiDownload className="h-4 w-4" />
            <span data-premium-text>Download Resume</span>
          </a>
          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noopener noreferrer"
            data-premium
            data-premium-variant="button"
            className="panel inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semiboldtext-foreground hover:-translate-y-0.5"
          >
            <FiExternalLink className="h-4 w-4" />
            <span data-premium-text>Open Resume</span>
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        className="panel-strong mx-auto mt-4.5 hidden max-w-5xl overflow-hidden rounded-2xl md:block"
      >
        <div className="flex items-center gap-2 border-b border-[var(--panel-border)] px-4 py-3 text-sm text-[var(--muted)]">
          <FiFileText className="h-4 w-4" />
          Resume Preview
        </div>
        <iframe
          title="Ayush Raj Resume"
          src={`${RESUME_PATH}#toolbar=0&navpanes=0&scrollbar=1`}
          className="h-[34rem] w-full bg-white"
        />
      </motion.div>
    </section>
  );
}
