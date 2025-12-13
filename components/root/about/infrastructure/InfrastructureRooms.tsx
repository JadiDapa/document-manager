import Image from "next/image";

export default function InfrastructureRooms() {
  return (
    <div className="space-y-24   px-40 py-32">
      <div className="flex items-center gap-6 rounded-xl bg-slate-200 p-4">
        <figure className="relative h-80 w-280 overflow-hidden rounded-lg">
          <Image
            src="https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2F67269c636c96d2d3bae079d9256d801447280b31-4032x3024.jpg%3Ffit%3Dmax%26auto%3Dformat&w=1200&q=75"
            alt=""
            fill
            className="object-cover object-center"
          />
        </figure>
        <div className="space-y-6">
          <p className="text-2xl font-semibold">{"Ruang Riset dan Inovasi"}</p>
          <p className="">
            {
              "Ruang Riset & Inovasi berfungsi sebagai pusat pengembangan ide dan eksperimen, mendukung kolaborasi tim dalam riset serta diskusi strategi inovatif."
            }
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6 rounded-xl bg-slate-200 p-4">
        <div className="space-y-6">
          <p className="text-2xl font-semibold">
            {"Ruang Pusat Data dan Komunikasi"}
          </p>
          <p className="">
            {
              "Ruang Pusat Data & Komunikasi berperan sebagai pusat pengelolaan infrastruktur dan penyimpanan data."
            }
          </p>
        </div>
        <figure className="relative h-80 w-280 overflow-hidden rounded-lg">
          <Image
            src="https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2F67269c636c96d2d3bae079d9256d801447280b31-4032x3024.jpg%3Ffit%3Dmax%26auto%3Dformat&w=1200&q=75"
            alt=""
            fill
            className="object-cover object-center"
          />
        </figure>
      </div>
    </div>
  );
}
