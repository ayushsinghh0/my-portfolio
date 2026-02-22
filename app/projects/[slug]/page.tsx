import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiCalendar, FiCheckCircle, FiExternalLink, FiGithub, FiUsers } from "react-icons/fi";
import { projects } from "@/data/portfolio";
import { PageTitle } from "@/components/page-title";
import { SiteShell } from "@/components/site-shell";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const gradients = [
  "linear-gradient(135deg, #dca11f 0%, #efc459 45%, #e2a92d 100%)",
  "linear-gradient(135deg, #6e29da 0%, #a45ef1 48%, #7530de 100%)",
  "linear-gradient(135deg, #0e9268 0%, #4fb888 52%, #118d65 100%)",
];

const techIconSlugMap: Record<string, string> = {
  "Next.js": "nextdotjs",
  React: "react",
  TypeScript: "typescript",
  PostgreSQL: "postgresql",
  Redis: "redis",
  Kafka: "apachekafka",
  Razorpay: "razorpay",
  "Gemini AI": "googlegemini",
  "Node.js": "nodedotjs",
  Docker: "docker",
  WebSocket: "socketdotio",
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

function getPrimaryLink(project: (typeof projects)[number]) {
  if (project.websiteUrl && project.websiteUrl !== "#") {
    return project.websiteUrl;
  }
  if (project.liveUrl && project.liveUrl !== "#") {
    return project.liveUrl;
  }
  return project.githubUrl;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const projectIndex = projects.findIndex((item) => item.slug === slug);
  const gradient = gradients[(projectIndex + gradients.length) % gradients.length];
  const primaryLink = getPrimaryLink(project);
  const relatedProjects = projects.filter((item) => item.slug !== project.slug);

  return (
    <SiteShell>
      <PageTitle subtitle="Software Engineer" />

      <section className="pt-4 md:pt-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6">
            <Link
              href="/projects"
              data-premium
              data-premium-variant="button"
              className="inline-flex items-center gap-2 text-base font-medium text-[var(--primary)] hover:underline"
            >
              <FiArrowLeft className="h-4 w-4" />
              <span data-premium-text>Back to Projects</span>
            </Link>
          </div>

          <article
            className="grain relative overflow-hidden rounded-[1.5rem] border border-black/20 p-4 sm:p-5"
            style={{ background: gradient }}
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.12] [mask-image:radial-gradient(#fff,transparent,74%)]" />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="relative overflow-hidden rounded-2xl border border-black/25 bg-black/20 shadow-[0_14px_28px_rgba(0,0,0,0.22)]">
                {project.logoPath ? (
                  <div className="relative h-[8.7rem] w-[8.7rem]">
                    <Image src={project.logoPath} alt={`${project.title} logo`} fill className="object-cover" />
                  </div>
                ) : (
                  <video autoPlay loop muted playsInline preload="metadata" className="h-[8.7rem] w-[8.7rem] object-cover">
                    <source src={project.videoPath} type="video/mp4" />
                  </video>
                )}
              </div>

              <div className="max-w-3xl">
                <h1 className="text-balance text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.02] tracking-[-0.022em] text-black">
                  {project.title}
                </h1>
                <p className="mt-2 text-[1.04rem] leading-relaxed text-black/88 sm:text-[1.16rem]">{project.description}</p>
              </div>
            </div>
          </article>

          <div className="mt-8 grid gap-8 md:grid-cols-[1.45fr_1fr]">
            <div className="space-y-8">
              <section>
                <h2 className="font-display text-[clamp(2.1rem,4.2vw,3.1rem)] leading-[0.98] text-[var(--foreground)]">About</h2>
                <p className="mt-3 max-w-2xl text-[1.02rem] leading-[1.62] text-[var(--muted-foreground)] sm:text-[1.11rem]">
                  {project.about ?? project.description}
                </p>
              </section>

              <section>
                <h2 className="font-display text-[clamp(2.1rem,4.2vw,3.1rem)] leading-[0.98] text-[var(--foreground)]">
                  Key Features
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {(project.keyFeatures ?? []).map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[var(--muted-foreground)]">
                      <FiCheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[var(--primary)]" />
                      <span className="text-[0.995rem] leading-relaxed sm:text-[1.06rem]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="space-y-8">
              <section>
                <h3 className="font-display text-[clamp(1.8rem,3vw,2.35rem)] leading-[1.02] text-[var(--foreground)]">
                  Info
                </h3>
                <div className="mt-4 space-y-3.5 text-[var(--muted-foreground)]">
                  <a
                    href={primaryLink}
                    target="_blank"
                    rel="noreferrer"
                    data-premium
                    data-premium-variant="button"
                    className="inline-flex items-center gap-2 text-[1rem] text-[var(--primary)] underline-offset-4 hover:underline"
                  >
                    <span data-premium-text>{primaryLink}</span>
                  </a>

                  {project.launchedYear ? (
                    <div className="inline-flex items-center gap-2 text-[1rem]">
                      <FiCalendar className="h-4 w-4" />
                      <span>{project.launchedYear}</span>
                    </div>
                  ) : null}

                  {project.traction ? (
                    <div className="inline-flex items-center gap-2 text-[1rem]">
                      <FiUsers className="h-4 w-4" />
                      <span>{project.traction}</span>
                    </div>
                  ) : null}

                  <div className="flex flex-wrap gap-2 pt-1.5">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-premium
                      data-premium-variant="button"
                      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--panel-border)] bg-[var(--panel)] px-3 py-1.5 text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--panel-strong)]"
                    >
                      <FiGithub className="h-4 w-4" />
                      <span data-premium-text>GitHub</span>
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-premium
                      data-premium-variant="button"
                      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--panel-border)] bg-[var(--panel)] px-3 py-1.5 text-sm font-semibold text-[var(--foreground)] hover:bg-[var(--panel-strong)]"
                    >
                      <FiExternalLink className="h-4 w-4" />
                      <span data-premium-text>Live Demo</span>
                    </a>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="font-display text-[clamp(1.8rem,3vw,2.35rem)] leading-[1.02] text-[var(--foreground)]">
                  Tech
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => {
                    const iconSlug = techIconSlugMap[tech];
                    return (
                      <span
                        key={tech}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--panel-border)] bg-white px-2.5 py-1 text-[0.95rem] text-black"
                      >
                        {iconSlug ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={`https://cdn.simpleicons.org/${iconSlug}`}
                            alt={tech}
                            className="h-3.5 w-3.5"
                            loading="lazy"
                          />
                        ) : null}
                        <span>{tech}</span>
                      </span>
                    );
                  })}
                </div>
              </section>
            </aside>
          </div>

          <div className="mt-8 border-t border-[var(--panel-border)] pt-6">
            <h3 className="font-display text-[clamp(1.95rem,3.1vw,2.45rem)] leading-[1.02] text-[var(--foreground)]">
              More Projects
            </h3>
            <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
              {relatedProjects.map((item) => (
                <Link
                  key={item.slug}
                  href={`/projects/${item.slug}`}
                  data-premium
                  data-premium-variant="card"
                  data-premium-strength="0.08"
                  className="group block size-28 shrink-0 overflow-hidden rounded-2xl border border-[var(--panel-border)] bg-[var(--panel)] transition-transform duration-300 hover:-translate-y-1"
                >
                  {item.logoPath ? (
                    <div className="relative h-full w-full">
                      <Image src={item.logoPath} alt={item.title} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-[var(--muted-foreground)]">
                      Project
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
