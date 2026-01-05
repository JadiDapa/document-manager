// components/ItemCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ItemType } from "@/lib/types/item";
import { EllipsisVertical, FolderOpenDot, FileText, Clock } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function ItemCard({ item }: { item: ItemType }) {
  return (
    <Link href={`/items/${item.id}`} className="group block">
      <Card className="bg-primary/5 w-80 rounded-md border transition-all hover:-translate-y-1 hover:shadow-lg">
        <CardContent className="space-y-3 p-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-md">
                <FolderOpenDot className="size-6" />
              </div>

              <div className="space-y-0.5">
                <h3 className="line-clamp-1 leading-none font-semibold capitalize">
                  {item.name}
                </h3>

                {/* Section */}
                <Badge variant="secondary" className="text-xs">
                  {item.section?.name ?? "-"}
                </Badge>
              </div>
            </div>

            <EllipsisVertical
              className="text-muted-foreground size-5 opacity-0 transition-opacity group-hover:opacity-100"
              strokeWidth={1.5}
            />
          </div>

          {/* Description */}
          {item.description && (
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {item.description}
            </p>
          )}

          <Separator />

          {/* Footer */}
          <div className="text-muted-foreground flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <FileText className="size-4" />
              <span>{item.documents?.length ?? 0} Dokumen</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="size-4" />
              <span>
                {formatDistanceToNow(new Date(item.updatedAt), {
                  addSuffix: true,
                })}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
