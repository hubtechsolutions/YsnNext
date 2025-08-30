"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name);

  return (
    <div className={cn(" z-50 ", className)}>
      <div
        className="flex items-center gap-3 bg-gray-900/70 border border-purple-500/20 backdrop-blur-xl px-2 py-2 xl:py-2 xl:px-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(120,50,255,0.1)] transition-all duration-300"
        
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              href={item.url}
              onMouseEnter={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-medium px-2 xl:px-3 3xl:px-4 py-2.5 rounded-full transition-all duration-300 hover:text-purple-400",
                "text-white ",
                isActive && ""
              )}
            >
              <span className="hidden md:block relative z-10 font-bold">
                {item.name}
              </span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 backdrop-blur-sm"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute inset-0 w-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full -z-0">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-t-full">
                      <div className="absolute w-12 h-6 bg-purple-500/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-purple-500/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-purple-400/30 rounded-full blur-sm top-0 left-2" />
                    </div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 backdrop-blur-sm" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
