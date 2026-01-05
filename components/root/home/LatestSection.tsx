"use client";

import { getAllSections } from "@/lib/networks/section";
import { useQuery } from "@tanstack/react-query";
import SectionCard from "./SectionCard";
import { ArrowRight } from "lucide-react";
// import CreateSectionDialog from "../section/CreateSectionDialog";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import Link from "next/link";

export default function LatestSection() {
  const { data: sections } = useQuery({
    queryFn: getAllSections,
    queryKey: ["sections"],
  });

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-primary text-lg font-semibold">Divisi Terbaru</p>

        <div className="flex items-center gap-6">
          <Link
            href={"/sections"}
            className="hover:text-foreground flex cursor-pointer items-center gap-3 font-medium text-yellow-500 transition"
          >
            <p>Lebih Lengkap</p>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Daftar Divisi */}
      <Swiper
        modules={[FreeMode]}
        slidesPerView="auto"
        freeMode
        className="overflow-visible"
      >
        {sections?.map((st) => (
          <SwiperSlide className="me-6 max-w-fit" key={st.id}>
            <SectionCard section={st} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
