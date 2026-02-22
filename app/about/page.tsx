import { AboutSection } from "@/components/about-section";
import { PageTitle } from "@/components/page-title";
import { SiteShell } from "@/components/site-shell";

export default function AboutPage() {
  return (
    <SiteShell>
      <PageTitle subtitle="Software Engineer" />
      <AboutSection />
    </SiteShell>
  );
}
