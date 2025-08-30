"use client";

import React, { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Lock, Share2, Star } from "lucide-react";

import { useAuthStore } from "@/lib/auth-store";
import Image from "next/image";
import Link from "next/link";
import ShareModal from "@/components/Common/ShareModal";
import ChatSection from "./ChatSection";

type RosterItem = {
  id: number;
  fullName: string;
  profileImage: string;
};

const sampleRosters: RosterItem[] = [
  { id: 1, fullName: "Alex Johnson", profileImage: "/landing/player.webp" },
  { id: 2, fullName: "Mia Thompson", profileImage: "/landing/player.webp" },
  { id: 3, fullName: "Jordan Lee", profileImage: "/landing/player.webp" },
  { id: 4, fullName: "Sam Taylor", profileImage: "/landing/player.webp" },
  { id: 5, fullName: "Riley Parker", profileImage: "/landing/player.webp" },
  { id: 6, fullName: "Casey Morgan", profileImage: "/landing/player.webp" },
  { id: 7, fullName: "Drew Carter", profileImage: "/landing/player.webp" },
  { id: 8, fullName: "Taylor Brooks", profileImage: "/landing/player.webp" },
  { id: 9, fullName: "Morgan Ellis", profileImage: "/landing/player.webp" },
  { id: 10, fullName: "Quinn Ramirez", profileImage: "/landing/player.webp" },
  { id: 11, fullName: "Jamie Foster", profileImage: "/landing/player.webp" },
  { id: 12, fullName: "Avery Collins", profileImage: "/landing/player.webp" },
  { id: 13, fullName: "Charlie Nguyen", profileImage: "/landing/player.webp" },
  { id: 14, fullName: "Parker James", profileImage: "/landing/player.webp" },
];

export default function Streaming() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated } = useAuthStore();
  const [joinedStreams, setJoinedStreams] = useState<number[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const target = document.getElementById(hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  const handleJoinStream = (streamId: number) => {
    setJoinedStreams((prev) =>
      prev.includes(streamId)
        ? prev.filter((id) => id !== streamId)
        : [...prev, streamId]
    );
  };

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -240, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 240, behavior: "smooth" });
  };

  const handleShare = () => setIsShareOpen(true);

  return (
    <section className=" bg-black py-12 md:py-16 " id="streaming_section">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div className="flex items-center gap-3">
            <Image src="/landing/star.webp" alt="Star" width={32} height={32} />

            <h2 className="text-xl md:text-2xl font-bold">Live Streams</h2>
          </div>
          <Button
            onClick={handleShare}
            variant="default"
            className="inline-flex items-center text-[10px] md:text-[14px] justify-center whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 py-2 relative h-8 md:h-10 px-2 md:px-4 overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium transition-all duration-200 group rounded-full w-fit"
          >
            <Share2 className="w-4 h-4 mr-2" /> Share
          </Button>
        </div>

        <div className="relative">
          {/* Auth overlay (shown when not logged in) */}
          <div
            className={`${!isAuthenticated || !user ? "bg-black/80 backdrop-blur-custom absolute h-full w-full top-0 left-0 z-30 flex flex-col text-[#FFFFFF] items-center justify-center gap-5" : "hidden"} transition-all duration-500 ease-in-out`}
          >
            <Lock size={50} />
            <p className="text-center w-[80%] md:w-[50%] xl:w-[30%] text-[20px]">
              Jump into this exciting streaming experience just log in and be a
              part of it
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full h-[48px] text-[16px] ring-offset-background focus-visible:outline-none font-bold focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 w-[150px] shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-500 ease-in-out"
            >
              Log in
            </Link>
          </div>

          <div
            className={`grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-4 gap-6 items-stretch transition-filter ${
              !isAuthenticated || !user
                ? "blur-sm pointer-events-none select-none"
                : ""
            }`}
          >
            {/* Main content */}
            <div className="lg:col-span-3 xl:col-span-3 space-y-6">
              {/* Main Live Stream */}
              <Card className="border-border overflow-hidden">
                <div className="relative bg-black">
                  <div
                    className={`min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh]`}
                  >
                    <iframe
                      src="https://www.youtube.com/embed/JaPwn7HZoIY?rel=0"
                      title="Live stream"
                      className="w-full h-full min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh]"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              </Card>

              {/* Other Streams Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Rosters</h3>
                  <div className="flex gap-2">
                    <Button
                      onClick={scrollLeft}
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={scrollRight}
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div
                    ref={sliderRef}
                    className={`flex gap-3 overflow-x-auto pb-1`}
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                  >
                    {sampleRosters.map((kid) => (
                      <div
                        key={kid.id}
                        className="bg-card/60 backdrop-blur-sm border border-border rounded-2xl p-4 flex flex-col items-center text-center h-[150px] justify-between flex-shrink-0 w-[130px]"
                      >
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-purple-500 to-blue-500 p-0.5">
                            <div className="w-full h-full rounded-full overflow-hidden bg-muted">
                              <Image
                                src={kid.profileImage}
                                alt={kid.fullName}
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-center mb-2 mt-1">
                          <h4 className="font-medium text-sm truncate w-full pt-1">
                            {kid.fullName}
                          </h4>
                        </div>

                        <Button
                          onClick={() => handleJoinStream(kid.id)}
                          size="sm"
                          className="w-full text-xs h-7 rounded-full font-medium"
                          variant={
                            joinedStreams.includes(kid.id)
                              ? "default"
                              : "outline"
                          }
                        >
                          {joinedStreams.includes(kid.id) ? "Following" : "Follow"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right column chat section */}
            <div className="hidden lg:block h-full">
              <ChatSection className="h-full" />
            </div>
          </div>
        </div>
      </div>
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        url={
          isClient
            ? `${window.location.origin}${window.location.pathname}#streaming_section`
            : ""
        }
        title="Live Streams"
      />
    </section>
  );
}
