"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Users } from "lucide-react";
import ImageSlider from "@/components/Organization/ImageSlider";
import { CarouselItem } from "@/components/ui/carousel";
import TabNav from "@/components/Common/TabNav";

type MatchStatus = "upcoming" | "live" | "past";

type MatchItem = {
  id: number;
  title: string;
  date: string;
  image: string;
  viewers: string;
  sport: string;
  status: MatchStatus;
};

const matches: MatchItem[] = [
  {
    id: 1,
    title: "AZ vs. FC Twente",
    date: "15 May 2020 9:00 am",
    image: "/landing/match1.webp",
    viewers: "1.5M",
    sport: "Football",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Portugal vs. Poland",
    date: "15 May 2020 9:30 am",
    image: "/landing/match1.webp",
    viewers: "1.5M",
    sport: "Boxing",
    status: "live",
  },
  {
    id: 3,
    title: "Florence vs. Shelton State",
    date: "15 May 2020 8:00 am",
    image: "/landing/match1.webp",
    viewers: "1.5M",
    sport: "Cricket",
    status: "past",
  },
  {
    id: 4,
    title: "WJF 20: The Championship",
    date: "15 May 2020 8:30 am",
    image: "/landing/match1.webp",
    viewers: "1.2M",
    sport: "Cricket",
    status: "upcoming",
  },
  {
    id: 5,
    title: "India vs Pakistan",
    date: "15 May 2020 8:30 am",
    image: "/landing/match1.webp",
    viewers: "1.9M",
    sport: "Cricket",
    status: "live",
  },
  {
    id: 6,
    title: "Man Utd vs Arsenal",
    date: "14 May 2020 7:00 pm",
    image: "/landing/match1.webp",
    viewers: "2.1M",
    sport: "Football",
    status: "past",
  },
];

const tabs = [
  { name: "All Matches", filter: "all" as const },
  { name: "Past Matches", filter: "past" as const },
  { name: "Live Streams", filter: "live" as const },
  { name: "Upcoming Matches", filter: "upcoming" as const },
];


export default function Schedule() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const filteredMatches = useMemo(
    () =>
      activeTab === "all"
        ? matches
        : matches.filter((m) => m.status === (activeTab as MatchStatus)),
    [activeTab]
  );

  const badgeClass = (status: MatchStatus) =>
    status === "live"
      ? "bg-red-600 text-white"
      : status === "upcoming"
      ? "bg-purple-600 text-white"
      : "bg-gray-600 text-white";

  // Placeholder translation object to mirror snippet usage
  const common = { match_schedule_one: "Match Schedule" };

  return (
    <section
      id="schedule_section"
      className="bg-black text-white h-full md:px-6 py-[5%] "
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded flex items-center justify-center">
          <Image
            src="/landing/star.webp"
            alt="asterisk-icon"
            width={35}
            height={35}
            className="size-[25px] md:size-[30px] lg:size-[35px] object-contain"
          />
        </div>
        <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
          {common.match_schedule_one}
        </h1>
      </div>
      <div className="border-t border-[#1C1A26] mb-4"></div>

      {/* Navigation Tabs */}
      <TabNav
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        className="justify-start md:justify-center items-start md:items-center mb-6"
      />

      {/* Match Cards */}
      <ImageSlider className="md:gap-10 gap-10">
        {filteredMatches.map((match) => (
          <CarouselItem
            key={match.id}
            className="flex-shrink-0 gap-5 w-80 max-w-[320px] p-0 bg-gray-900 rounded-xl overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={match.image}
                alt={match.title}
                fill
                sizes="320px"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute top-4 left-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${badgeClass(
                    match.status
                  )}`}
                >
                  {match.status === "live"
                    ? "Live"
                    : match.status === "upcoming"
                    ? "Upcoming"
                    : "Past"}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-lg mb-1">
                  {match.title}
                </h3>
                <p className="text-gray-300 text-sm">{match.date}</p>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-400">
                <Users className="w-4 h-4" />
                <span className="text-sm">{match.viewers}</span>
              </div>
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </CarouselItem>
        ))}
      </ImageSlider>
    </section>
  );
}
