import "./globals.css";
import { Instrument_Sans, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ModalProvider } from "@/context/modal-context";
import ClientSearchDrawerWrapper from "@/components/ClientSearchDrawerWrapper";
import { fetchGlobalData } from "@/lib/clients/global.client";
import { Metadata } from "next/types";
import ApolloWrapper from "@/context/apollo-wrapper";
import ChatBanner from "@/components/ChatBanner";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-instrument",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

// export const metadata = {
//   title: {
//     default: "Anambra State Government",
//     template: "%s | Anambra State Government",
//   },
//   description: "Official platform for the Anambra State Government",
//   metadataBase: new URL("https://anambrastate.gov.ng/"),
//   openGraph: {
//     title: "Anambra State Government",
//     description: "Empowering citizens through digital access",
//     siteName: "Anambra State Government",
//     type: "website",
//     locale: "en_NG",
//     url: "https://anambrastate.gov.ng/",
//   },
// };
export async function generateMetadata(): Promise<Metadata> {
  const data = await fetchGlobalData();
  const seo = data?.defaultSeo;
  const favicon = data?.favicon?.url;

  return {
    title: {
      default: seo?.metaTitle || "Anambra State Government",
      template: `%s | ${data?.siteName || "Anambra State Government"}`,
    },
    description:
      seo?.metaDescription ||
      "Official platform for the Anambra State Government",
    metadataBase: new URL("https://anambrastate.gov.ng/"),
    openGraph: {
      title: seo?.metaTitle || "Anambra State Government",
      description:
        seo?.metaDescription || "Empowering citizens through digital access",
      siteName: data?.siteName || "Anambra State Government",
      type: "website",
      locale: "en_NG",
      url: "https://anambrastate.gov.ng/",
    },
    icons: {
      icon: favicon ? `${favicon}` : "/favicon.ico",
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await fetchGlobalData();
  console.log(data);
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${playfair.variable}`}>
      <body className="font-instrument text-body bg-background min-h-screen flex flex-col">
        <ApolloWrapper>
          <ModalProvider>
            
            <Navbar icon={data.favicon} />
            {children}
            <Footer />
            <ClientSearchDrawerWrapper />
          </ModalProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
