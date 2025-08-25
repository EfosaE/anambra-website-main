// app/business/page.tsx or components/BusinessPage.tsx
import HeadingSection from "@/components/business/HeadingSection";
import OverviewSection from "@/components/business/OverviewSection";
import RequirementsSection from "@/components/business/RequirementsSection";
import StimulatorsSection from "@/components/business/StimulatorsSection ";
import MdaProcessesSection from "@/components/business/MdaProcessesSection";
import ContactSection from "@/components/business/ContactSection";
import { fetchBusinessPage } from "@/lib/clients/business.client";
import SaberOfficials from "../../components/business/SaberOfficials";

export default async function BusinessPage() {
  const { businessPage } = await fetchBusinessPage();
  return (
    <main>
      <HeadingSection />
      <div className="max-w-7xl mx-auto">
        <OverviewSection
          introduction={businessPage.introduction}
          objectives={businessPage.objectives}
          spotlight={businessPage.spotlight}
          councilMembers={businessPage.councilMembers}
          frontliners={businessPage.frontliners}
          mandate={businessPage.mandate}
        />

        <StimulatorsSection stimulators={businessPage.stimulators} />
        <RequirementsSection requirement={businessPage.requirement} />
        <MdaProcessesSection
          mdaProcesses={businessPage.mdaProcesses}
          
          // fees={businessPage.fees}
        />
        <SaberOfficials  saberOfficials={businessPage.saberOfficials} />
        <ContactSection contactInfo={businessPage.contactInfo}/>
      </div>
    </main>
  );
}

// "use client"

// import Construction from '@/components/Construction'
// import React from 'react'

// const BusinessPage = () => {
//   return (
//     <Construction />
//   )
// }

// export default BusinessPage