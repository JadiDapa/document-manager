import Image from "next/image";

export default function InfrastructureItems() {
  return (
    <div className="  px-40 py-32">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {infrastructureItems.map((item, i) => (
          <div key={i} className="rounded-xl bg-slate-200 p-4">
            <figure className="relative h-80 w-full overflow-hidden rounded-lg">
              <Image
                src={item.image}
                alt={item.item}
                fill
                className="object-cover object-center"
              />
            </figure>
            <p className="my-4 text-lg font-semibold">{item.item}</p>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(item.specs).map(([spec, value], j) => (
                <div key={j} className="">
                  <p className="text-xs font-light text-primary">{spec}:</p>
                  <p className="text-xs font-light text-gray-500">{value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const infrastructureItems = [
  {
    item: "PC 1",
    image:
      "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2F0cdb3c79580c947e5c8df3218cd8b171d2dae76f-3024x4032.jpg%3Ffit%3Dmax%26auto%3Dformat&w=640&q=75",
    specs: {
      Prosesor: "Intel i7 9900K @3.5 Ghz",
      Storage: "SSD 1TB",
      RAM: "32 GB, 2133 Mhz",
      GPU: "1 Buah RTX 2080 8 GB",
    },
  },
  {
    item: "PC 2",
    image:
      "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2Fccf073c2e0d7dcecb92f9cfc480bb327b71225a9-576x1024.jpg%3Ffit%3Dmax%26auto%3Dformat&w=640&q=75",
    specs: {
      Prosesor: "Intel i9 9900K @3.6 GHz",
      Storage: "SSD: 2 TB HDD: 15 TB",
      RAM: "32 GB, 2133 Mhz",
      GPU: "2 Buah RTX 2080 Ti 11 GB (Scalable Link Interface)",
    },
  },
  {
    item: "PC 3",
    image:
      "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2Fef8bdf466eebb9722ac1f9e9fe0153696c501b34-314x546.png%3Ffit%3Dmax%26auto%3Dformat&w=640&q=75",
    specs: {
      Prosesor: "Intel i7 10700K @3.8GHz",
      Storage: "500 GB (SSD) 15 TB (HDD)",
      RAM: "32 GB, 2133 Mhz",
      GPU: "2 RTX 2070 SUPER 8 GB",
    },
  },
  {
    item: "B-Steady 2 Pocket Lite 3-AXIS GIMBAL",
    image:
      "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2F4724d36c4201cceb1a0114fa228b8d9f98ee41ae-3024x4032.jpg%3Ffit%3Dmax%26auto%3Dformat&w=640&q=75",
    specs: {
      Weight: "378g (Battery included)",
      Dimension: "173x100x42mm",
      Battery: "3600mAH Max.",
      Payload: "280 g Max.",
    },
  },
  {
    item: "NAS (Network Attached Storage)",
    image:
      "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2F80de20aefe3f44c3936e77f1dce189ac759a7bc9-4160x1877.jpg%3Ffit%3Dmax%26auto%3Dformat&w=640&q=75",
    specs: {
      Model: "Synology DS923+",
      Prosesor: "AMD Ryzen R1600 Dual-Core",
      RAM: "4 GB DDR4 ECC (Upgradeable hingga 32 GB)",
      Storage: "4 Bay HDD/SSD + 2 Slot NVMe SSD Cache",
    },
  },
];
