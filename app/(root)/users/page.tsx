"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RefreshCcw, Search } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import CreateUserDialog from "@/components/root/user/CreateUserDialog";
import { UserType } from "@/lib/types/user";
import MobilePageHeader from "@/components/dashboard/MobilePageHeader";
import { getAllUsers } from "@/lib/networks/user";
import UserCard from "@/components/root/user/UserCard";

export default function UsersPage() {
  const {
    data: users,
    refetch,
    isFetching,
    isLoading,
  } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["users"],
  });

  const [search, setSearch] = useState("");

  const filteredInternetPackages = users?.filter((r) =>
    r.username.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="min-h-screen w-full space-y-8 border bg-white p-4 md:rounded-2xl lg:p-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col items-center justify-between max-md:mt-20 lg:flex-row">
        <PageHeader
          title="Daftar Pengguna"
          subtitle="Berikut Daftar Pengguna yang Ada di PT PUSRI!"
          hidden
        />
        <MobilePageHeader title="Section List" />

        <div className="flex gap-3">
          <CreateUserDialog />

          <Button
            variant="outline"
            className="rounded-full px-4 py-4"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            <RefreshCcw className={isFetching ? "animate-spin" : ""} />
            Refresh
          </Button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div>
        <div className="bg-card flex w-full items-center justify-between rounded-2xl border p-2 px-6">
          <div className="bg-card flex w-100 items-center gap-3 rounded-full border px-4 py-1">
            <Search />
            <Input
              placeholder="Cari Username Pengguna..."
              className="border-none bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* REGION LIST */}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-60 w-full" />
          ))}
        </div>
      ) : filteredInternetPackages?.length ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          {filteredInternetPackages?.map((user: UserType) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground mt-6">
          No users found for &quot;{search}&quot;
        </p>
      )}
    </main>
  );
}
