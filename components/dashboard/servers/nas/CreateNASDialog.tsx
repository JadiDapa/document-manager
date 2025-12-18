"use client";

import { useState } from "react";
import { z } from "zod";
import { Controller, useForm, useWatch } from "react-hook-form";
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
import { PlusCircle } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createNAS } from "@/lib/networks/nas";
import { ActiveType, ConnectionType, CreateNasType } from "@/lib/types/nas";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllRegions } from "@/lib/networks/region";

export const NASSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().min(1),
    connectionType: z.enum([ConnectionType.VPN, ConnectionType.IP_PUBLIK]),
    publicIP: z.string().optional(),
    regionId: z.string().min(1),
    status: z.string().min(1),
  })
  .refine(
    (data) =>
      data.connectionType === ConnectionType.VPN ||
      (data.connectionType === ConnectionType.IP_PUBLIK && !!data.publicIP),
    {
      path: ["publicIP"],
      message: "IP Publik wajib diisi untuk koneksi IP Publik",
    }
  );

export type NASFormType = z.infer<typeof NASSchema>;

export default function CreateNASDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<NASFormType>({
    resolver: zodResolver(NASSchema),
    defaultValues: {
      name: "",
      description: "",
      connectionType: ConnectionType.VPN,
      publicIP: "",
      regionId: "",
      status: ActiveType.ACTIVE,
    },
  });

  const connectionType = useWatch({
    control: form.control,
    name: "connectionType",
  });

  const qc = useQueryClient();

  const { data: regions } = useQuery({
    queryKey: ["regions"],
    queryFn: () => getAllRegions(),
  });

  const { mutateAsync: onCreateNAS, isPending } = useMutation({
    mutationFn: (values: CreateNasType) => createNAS(values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["nas"] });
      toast.success("New NAS Created");
    },
    onError: () => {
      toast.error("Failed to create NAS");
    },
  });

  const onSubmit = async (values: NASFormType) => {
    await onCreateNAS(values);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full py-4 px-4">
          <PlusCircle />
          Tambah NAS
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Tambah NAS</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
          <FieldGroup {...form}>
            <div className="space-y-4">
              {/* NAS NAME */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Nama NAS</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        placeholder="Contoh: Router Pusat"
                      />
                    </InputGroup>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* DESCRIPTION */}
              <Controller
                name="description"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Deskripsi</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        placeholder="Contoh: Router untuk area pusat"
                      />
                    </InputGroup>
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* CONNECTION TYPE */}
              <Field>
                <FieldLabel>Metode Koneksi</FieldLabel>
                <Controller
                  name="connectionType"
                  control={form.control}
                  render={({ field }) => (
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih Metode Koneksi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ConnectionType.IP_PUBLIK}>
                          {ConnectionType.IP_PUBLIK}
                        </SelectItem>
                        <SelectItem value={ConnectionType.VPN}>
                          {ConnectionType.VPN}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              {/* PUBLIC IP */}
              {connectionType === ConnectionType.IP_PUBLIK && (
                <Controller
                  name="publicIP"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field>
                      <FieldLabel>IP Publik</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          placeholder="Contoh: 123.123.123.123"
                        />
                      </InputGroup>
                      {fieldState.error && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              )}

              {/* REGION */}
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
