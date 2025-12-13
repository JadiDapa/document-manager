import MiddleHeader from "@/components/root/MiddleHeader";
import TeleotivaDetail from "@/components/root/products/teleotiva/TeleotivaDetail";
import ProductFeatures from "@/components/root/products/ProductFeatures";

export default function InfrastructureTeamPage() {
  return (
    <>
      <MiddleHeader
        section="PRODUCT"
        title="TeleoTIVA"
        description="Mobile phone-based technology that utilizes an AI model to detect precancerous cervical lesions using cervicography data."
        buttonText="Product Home Page"
      />
      <div className="flex justify-center   px-44 py-24">
        <iframe
          className="aspect-video w-full rounded-3xl"
          src="https://www.youtube.com/embed/ao9JzMXKAq8?si=DpTr8Q4ILdt1bjjZ"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>

      <ProductFeatures features={teleotivaFeatures} />
      <TeleotivaDetail />
    </>
  );
}

const teleotivaFeatures = [
  "Medical Recording",
  "Validation Treatment",
  "Chatting With Consultant Doctor",
  "Cevical Pre-Cancer Segmentation",
  "Medical Rule Prediction Result",
];
