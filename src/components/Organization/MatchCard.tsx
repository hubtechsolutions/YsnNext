"use client";

import React from "react";
import { Star } from "lucide-react";
import ImageSlider from "./ImageSlider";
import { CarouselItem } from "../ui/carousel";
import MatchBgCard from "./MatchBgCard";
import Image from "next/image";

type MatchScheduleItem = {
  match_id: number;
  your_team_name: string;
  team_logo: string | null;
  opponent_team_name: string;
  opponent_team_logo: string | null;
  match_played_date: string;
  your_team_score?: number | string | null;
  opponent_team_score?: number | string | null;
  win_or_lose?: "Won" | "Loss" | "Tie" | string | null;
};

type MatchCardProps = {
  matchschedules: MatchScheduleItem[];
};

// Derive result if API didn't send or if you want to re-check
function computeResult(
  a?: number | string | null,
  b?: number | string | null
): "Won" | "Loss" | "Tie" {
  const na = Number(a);
  const nb = Number(b);
  if (isNaN(na) || isNaN(nb)) return "Tie";
  if (na === nb) return "Tie";
  return na > nb ? "Won" : "Loss";
}

const safeLogo = (logo: string | null) =>
  logo && logo.trim() !== "" ? logo : "/ysnlogo.webp";

export default function MatchCard({ matchschedules }: MatchCardProps) {
  return (
    <div className="container mx-auto md:p-6">
      <div className="flex justify-between items-center gap-3 mt-20">
        <div className="flex items-center gap-3">
          <Image src="/landing/star.webp" alt="Star" width={32} height={32} />
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-white">
            Match Schedules
          </h1>
        </div>
      </div>
      <div className="border-t border-[#1C1A26] mt-4 mb-10" />
      {matchschedules?.length ? (
        <ImageSlider className="">
          {matchschedules.map((m) => {
            const winOrLose =
              (m.win_or_lose as "Won" | "Loss" | "Tie" | undefined) ||
              computeResult(m.your_team_score, m.opponent_team_score);
            return (
              <CarouselItem
                key={m.match_id}
                className="basis-auto w-[280px] xs:w-[320px] md:w-[340px] lg:w-[420px] shrink-0"
              >
                <MatchBgCard
                  item={{
                    id: m.match_id,
                    match_played_date: m.match_played_date,
                    your_team_name: m.your_team_name,
                    team_logo: safeLogo(m.team_logo),
                    opponent_team_name: m.opponent_team_name,
                    opponent_team_logo: safeLogo(m.opponent_team_logo),
                    your_team_score: m.your_team_score ?? "-",
                    opponent_team_score: m.opponent_team_score ?? "-",
                    win_or_lose: winOrLose,
                  }}
                />
              </CarouselItem>
            );
          })}
        </ImageSlider>
      ) : (
        <div className="flex justify-center">
          <p className="text-white">There are no past matches yet.</p>
        </div>
      )}
    </div>
  );
}
