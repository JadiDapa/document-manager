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
import {
  Field,
  FieldGroup,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Phone, Map, Landmark, PlusCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRegion } from "@/lib/networks/region";
import { CreateRegionType } from "@/lib/types/region";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const regionSchema = z.object({
  name: z.string().min(1, "Nama wilayah wajib diisi"),
  code: z.string().min(1, "Kode wilayah wajib diisi"),
  province: z.string().min(1, "Provinsi wajib diisi"),
  city: z.string().min(1, "Kota/Kabupaten wajib diisi"),
  district: z.string().min(1, "Kecamatan wajib diisi"),
  village: z.string().min(1, "Desa/Kelurahan wajib diisi"),
  phone: z.string().min(1, "Nomor telepon wajib diisi"),
});

export type RegionFormType = z.infer<typeof regionSchema>;

export default function CreateRegionDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<RegionFormType>({
    resolver: zodResolver(regionSchema),
    defaultValues: {
      name: "",
      code: "",
      province: "",
      city: "",
      district: "",
      village: "",
      phone: "",
    },
  });

  const qc = useQueryClient();

  const { mutateAsync: onCreateRegion, isPending } = useMutation({
    mutationFn: (values: CreateRegionType) => createRegion(values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["regions"] });
      toast.success("New Region Created");
    },
    onError: () => {
      toast.error("Failed to delete region");
    },
  });

  const onSubmit = async (values: RegionFormType) => {
    await onCreateRegion(values);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full py-4 px-4">
          <PlusCircle />
          Tambah Wilayah
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Tambah Wilayah</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
          <FieldGroup {...form}>
            <div className="space-y-4">
              {/* NAMA WILAYAH */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Nama Wilayah</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        placeholder="Contoh: Jakarta Selatan"
                      />
                    </InputGroup>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* KODE WILAYAH */}
              <Controller
                name="code"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Kode Wilayah</FieldLabel>
                    <InputGroup>
                      <InputGroupInput {...field} placeholder="Contoh: JKT-S" />
                    </InputGroup>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* GRID 2 COLUMN */}
              <div className="grid grid-cols-2 gap-4">
                {/* PROVINSI */}
                <Controller
                  name="province"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Provinsi</FieldLabel>
                      <InputGroup>
                        <InputGroupAddon>
                          <Map />
                        </InputGroupAddon>
                        <InputGroupInput
                          {...field}
                          placeholder="Contoh: DKI Jakarta"
                        />
                      </InputGroup>
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* KOTA */}
                <Controller
                  name="city"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Kota/Kabupaten</FieldLabel>
                      <InputGroup>
                        <InputGroupAddon>
                          <Landmark />
                        </InputGroupAddon>
                        <InputGroupInput
                          {...field}
                          placeholder="Contoh: Jakarta"
                        />
                      </InputGroup>
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* KECAMATAN */}
                <Controller
                  name="district"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Kecamatan</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          placeholder="Contoh: Pancoran"
                        />
                      </InputGroup>
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                {/* DESA */}
                <Controller
                  name="village"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>Kelurahan/Desa</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          placeholder="Contoh: Pengadegan"
                        />
                      </InputGroup>
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              {/* PHONE */}
              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Nomor Telepon</FieldLabel>
                    <InputGroup>
                      <InputGroupAddon>
                        <Phone />
                      </InputGroupAddon>
                      <InputGroupInput
                        {...field}
                        placeholder="Contoh: 628123456789"
                      />
                    </InputGroup>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <DialogFooter className="mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Batal
              </Button>
              <Button type="submit">
                {isPending ? <Spinner /> : "Submit"}
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
