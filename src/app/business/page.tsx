// app/business/page.tsx or components/BusinessPage.tsx

"use client";

import HeadingSection from "@/components/business/HeadingSection";
import OverviewSection from "@/components/business/OverviewSection";
import RequirementsSection from "@/components/business/RequirementsSection";
import StimulatorsSection from "@/components/business/StimulatorsSection ";
import MdaProcessesSection from "@/components/business/MdaProcessesSection";
import ContactSection from "@/components/business/ContactSection";

export default function BusinessPage() {
  return (
    <main>
      <HeadingSection />
      <div className="container mx-auto">
        <OverviewSection />
        <StimulatorsSection />
        <RequirementsSection />
        <MdaProcessesSection />
        <ContactSection />
      </div>
    </main>
  );
}
