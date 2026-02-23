import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Fraunces, JetBrains_Mono, Unbounded } from "next/font/google";
import { HangingThemeToggle } from "@/components/hanging-theme-toggle";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const atkinson = Atkinson_Hyperlegible({
  variable: "--font-atkinson-hyperlegible",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  display: "swap",
});

const themeInitScript = `
(() => {
  const storageKey = "theme";
  const root = document.documentElement;
  const classList = root.classList;

  const applyTheme = (theme) => {
    classList.remove("light", "dark");
    classList.add(theme);
    root.style.colorScheme = theme;
  };

  try {
    const storedTheme = localStorage.getItem(storageKey);
    if (storedTheme === "light" || storedTheme === "dark") {
      applyTheme(storedTheme);
      return;
    }

    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(systemDark ? "dark" : "light");
  } catch {
    applyTheme("light");
  }
})();
`;

const hydrationSanitizerScript = `
(() => {
  const shouldRemove = (name) =>
    name === "bis_register" || name.startsWith("bis_") || name.startsWith("__processed_");

  const cleanNode = (node) => {
    if (!(node instanceof Element)) return;
    for (const attrName of node.getAttributeNames()) {
      if (shouldRemove(attrName)) {
        node.removeAttribute(attrName);
      }
    }
  };

  const cleanTree = (root) => {
    cleanNode(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
    while (walker.nextNode()) {
      cleanNode(walker.currentNode);
    }
  };

  cleanTree(document.documentElement);

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes" && mutation.attributeName && shouldRemove(mutation.attributeName)) {
        if (mutation.target instanceof Element) {
          mutation.target.removeAttribute(mutation.attributeName);
        }
      }

      if (mutation.type === "childList" && mutation.addedNodes.length) {
        for (const node of mutation.addedNodes) {
          cleanTree(node);
        }
      }
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    childList: true,
    subtree: true,
  });

  window.addEventListener("load", () => {
    window.setTimeout(() => observer.disconnect(), 4000);
  });
})();
`;

export const metadata: Metadata = {
  title: "Ayush Raj | Backend Engineer & Full Stack Developer",
  description:
    "Portfolio of Ayush Raj, Backend Engineer and Full Stack Developer focused on distributed systems and scalable architectures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: hydrationSanitizerScript }} />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        suppressHydrationWarning
        className={`${atkinson.variable} ${jetBrainsMono.variable} ${fraunces.variable} ${unbounded.variable} bg-background font-sans text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme
          disableTransitionOnChange
          storageKey="theme"
        >
          <HangingThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
