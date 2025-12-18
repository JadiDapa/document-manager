"use client";

import {
  ArrowLeft,
  EllipsisVertical,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useAccount } from "@/providers/AccountProvider";

export default function MobilePageHeader({ title }: { title?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const account = useAccount();

  const isRoot = pathname === "/";

  if (!pathname) return null;

  return (
    <header
      className={`md:hidden ${isRoot ? " " : "fixed px-3 shadow-2xl top-0 left-0 z-100 bg-white "}  pt-4 w-full pb-3 `}
    >
      {isRoot ? (
        /* ===== ROOT PAGE HEADER ===== */
        <div className="space-y-4">
          {/* Top row */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">
                Hello, {account.account?.fullName || "Daffa Althaf"}
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome to FileGear
              </p>
            </div>

            <Image
              src={
                account?.avatar ??
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s"
              }
              alt="Profile"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          </div>

          {/* Search */}
          <div className="flex items-center gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-full bg-muted px-4 py-3">
              <Search className="size-4 text-muted-foreground" />
              <input
                placeholder="Search"
                className="bg-transparent text-sm outline-none w-full"
              />
            </div>

            <button className="flex size-11 items-center justify-center rounded-full bg-foreground text-background">
              <SlidersHorizontal className="size-5" />
            </button>
          </div>
        </div>
      ) : (
        /* ===== OTHER PAGES HEADER ===== */
        <div className="relative flex items-center justify-between ">
          <button
            onClick={() => router.back()}
            className=" flex size-10 items-center justify-center rounded-full "
          >
            <ArrowLeft className="size-5" />
          </button>

          <h1 className="text-lg font-semibold">{title}</h1>
          <button
            onClick={() => router.back()}
            className=" flex size-10 items-center justify-center rounded-full "
          >
            <EllipsisVertical className="size-5" />
          </button>
        </div>
      )}
    </header>
  );
}
