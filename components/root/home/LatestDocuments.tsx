"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import DataTable from "../DataTable";
import { documentColumns } from "@/lib/column/document";
import SearchDataTable from "../SearchDataTable";
import { getAllDocuments } from "@/lib/networks/document";
// import CreateDocumentDialog from "../section/CreateDocumentDialog";

export default function LatestDocument() {
  const { data: documents } = useQuery({
    queryFn: getAllDocuments,
    queryKey: ["documents"],
  });

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <p>Latest Document</p>
        <div className="flex items-center gap-6">
          {/* <CreateDocumentDialog /> */}
          <div className="flex items-center gap-3 cursor-pointer text-muted-foreground hover:text-foreground transition">
            <p>See More</p>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
      <DataTable
        columns={documentColumns}
        data={documents ?? []}
        title="Project Task"
        filters={(table) => (
          <div className="grid gap-4 p-4 lg:grid-cols-4 lg:gap-6">
            <SearchDataTable
              table={table}
              column="title"
              placeholder="Search Document Name..."
            />
          </div>
        )}
      />
    </section>
  );
}
