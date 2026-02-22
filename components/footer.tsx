import { socialLinks } from "@/data/portfolio";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-4 pb-8 pt-12 sm:px-6 lg:px-8">
      <div className="panel mx-auto flex w-full max-w-4xl flex-col items-center justify-between gap-4 rounded-2xl px-5 py-5 text-sm text-[var(--muted-foreground)] sm:flex-row">
        <p className="opacity-95">(c) {year} Ayush Raj. Built with Next.js & TypeScript.</p>
        <div className="flex items-center gap-4 text-[var(--muted-foreground)]">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-premium
              data-premium-variant="button"
              className="inline-flex items-center gap-2 opacity-95 transition-opacity hover:text-[var(--foreground)] hover:opacity-100"
            >
              <link.icon className="h-4 w-4" />
              <span data-premium-text>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
