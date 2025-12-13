"use client";

import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const menu = [
  {
    name: "About Us",
    child: [
      { name: "Research Team", link: "/about/research-team" },
      { name: "Infrastructure", link: "/about/infrastructure" },
    ],
  },
  {
    name: "Products",
    child: [
      { name: "TeleOTIVA", link: "/products/teleotiva" },
      { name: "CardiaCore", link: "/products/cardiacore" },
    ],
  },
  {
    name: "Datasets",
    child: [
      { name: "Signal ECG Dataset", link: "/datasets/signal-ecg-dataset" },
      { name: "Pre Cancer Dataset", link: "/datasets/pre-cancer-dataset" },
      { name: "Infant/Fetal Dataset", link: "/datasets/infant-fetal-dataset" },
    ],
  },
  {
    name: "Publication",
    child: [
      { name: "International Journals", link: "/publications/journals" },
      {
        name: "International Conference (Proceedings)",
        link: "/publications/proceedings",
      },
      {
        name: "International Property Rights (IPR)",
        link: "/publications/ipr",
      },
      { name: "Books", link: "/publications/books" },
    ],
  },
  {
    name: "Communication",
    child: [
      { name: "Social Media", link: "/communications/social-media" },
      { name: "Mass Media", link: "/communications/mass-media" },
      { name: "Activities", link: "/communications/activities" },
    ],
  },
];

export default function Navbar() {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const [isFixed, setIsFixed] = useState(false);

  // Only apply scroll behavior on "/"
  useEffect(() => {
    if (pathname !== "/") {
      setIsFixed(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <NavigationMenu
      viewport={isMobile}
      className={`z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur transition-all duration-300 ${isFixed ? "fixed top-0" : "absolute lg:top-20"} `}
    >
      <div className="flex items-center justify-between px-6 lg:px-44">
        {/* LEFT SIDE — Logos */}
        <div className="flex items-center gap-6">
          {/* Uni Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-12 w-12">
              <Image
                src="/images/logo-polsri.png"
                alt="University Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative h-10 w-32">
              <Image
                src="https://isysrg.com/_next/image?url=%2Fassets%2Fimages%2Faimed-white.png&w=828&q=75"
                alt="University Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          {/* Divider */}
          <div className="h-10 w-px  /20" />
          {/* AIMed */}
          <div className="relative flex items-center gap-2">
            <Image
              src="https://isysrg.com/isysrg.svg"
              alt="AIMed Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <div className="flex items-end gap-1">
              <p className="text-3xl text-white italic">ISys</p>
              <p className="text-[10px] text-white">Research Group</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-10 w-px  /20" />
        </div>

        {/* RIGHT SIDE — Menu */}
        <NavigationMenuList className="hidden items-center gap-0 lg:flex">
          {menu.map((item, index) => (
            <NavigationMenuItem
              key={index}
              className="flex cursor-pointer items-center gap-2 border border-white/10 transition hover:bg-transparent"
            >
              <NavigationMenuTrigger className="h-18 rounded-none bg-transparent px-6 text-base font-medium text-white hover:bg-transparent">
                {item.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-0">
                <ul className="grid w-80 gap-2 bg-black/80 p-4 text-white">
                  {item.child.map((child, childIndex) => (
                    <NavigationMenuLink
                      key={childIndex}
                      href={child.link}
                      asChild
                      className="p-4 text-base"
                    >
                      <Link href={child.link}>{child.name}</Link>
                    </NavigationMenuLink>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}

          <div className="border-l border-white/10 px-0"></div>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}
