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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { PlusCircle } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMikrotik } from "@/lib/networks/mikrotik";
import {
  ActiveType,
  ConnectionType,
  CreateMikrotikType,
} from "@/lib/types/mikrotik";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getAllNAS } from "@/lib/networks/nas";

export const MikrotikSchema = z
  .object({
    deviceName: z.string().min(1),
    nasId: z.string().min(1),
    portAPI: z.string().min(1),
    connectionType: z.enum([ConnectionType.VPN, ConnectionType.IP_PUBLIK]),
    ipAddress: z.string().optional(),
    username: z.string().min(1),
    password: z.string().min(1),
    description: z.string().min(1),
    regionId: z.string().min(1),
    status: z.string().min(1),
  })
  .refine(
    (data) =>
      data.connectionType === ConnectionType.VPN ||
      (data.connectionType === ConnectionType.IP_PUBLIK && !!data.ipAddress),
    {
      path: ["ipAddress"],
      message: "IP Publik wajib diisi untuk koneksi IP Publik",
    }
  );

export type MikrotikFormType = z.infer<typeof MikrotikSchema>;

export default function CreateMikrotikDialog() {
  const [open, setOpen] = useState(false);

  const form = useForm<MikrotikFormType>({
    resolver: zodResolver(MikrotikSchema),
    defaultValues: {
      deviceName: "",
      nasId: "",
      connectionType: ConnectionType.IP_PUBLIK,
      ipAddress: "",
      portAPI: "8728",
      username: "",
      password: "",
      description: "",
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

  const { data: nas } = useQuery({
    queryKey: ["nas"],
    queryFn: () => getAllNAS(),
  });

  const { mutateAsync: onCreateMikrotik, isPending } = useMutation({
    mutationFn: (values: CreateMikrotikType) => createMikrotik(values),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["mikrotiks"] });
      toast.success("New Mikrotik Created");
    },
    onError: () => {
      toast.error("Failed To Create Mikrotik");
    },
  });

  const onSubmit = async (values: MikrotikFormType) => {
    await onCreateMikrotik({ ...values, portAPI: Number(values.portAPI) });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full py-4 px-4">
          <PlusCircle />
          Tambah Mikrotik
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Tambah Perangkat</DialogTitle>
          <p className="text-sm text-muted-foreground -mt-1">
            Tambahkan perangkat Mikrotik baru ke sistem
          </p>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
          <FieldGroup {...form}>
            <div className="grid grid-cols-2 gap-4">
              {/* Nama Perangkat */}
              <Controller
                name="deviceName"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Nama Perangkat</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        placeholder="Contoh: Router Pusat"
                      />
                    </InputGroup>
                  </Field>
                )}
              />
              {/* Username */}
              <Controller
                name="username"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Username</FieldLabel>
                    <InputGroup>
                      <InputGroupInput {...field} />
                    </InputGroup>
                  </Field>
                )}
              />
              {/* NAS VPN */}
              <Controller
                name="nasId"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>NAS VPN</FieldLabel>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih NAS" />
                      </SelectTrigger>
                      <SelectContent>
                        {nas?.map((n) => (
                          <SelectItem key={n.id} value={n.id}>
                            {n.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
              {/* Password */}
              <Controller
                name="password"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Password</FieldLabel>
                    <InputGroup>
                      <InputGroupInput type="password" {...field} />
                    </InputGroup>
                  </Field>
                )}
              />
              {/* Mode Koneksi */}
              <div className="col-span-2 flex  gap-3">
                <Field className="">
                  <FieldLabel>Mode Koneksi</FieldLabel>

                  <Controller
                    name="connectionType"
                    control={form.control}
                    render={({ field }) => (
                      <RadioGroup
                        className="flex gap-6 mt-2"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value={ConnectionType.VPN} />
                          <span>{ConnectionType.VPN}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value={ConnectionType.IP_PUBLIK} />
                          <span>{ConnectionType.IP_PUBLIK}</span>
                        </div>
                      </RadioGroup>
                    )}
                  />
                </Field>{" "}
                {connectionType === ConnectionType.IP_PUBLIK && (
                  <Controller
                    name="ipAddress"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel>IP Address</FieldLabel>
                        <InputGroup>
                          <InputGroupInput
                            {...field}
                            placeholder="192.168.1.1"
                          />
                        </InputGroup>
                      </Field>
                    )}
                  />
                )}
              </div>
              {/* IP Address */}

              {/* Port API */}
              <Controller
                name="portAPI"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Port API</FieldLabel>
                    <InputGroup>
                      <InputGroupInput {...field} placeholder="8728" />
                    </InputGroup>
                  </Field>
                )}
              />

              {/* Wilayah */}
              <Controller
                name="regionId"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Wilayah</FieldLabel>
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
                  </Field>
                )}
              />
              {/* Deskripsi */}
              <Controller
                name="description"
                control={form.control}
                render={({ field }) => (
                  <Field className="col-span-2">
                    <FieldLabel>Deskripsi (Opsional)</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        placeholder="Deskripsi singkat perangkat"
                      />
                    </InputGroup>
                  </Field>
                )}
              />
            </div>

            {/* Warning Box */}
            {/* <div className="mt-4 p-3 text-sm border rounded-md bg-yellow-50 border-yellow-300 text-yellow-800">
              <strong>Peringatan Keamanan:</strong> Gunakan akun mikrotik dengan
              hak akses read-only untuk mengurangi risiko keamanan. Jangan
              gunakan akun dengan hak akses penuh (read-write).
            </div> */}

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
