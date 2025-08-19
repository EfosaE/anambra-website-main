// app/faq/page.tsx

import AllFAQsComponent from "@/components/AllFAQsComponent";
import FAQComponent from "@/components/FAQComponent";
import { fetchHomepageData } from "@/lib/clients/homepage.client";

export default function FAQPage() {
  return (
    <main className="container mx-auto px-4 pt-[50px] pb-20">
      {/* <FAQComponent faqs={faqs} /> */}
      <AllFAQsComponent />
    </main>
  );
}
