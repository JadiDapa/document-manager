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

import { InputGroup, InputGroupInput } from "@/components/ui/input-group";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createInternetPackage } from "@/lib/networks/internet-package";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { getAllRegions } from "@/lib/networks/region";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  name: z.string().min(1, "Nama paket wajib diisi"),
  speedType: z.string().min(1),
  downloadSpeed: z.string().min(1),
  uploadSpeed: z.string().min(1),
  periodType: z.string().min(1),
  activeDays: z.string().min(1),
  profileName: z.boolean().optional(),
  showInUpgrade: z.boolean().optional(),
  providerPrice: z.string().min(1),
  resellerPrice: z.string().min(1),
  regionId: z.string().min(1),
});

export default function CreateInternetPackageDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      speedType: "fix",
      downloadSpeed: "",
      uploadSpeed: "",
      periodType: "masa-aktif",
      activeDays: "30",
      profileName: false,
      showInUpgrade: false,
      providerPrice: "",
      resellerPrice: "",
      regionId: "",
    },
  });

  const { data: regions } = useQuery({
    queryKey: ["regions"],
    queryFn: () => getAllRegions(),
  });

  const qc = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createInternetPackage,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["internetPackages"] });
      toast.success("Internet package created");
    },
    onError: () => toast.error("Failed to create package"),
  });

  const onSubmit = async (values: any) => {
    await mutateAsync({ ...values, status: "ACTIVE" });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full py-4 px-4">
          Tambah Paket Internet
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Paket Internet</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
          <FieldGroup>
            <div className="space-y-4">
              {/* NAMA PAKET */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Nama Paket</FieldLabel>
                    <InputGroup>
                      <InputGroupInput {...field} placeholder="Contoh: Basic" />
                    </InputGroup>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* SPEED TYPE */}
              <Field>
                <FieldLabel>Periode Aktif</FieldLabel>
                <Controller
                  name="speedType"
                  control={form.control}
                  render={({ field }) => (
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Wilayah" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FIX">{"FIX"}</SelectItem>
                        <SelectItem value="BURST">{"BURST"}</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              {/* DOWNLOAD + UPLOAD */}
              <div className="grid grid-cols-2 gap-4">
                {/* DOWNLOAD */}
                <Field>
                  <FieldLabel>Kecepatan Download</FieldLabel>
                  <div className="flex gap-2">
                    <Controller
                      name="downloadSpeed"
                      control={form.control}
                      render={({ field }) => (
                        <InputGroup>
                          <InputGroupInput {...field} placeholder="10" />
                        </InputGroup>
                      )}
                    />
                    <select className="border rounded p-2">
                      <option>Mbps</option>
                    </select>
                  </div>
                </Field>

                {/* UPLOAD */}
                <Field>
                  <FieldLabel>Kecepatan Upload</FieldLabel>
                  <div className="flex gap-2">
                    <Controller
                      name="uploadSpeed"
                      control={form.control}
                      render={({ field }) => (
                        <InputGroup>
                          <InputGroupInput {...field} placeholder="10" />
                        </InputGroup>
                      )}
                    />
                    <select className="border rounded p-2">
                      <option>Mbps</option>
                    </select>
                  </div>
                </Field>
              </div>

              {/* PERIODE AKTIF */}
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Periode Aktif</FieldLabel>
                  <Controller
                    name="periodType"
                    control={form.control}
                    render={({ field }) => (
                      <Select {...field} onValueChange={field.onChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Wilayah" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="FIX">{"FIX"}</SelectItem>
                          <SelectItem value="ACTIVE_TIME">
                            {"ACTIVE TIME"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </Field>

                {/* HARI */}
                <Controller
                  name="activeDays"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel>Hari</FieldLabel>
                      <InputGroup>
                        <InputGroupInput {...field} placeholder="30" />
                      </InputGroup>
                    </Field>
                  )}
                />
              </div>

              {/* CHECKBOX */}
              <Controller
                name="profileName"
                control={form.control}
                render={({ field }) => (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    Gunakan Profile Name
                  </label>
                )}
              />

              <Controller
                name="showInUpgrade"
                control={form.control}
                render={({ field }) => (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                    />
                    Tampilkan di Halaman Upgrade Aplikasi Pelanggan
                  </label>
                )}
              />

              {/* HARGA */}
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>Harga Provider</FieldLabel>
                  <Controller
                    name="providerPrice"
                    control={form.control}
                    render={({ field }) => (
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          placeholder="Contoh: 120000"
                        />
                      </InputGroup>
                    )}
                  />
                </Field>

                <Field>
                  <FieldLabel>Harga Reseller</FieldLabel>
                  <Controller
                    name="resellerPrice"
                    control={form.control}
                    render={({ field }) => (
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          placeholder="Contoh: 150000"
                        />
                      </InputGroup>
                    )}
                  />
                </Field>
              </div>

              {/* SPEED TYPE */}
              <Field>
                <FieldLabel>Wilayah</FieldLabel>
                <Controller
                  name="regionId"
                  control={form.control}
                  render={({ field }) => (
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Wilayah" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions?.map((region) => (
                          <SelectItem key={region.id} value={region.id}>
                            {region.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
            </div>

            <DialogFooter className="mt-6">
              <Button
                variant="outline"
                type="button"
                onClick={() => setOpen(false)}
              >
                Batal
              </Button>

              <Button type="submit">
                {isPending ? <Spinner /> : "Tambah"}
              </Button>
            </DialogFooter>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
}
