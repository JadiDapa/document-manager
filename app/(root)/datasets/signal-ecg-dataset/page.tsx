import DatasetCarousel from "@/components/root/datasets/DatasetCarousel";
import DatasetDescription from "@/components/root/datasets/DatasetDescription";
import PreviewLink from "@/components/root/datasets/PreviewLink";
import LeftHeader from "@/components/root/LeftHeader";

export default function SignalEcgDatasetPage() {
  return (
    <>
      <LeftHeader section="DATASET" title="Signal ECG Dataset" />

      <div className="  px-44 py-24">
        <DatasetCarousel items={dataset} />
      </div>

      <DatasetDescription
        description="The ECG datasets generated and/or analysed during the research are available in the PhysioNet"
        origin="https://physionet.org/"
        type="Signal"
      />

      <PreviewLink url="https://physionet.org/" />
    </>
  );
}

const dataset = [
  {
    image:
      "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2Ff7e901512ee0188ddbc291efc017b3bfcc41bec2-1600x800.jpg%3Ffit%3Dmax%26auto%3Dformat&w=640&q=75",
  },
  {
    image:
      "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2F65cbe96a9f39f218b00c9d93e9d1129772c5165d-1600x800.jpg%3Ffit%3Dmax%26auto%3Dformat&w=640&q=75",
  },
  {
    image:
      "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2Fd7df4449a684966c780014c7fe9e9c27222a3e4a-1600x800.jpg%3Ffit%3Dmax%26auto%3Dformat&w=640&q=75",
  },
  {
    image:
      "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2F06d8d1b1290d2f3f0b9c8b9209151d8a556320a7-1001x518.png%3Ffit%3Dmax%26auto%3Dformat&w=640&q=75",
  },
  {
    image:
      "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2Ff7e901512ee0188ddbc291efc017b3bfcc41bec2-1600x800.jpg%3Ffit%3Dmax%26auto%3Dformat&w=640&q=75",
  },
  {
    image:
      "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2F65cbe96a9f39f218b00c9d93e9d1129772c5165d-1600x800.jpg%3Ffit%3Dmax%26auto%3Dformat&w=640&q=75",
  },
  {
    image:
      "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2Fd7df4449a684966c780014c7fe9e9c27222a3e4a-1600x800.jpg%3Ffit%3Dmax%26auto%3Dformat&w=640&q=75",
  },
  {
    image:
      "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2F06d8d1b1290d2f3f0b9c8b9209151d8a556320a7-1001x518.png%3Ffit%3Dmax%26auto%3Dformat&w=640&q=75",
  },
];
