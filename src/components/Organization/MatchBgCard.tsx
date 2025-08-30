"use client";

import React from "react";
import Image from "next/image";

type MatchBgItem = {
  id: number | string;
  match_played_date: string;
  your_team_name: string;
  team_logo: string | null;
  opponent_team_name: string;
  opponent_team_logo: string | null;
  your_team_score?: number | string;
  opponent_team_score?: number | string;
  win_or_lose?: "Won" | "Loss" | "Tie" | string;
};

export default function MatchBgCard({ item }: { item: MatchBgItem }) {
  return (
    <div className="relative w-full max-w-[450px] mx-auto rounded-2xl font-sans text-white overflow-hidden pb-5 bg-center bg-cover bg-[url('/landing/card-bg.webp')]">
      <div className="absolute pointer-events-none">
        <Image
          src="/landing/trophy.webp"
          alt="Trophy"
          width={200}
          height={150}
          className="w-[200px] h-[150px] object-cover z-1"
        />
      </div>
      {/* Date */}
      <div className="text-gray-300 text-center mb-1 pt-4 text-xs">
        {item.match_played_date}
      </div>
      {/* Match Info */}
      <div className="flex items-center justify-between h-full z-5">
        <div className="flex flex-col items-center h-full text-center justify-center">
          <Image
            src={(item.team_logo ?? "/ysnlogo.webp") || "/ysnlogo.webp"}
            alt={item.your_team_name || "Team"}
            width={71}
            height={71}
            className="size-[60px] lg:size-[71px] pb-2 object-contain"
          />
          <div className="relative group w-[110px] lg:w-[130px]">
            <span className="max-lg:text-[12px] max-xl:text-[14px] max-2xl:text-[14px] pl-2 truncate block max-md:w-[50%] max-lg:w-[70%] w-full">
              {item.your_team_name}
            </span>
            <div className="absolute z-50 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow-md top-0 mt-1 w-max max-w-[200px] whitespace-normal">
              {item.your_team_name}
            </div>
          </div>
        </div>

        {/* Score */}
        <div
          className={`${
            (Number(item.your_team_score) || Number(item.opponent_team_score)) >
            100
              ? "text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px]"
              : "text-[24px] lg:text-[32px]"
          } font-bold h-full text-start pb-8`}
        >
          {item.your_team_score ?? "-"} : {item.opponent_team_score ?? "-"}
        </div>
        {/* Right Team */}
        <div className="flex flex-col items-center h-full text-center justify-center">
          <Image
            src={
              (item.opponent_team_logo ?? "/ysnlogo.webp") || "/ysnlogo.webp"
            }
            alt={item.opponent_team_name || "Opponent"}
            width={71}
            height={71}
            className="size-[60px] lg:size-[71px] pb-2 object-contain"
          />
          <div className="relative group w-[110px] lg:w-[130px]">
            <span className="max-lg:text-[12px] max-xl:text-[14px] max-2xl:text-[14px] pl-2 truncate block w-full">
              {item.opponent_team_name}
            </span>
            <div className="absolute z-50 hidden group-hover:block bg-black text-white text-[14px] px-2 py-1 rounded shadow-md top-0 mt-1 w-max max-w-[200px] whitespace-normal">
              {item.opponent_team_name}
            </div>
          </div>
        </div>
      </div>

      {/* WON/LOSS/TIE */}
      <div className="absolute bottom-[8px] left-1/2 transform -translate-x-1/2 z-10">
        {item.win_or_lose === "Won" ? (
          <span className="bg-green-600 text-white text-xs font-bold px-5 lg:px-10 rounded-full shadow-md py-2">
            WON
          </span>
        ) : item.win_or_lose === "Tie" ? (
          <span className="bg-yellow-500 text-white text-xs font-bold px-5 lg:px-10 rounded-full shadow-md py-2">
            TIE
          </span>
        ) : item.win_or_lose === "Loss" ? (
          <span className="bg-red-600 text-white text-xs font-bold px-5 lg:px-10 rounded-full shadow-md py-2">
            LOSS
          </span>
        ) : null}
      </div>
    </div>
  );
}
