import { activityList } from "@/components/root/communications/activities/ActivityList";
import { Separator } from "@/components/ui/separator";
import { Calendar, Share } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ActivityDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const activity = {
    image:
      "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2Fa4b62eaf80bce4fde20816c98fafe8bf059011e2-4160x3120.jpg%3Ffit%3Dmax%26auto%3Dformat&w=3840&q=75",
    title:
      "FASILKOM UNSRI Gelar Pengabdian Kepada Masyarakat Berdampak: Demonstrasi TeleOTIVA di Puskesmas Tebing Gerinting",
    createdAt: "November 5, 2025",
    contents: (
      <p>
        Fakultas Ilmu Komputer Universitas Sriwijaya (FASILKOM UNSRI) kembali
        menunjukkan komitmennya dalam menghadirkan inovasi teknologi yang
        memberikan dampak nyata bagi masyarakat. Melalui kegiatan Pengabdian
        kepada Masyarakat (PkM) Berdampak, tim FASILKOM UNSRI melaksanakan
        demonstrasi sistem deteksi prakanker serviks berbasis kecerdasan
        artifisial, TeleOTIVA, di Puskesmas Tebing Gerinting, Kabupaten Ogan
        Ilir, Indralaya, pada Rabu, 5 November 2025.
      </p>
    ),
  };

  return (
    <section className="  px-44 py-24 pt-64">
      <figure className="relative aspect-video w-full overflow-hidden rounded-xl">
        <Image
          src={activity.image}
          alt={activity.title}
          fill
          className="object-cover object-center"
        />
      </figure>
      <div className="py-10">
        <h1 className="text-4xl font-semibold">{activity.title}</h1>
        <div className="mt-10 flex justify-between">
          <div className="flex items-center gap-2 text-primary">
            <Calendar className="" />
            <p className="text-lg font-light">{activity.createdAt}</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground text-sm italic">
              Posted {activity.createdAt}
            </p>
            <div className="flex items-center gap-2">
              <Share size={16} className="" />
              <p className="text-sm">Share</p>
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex justify-between gap-24 py-12">
        <div className="prose flex-2">{activity.contents}</div>
        <div className="flex-1">
          <p className="text-2xl font-medium text-primary">More Activities</p>
          <div className="">
            {activityList.map((moreAct) => (
              <Link
                href={`/communications/activities/${moreAct.slug}`}
                key={moreAct.slug}
                className="block border-b border-gray-300 py-4 hover:underline"
              >
                <p className="">{moreAct.title}</p>
                <div className="mt-2 flex items-center gap-2 text-primary">
                  <Calendar size={16} className="" />
                  <p className="font-ligh text-sm">{moreAct.createdAt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
