"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RefreshCcw, Search } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import DataTable from "@/components/root/DataTable";
import { documentColumns } from "@/lib/column/document";
import SearchDataTable from "@/components/root/SearchDataTable";
import { getAllDocuments } from "@/lib/networks/document";
import CreateDocumentDialog from "@/components/root/section/CreateDocumentDialog";
import MobilePageHeader from "@/components/dashboard/MobilePageHeader";

export default function SectionsPage() {
  const {
    data: documents,
    refetch,
    isFetching,
    isLoading,
  } = useQuery({
    queryFn: getAllDocuments,
    queryKey: ["documents"],
  });

  const [search, setSearch] = useState("");

  const filteredDocuments = documents?.filter((r) =>
    r.title.toLowerCase().includes(search.toLowerCase()),
  );

  if (!documents || isLoading)
    return <Skeleton className="h-32 w-full rounded-2xl" />;

  return (
    <main className="min-h-screen w-full space-y-8 border bg-white p-4 md:rounded-2xl lg:p-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col items-center justify-between lg:flex-row">
        <PageHeader
          title="Daftar Dokumen"
          subtitle="Berikut Daftar Dokumen yang Ada di PT PUSRI!"
          hidden
        />
        <MobilePageHeader title="Daftar Dokumen" />

        <div className="flex gap-3">
          <CreateDocumentDialog />

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
              placeholder="Cari Judul Dokumen..."
              className="border-none bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* REGION LIST */}
      <DataTable
        columns={documentColumns}
        data={filteredDocuments ?? []}
        title="Project Task"
      />
    </main>
  );
}
