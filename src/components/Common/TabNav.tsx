"use client"

import { cn } from "@/lib/utils"

interface Props {
  tabs: { name: string; filter: string }[]
  activeTab?: string
  setActiveTab: (filter: string) => void
  className?: string
}

export default function TabNav({ tabs, activeTab, setActiveTab, className = "" }: Props) {
  return (
    <div
      className={cn(
        "flex overflow-x-auto scrollbar-hide -mx-4 px-4",
        className
      )}
    >
      <div
        onMouseLeave={() => {}}
        className="flex items-center gap-3 border-none backdrop-blur-xl py-2 px-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(120,50,255,0.1)] transition-all duration-300 mb-8"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.filter
          return (
            <button
              key={tab.filter}
              onClick={() => setActiveTab(tab.filter)}
              className={cn(
                "relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap",
                isActive
                  ? "text-white"
                  : "text-gray-400 hover:text-purple-400"
              )}
            >
              {tab.name}
              {isActive && (
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 backdrop-blur-sm -z-10">
                  <div className="absolute inset-0 w-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full">
                    <div className="absolute w-12 h-6 bg-purple-500/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-purple-500/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-purple-400/30 rounded-full blur-sm top-0 left-2" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 backdrop-blur-sm" />
                  </div>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
