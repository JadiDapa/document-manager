import MiddleHeader from "@/components/root/MiddleHeader";
import CardiacoreDetail from "@/components/root/products/cardiacore/CardiacoreDetail";
import ProductFeatures from "@/components/root/products/ProductFeatures";
import Image from "next/image";

export default function InfrastructureTeamPage() {
  return (
    <>
      <MiddleHeader
        section="PRODUCT"
        title="CardiaCore"
        description="Mobile phone-based technology that utilizes an AI model to detect precancerous cervical lesions using cervicography data."
        buttonText="Product Home Page"
      />
      <div className="  px-80 py-24">
        <figure className="relative aspect-video">
          <Image
            src="https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2F607727da9985a63ba247b5e41f57ef051440643f-4575x1477.jpg%3Ffit%3Dmax%26auto%3Dformat&w=1920&q=75"
            alt="CardiaCore"
            fill
            className="object-contain object-center"
          />
        </figure>
      </div>

      <ProductFeatures features={cardiacoreFeatures} />
      <CardiacoreDetail />
    </>
  );
}

const cardiacoreFeatures = [
  "Medical Records",
  "Inference Hole",
  "Defect Prediction",
];
