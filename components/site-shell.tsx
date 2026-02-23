import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Starfield } from "@/components/starfield";
import { PremiumMotionController } from "@/components/ui/premium-motion-controller";

type SiteShellProps = {
  children: ReactNode;
  hideFooter?: boolean;
  maxWidthClass?: string;
};

export function SiteShell({
  children,
  hideFooter = false,
  maxWidthClass = "max-w-7xl",
}: SiteShellProps) {
  return (
    <div className="relative isolate min-h-screen">
      <PremiumMotionController />
      <Starfield />
      <Navbar />
      <main
        className={`relative z-10 mx-auto flex w-full ${maxWidthClass} flex-col px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:px-6 md:pl-24 lg:px-8 lg:pl-[7.5rem]`}
      >
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
