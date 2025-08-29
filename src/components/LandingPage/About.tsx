"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Gamepad2, Radio, Smartphone, Video, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useTheme } from "next-themes";

// Updated About component styled after provided HomeTab style sample
export default function About() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeTab, setActiveTab] = useState(0);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const { theme } = useTheme();
  const isLightTheme = theme === "light";

  // External URLs (kept similar to earlier impl)
  const websiteUrls = [
    "https://battlelounge.io/", // Battle Lounge
    "https://ysn.tv/", // YSN
    "https://www.playerhub.io/", // PlayerHub
    "https://www.playerhub.io/", // MyReels placeholder
    "https://www.playerhub.io/", // Connected Athlete placeholder (update if diff)
  ];

  // Gradient palette adapted to requested style
  const customGradients = [
    "from-[#b55fc2] to-[#7b53c6]", // Battle Lounge
    "from-[#0037c0] to-[#4755bb]", // YSN
    "from-[#b55fc2] to-[#48c4bc]", // PlayerHub
    "from-[#7b53c6] to-[#0037c0]", // MyReels
    "from-[#48c4bc] to-[#4755bb]", // Connected Athlete
  ];

  // Content (mapping old titles to new order used earlier)
  const technologyItems = [
    {
      title: "Live Stream",
      description:
        "Battle Lounge is a hybrid esports tournament platform that merges in-person and online gameplay, allowing youth athletes and gamers to compete in popular video games at our facility's dedicated mini esports arena or remotely through our digital infrastructure. It bridges the growing overlap between traditional youth sports and competitive gaming.",
      icon: <Gamepad2 className="w-6 h-6" />,
      color: customGradients[0],
      points: [
        {
          title: "In-Person & Online Tournaments",
          description:
            "Host and participate in real-time esports events from anywhere. Our platform seamlessly connects players whether they're competing from our facility or remotely.",
          image: "/landing/battle-lounge-homepage.webp", // keep existing image path
        },
        {
          title: "Tournament Management System",
          description:
            "Complete tournament lifecycle management with registration, brackets, player tracking, and real-time updates. Professional tournament organization made simple.",
          image: "/landing/battle-lounge-tournament.webp",
        },
        {
          title: "Personal Gaming Dashboard",
          description:
            "Track your tournament history, upcoming events, and gaming achievements. Comprehensive player profiles with statistics and performance analytics.",
          image: "/landing/battle-lounge-dashboard.webp",
        },
      ],
    },
    {
      title: "Team Chat",
      description:
        "YSN is a live-streaming and media platform that captures every game, event, and showcase across our facility using high-definition cameras on all indoor and outdoor fields. It offers families, friends, and recruiters a front-row seat to every moment, from anywhere in the world.",
      icon: <Radio className="w-6 h-6" />,
      color: customGradients[1],
      points: [
        {
          title: "Professional Live Streaming",
          description:
            "Broadcast high-quality live streams of matches and events with professional presentation, sponsor integration, and seamless viewing experience across all devices.",
          image: "/landing/ysn-main-stream.webp",
        },
        {
          title: "Interactive Viewing Experience",
          description:
            "Engage with live chat, view multiple camera angles, and access upcoming match schedules. Real-time community interaction enhances the viewing experience.",
          image: "/landing/ysn-live-interface.webp",
        },
        {
          title: "Team Management Platform",
          description:
            "Comprehensive team administration with player rosters, match history, statistics tracking, and organizational tools for coaches and team managers.",
          image: "/landing/ysn-team-dashboard.webp",
        },
      ],
    },
    {
      title: "eCommerce",
      description:
        "PlayerHub is the centralized digital profile for every athlete in our ecosystem. It allows athletes to manage their schedules, track stats, register for events, upload highlights, and build recruitment-ready profiles, serving as the digital backbone for youth sports development.",
      icon: <Users className="w-6 h-6" />,
      color: customGradients[2],
      points: [
        {
          title: "Athlete Profiles & Stats",
          description:
            "Track performance, growth, and milestones across seasons. Comprehensive data visualization and progress tracking for athletes of all levels.",
          image: "/landing/playhub-profile-and-status-2.webp",
        },
        {
          title: "Event & Tournament Management",
          description:
            "Register, schedule, and stay updated on upcoming games and showcases. Seamless integration with facility calendars and team management systems.",
          image: "/landing/playhub-2.webp",
        },
        {
          title: "Recruitment & Gear Hub",
          description:
            "Showcase highlights, connect with scouts, and purchase sport-specific gear. One-stop platform for athlete development and exposure opportunities.",
          image: "/landing/playerhub-analytics.webp",
        },
      ],
    },
    {
      title: "Rosters",
      description:
        "Professional video production service creating highlight reels and promotional content for athletes.",
      icon: <Video className="w-6 h-6" />,
      color: customGradients[3],
      points: [
        {
          title: "Recruitment Videos",
          description:
            "Professional recruitment videos designed to showcase athlete skills for college and professional scouts.",
          image: "/landing/myreels-football.webp",
        },
        {
          title: "Social Media Content",
          description:
            "Optimized video content for social media platforms to build athlete personal brands and following.",
          image: "/landing/playhub-2.webp",
        },
        {
          title: "Game Highlights",
          description:
            "Professional game highlight compilation with cinematic editing and music for maximum impact.",
          image: "/landing/player-dashboard.webp",
        },
      ],
    },
    {
      title: "Connected Athlete",
      description:
        "Connected Athlete is an AI-powered performance and health analytics platform that uses computer vision to analyze athlete movements, compare them to elite professionals, and generate actionable performance reports. It also identifies potential injury risks and automatically shares data with on-site physical therapists and medical partners for proactive care.",
      icon: <Smartphone className="w-6 h-6" />,
      color: customGradients[4],
      points: [
        {
          title: "AI Movement Analysis",
          description:
            "Breaks down form and technique using video data and pro benchmarks. Advanced computer vision technology analyzes every movement for optimal performance.",
          image: "/landing/connected-athlete.webp",
        },
        {
          title: "Injury Risk Detection",
          description:
            "Spots inefficiencies and flags physical issues before they become injuries. Proactive identification of potential problems through movement pattern analysis.",
          image: "/landing/connected-athlete-dashboard.webp",
        },
        {
          title: "Integrated Recovery Loop",
          description:
            "Syncs with physical therapists and health systems to deliver personalized improvement plans. Seamless data sharing for comprehensive athlete care.",
          image: "/landing/connected-athlete-profile.webp",
        },
      ],
    },
  ];

  const getCurrentImage = () =>
    hoveredPoint !== null
      ? technologyItems[activeTab].points[hoveredPoint].image
      : technologyItems[activeTab].points[0].image;

  const getCurrentPointInfo = () =>
    hoveredPoint !== null
      ? technologyItems[activeTab].points[hoveredPoint]
      : technologyItems[activeTab].points[0];

  return (
    <section
      id="sports-technology"
      className={cn("py-16 md:py-20 bg-black text-white", isLightTheme && "text-gray-900")}
      ref={ref}
    >
      <div className="container md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#b55fc2] to-[#0037c0]">
              Leading Global Youth Sports Technology
            </span>
          </h2>
          <p
            className={cn(
              "text-lg md:text-xl max-w-3xl mx-auto",
              isLightTheme ? "text-gray-600" : "text-gray-300"
            )}
          >
            Cutting-edge digital platforms enhancing the youth sports experience, driving exposure and athlete development.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-4 mb-10"
        >
          {technologyItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveTab(index);
                setHoveredPoint(null);
              }}
              className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-500 border-2 focus:outline-none focus:ring-0 active:scale-95",
                activeTab === index
                  ? `bg-gradient-to-r ${item.color} text-white border-transparent shadow-lg`
                  : isLightTheme
                  ? "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:shadow-md"
                  : "bg-gray-900/50 text-gray-300 border-gray-700 hover:border-gray-600 hover:bg-gray-800/50"
              )}
            >
              <span
                className={cn(
                  "transition-colors duration-300",
                  activeTab === index
                    ? "text-white"
                    : isLightTheme
                    ? "text-gray-600"
                    : "text-gray-400"
                )}
              >
                {item.icon}
              </span>
              <span className="text-sm md:text-base">{item.title}</span>
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left content */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3
                  className={cn(
                    "text-2xl font-bold mb-2",
                    isLightTheme ? "text-gray-900" : "text-white"
                  )}
                >
                  <a
                    href={websiteUrls[activeTab]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {technologyItems[activeTab].title}
                  </a>
                </h3>
                <p
                  className={cn(
                    "text-base md:text-lg",
                    isLightTheme ? "text-gray-600" : "text-gray-300"
                  )}
                >
                  {technologyItems[activeTab].description}
                </p>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-3"
                >
                  {technologyItems[activeTab].points.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.08 }}
                      className={cn(
                        "p-4 rounded-xl cursor-pointer transition-all duration-400 border-2",
                        isLightTheme
                          ? "bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-md"
                          : "bg-gray-900/30 border-gray-800 hover:border-gray-700 hover:bg-gray-800/50"
                      )}
                      onMouseEnter={() => setHoveredPoint(index)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    >
                      <h4
                        className={cn(
                          "font-semibold mb-2",
                          isLightTheme ? "text-gray-900" : "text-white"
                        )}
                      >
                        <a
                          href={websiteUrls[activeTab]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {point.title}
                        </a>
                      </h4>
                      <p
                        className={cn(
                          "text-sm",
                          isLightTheme ? "text-gray-600" : "text-gray-300"
                        )}
                      >
                        {point.description}
                      </p>
                      {hoveredPoint === index && (
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 0.5 }}
                          className={cn(
                            "h-1 mt-3 rounded-full bg-gradient-to-r",
                            technologyItems[activeTab].color
                          )}
                        />
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

          {/* Right image */}
          <div className="relative h-[560px] w-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeTab}-${hoveredPoint}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full rounded-xl overflow-hidden shadow-2xl border border-white/10"
              >
                <div className="relative h-full w-full">
                  <Image
                    src={getCurrentImage() || "/landing/banner.webp"}
                    alt={getCurrentPointInfo().title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                    priority={activeTab === 0}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
