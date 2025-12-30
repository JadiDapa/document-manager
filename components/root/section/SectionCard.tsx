"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, Folder, FileText, Layers, ArrowRight } from "lucide-react";
import { SectionType } from "@/lib/types/section";
import { format } from "date-fns";
import Link from "next/link";

export default function SectionCard({ section }: { section: SectionType }) {
  const itemCount = section.items.length;
  const documentCount = section.items.reduce(
    (sum, item) => sum + item.documents.length,
    0,
  );

  return (
    <Link href={`/sections/${section.id}`} className="block">
      <Card className="bg-primary/10 rounded-2xl border shadow-sm transition hover:shadow-md">
        <CardContent className="space-y-4 p-5">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600/10">
                <Folder className="h-5 w-5 text-indigo-600" />
              </div>

              <div>
                <p className="text-sm leading-tight font-semibold">
                  {section.name}
                </p>
                <p className="text-muted-foreground text-xs">
                  Created {format(new Date(section.createdAt), "dd MMM yyyy")}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1 px-3 text-xs"
            >
              Save <Bookmark className="h-3 w-3" />
            </Button>
          </div>

          {/* Description */}
          {section.description && (
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {section.description}
            </p>
          )}

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              <span>{itemCount} Items</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>{documentCount} Documents</span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t pt-4">
            <p className="text-muted-foreground text-xs">
              Manage items and documents in this section
            </p>

            <Button className="gap-2 rounded-lg px-4">
              See Items
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
