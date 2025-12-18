"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";
import { DocumentType } from "@/lib/types/document";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DocumentDetailDialog({
  document,
}: {
  document: DocumentType;
}) {
  const [open, setOpen] = useState(false);

  const fileImageMap: Record<string, string> = {
    PDF: "/images/pdf.png",
    DOC: "/images/doc.png",
    IMAGE: "/images/image.png",
    EXCEL: "/images/xls.png",
    VIDEO: "/images/video.png",
  };

  const fileImage = fileImageMap[document.fileType] ?? "/images/file.png";

  const isPreviewable =
    document.fileType === "IMAGE" || document.fileType === "VIDEO";

  const renderPreview = () => {
    if (document.fileType === "IMAGE") {
      return (
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted">
          <Image
            src={document.fileUrl}
            alt={document.title}
            fill
            unoptimized
            className="object-contain"
          />
        </div>
      );
    }

    if (document.fileType === "VIDEO") {
      return (
        <video
          src={document.fileUrl}
          controls
          className="w-full rounded-xl border"
        />
      );
    }

    return null;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="rounded-full">
          Detail
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl py-0">
        <ScrollArea className="max-h-[90vh] p-6 ">
          <DialogHeader className="flex flex-row items-center gap-4 pt-8">
            <figure className="relative size-12 shrink-0">
              <Image
                src={fileImage}
                alt={document.title}
                fill
                className="object-contain"
              />
            </figure>

            <div className="space-y-1">
              <DialogTitle className="text-xl">{document.title}</DialogTitle>
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span>{document.fileType} file</span>
                <span>•</span>
                <span>
                  {new Date(document.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </DialogHeader>

          <div className="mt-6 space-y-6 ">
            {/* Preview / Illustration */}
            <div className="md:col-span-2">
              {isPreviewable ? (
                renderPreview()
              ) : (
                <Card className="flex h-full min-h-55 flex-col items-center justify-center gap-4 rounded-xl border-dashed text-center">
                  <Image
                    src={fileImage}
                    alt={document.fileType}
                    width={64}
                    height={64}
                  />
                  <p className="text-sm text-muted-foreground">
                    This file type can’t be previewed.
                  </p>
                  <a
                    href={document.fileUrl}
                    download
                    className="inline-flex items-center gap-2 text-primary underline"
                  >
                    <Download className="size-4" />
                    Download file
                  </a>
                </Card>
              )}
            </div>

            {/* Metadata */}
            <div className="space-y-4">
              <Card className="rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <FileText className="size-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Description</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {document.description || "No description provided."}
                </p>
              </Card>

              {!isPreviewable && (
                <Card className="rounded-xl p-4">
                  <a
                    href={document.fileUrl}
                    download
                    className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    <Download className="size-4" />
                    Download {document.fileType}
                  </a>
                </Card>
              )}
            </div>
          </div>

          <DialogFooter className="mt-6 pb-8">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
