import Image from "next/image";
import { CalendarDays } from "lucide-react";
import ActivityCard from "./ActivityCard";

export default async function ActivitySection() {
  const activityContent = await getActivitiesContent();

  const latestActivity = activityContent.activities.slice(-1)[0];

  return (
    <section className="w-full bg-black px-6 py-20 text-white md:px-16 lg:px-40">
      <div className="mb-10 text-center">
        <h2 className="mb-2 text-xl font-bold text-primary sm:text-2xl lg:text-3xl">
          {activityContent.title}
        </h2>
        <h1 className="mb-6 text-2xl font-light sm:text-3xl md:text-4xl lg:text-5xl">
          {activityContent.subtitle}
        </h1>
        <p className="mx-auto max-w-3xl text-sm text-gray-300 lg:text-base">
          {activityContent.description}
        </p>
      </div>

      <div className="flex flex-col items-start gap-10 lg:flex-row">
        <div className="lg:col-span-2">
          <div className="relative h-60 w-full overflow-hidden rounded-xl lg:h-[450px]">
            <Image
              src={latestActivity.image}
              alt={latestActivity.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="mt-4">
            <div className="mb-1 flex items-center gap-2 text-sm text-primary">
              <CalendarDays size={16} /> <span>{latestActivity.date}</span>
            </div>
            <h3 className="text-base font-medium sm:text-lg md:text-xl">
              {latestActivity.title}
            </h3>
          </div>
        </div>

        <div className="">
          {activityContent.activities.slice(-4, -1).map((item) => (
            <ActivityCard key={item.title} item={item} />
          ))}

          <div className="mt-4 text-right">
            <a
              href="#"
              className="flex items-center justify-end gap-1 text-primary hover:underline"
            >
              View more activities →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

async function getActivitiesContent() {
  return {
    title: "Latest Activity",
    subtitle: "Leading the Way in Intelligent Technology",
    description:
      "We are dedicated to advancing the field of intelligent systems through a variety of research and development activities. Our projects span multiple domains, from medical signal and image processing to data mining and pattern recognition, with a particular focus on applications that understand, reason, learn, and act intelligently.",
    activities: [
      {
        date: "August 23, 2025",
        title: "Pengujian TeleOTIVA di Puskesmas Sungsang",
        image:
          "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2Ff784d91e0fce4db01d28b54e77dd9b3398fc0761-1280x960.jpg%3Ffit%3Dmax%26auto%3Dformat&w=256&q=75",
      },
      {
        date: "August 28, 2025",
        title: "AIMed CoE Dukung Eliminasi Kanker Serviks Indonesia",
        image:
          "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2Fe9ace77d6a7f84858d48fa7fadde6ce2ead2f145-4160x3120.jpg%3Ffit%3Dmax%26auto%3Dformat&w=256&q=75",
      },
      {
        date: "August 30, 2025",
        title:
          "UPTD Puskesmas Pasir Putih Sukses Uji TeleOTIVA untuk Deteksi Dini Penyakit Jantung",
        image:
          "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2F538b519ee35a1bd7bddf1be4ed5c24db3e163c03-1200x1600.jpg%3Ffit%3Dmax%26auto%3Dformat&w=256&q=75",
      },
      {
        date: "November 5, 2025",
        title:
          "FASILKOM UNSRI Gelar Pengabdian Kepada Masyarakat Berdampak: Demonstrasi TeleOTIVA di Puskesmas Tebing Gerinting",
        image:
          "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2Fa4b62eaf80bce4fde20816c98fafe8bf059011e2-4160x3120.jpg%3Ffit%3Dmax%26auto%3Dformat&w=1920&q=7",
        contents:
          "FASILKOM UNSRI Gelar Pengabdian Kepada Masyarakat Berdampak: Demonstrasi TeleOTIVA di Puskesmas Tebing Gerinting",
      },
    ],
  };
}
