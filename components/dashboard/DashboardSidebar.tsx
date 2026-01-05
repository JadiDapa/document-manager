"use client";

import {
  Home,
  LogOut,
  Newspaper,
  Settings,
  MapPin,
  Wrench,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

const overviewItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Sections",
    icon: MapPin,
    url: "/sections",
  },
  {
    title: "Items",
    url: "/items",
    icon: Wrench,
  },
  {
    title: "Documents",
    icon: Newspaper,
    url: "/documents",
  },
  {
    title: "Users",
    icon: Users,
    url: "/users",
  },
];

const settingsItems = [
  {
    title: "Pengaturan",
    url: "/settings",
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  const { signOut } = useClerk();

  return (
    <Sidebar
      collapsible="offcanvas"
      className="bg-muted hidden border-none p-2 md:flex"
    >
      <SidebarContent className="bg-muted">
        <ScrollArea className="border-border bg-primary h-screen overflow-hidden rounded-2xl border">
          <div className="flex px-6 py-6 pt-6">
            <div className="text-secondary flex items-center gap-4 text-3xl font-semibold tracking-wide">
              <figure className="relative size-14 rounded-full bg-white p-1">
                <Image
                  src={"/images/logo.png"}
                  width={60}
                  height={60}
                  className="object-contain object-left"
                  alt=""
                />
              </figure>
              <div className="text-secondary leading-tight">
                <p className="text-xl">Pengarsipan</p>
                <p className="text-3xl">PUSRI</p>
              </div>
            </div>
          </div>
          {/* Overview */}
          <SidebarGroup className="p-0 pt-1 text-white">
            <SidebarGroupLabel className="text-secondary ps-6 text-sm font-semibold">
              MENU
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {overviewItems.map((item) => {
                  const active = pathname === item.url;
                  return (
                    <SidebarMenuItem
                      key={item.title}
                      className="relative rounded-none p-0"
                    >
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className="flex h-10 items-center gap-x-4 px-6"
                        >
                          <div
                            className={`${
                              active ? "block" : "hidden"
                            } bg-secondary absolute top-0 left-0 h-full w-2 rounded-e-4xl`}
                          />
                          <item.icon className="size-5" />
                          <span className="text-base">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* SETTINGS pinned to bottom */}
          <SidebarGroup className="mt-auto p-0 pt-6 pb-6 text-white">
            <SidebarGroupLabel className="text-secondary ps-6 text-sm font-semibold">
              GENERAL
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {settingsItems.map((item) => {
                  const active = pathname === item.url;

                  return (
                    <SidebarMenuItem
                      key={item.title}
                      className="relative rounded-none p-0"
                    >
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className="flex h-10 items-center gap-x-4 px-6"
                        >
                          <div
                            className={`${
                              active ? "block" : "hidden"
                            } bg-primary absolute top-0 left-0 h-full w-2 rounded-e-4xl`}
                          />
                          <item.icon className="size-5" />
                          <span className="text-base">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
                <SidebarMenuItem className="relative rounded-none p-0">
                  <SidebarMenuButton asChild>
                    <div
                      onClick={() => signOut({ redirectUrl: "/" })}
                      className="flex h-10 items-center gap-x-4 px-6"
                    >
                      <LogOut className="size-5" />
                      <span className="text-base">Log Out</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
