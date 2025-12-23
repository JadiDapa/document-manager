"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RefreshCcw, Search } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import CreateItemDialog from "@/components/root/item/CreateItemDialog";
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
    r.title.toLowerCase().includes(search.toLowerCase())
  );

  if (!documents || isLoading)
    return <Skeleton className="h-32 w-full rounded-2xl" />;

  return (
    <main className="bg-white w-full md:rounded-2xl lg:p-6 p-4 min-h-screen border space-y-8">
      {/* PAGE HEADER */}
      <div className="flex flex-col lg:flex-row  justify-between items-center">
        <PageHeader
          title="Document List"
          subtitle="These are all the items that you have created!"
          hidden
        />
        <MobilePageHeader title="Document List" />

        <div className="flex gap-3 ">
          <CreateDocumentDialog />

          <Button
            variant="outline"
            className="rounded-full py-4 px-4"
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
        <div className="w-full bg-card border p-2 rounded-2xl flex justify-between items-center px-6">
          <div className="flex items-center gap-3 w-100 border bg-card px-4 py-1 rounded-full">
            <Search />
            <Input
              placeholder="Search Section Name..."
              className="border-none bg-transparent shadow-none p-0 focus-visible:ring-0 text-sm"
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
        filters={(table) => (
          <div className="grid gap-4 p-4 lg:grid-cols-4 lg:gap-6">
            <SearchDataTable
              table={table}
              column="name"
              placeholder="Search Document Name..."
            />
          </div>
        )}
      />
    </main>
  );
}
