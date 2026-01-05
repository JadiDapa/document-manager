"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function DeleteDialog({
  mutatuonFn,
  queryKey,
  params,
  children,
}: {
  mutatuonFn: (params: string) => Promise<void>;
  queryKey: string[];
  params: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const qc = useQueryClient();

  const { mutateAsync: onDeleteData } = useMutation({
    mutationFn: async () => mutatuonFn(params),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKey });
      toast.success("Data Berhasil Dihapus!");
      setOpen(false);
    },
    onError: () => {
      toast.error("Gagal Menghapus Data!");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>
          {!children && (
            <Button
              variant="destructive"
              className="rounded-full px-4 py-2 text-white"
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          )}
          {children}
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Hapus Data Terpilih</DialogTitle>
          <p className="text-muted-foreground -mt-1 text-sm">
            Apakah anda yakin ingin menghapus data ini?
          </p>
        </DialogHeader>
        <div className="flex justify-end gap-4">
          <Button onClick={() => onDeleteData()} variant="destructive">
            Konfirmasi
          </Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
