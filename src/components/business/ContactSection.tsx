// components/business/ContactSection.tsx

"use client";

export default function ContactSection() {
  return (
    <section id="Contact" className="w-full mt-[20px]">
      <div className="w-full py-[70px] px-4">
        <div className="flex items-center w-full">
          <div className="flex-1 h-px bg-[#B3B0AD]" />
          <h2 className="text-[24px] italic font-playfair text-center mx-6 whitespace-nowrap">
            Contact
          </h2>
          <div className="flex-1 h-px bg-[#B3B0AD]" />
        </div>
      </div>

      <ul className="space-y-4 text-[16px] text-center">
        <li>Name: Ministry of Business Development</li>
        <li>Email: business@state.gov.ng</li>
        <li>Phone: +234 800 123 4567</li>
      </ul>
    </section>
  );
}
