import { ChevronRight } from "lucide-react";
import Link from "next/link";
import DatasetCard from "./DatasetCard";

export default async function DatasetsSection() {
  const contents = await getDatasetContents();

  return (
    <section className="w-full  text-black py-24 px-6 md:px-16 lg:px-40">
      <h2 className="text-primary text-4xl font-bold mb-4">{contents.title}</h2>
      <p className="text-gray-600 max-w-3xl mb-12">{contents.description}</p>

      <div className="flex flex-wrap gap-6 mb-12">
        {contents.datasets.map((item, i) => (
          <DatasetCard key={i} {...item} />
        ))}
      </div>

      <Link href={contents.button.link} className="">
        <button className="flex items-center  gap-1 text-primary cursor-pointer font-medium hover:opacity-80 transition">
          {contents.button.text} <ChevronRight size={18} />
        </button>
      </Link>
    </section>
  );
}

async function getDatasetContents() {
  return {
    title: "Datasets",
    description:
      "Explore a curated collection of medical imaging and signal datasets designed to support research in medical interpretation and analysis.",
    datasets: [
      {
        title: "Signal ECG Dataset",
        desc: "The Research Resource for Complex Physiologic Signals",
        image:
          "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2Ff7e901512ee0188ddbc291efc017b3bfcc41bec2-1600x800.jpg%3Ffit%3Dmax%26auto%3Dformat&w=256&q=75",
      },
      {
        title: "Pre-Cancer Dataset",
        desc: "The Research Resource for Pre-Cancer Serviks",
        image:
          "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2F59cf4adb0d2ca224244b70d5757651110b25e61e-237x417.png%3Ffit%3Dmax%26auto%3Dformat&w=256&q=75",
      },
      {
        title: "Infant/Fetal Dataset",
        desc: "The Research Resource for Echocardiography",
        image:
          "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2Fda5605702b9cf193e92a7da3a213927a0bd6cf3d-800x600.jpg%3Ffit%3Dmax%26auto%3Dformat&w=256&q=75",
      },
    ],
    button: {
      text: "Explore more datasets",
      link: "/datasets",
    },
  };
}
