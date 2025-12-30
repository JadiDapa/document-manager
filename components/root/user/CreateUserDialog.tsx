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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeClosed, Lock, PlusCircle } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { createUser } from "@/lib/networks/user";

const UserSchema = z
  .object({
    username: z.string().min(1, "Username wajib diisi"),
    fullName: z.string().min(1, "Full name wajib diisi"),
    password: z.string().min(1, "Password wajib diisi"),
    confirmPassword: z.string().min(1, "Repeat password wajib diisi"),
    role: z.enum(["ADMIN", "GUEST"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan Repeat Password harus sama",
    path: ["confirmPassword"],
  });

type UserFormType = z.infer<typeof UserSchema>;

export default function CreateUserDialog() {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const qc = useQueryClient();

  const form = useForm<UserFormType>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      username: "",
      role: "GUEST",
      password: "",
      confirmPassword: "",
      fullName: "",
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: UserFormType) => {
      return await createUser(values);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      toast.success("User berhasil dibuat");
      setOpen(false);
      form.reset();
    },
    onError: () => {
      toast.error("Gagal membuat user");
    },
  });

  const onSubmit = async (values: UserFormType) => {
    await mutateAsync(values);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full px-4 py-2">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create User
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <p className="text-muted-foreground -mt-1 text-sm">
            Tambahkan user baru ke sistem
          </p>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
          <FieldGroup {...form}>
            <div className="grid gap-4">
              {/* Full Name */}
              <Controller
                name="fullName"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Full Name</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        placeholder="contoh: John Doe"
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
                      <InputGroupInput
                        {...field}
                        placeholder="contoh: johndoe"
                      />
                    </InputGroup>
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="relative">
                    <FieldLabel>Password</FieldLabel>
                    <InputGroup className="h-12">
                      <InputGroupAddon>
                        <Lock />
                      </InputGroupAddon>
                      <InputGroupInput
                        {...field}
                        className="ml-2"
                        type={isVisible ? "text" : "password"}
                        aria-invalid={fieldState.invalid}
                        placeholder="Password"
                        autoComplete="off"
                      />
                      <InputGroupAddon
                        align="inline-end"
                        onClick={() => setIsVisible(!isVisible)}
                      >
                        {isVisible ? <Eye /> : <EyeClosed />}
                      </InputGroupAddon>
                    </InputGroup>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="relative">
                    <FieldLabel>Confirm Password</FieldLabel>
                    <InputGroup className="h-12">
                      <InputGroupAddon>
                        <Lock />
                      </InputGroupAddon>
                      <InputGroupInput
                        {...field}
                        className="ml-2"
                        type={isVisible ? "text" : "password"}
                        aria-invalid={fieldState.invalid}
                        placeholder="Password"
                        autoComplete="off"
                      />
                      <InputGroupAddon
                        align="inline-end"
                        onClick={() => setIsVisible(!isVisible)}
                      >
                        {isVisible ? <Eye /> : <EyeClosed />}
                      </InputGroupAddon>
                    </InputGroup>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Role */}
              <Controller
                name="role"
                control={form.control}
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Role</FieldLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="GUEST">Guest</SelectItem>
                      </SelectContent>
                    </Select>
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
