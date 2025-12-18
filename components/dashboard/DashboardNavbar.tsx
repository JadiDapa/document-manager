"use client";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, Bell, Search } from "lucide-react";
import Image from "next/image";
import { useAccount } from "@/providers/AccountProvider";

export default function Navbar() {
  const account = useAccount();

  return (
    <header className="w-full  items-center justify-between hidden md:flex bg-white border border-border px-6 py-3 rounded-2xl">
      {/* Search */}
      <div className="flex items-center gap-3 w-87 border bg-card px-4 py-2 rounded-full">
        <Search />

        <Input
          type="text"
          placeholder="Search task"
          className="border-none bg-transparent shadow-none p-0 focus-visible:ring-0 text-sm"
        />

        <Badge className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md">
          ⌘ F
        </Badge>
      </div>

      {/* Icons + User */}
      <div className="flex items-center gap-2">
        <div className="bg-card p-2 rounded-full border">
          <Mail className="size-5 text-gray-600" />
        </div>
        <div className="bg-card p-2 rounded-full border">
          <Bell className="size-5 text-gray-600" />
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4YreOWfDX3kK-QLAbAL4ufCPc84ol2MA8Xg&s" // replace with actual avatar
            width={38}
            height={38}
            alt="avatar"
            className="rounded-full border"
          />

          <div className="flex flex-col leading-tight">
            <span className="font-medium">
              {account.account?.fullName || "Daffa Althaf"}
            </span>
            <span className="text-sm text-gray-500">
              daffaalthaf25@gmail.com
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
