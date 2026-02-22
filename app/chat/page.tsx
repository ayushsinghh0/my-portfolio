import { HeroSection } from "@/components/hero-section";
import { HomeOverview } from "@/components/home-overview";
import { SiteShell } from "@/components/site-shell";

type ChatPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function ChatPage({ searchParams }: ChatPageProps) {
  const params = await searchParams;

  return (
    <SiteShell hideFooter>
      <HeroSection chatMode />
      <HomeOverview key={params.q ?? "chat-root"} chatMode initialQuestion={params.q} />
    </SiteShell>
  );
}
