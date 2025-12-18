"use client";

import { Home, MapPin, User, Wrench, Newspaper } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
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
    title: "Profile",
    icon: User,
    url: "/profile",
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden">
      <div
        className="flex items-center justify-between rounded-t-2xl bg-white px-4 py-3
  shadow-[0_-8px_24px_-6px_rgba(0,0,0,0.15)]"
      >
        {navItems.map((item) => {
          const active = pathname === item.url;
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.url}
              className={cn(
                "flex flex-col items-center gap-1 text-xs transition-colors",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "size-5",
                  active && "fill-primary stroke-primary"
                )}
              />
              <span className="text-[11px]">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
