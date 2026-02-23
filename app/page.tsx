import { redirect } from "next/navigation";
import { HeroSection } from "@/components/hero-section";
import { HomeOverview } from "@/components/home-overview";
import { SiteShell } from "@/components/site-shell";

type HomePageProps = {
  searchParams: Promise<{
    chat?: string;
  }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  if (params.chat === "true") {
    redirect("/chat");
  }

  return (
    <SiteShell hideFooter maxWidthClass="max-w-[88rem]">
      <HeroSection />
      <HomeOverview />
    </SiteShell>
  );
}
