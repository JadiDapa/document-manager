"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import DataTable from "../DataTable";
import { documentColumns } from "@/lib/column/document";
import SearchDataTable from "../SearchDataTable";
import { getAllDocuments } from "@/lib/networks/document";
import Link from "next/link";

export default function LatestDocument() {
  const { data: documents } = useQuery({
    queryFn: getAllDocuments,
    queryKey: ["documents"],
  });

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-primary text-lg font-semibold">Dokumen Terbaru</p>
        <div className="flex items-center gap-6">
          <Link
            href={"/documents"}
            className="hover:text-foreground flex cursor-pointer items-center gap-3 font-medium text-yellow-500 transition"
          >
            <p>Lebih Lengkap</p>
            <ArrowRight className="h-4 w-4" />
          </Link>
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
