"use client";

import { useEffect, useState, useMemo } from "react";
import { useAuthStore, USER_TYPE } from "@/lib/auth-store";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
// Removed previous react-icons / lucide-react imports in favor of Tabler Icons
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBrandX,
  IconShare3,
  IconMessageCircle,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
// Switched all icons to Tabler Icons per request
import { cn } from "@/lib/utils";
import ProfileCard from "@/components/player/PlayerCard";
import UpcomingMatch from "@/components/Organization/UpcomingMatch";
import Blog from "@/components/LandingPage/Blog";
import Contact from "@/components/LandingPage/Contact";
// Removed unused icons / links from initial design adaptation

interface PlayerProfile {
  id: number;
  name: string;
  email: string;
  user_type: number;
  kids_dob?: string;
  user_dob?: string;
  kids_mobile?: string;
  user_mobile?: string;
  kids_high_school?: string;
  kids_graduating_class?: string;
  kids_gpa?: string;
  kids_act?: string;
  kids_sat?: string;
  kids_height?: string;
  kids_weight?: string;
  kids_youtube_url?: string;
  kids_twitter_url?: string;
  kids_insta_url?: string;
  kids_gamereel_url?: string;
  kids_bio?: string;
  kids_facebook_url?: string;
}

export default function PlayerProfilePage() {
  const { user, isAuthenticated, loading, hydrated } = useAuthStore();
  const router = useRouter();
  const [profile, setProfile] = useState<PlayerProfile | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  // const [profileError, setProfileError] = useState<string | null>(null) // reserved for future error display
  const [isOpen, setIsOpen] = useState(false);
  // const [isChatClicked, setIsChatClicked] = useState(false) // reserved for future chat integration
  const [currentCoachIndex, setCurrentCoachIndex] = useState(0);

  // Placeholder coaches/org data until API available
  const orgCoaches = useMemo(() => {
    // Could be fetched later; keep small list for carousel demonstration
    return profile
      ? [
          {
            coach_fname: "Alex",
            coach_lname: "Smith",
            coach_email: "alex.smith@example.com",
            coach_phone: "555-111-2222",
            coach_type: 11,
          },
          {
            coach_fname: "Jamie",
            coach_lname: "Lee",
            coach_email: "jamie.lee@example.com",
            coach_phone: "555-333-4444",
            coach_type: 12,
          },
        ]
      : [];
  }, [profile]);

  const handlePrevCoach = () =>
    setCurrentCoachIndex((i) => (i === 0 ? orgCoaches.length - 1 : i - 1));
  const handleNextCoach = () =>
    setCurrentCoachIndex((i) => (i === orgCoaches.length - 1 ? 0 : i + 1));

  // Fetch extended player profile
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.token) return;
      try {
        setProfileLoading(true);
        // error state removed (placeholder)
        const res = await fetch("/api/user", {
          headers: { Authorization: `Bearer ${user.token}` },
          cache: "no-store",
        });
        const data = await res.json();
        if (data.status) {
          setProfile(data.data);
        } else {
          // placeholder: could set error state
        }
      } catch {
        // placeholder: could set error state
      } finally {
        setProfileLoading(false);
      }
    };
    if (isAuthenticated && user?.user_type === USER_TYPE.PLAYER) fetchProfile();
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (!loading && hydrated) {
      if (!isAuthenticated || !user) {
        router.replace("/login");
      } else if (user.user_type !== USER_TYPE.PLAYER) {
        if (user.user_type === USER_TYPE.SUPER_ADMIN)
          router.replace("/dashboard");
        else if (user.user_type === USER_TYPE.COACH)
          router.replace("/dashboard/coach");
        else router.replace("/");
      }
    }
  }, [isAuthenticated, user, loading, hydrated, router]);

  const firstName = user?.name?.split(" ")[0] || "";
  const lastName = user?.name?.split(" ").slice(1).join(" ") || "";
  const playerSatData = useMemo(() => {
    if (!profile)
      return [] as { title: string; value: string | number | undefined }[];
    return [
      { title: "GPA", value: profile.kids_gpa },
      { title: "ACT", value: profile.kids_act },
      { title: "SAT", value: profile.kids_sat },
      { title: "Height", value: profile.kids_height },
      { title: "Weight", value: profile.kids_weight },
    ].filter((item) => item.value);
  }, [profile]);

  if (loading || !hydrated || !user || user.user_type !== USER_TYPE.PLAYER) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col px-4 xl:mx-[2%] 2xl:mx-[7%] my-12 ">
        <div className="flex items-center justify-center z-10 gap-[80px] h-full bg-black p-4 rounded-2xl overflow-hidden w-full">
          <div className="flex flex-col items-center justify-between gap-10 lg:gap-20 h-full w-full">
            <div className="flex flex-col lg:flex-row gap-[30px] 2xl:gap-[50px] w-full">
              <ProfileCard name={user.name} loading={profileLoading} />
              <div className="flex-1 flex flex-col gap-5 justify-between w-full">
                <div className="flex flex-col gap-5 w-full">
                  <div className="flex flex-col md:flex-row justify-between items-start w-full gap-5">
                    <div className="flex-1">
                      <h1 className="text-[40px] md:text-[50px] 2xl:text-[60px] leading-[55px] 2xl:leading-[65px] font-bold break-words">
                        {firstName}
                        <span className="pl-3 font-thin">{lastName}</span>
                      </h1>
                    </div>
                    <div className="flex gap-3 flex-shrink-0 mt-3 md:mt-0 items-center">
                      {profile?.kids_facebook_url && (
                        <a
                          href={profile.kids_facebook_url}
                          target="_blank"
                          aria-label="Facebook"
                          className="text-gray-400 transition-colors hover:text-[#1877F2]"
                        >
                          <IconBrandFacebook size={20} />
                        </a>
                      )}
                      {profile?.kids_insta_url && (
                        <a
                          href={profile.kids_insta_url}
                          target="_blank"
                          aria-label="Instagram"
                          className="text-gray-400 transition-colors hover:text-[#E4405F]"
                        >
                          <IconBrandInstagram size={20} />
                        </a>
                      )}
                      {profile?.kids_youtube_url && (
                        <a
                          href={profile.kids_youtube_url}
                          target="_blank"
                          aria-label="YouTube"
                          className="text-gray-400 transition-colors hover:text-[#FF0000]"
                        >
                          <IconBrandYoutube size={22} />
                        </a>
                      )}
                      {profile?.kids_twitter_url && (
                        <a
                          href={profile.kids_twitter_url}
                          target="_blank"
                          aria-label="X"
                          className="text-gray-400 transition-colors hover:text-[#1DA1F2]"
                        >
                          <IconBrandX size={22} />
                        </a>
                      )}
                      {/* Settings / Delete only if logic later; placeholders */}
                      <button
                        className="border border-white p-2 inline-flex items-center rounded-full"
                        onClick={() => setIsOpen(true)}
                        aria-label="Share Profile"
                      >
                        <IconShare3 size={20} />
                      </button>
                      {/* Placeholder chat button - integrate chat state later */}
                      <button
                        className="border border-white p-2 inline-flex items-center rounded-full"
                        aria-label="Open Chat"
                      >
                        <IconMessageCircle size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Org/team logo placeholder */}
                    <div className="size-[50px] rounded-full bg-gradient-to-b from-[#3D167C] to-[#3705DC] flex items-center justify-center text-xs text-white">
                      LOGO
                    </div>
                    <p className="text-[22px] font-[500] uppercase">
                      {profile?.kids_high_school || ""}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row items-center gap-5 2xl:justify-between xl:justify-between relative">
                  <div className="w-full md:w-[30%] lg:w-[20%] xl:w-[30%] flex flex-col gap-[20px] justify-center h-full pb-5 md:pb-0">
                    <div>
                      <h3 className="text-white opacity-50 text-[14px] xl:text-[16px]">
                        Email
                      </h3>
                      <p className="mt-1 text-white md:text-[14px] lg:text-[16px] xl:text-[18px] font-semibold break-words">
                        {user.email}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-white opacity-50 text-[14px] xl:text-[16px]">
                        Mobile
                      </h3>
                      <p className="mt-1 text-white md:text-[14px] lg:text-[16px] xl:text-[18px] font-semibold">
                        {profile?.kids_mobile || profile?.user_mobile || "-"}
                      </p>
                    </div>
                  </div>
                  <div
                    className="w-full md:w-[30%] lg:w-[20%] xl:w-[25%] flex flex-col gap-5 justify-start md:justify-center items-start md:items-center h-full py-5 md:py-0 md:px-5 xl:px-5 relative"
                    style={{ alignItems: "baseline" }}
                  >
                    <div className="bg-gradient-to-b from-[#3D167C] to-[#3705DC] w-full md:w-0.5 absolute left-0 top-0 h-0.5 md:h-full"></div>
                    <>
                      <div className="text-start min-w-[100px]">
                        <h3 className="text-white opacity-50 font-semibold text-[14px] xl:text-[16px]">
                          DOB
                        </h3>
                        <p className="text-white md:text-[14px] lg:text-[16px] xl:text-[18px] font-semibold mt-1">
                          {profile?.kids_dob || profile?.user_dob || "-"}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-white opacity-50 font-semibold text-[14px] xl:text-[16px]">
                          Graduating Class
                        </h3>
                        <p className="text-white mt-1 md:text-[14px] lg:text-[16px] xl:text-[18px] font-semibold">
                          {profile?.kids_graduating_class || "-"}
                        </p>
                      </div>
                    </>
                    <div className="bg-gradient-to-b from-[#3D167C] to-[#3705DC] w-full md:w-0.5 absolute right-0 bottom-0 md:top-0 h-0.5 md:h-full"></div>
                  </div>
                  <div className="flex flex-col gap-3 overflow-hidden w-full pt-4 md:pt-0 pl-0 md:pl-4 pb-0 md:pb-[60px] lg:pb-0 xl:pl-0 md:w-[35%]">
                    {profile && (
                      <>
                        <div className="flex justify-between items-center">
                          <p className="text-white text-[14px] xl:text-[16px]">
                            Coach Info
                          </p>
                          {orgCoaches.length > 0 && (
                            <div className="flex items-center gap-1">
                              <IconChevronLeft
                                size={20}
                                className="text-white cursor-pointer"
                                onClick={handlePrevCoach}
                              />
                              <IconChevronRight
                                size={20}
                                className="text-white cursor-pointer"
                                onClick={handleNextCoach}
                              />
                            </div>
                          )}
                        </div>
                        <div
                          className={cn(
                            "relative overflow-hidden xl:w-[360px] 2xl:w-full",
                            orgCoaches.length === 0 ? "h-[100px]" : "h-[200px]",
                            "rounded-2xl bg-[linear-gradient(180deg,_#0F0B23_0%,_#2B2647_100%)]",
                            orgCoaches.length === 0 &&
                              "flex justify-center items-center"
                          )}
                        >
                          <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                              transform: `translateX(-${
                                currentCoachIndex * 100
                              }%)`,
                              width: `${orgCoaches.length * 100}%`,
                            }}
                          >
                            {orgCoaches.map((coach, idx) => (
                              <div
                                key={idx}
                                className="w-full flex-shrink-0 p-3 xl:p-6 flex flex-col gap-4"
                              >
                                <div>
                                  <p className="text-gray-400 text-[14px] xl:text-[16px]">
                                    {coach.coach_type === 11
                                      ? "Head Coach"
                                      : "Assistant Coach"}
                                  </p>
                                  <h3 className="text-white font-semibold mt-1 lg:text-[16px] xl:text-[18px]">
                                    {coach.coach_fname} - {coach.coach_lname}
                                  </h3>
                                </div>
                                <div className="bg-gradient-to-b from-[#3D167C] to-[#3705DC] w-[45%] h-0.5"></div>
                                <div className="space-y-2 text-[14px] xl:text-[16px]">
                                  <div className="flex flex-col text-white/70">
                                    <span className="text-xs">Email</span>
                                    <span className="break-all">
                                      {coach.coach_email}
                                    </span>
                                  </div>
                                  <div className="flex flex-col text-white/70">
                                    <span className="text-xs">Phone</span>
                                    <span>{coach.coach_phone}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          {orgCoaches.length === 0 && (
                            <div className="p-4 text-sm text-white/60">
                              No Coaches available
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {playerSatData.length > 0 && (
              <div className="flex items-start md:items-center justify-start md:justify-center flex-wrap lg:flex-nowrap lg:justify-center gap-3 w-full lg:pl-10">
                {playerSatData.map((item, index) => (
                  <div key={index} className="flex gap-3 relative">
                    <div
                      className={cn(
                        "w-[100px] md:w-[150px]",
                        item.title === "GPA"
                          ? "text-start lg:text-center"
                          : "text-start md:text-center"
                      )}
                    >
                      <h4 className="text-white opacity-50 font-semibold">
                        {item.title}
                      </h4>
                      <p className="text-white text-[20px] font-semibold mt-1">
                        {item.value}
                      </p>
                    </div>
                    {item.title !== "Weight" && (
                      <div className="bg-gradient-to-b from-[#3D167C] to-[#3705DC] w-0.5 h-full absolute right-0" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <ShareModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
        
      </main>
      {/* Upcoming Matches Section */}
      <section className="mt-16 px-4 xl:mx-[2%] 2xl:mx-[7%]">
        <UpcomingMatch title="Upcoming Matches" events={[]} />
      </section>
      {/* Blog Section */}
      <section className="px-0 mt-8">
        <Blog />
      </section>
      {/* Contact Section */}
      <section className="px-0 mt-0">
        <Contact />
      </section>
      <Footer />
    </div>
  );
}

// Minimal profile card inspired by provided design (adapted to available data)

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}
function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const copy = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl).catch(() => {});
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-[#0F0B23] rounded-2xl w-full max-w-md p-6 relative border border-white/10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/60 hover:text-white text-sm"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">Share Profile</h2>
        <div className="flex items-center gap-2 bg-black/40 rounded px-3 py-2 text-sm break-all">
          <span className="flex-1 text-white/70">{shareUrl}</span>
          <button
            onClick={copy}
            className="px-3 py-1 text-xs rounded bg-[#3705DC]"
          >
            Copy
          </button>
        </div>
        <p className="text-xs text-white/40 mt-3">
          More share options coming soon.
        </p>
      </div>
    </div>
  );
}
