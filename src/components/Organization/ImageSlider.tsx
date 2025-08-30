import React, { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselApi } from "../ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface props {
  children: React.ReactNode;
  className?: string;
}

export default function ImageSlider({ children, className = "" }: props) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <div className="relative w-full">
      <button
        onClick={() => carouselApi?.scrollPrev()}
        disabled={!canScrollPrev}
        aria-label="Previous"
  className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -left-8 md:-left-14 w-10 h-10 bg-gray-800 rounded-full items-center justify-center hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      <button
        onClick={() => carouselApi?.scrollNext()}
        disabled={!canScrollNext}
        aria-label="Next"
  className="hidden sm:flex absolute top-1/2 -translate-y-1/2 -right-8 md:-right-14 w-10 h-10 bg-gray-800 rounded-full items-center justify-center hover:bg-gray-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>
      <Carousel
        setApi={setCarouselApi}
        opts={{ loop: false, dragFree: true, align: "start" }}
      >
        <CarouselContent className={className}>{children}</CarouselContent>
      </Carousel>
    </div>
  );
}
