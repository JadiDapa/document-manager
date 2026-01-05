"use client";

import { getAllItems } from "@/lib/networks/item";
import { useQuery } from "@tanstack/react-query";
import ItemCard from "./ItemCard";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import Link from "next/link";

export default function LatestItem() {
  const { data: items } = useQuery({
    queryFn: getAllItems,
    queryKey: ["items"],
  });

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-primary text-lg font-semibold">Folder Terbaru</p>

        <div className="flex items-center gap-6">
          <Link
            href={"/items"}
            className="hover:text-foreground flex cursor-pointer items-center gap-3 font-medium text-yellow-500 transition"
          >
            <p>Lebih Lengkap</p>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Swiper */}
      <Swiper
        modules={[FreeMode]}
        slidesPerView="auto"
        freeMode
        className="overflow-visible"
      >
        {items?.map((st) => (
          <SwiperSlide className="me-6 max-w-fit" key={st.id}>
            <ItemCard item={st} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
