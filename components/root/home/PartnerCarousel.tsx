"use client";

import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface PartnerCarouseProps {
  partners: {
    name: string;
    image: string;
  }[];
}

export default function PartnerCarousel({ partners }: PartnerCarouseProps) {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      className="w-full"
    >
      <CarouselContent>
        {partners.map((p, i) => (
          <CarouselItem
            key={i}
            className="flex basis-1/2 justify-center lg:basis-1/5"
          >
            <div className="relative flex h-40 w-60 flex-col items-center justify-center rounded-xl border bg-gray-100 p-6 shadow-sm">
              <div className="relative mb-3 h-16 w-32">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-center text-sm text-gray-700">{p.name}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
