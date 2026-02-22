import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Fraunces, JetBrains_Mono, Unbounded } from "next/font/google";
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
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
