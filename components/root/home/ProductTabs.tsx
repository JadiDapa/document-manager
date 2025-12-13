"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function ProductsTabs({
  products,
}: {
  products: {
    key: string;
    name: string;
    image: string;
    description: string;
    features: string[];
  }[];
}) {
  return (
    <div className="flex justify-center lg:mb-12">
      <Tabs defaultValue={products[0]?.key}>
        <TabsList className="mx-auto rounded-lg bg-gray-200 p-1">
          {products.map((item) => (
            <TabsTrigger
              key={item.key}
              value={item.key}
              className="rounded-lg px-6 py-4 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              {item.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Content */}
        {products.map((item) => (
          <TabsContent key={item.key} value={item.key} className="mt-10">
            <ProductContent
              image={item.image}
              description={item.description}
              features={item.features}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function ProductContent({
  image,
  description,
  features,
}: {
  image: string;
  description: string;
  features: string[];
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
      {/* Image */}
      <div className="flex justify-center gap-6">
        <div className="relative h-40 w-full lg:h-[460px] lg:w-[700px]">
          <Image src={image} alt="Product" fill className="object-contain" />
        </div>
      </div>

      {/* Text */}
      <div>
        <p className="mb-6 text-sm leading-relaxed text-gray-700 lg:text-lg">
          {description}
        </p>

        <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 lg:items-start">
              <CheckCircle className="mt-1 size-4 text-primary lg:size-5" />
              <span className="text-sm text-gray-800 lg:text-base">{f}</span>
            </div>
          ))}
        </div>

        <Button className="rounded-lg border bg-white border-gray-300   px-6 py-3 text-gray-700 hover:bg-gray-100 lg:mt-4 lg:px-12 lg:py-6">
          More details
        </Button>
      </div>
    </div>
  );
}
