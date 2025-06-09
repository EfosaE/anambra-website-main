"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TopTabs from "@/components/TopTabs";

const sidebarLinks = [
  "About State",
  "Past Governors",
  "Key Landmarks",
  "Climate",
  "Culture",
  "Tourism",
  "Education",
  "Healthcare",
  "Infrastructure",
  "Economy",
];

const moreParagraphs = [
  {
    title: "Administration",
    text: `The state capital territory, Awka, famous for its legendary blacksmithing, spans six Local Government Areas of Anaocha, Awka South, Awka North, Dunukofia, Njikoka and Orumba North. The Capital Territory covers a land area of 400sq kilometers.`,
  },
  {
    title: "Populagtion",
    text: `With an estimated population of about 5,084,195 (2015 Census estimate), Anambra is the tenth most populous state in Nigeria. The Igbo language is the mother tongue, but English is widely spoken due to the early influence of Missionary Schools & The Royal Niger Company Traders. A vast majority speak pidgin, a mix of native Igbo dialect and the confluencing English Language, which was probably for ease of trade with visiting Europeans.`,
  },
  {
    title: "Culture",
    text: `Ndi Anambra live and work in virtually every part of the country and easily learn the languages of their places of sojourn. They also integrate easily with the host communities where they find themselves. As a fallout of their friendliness and large-hearted nature, Ndi Anambra have very high regard for and are openly generous to strangers. Indeed, the people are willing to go to great lengths to shower their well-known traditional hospitality on the visitors and strangers. Ndi Anambra are a people of uncommon species, shaped by history and environment to be tough, hardworking, creative, innovative and adventurous.`,
  },
  {
    title: "Notable Figures",
    text: `The people of Anambra State are perhaps its most outstanding assets and the reason why the State is regarded as 'The Light of the Nation, Nigeria'. The history of Africa and indeed the entire black race can never be told without the mention of outstanding sons and daughters of Anambra like: 
The great 'Zik of Africa', Rt. Hon. Dr. Nnamdi Azikiwe, who played a key role in the emancipation of Africa and who is one of the founders of modern Nigeria; Sir Louis Philippe Odumegwu-Ojukwu, one of Africa's earliest millionaires; Chief Mrs Margaret Ekpo (Margaret Obiasulor), Nigeria's pioneer female politician, activist and leader; Professor Chinua Achebe, novelist, poet, professor and critic, whose first novel, "Things Fall Apart", is considered the most widely read book in modern African Literature. The never-ending list includes the First African Secretary-General of the Commonwealth, Chief Emeka Anyaoku; fiery pre and post-independence politicians like Chief Mbazulike Amaechi and Chief Mokwugo Okoye; and the First Vice President of the Federal Republic of Nigeria, Dr Alex Ekwueme, to mention but a few. 
Indeed, there is at least one 'Onye Anambra' in the top ten bracket of any area of human endeavor.`,
  },
];

const landmarks = [
  {
    image: "/images/azik.png",
    name: "Rt. Hon. Dr. Nnamdi Azikiwe",
    highlight: "The Great 'Zik of Africa'",
    category: "History",
    description:
      "Played a key role in the emancipation of Africa and who is one of the founders of modern Nigeria; ",
  },
  {
    image: "/images/azik.png",
    name: "Rt. Hon. Dr. Nnamdi Azikiwe",
    highlight: "The Great 'Zik of Africa'",
    category: "History",
    description:
      "Played a key role in the emancipation of Africa and who is one of the founders of modern Nigeria; ",
  },
  {
    image: "/images/azik.png",
    name: "Rt. Hon. Dr. Nnamdi Azikiwe",
    highlight: "The Great 'Zik of Africa'",
    category: "History",
    description:
      "Played a key role in the emancipation of Africa and who is one of the founders of modern Nigeria; ",
  },
];

const scrollableImages = [
  "/images/anambra_landmark1.jpg",
  "/images/anambra_landmark2.jpg",
  "/images/anambra_landmark3.jpg",
];

export default function Anambra() {
  const [activeTab, setActiveTab] = useState("About State");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="mt-[50px] mb-[70px] text-[40px] font-bold text-black text-center">
        Welcome To Anambra
      </h2>

      <TopTabs />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="md:col-span-2">
          <div className="flex flex-col border rounded-md overflow-hidden">
            {sidebarLinks.map((link, idx) => (
              <button
                key={idx}
                className="py-3 px-4 border-b last:border-none text-left text-sm hover:bg-gray-100"
              >
                {link}
              </button>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <div className="md:col-span-10 space-y-12">
          {/* Section: History */}
          <div className="grid md:grid-cols-2 gap-6 items-start md:items-center">
            <div>
              <h3 className="inline-block text-sm mb-[10px] font-semibold text-[#CB681C] bg-[#CB681C]/20 px-4 py-2 rounded">
                History
              </h3>
              <p className="text-gray-700">
                Anambra is a state of rich history and great myths. Created on
                August 27, 1991, by the then Military President Ibrahim
                Babangida GCFR, the state derives its name from Anambra River,
                which is a colonial convenient pronunciation of Omambala River.
                The River Anambra is a tributary of the majestic River Niger.
              </p>
              <p className="text-gray-700">
                The diverse perspectives to the origin of Anambra and Ndi
                Anambra are as mythical as the great people. Ndi Anambra are
                among the first set of God's creation on Earth, who migrated
                from the cradle of human civilization to their present location.
                Their history is strongly linked to the history of the entire
                Igboland, as Ndi Anambra are perceived as the source of Igbo
                Civilization.
              </p>
              <p className="text-gray-700">
                Archaeological findings confirm their existence dates as far
                back as 4500BC, with evidence unearthed in various locations in
                the state, including Igbo Ukwu, Aguleri, Awka, Ezira and Nri.
              </p>
            </div>
            <div className="flex items-center h-full">
              <Image
                src="/images/history.png"
                width={436}
                height={254}
                alt="Anambra"
                className="rounded-md w-full h-auto self-center"
              />
            </div>
          </div>

          {/* Section: Geography */}
          <div className="grid md:grid-cols-2 gap-6 py-[40px] items-start md:items-center">
            <div className="flex items-center h-full">
              <Image
                src="/images/geography.png"
                width={436}
                height={254}
                alt="Anambra"
                className="rounded-md w-full h-auto justify-center"
              />
            </div>

            <div>
              <h3 className="inline-block text-sm font-semibold mb-[10px] text-[#CB681C] bg-[#CB681C]/20 px-4 py-2 rounded">
                Geography
              </h3>
              <p className="text-gray-700">
                The natural features of Hills, Lakes, Caves, Forests, and table
                Savannah land form the beautiful landscapes of Anambra State.
                Situated on a rolling flat savannah land, dotted by Hills,
                Lakes, Forests, and caves on the eastern plains of the River
                Niger, Anambra State covers an area of 4,416sq kilometers with
                rainforest vegetation, humid climate, a temperature of about
                87°F, and rainfall of between 152cm and 203cm.
              </p>
              <p className="text-gray-700">
                Anambra State shares boundaries with Abia, Delta, Enugu, Imo,
                and Kogi States making it one of the few states in the country
                with many neighbors.
              </p>
            </div>
          </div>

          {/* Section: Economy */}
          <div className="grid md:grid-cols-2 gap-6 py-[20px] items-start">
            <div>
              <h3 className="inline-block text-sm font-semibold mb-[10px] text-[#CB681C] bg-[#CB681C]/20 px-4 py-2 rounded">
                Economy
              </h3>
              <p className="text-gray-700">
                The economic climate is highly favorable with a combination of
                large markets, abundant skilled labor force, entrepreneurial
                ability and easy access to capital and natural resources. The
                state has a business environment that is conducive and a number
                of investment incentives.
              </p>
              <p className="text-gray-700">
                Agriculture is important in the state: oil palm, corn, rice,
                yam, and cassava are the main cash crops. Fishing in inland
                waterways is a significant commercial activity. The principal
                minerals found in the state are gypsum, kaolin, bauxite, iron
                ore, and lead. Anambra state also has natural gas and crude oil.
                Major industries include breweries, textiles, tourism, and soft
                drinks bottling. Locally produced sculptures of wood and metal
                are also of commercial importance.
              </p>
              <p className="text-gray-700">
                The city of Onitsha has strong trade links with many parts of
                the country and the world. Its market is the largest in West
                Africa. Nnewi, the second most economically vibrant centre after
                Onitsha, has virtually become the automobile spare parts market
                of the nation and a fast-growing industrial centre.
              </p>
            </div>
            <div className="flex items-center h-full">
              <Image
                src="/images/economy.png"
                width={436}
                height={254}
                alt="Anambra"
                className="rounded-md w-full h-auto"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 bg-[#000000]/20  mt-6">
            {[
              ["6M+", "Beautiful People"],
              ["21", "Local Government"],
              ["N200+", "Yearly Revenue"],
              ["4,416sq km", "Land Area"],
            ].map(([count, label], idx) => (
              <div key={idx} className="bg-gray-100 p-6 text-center">
                <h3 className="text-2xl font-bold">{count}</h3>
                <p className="text-sm text-gray-600">{label}</p>
              </div>
            ))}
          </div>
          <div className="max-w-[707px] w-full">
            {/* More Paragraphs */}
            {moreParagraphs.map((para, idx) => (
              <div key={idx} className="mt-10">
                <h3 className="inline-block mb-4 text-sm font-semibold text-[#CB681C] bg-[#CB681C]/20 px-4 py-2 rounded">
                  {para.title}
                </h3>
                <p className="text-gray-700 text-sm">{para.text}</p>
              </div>
            ))}

            {/* Notable people Scroll */}
            <div className="relative mt-12 max-w-[685px]">
              {/* Left Arrow */}
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow"
              >
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              </button>

              {/* Scrollable Container */}
              <div
                ref={scrollRef}
                className="flex gap-6 overflow-x-auto scrollbar-none scroll-smooth px-8"
              >
                {landmarks.map((item, idx) => (
                  <div
                    key={idx}
                    className="min-w-[340px] max-w-[340px] bg-white border rounded-md shadow-sm overflow-hidden"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={340}
                      height={208}
                      className="w-full h-52 object-cover rounded-md"
                    />
                    <div className="pt-4 pb-4 px-4">
                      <h3 className="text-[16px] font-semibold leading-[28px] text-gray-900">
                        {item.name}
                      </h3>
                      <h3 className="text-[16px] font-semibold leading-[28px] text-gray-900">
                        {item.highlight}
                      </h3>
                      <p className="text-[14px] leading-[22px] text-gray-700">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow"
              >
                <ChevronRight className="w-5 h-5 text-gray-800" />
              </button>
            </div>

            {/* Section: Anthem */}
            <div className="grid md:grid-cols-2 gap-6 py-[40px] items-start">
              <div>
                <h3 className="inline-block text-sm font-semibold mb-[10px] text-[#CB681C] bg-[#CB681C]/20 px-4 py-2 rounded">
                  Anthem
                </h3>
                <p className="text-gray-700">
                  With all our hearts we pray and ask, God bless Anambra, God
                  bless the shining light that we bear. We are the only ones to
                  make her brighter, the only ones to make her better, the only
                  ones to make Anambra shine, with our sweat and blood every
                  breath of our lives, with trust in God, we would lift our
                  homeland high, we believe in togetherness; we'll build a land
                  of progress.
                </p>
                <p>
                  Refrain: Lift the spirit of Anambra! Lift the spirit of
                  Anambra! Lift the spirit of Anambra State we love.
                </p>
              </div>
              <Image
                src="/images/video.png"
                width={436}
                height={254}
                alt="Anambra"
                className="rounded-md w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
