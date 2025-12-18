"use client";

import { useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { PlusCircle } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { CreateDocumentType } from "@/lib/types/document";
import { createDocument } from "@/lib/networks/document";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { getAllItems } from "@/lib/networks/item";
import { Textarea } from "@/components/ui/textarea";

const DocumentSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(["PROCEDURE", "REGULATION", "ANNOUCEMENT", "REPORTS", "OTHER"]),
  fileType: z.enum(["PDF", "VIDEO", "IMAGE", "EXCEL", "DOC", "OTHER"]),
  itemId: z.string().min(1),
  file: z
    .instanceof(File)
    .refine((file) => file.size > 0, "File wajib diupload"),
});

type DocumentFormType = z.infer<typeof DocumentSchema>;

export default function CreateDocumentDialog({ itemId }: { itemId?: string }) {
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();

  const { data: items } = useQuery({
    queryFn: getAllItems,
    queryKey: ["items"],
  });

  function detectFileType(file: File): DocumentFormType["fileType"] {
    const type = file.type;

    if (type.includes("pdf")) return "PDF";
    if (type.includes("image")) return "IMAGE";
    if (type.includes("video")) return "VIDEO";
    if (type.includes("excel") || type.includes("spreadsheet")) return "EXCEL";
    if (type.includes("word")) return "DOC";

    return "OTHER";
  }

  const form = useForm<DocumentFormType>({
    resolver: zodResolver(DocumentSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "PROCEDURE",
      fileType: "PDF",
      itemId: itemId ? itemId : "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values: CreateDocumentType) => createDocument(values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["documents"] });
      toast.success("Document berhasil dibuat");
      setOpen(false);
      form.reset();
    },
    onError: () => {
      toast.error("Gagal membuat document");
    },
  });

  const onSubmit = async (values: DocumentFormType) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("type", values.type);
    formData.append("fileType", values.fileType);
    formData.append("itemId", values.itemId);
    formData.append("views", "0");
    formData.append("fileUrl", values.file);

    await mutateAsync(formData as unknown as CreateDocumentType);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full px-4 py-2">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Document
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Document</DialogTitle>
          <p className="text-sm text-muted-foreground -mt-1">
            Create a new document to manage your documents
          </p>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
          <FieldGroup {...form}>
            <div className="grid gap-4">
              {/* Judul */}
              <Controller
                name="title"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Judul Document</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        placeholder="Contoh: Panduan Instalasi"
                      />
                    </InputGroup>
                  </Field>
                )}
              />

              {/* Deskripsi */}
              <Controller
                name="description"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Deskripsi</FieldLabel>
                    <InputGroup>
                      <Textarea
                        {...field}
                        placeholder="Deskripsi singkat document"
                      />
                    </InputGroup>
                  </Field>
                )}
              />

              {/* File URL */}
              <Controller
                name="file"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Upload File</FieldLabel>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.mp4"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;

                        field.onChange(file);

                        // auto-detect file type
                        const detectedType = detectFileType(file);
                        form.setValue("fileType", detectedType);
                      }}
                      className="block w-full text-sm"
                    />
                  </Field>
                )}
              />

              <div className="flex gap-4 justify-between">
                <Controller
                  name="type"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>Ocassion Type</FieldLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Document Ocassion Type..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="PROCEDURE">Procedure</SelectItem>
                          <SelectItem value="REGULATION">Regulation</SelectItem>
                          <SelectItem value="ANNOUCEMENT">
                            Announcement
                          </SelectItem>
                          <SelectItem value="REPORTS">Reports</SelectItem>
                          <SelectItem value="OTHER">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                />

                {!itemId && (
                  <Field>
                    <FieldLabel>Select Section</FieldLabel>
                    <Controller
                      name="itemId"
                      control={form.control}
                      render={({ field }) => (
                        <Select {...field} onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih Wilayah" />
                          </SelectTrigger>
                          <SelectContent>
                            {items?.map((section) => (
                              <SelectItem
                                key={section.id}
                                value={section.id}
                                className="capitalize"
                              >
                                {section.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </Field>
                )}
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? <Spinner /> : "Submit"}
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
