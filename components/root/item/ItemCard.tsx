"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Folder, MoreHorizontal, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ItemType } from "@/lib/types/item";
import Link from "next/link";

export default function ItemCard({ item }: { item: ItemType }) {
  const documentCount = item.documents?.length ?? 0;

  return (
    <Link href={`/items/${item.id}`} className="group block">
      <Card className="bg-background overflow-hidden rounded-2xl border shadow-sm transition hover:shadow-md">
        <CardContent className="space-y-4 p-5">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>

              <div>
                <div className="flex h-9 items-center">
                  <h3 className="text-sm leading-tight font-semibold">
                    {item.name}
                  </h3>
                </div>
                <p className="text-muted-foreground text-xs">
                  Diubah :{" "}
                  {formatDistanceToNow(new Date(item.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>

            <MoreHorizontal className="text-muted-foreground h-5 w-5 opacity-0 transition group-hover:opacity-100" />
          </div>

          {/* Description */}
          {item.description && (
            <div className="h-20">
              <p className="text-muted-foreground line-clamp-2 text-sm">
                {item.description}
              </p>
            </div>
          )}

          {/* Section */}
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <Folder className="h-4 w-4" />
            <span>
              Divisi{" "}
              <span className="font-medium text-slate-700 capitalize">
                {item.section.name}
              </span>
            </span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-2 text-sm">
              <Badge variant="secondary" className="gap-1">
                <FileText className="h-3 w-3" />
                {documentCount} Dokumen
              </Badge>
            </div>

            <span className="flex items-center gap-1 text-sm font-medium text-blue-600 transition group-hover:translate-x-1">
              Lihat
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
