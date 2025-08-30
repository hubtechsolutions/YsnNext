"use client"

import React, { useState } from "react"
import Image from "next/image"
import TabNav from "@/components/Common/TabNav"

// Category setup (can be extended later to actually filter)
type CategoryValue = "all" | "nike" | "adidas" | "puma"
const categories: { name: string; filter: CategoryValue }[] = [
  { name: "All", filter: "all" },
  { name: "Nike", filter: "nike" },
  { name: "Adidas", filter: "adidas" },
  { name: "PUMA", filter: "puma" },
]

// Placeholder i18n object so the provided key compiles – replace with real i18n integration
const common = { shop_products_many: "Shop Products" }

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState<CategoryValue>("all")

  return (
    <section className="bg-black text-white h-full xl:h-full py-[5%] overflow-y-hidden">
      <div className=" md:mx-auto md:px-4 overflow-hidden">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8  rounded flex items-center justify-center relative">
            <Image
              src="/landing/star.webp"
              alt="asterisk-icon"
              width={35}
              height={35}
              className="size-[25px] md:size-[30px] lg:size-[35px] object-contain"
            />
          </div>
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
            {common.shop_products_many}
          </h1>
        </div>
        <div className="border-t border-[#1C1A26]"></div>

        <div className="flex items-center justify-between my-4 md:my-8 w-full">
          <TabNav
            tabs={categories}
            className="justify-start items-center"
            activeTab={activeCategory}
            setActiveTab={(f) => setActiveCategory(f as CategoryValue)}
          />
          {/* <button className="text-sm mb-10 hidden md:block">View all</button> */}
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-12 gap-4 h-full overflow-hidden">
          {/* Column 1 */}
          <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
            <div className="flex gap-4 h-[260px]">
              <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src="/landing/shop/shop1.webp"
                  alt="Team cap"
                  width={170}
                  height={260}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-900">
                <div className="absolute top-4 right-4 text-white font-bold text-xl z-10">
                  +24
                </div>
                <Image
                  src="/landing/shop/shop2.webp"
                  alt="Sports jersey"
                  width={170}
                  height={260}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          {/* Column 2 */}
          <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
            <div className="flex gap-4 h-[260px]">
              <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src="/landing/shop/shop3.webp"
                  alt="Team cap"
                  width={170}
                  height={260}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-900">
                <div className="absolute top-4 right-4 text-white font-bold text-xl z-10">
                  +24
                </div>
                <Image
                  src="/landing/shop/shop4.webp"
                  alt="Sports jersey"
                  width={170}
                  height={260}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          {/* Column 3 */}
          <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
            <div className="flex gap-4 h-[260px]">
              <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src="/landing/shop/shop5.webp"
                  alt="Team cap"
                  width={170}
                  height={260}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-900">
                <div className="absolute top-4 right-4 text-white font-bold text-xl z-10">
                  +24
                </div>
                <Image
                  src="/landing/shop/shop6.webp"
                  alt="Sports jersey"
                  width={170}
                  height={260}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          {/* Column 4 */}
            <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
            <div className="flex gap-4 h-[260px]">
              <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src="/landing/shop/shop7.webp"
                  alt="Team cap"
                  width={170}
                  height={260}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-900">
                <div className="absolute top-4 right-4 text-white font-bold text-xl z-10">
                  +24
                </div>
                <Image
                  src="/landing/shop/shop8.webp"
                  alt="Sports jersey"
                  width={170}
                  height={260}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          {/* Column 5 */}
          <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
            <div className="flex gap-4 h-[260px]">
              <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src="/landing/shop/shop9.webp"
                  alt="Team cap"
                  width={170}
                  height={260}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-900">
                <div className="absolute top-4 right-4 text-white font-bold text-xl z-10"></div>
                <Image
                  src="/landing/shop/shop2.webp"
                  alt="Sports jersey"
                  width={170}
                  height={260}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          {/* Column 6 */}
          <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
            <div className="flex gap-4 h-[260px]">
              <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src="/landing/shop/shop1.webp"
                  alt="Team cap"
                  width={170}
                  height={260}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-900">
                <div className="absolute top-4 right-4 text-white font-bold text-xl z-10"></div>
                <Image
                  src="/landing/shop/shop4.webp"
                  alt="Sports jersey"
                  width={170}
                  height={260}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


