import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { HangingThemeToggle } from "@/components/hanging-theme-toggle";
import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { PremiumMotionController } from "@/components/ui/premium-motion-controller";

type SiteShellProps = {
  children: ReactNode;
  hideFooter?: boolean;
};

export function SiteShell({ children, hideFooter = false }: SiteShellProps) {
  return (
    <div className="relative isolate min-h-screen">
      <PremiumMotionController />
      <Starfield />
      <HangingThemeToggle />
      <Navbar />
      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:px-6 md:pl-24 lg:px-8 lg:pl-[7.5rem]">
        {children}
      </main>
      {!hideFooter ? (
        <div className="relative z-10">
          <Footer />
        </div>
      ) : null}
    </div>
  );
}
