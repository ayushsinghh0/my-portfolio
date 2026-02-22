import { ExperienceSection } from "@/components/experience-section";
import { PageTitle } from "@/components/page-title";
import { ResumeSection } from "@/components/resume-section";
import { SiteShell } from "@/components/site-shell";

export default function ExperiencePage() {
  return (
    <SiteShell>
      <PageTitle subtitle="Fresher | Creative Engineer" />
      <ExperienceSection />
      <ResumeSection />
    </SiteShell>
  );
}
