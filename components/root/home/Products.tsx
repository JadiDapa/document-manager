import ProductsTabs from "./ProductTabs";

export default async function ProductsSection() {
  const product = await getProductsContent();

  return (
    <section className="w-full  px-6 py-20 lg:px-40">
      <div className="mb-10 text-center">
        <h3 className="text-2xl lg:text-3xl font-bold text-primary">
          {product.title}
        </h3>
        <h2 className="mt-2 text-4xl font-light lg:text-5xl">
          {product.subtitle}
        </h2>
      </div>
      <ProductsTabs products={product.products} />
    </section>
  );
}

async function getProductsContent() {
  return {
    title: "Our Products",
    subtitle: "AI Solutions for Diagnostic Confidence",

    products: [
      {
        key: "tele",
        name: "TeleOTIVA",
        image:
          "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2Fd797ae20ab0558e115ede88ab337d8faac2fe86c-7024x4135.jpg%3Ffit%3Dmax%26auto%3Dformat&w=3840&q=75",
        description:
          "Mobile phone-based technology that utilizes an AI model to detect precancerous cervical lesions using cervicography data.",
        features: [
          "Medical Recording",
          "Cervical Pre-Cancer Segmentation",
          "Validation Treatment",
          "Medical Rule Prediction Result",
          "Chatting with Consultant Doctor",
        ],
      },
      {
        key: "cardia",
        name: "CardiaCore",
        image:
          "https://isysrg.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Frpp4jatp%2Fproduction%2F607727da9985a63ba247b5e41f57ef051440643f-4575x1477.jpg%3Ffit%3Dmax%26auto%3Dformat&w=3840&q=75",
        description:
          "AI-powered cardiac analysis system that assists clinicians in detecting abnormalities through ECG and echocardiography.",
        features: [
          "ECG Pattern Recognition",
          "Arrhythmia Prediction",
          "Echocardiography Analysis",
          "Cardiac Risk Scoring",
          "Doctor Consultant Integration",
        ],
      },
    ],
  };
}
