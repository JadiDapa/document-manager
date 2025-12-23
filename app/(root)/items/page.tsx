"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RefreshCcw, Search } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllItems } from "@/lib/networks/item";
import CreateItemDialog from "@/components/root/item/CreateItemDialog";
import { ItemType } from "@/lib/types/item";
import ItemCard from "@/components/root/item/ItemCard";
import MobilePageHeader from "@/components/dashboard/MobilePageHeader";

export default function SectionsPage() {
  const {
    data: items,
    refetch,
    isFetching,
    isLoading,
  } = useQuery({
    queryFn: getAllItems,
    queryKey: ["items"],
  });

  const [search, setSearch] = useState("");

  const filteredInternetPackages = items?.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="bg-white w-full md:rounded-2xl lg:p-6 p-4 min-h-screen border space-y-8">
      {/* PAGE HEADER */}
      <div className="flex flex-col lg:flex-row  justify-between items-center">
        <PageHeader
          title="Items List"
          subtitle="These are all the items that you have created!"
          hidden
        />
        <MobilePageHeader title="Items List" />

        <div className="flex gap-3">
          <CreateItemDialog />

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
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-60 w-full" />
          ))}
        </div>
      ) : filteredInternetPackages?.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {filteredInternetPackages?.map((item: ItemType) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground mt-6">
          No items found for &quot;{search}&quot;
        </p>
      )}
    </main>
  );
}
