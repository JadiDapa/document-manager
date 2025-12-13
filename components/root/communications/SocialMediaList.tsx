import { Calendar } from "lucide-react";
import Image from "next/image";

export default function SocialMediaList() {
  return (
    <section className="grid grid-cols-2 gap-6   px-44 py-24">
      {socialMedia.map((media) => (
        <a
          href={media.url}
          target="_blank"
          key={media.title}
          className="group block w-full cursor-pointer rounded-lg border-2 p-4 transition hover:border-primary hover:bg-gray-200"
        >
          <figure className="relative h-72 w-full overflow-hidden rounded-md">
            <Image
              src={media.image}
              alt=""
              fill
              className="object-cover object-center transition group-hover:scale-110"
            />
          </figure>
          <div className="space-y-2 py-4">
            <div className="flex items-center gap-2 text-primary">
              <Calendar size={16} className="" />
              <p className="text-sm">{media.date}</p>
            </div>
            <p>{media.title}</p>
          </div>
        </a>
      ))}
    </section>
  );
}

const socialMedia = [
  {
    title:
      "FASILKOM UNSRI Gelar Pengabdian Kepada Masyarakat Berdampak: Demonstrasi TeleOTIVA di Puskesmas Tebing Gerinting",
    url: "https://isysrg.com/activities/fasilkom-unsri-gelar-pengabdian-kepada-masyarakat-berdampak-demonstrasi-teleotiva-di-puskesmas-tebing-gerinting",
    image:
      "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2Fa4b62eaf80bce4fde20816c98fafe8bf059011e2-4160x3120.jpg%3Ffit%3Dmax%26auto%3Dformat&w=1200&q=75",
    date: "November 5, 2025",
  },
  {
    title:
      "UPTD Puskesmas Pasir Putih Sukses Uji TeleOTIVA untuk Deteksi Dini Prakanker Serviks",
    url: "https://isysrg.com/activities/uptd-puskesmas-pasir-putih-sukses-uji-teleotiva-untuk-deteksi-dini-prakanker-serviks",
    image:
      "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2F538b519ee35a1bd7bddf1be4ed5c24db3e163c03-1200x1600.jpg%3Ffit%3Dmax%26auto%3Dformat&w=1200&q=75",
    date: "Auguest 30, 2025",
  },

  {
    title:
      "UPTD Puskesmas Pasir Putih Sukses Uji TeleOTIVA untuk Deteksi Dini Prakanker Serviks",
    url: "https://isysrg.com/activities/uptd-puskesmas-pasir-putih-sukses-uji-teleotiva-untuk-deteksi-dini-prakanker-serviks",
    image:
      "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2F538b519ee35a1bd7bddf1be4ed5c24db3e163c03-1200x1600.jpg%3Ffit%3Dmax%26auto%3Dformat&w=1200&q=75",
    date: "Auguest 30, 2025",
  },
  {
    title:
      "FASILKOM UNSRI Gelar Pengabdian Kepada Masyarakat Berdampak: Demonstrasi TeleOTIVA di Puskesmas Tebing Gerinting",
    url: "https://isysrg.com/activities/fasilkom-unsri-gelar-pengabdian-kepada-masyarakat-berdampak-demonstrasi-teleotiva-di-puskesmas-tebing-gerinting",
    image:
      "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2Fa4b62eaf80bce4fde20816c98fafe8bf059011e2-4160x3120.jpg%3Ffit%3Dmax%26auto%3Dformat&w=1200&q=75",
    date: "November 5, 2025",
  },
];
