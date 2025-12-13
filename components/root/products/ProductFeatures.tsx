import { CheckCircle } from "lucide-react";

export default function ProductFeatures({ features }: { features: string[] }) {
  return (
    <section className="bg-gray-900 px-44 py-24">
      <h2 className="text-center text-3xl font-semibold text-primary">
        Product Features
      </h2>
      <div className="mt-12 grid grid-cols-2 gap-4">
        {features.map((feature) => (
          <FeatureItem feature={feature} key={feature} />
        ))}
      </div>
    </section>
  );
}

function FeatureItem({ feature }: { feature: string }) {
  return (
    <div className="flex items-center gap-8 rounded-md border border-gray-600 p-6">
      <CheckCircle className="text-primary" />
      <p className="text-white">{feature}</p>
    </div>
  );
}
