"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { fetchAllArticles } from "@/lib/clients/articles.client";
import { Article } from "@/types/graphql/articles";
import { useModal } from "@/context/modal-context";
import { GlobalQueryResponse } from "@/types/graphql/global";
import ChatBanner from "./ChatBanner";

export default function Navbar({
  icon,
}: {
  icon: GlobalQueryResponse["global"]["favicon"];
}) {
  // const cmsBaseUrl = "https://cms.anambrastate.gov.ng"; // adjust to your real domain
  // const logoUrl = icon?.url ? `${cmsBaseUrl}${icon.url}` : "/images/logo.png";
  console.log(icon.url);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const { openModal } = useModal();
  const pathname = usePathname();
  const showChatBanner = !pathname.startsWith("/chat");

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      {showChatBanner && <ChatBanner />}
      <nav className="sticky top-0 z-50 font-[Instrument Sans] bg-[#FFF9F2] border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between md:justify-center relative">
          {/* Menu (Mobile Only) */}
          <button
            className="md:hidden absolute left-4 text-3xl text-gray-700"
            onClick={toggleMenu}
            aria-label="Menu">
            ☰
          </button>

          {/* Logo (Centered) */}
          <div className="flex justify-center w-full md:w-auto">
            <Link href="/">
              <Image
                src={icon?.url?.trim() ? icon.url : "/images/logo.png"}
                alt="Anambra Logo"
                width={54.27}
                height={54.27}
                className="cursor-pointer"
              />
            </Link>
          </div>

          {/* Search (Mobile Only) */}
          <button
            onClick={openModal}
            className="md:hidden absolute right-4 text-gray-600 hover:text-black"
            title="Search">
            <FiSearch size={24} />
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-1 justify-center space-x-6 ml-20 text-sm">
            {navLinks.map((link, idx) =>
              link.label === "GOVERNMENT" || link.label === "MEDIA" ? (
                <div key={`${link.href}-${idx}`} className="relative group">
                  <button className="text-[#111111] hover:text-[#DA9617] transition flex items-center gap-1">
                    {link.label}
                    <FaChevronDown className="text-xs mt-1" />
                  </button>
                  <div className="absolute left-0 top-full mt-1 bg-white shadow-lg rounded-md z-50 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-200 ease-out">
                    <ul className="py-2 px-2">
                      {link.subLinks.map((subLink) => (
                        <li key={subLink.href} className="whitespace-nowrap">
                          <Link
                            href={subLink.href}
                            className="block px-4 py-2 text-[#111111] hover:bg-[#E9E9E9] transition rounded text-[10px] md:text-[14px]">
                            {subLink.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={clsx(
                    "text-[#111111] hover:text-[#DA9617] transition",
                    {
                      "text-[#DA9617] font-semibold": pathname === link.href,
                    }
                  )}>
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu */}
          <div
            className={clsx(
              "fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out",
              {
                "translate-x-full": !menuOpen,
                "translate-x-0": menuOpen,
              }
            )}>
            <div className="p-6 space-y-4 pt-20">
              {navLinks.map((link, idx) => (
                <div key={`${link.href}-${idx}`}>
                  {["GOVERNMENT", "MEDIA"].includes(link.label) ? (
                    <div>
                      <button
                        className="text-[#111111] hover:text-[#DA9617] transition text-lg font-medium flex items-center gap-1"
                        onClick={() =>
                          setOpenSubMenu((prev) =>
                            prev === link.label ? null : link.label
                          )
                        }>
                        {link.label}
                        <FaChevronDown className="text-xs mt-1" />
                      </button>

                      {openSubMenu === link.label && (
                        <div className="pl-4 mt-2 bg-[#E9E9E9] rounded-md py-2">
                          {link.subLinks.map((subLink) => (
                            <Link
                              key={subLink.href}
                              href={subLink.href}
                              className="block text-[#111111] hover:text-[#DA9617] transition font-medium px-2 py-1 text-[12px] md:text-[14px]"
                              onClick={() => {
                                setOpenSubMenu(null);
                                setMenuOpen(false); // close entire menu if needed
                              }}>
                              {subLink.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={clsx(
                        "block text-[#111111] hover:text-[#DA9617] transition text-lg font-medium",
                        {
                          "text-[#DA9617] font-semibold":
                            pathname === link.href,
                        }
                      )}
                      onClick={() => setMenuOpen(false)}>
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Overlay */}
          {menuOpen && (
            <div
              className="fixed inset-0 bg-black/30 z-30"
              onClick={toggleMenu}
            />
          )}

          {/* Search (Desktop) */}
          <div className="hidden md:flex items-center ml-6 ">
            <button
              onClick={openModal}
              className="text-gray-600 hover:text-black cursor-pointer"
              title="Search">
              <FiSearch size={20} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

const navLinks = [
  {
    href: "/",
    label: "HOME",
  },
  {
    href: "/anambra",
    label: "ABOUT",
    subLinks: [
      { href: "/anambra", label: "About" },
      { href: "/business", label: "Business in Anambra" },
    ],
  },
  {
    href: "/government",
    label: "GOVERNMENT",
    subLinks: [
      { href: "/government/mdas", label: "Ministries, Departments, Agencies" },
      { href: "/government/ansec", label: "Executive Council" },
      {
        href: "/government/lgas",
        label: "Local Government Area",
      },
    ],
  },
  {
    href: "/business",
    label: "BUSINESS",
    subLinks: [
      { href: "/anambra", label: "Business" },
      { href: "/business", label: "Business in Anambra" },
    ],
  },

  { href: "/services", label: "SERVICES" },

  { href: "/news", label: "NEWS" },

  {
    href: "/",
    label: "MEDIA",
    subLinks: [
      { href: "/document-library", label: "Documents" },
      { href: "/gallery", label: "Gallery" },
      { href: "/events", label: "Events" },
    ],
  },
];
