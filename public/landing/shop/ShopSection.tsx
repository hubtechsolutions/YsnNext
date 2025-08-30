"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePage } from "@inertiajs/react";
import TabNav from "../TabNav";

const categories = [
    { name: "All", filter: "all" },
    { name: "Nike", filter: "new-york" },
    { name: "Adidas", filter: "boston" },
    { name: "PUMA", filter: "nba" },
];

export default function SportsShop() {
    const [activeCategory, setActiveCategory] = useState("all");
    const { common } = usePage<any>().props;

    return (
        <section className="bg-black text-white h-full xl:h-full py-[5%] overflow-y-hidden">
            <div className=" md:mx-auto md:px-4 overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8  rounded flex items-center justify-center">
                        <img
                            src="/assets/star.webp"
                            alt="asterisk-icon"
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
                        setActiveTab={setActiveCategory}
                    />
                    {/* <button className="text-sm mb-10 hidden md:block">View all</button> */}
                </div>

                <div className="grid grid-cols-2 xl:grid-cols-12 gap-4 h-full overflow-hidden">
                    {/* FCB Jersey - Left */}

                    <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
                        {/* Top row - Cap and Jersey with +24 */}
                        <div className="flex gap-4 h-[260px]">
                            {/* Cap */}
                            <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-100">
                                <img
                                    src="/assets/shop1.webp"
                                    alt="Team cap"
                                    width={170}
                                    height={260}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Jersey with +24 */}
                            <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-900">
                                <div className="absolute top-4 right-4 text-white font-bold text-xl z-10">
                                    +24
                                </div>
                                <img
                                    src="/assets/shop2.webp"
                                    alt="Sports jersey"
                                    width={170}
                                    height={260}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Bottom row - Shoes */}
                    </div>
                    {/* Middle section with 3 cards */}
                    <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
                        {/* Top row - Cap and Jersey with +24 */}
                        <div className="flex gap-4 h-[260px]">
                            {/* Cap */}
                            <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-100">
                                <img
                                    src="/assets/shop3.webp"
                                    alt="Team cap"
                                    width={170}
                                    height={260}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Jersey with +24 */}
                            <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-900">
                                <div className="absolute top-4 right-4 text-white font-bold text-xl z-10">
                                    +24
                                </div>
                                <img
                                    src="/assets/shop4.webp"
                                    alt="Sports jersey"
                                    width={170}
                                    height={260}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
                        {/* Top row - Cap and Jersey with +24 */}
                        <div className="flex gap-4 h-[260px]">
                            {/* Cap */}
                            <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-100">
                                <img
                                    src="/assets/shop5.webp"
                                    alt="Team cap"
                                    width={170}
                                    height={260}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Jersey with +24 */}
                            <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-900">
                                <div className="absolute top-4 right-4 text-white font-bold text-xl z-10">
                                    +24
                                </div>
                                <img
                                    src="/assets/shop6.webp"
                                    alt="Sports jersey"
                                    width={170}
                                    height={260}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
                        {/* Top row - Cap and Jersey with +24 */}
                        <div className="flex gap-4 h-[260px]">
                            {/* Cap */}
                            <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-100">
                                <img
                                    src="/assets/shop7.webp"
                                    alt="Team cap"
                                    width={170}
                                    height={260}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Jersey with +24 */}
                            <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-900">
                                <div className="absolute top-4 right-4 text-white font-bold text-xl z-10">
                                    +24
                                </div>
                                <img
                                    src="/assets/shop8.webp"
                                    alt="Sports jersey"
                                    width={170}
                                    height={260}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
                        {/* Top row - Cap and Jersey with +24 */}
                        <div className="flex gap-4 h-[260px]">
                            {/* Cap */}
                            <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-100">
                                <img
                                    src="/assets/shop9.webp"
                                    alt="Team cap"
                                    width={170}
                                    height={260}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Jersey with +24 */}
                            <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-900">
                                <div className="absolute top-4 right-4 text-white font-bold text-xl z-10"></div>
                                <img
                                    src="/assets/shop2.webp"
                                    alt="Sports jersey"
                                    width={170}
                                    height={260}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
                        {/* Top row - Cap and Jersey with +24 */}
                        <div className="flex gap-4 h-[260px]">
                            {/* Cap */}
                            <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-100">
                                <img
                                    src="/assets/shop1.webp"
                                    alt="Team cap"
                                    width={170}
                                    height={260}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Jersey with +24 */}
                            <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-900">
                                <div className="absolute top-4 right-4 text-white font-bold text-xl z-10"></div>
                                <img
                                    src="/assets/shop4.webp"
                                    alt="Sports jersey"
                                    width={170}
                                    height={260}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Bottom row - Shoes */}
                    </div>
                </div>
            </div>
        </section>
    );
}
