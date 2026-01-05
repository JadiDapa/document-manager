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
import { Download, FileText, Trash } from "lucide-react";
import { DocumentType } from "@/lib/types/document";
import { ScrollArea } from "@/components/ui/scroll-area";
import UpdateDocumentDialog from "../section/UpdateDocumentDialog";
import DeleteDialog from "../DeleteDialog";
import { deleteDocument } from "@/lib/networks/document";

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
        <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-xl border">
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
        <Button size="sm" className="rounded-full text-white">
          Detail
        </Button>
      </DialogTrigger>

      <DialogContent className="py-0 sm:max-w-2xl">
        <ScrollArea className="max-h-[90vh] p-6">
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
              <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
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

          <div className="mt-6 space-y-6">
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
                  <p className="text-muted-foreground text-sm">
                    Tipe File Ini Tidak Dapat Di Tinjau
                  </p>
                  <a
                    href={document.fileUrl}
                    download
                    className="text-primary inline-flex items-center gap-2 underline"
                  >
                    <Download className="size-4" />
                    Unduh File
                  </a>
                </Card>
              )}
            </div>

            {/* Metadata */}
            <div className="space-y-4">
              <Card className="rounded-xl p-4">
                <div className="flex items-center gap-2">
                  <FileText className="text-muted-foreground size-4" />
                  <span className="text-sm font-medium">Deskripsi</span>
                </div>
                <p className="text-muted-foreground mt-2 text-sm">
                  {document.description || "Tidak Ada Deskripsi."}
                </p>
              </Card>

              {!isPreviewable && (
                <Card className="rounded-xl p-4">
                  <a
                    href={document.fileUrl}
                    download
                    className="bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white"
                  >
                    <Download className="size-4" />
                    Unduh {document.fileType}
                  </a>
                </Card>
              )}
            </div>
          </div>

          <DialogFooter className="mt-6 pb-8">
            <div className="flex justify-end gap-4">
              <UpdateDocumentDialog document={document} />
              <DeleteDialog
                mutatuonFn={deleteDocument}
                params={document.id}
                queryKey={["items", document.item.id]}
              />
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </div>
          </DialogFooter>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
