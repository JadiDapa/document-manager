import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface ResearcherCardProps {
  image: string;
  name: string;
  title: string;
  batch?: string;
  desc?: string;
}

export default function ResearcherCard({
  image,
  name,
  title,
  batch,
  desc,
}: ResearcherCardProps) {
  return (
    <Card className="flex w-full max-w-140 flex-row items-center gap-4 p-2">
      <div className="relative h-32 w-32 overflow-hidden rounded-md border">
        <Image
          src={image}
          alt=""
          className="object-contain object-bottom"
          fill
        />
      </div>
      <div className="">
        <p>{name}</p>
        <p>{title}</p>
        {batch && <Badge>{batch}</Badge>}
        {desc && <p>{desc}</p>}
      </div>
    </Card>
  );
}
