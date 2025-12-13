import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import Image from "next/image";

export default function ActivityCard({
  item,
}: {
  item: { image: string; date: string; title: string };
}) {
  return (
    <Card className="rounded-none border-x-0 border-t-0 border-b border-gray-500 bg-black/60 p-0 text-white">
      <CardContent className="flex gap-4 p-0 py-5 lg:p-4">
        <div className="relative size-28 overflow-hidden rounded-md">
          <Image
            src={item.image}
            alt="Activity"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-center gap-2 text-sm text-primary">
            <CalendarDays size={16} />
            <span>{item.date}</span>
          </div>
          <p className="leading-tight font-medium text-gray-100">
            {item.title}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
