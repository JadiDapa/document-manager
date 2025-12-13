import Image from "next/image";

interface DatasetCardProps {
  image: string;
}

export default function DatasetCard({ image }: DatasetCardProps) {
  return (
    <div className="w-full max-w-140">
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src={image}
          alt=""
          className="object-contain object-bottom"
          fill
        />
      </div>
    </div>
  );
}
