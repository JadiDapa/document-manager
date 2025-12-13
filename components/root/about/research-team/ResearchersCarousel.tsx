"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ResearcherCard from "./ResearcherCard";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

export interface Researcher {
  name: string;
  title: string;
  image: string;
}

export default function ResearchersCarousel({
  title,
  items,
  autoplayDelay = 2000,
  className = "",
}: {
  title?: string;
  items: Researcher[];
  autoplayDelay?: number;
  className?: string;
}) {
  const autoplay = useRef(
    Autoplay({ delay: autoplayDelay, stopOnInteraction: true }),
  );

  return (
    <div className={className}>
      {title && (
        <h2 className="py-9 text-center text-2xl font-medium">{title}</h2>
      )}

      <Carousel
        plugins={[autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
        className="w-full"
      >
        <CarouselContent>
          {items.map((p, i) => (
            <CarouselItem key={i} className="flex basis-1/3 justify-center">
              <ResearcherCard {...p} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
