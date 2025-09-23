"use client";
import Link from "next/link";
import {
  Menu,
  X,
  User,
  Bookmark,
  Settings,
  Home,
  Tag,
  Bell,
  Flame,
} from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ModeToggle } from "./toggle-theme";
import { AvatarToggle } from "./toggle-avatar";

const menuItems = [
  { name: "Feed", href: "/", icon: <Home className="h-4 w-4 mr-1" /> },
  {
    name: "Trending",
    href: "/trending",
    icon: <Flame className="h-4 w-4 mr-1" />,
  },
  { name: "Tags", href: "/tags", icon: <Tag className="h-4 w-4 mr-1" /> },
  {
    name: "Notifications",
    href: "/notifications",
    icon: <Bell className="h-4 w-4 mr-1" />,
    count: 3,
  },
];

const userMenuItems = [
  {
    name: "My Profile",
    href: "/profile",
    icon: <User className="mr-2 h-4 w-4" />,
  },
  {
    name: "Saved",
    href: "/saved",
    icon: <Bookmark className="mr-2 h-4 w-4" />,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
];

const notificationCount = 3;

export const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="fixed z-50 w-full px-2"
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
            isScrolled &&
              "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5"
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Image
                  src="/icon-512.png"
                  alt="Confession Logo"
                  width={64}
                  height={64}
                />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="relative z-20 block p-2.5 lg:hidden"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    className={`absolute inset-0 m-auto size-6 transition duration-200 ${
                      menuState
                        ? "scale-0 opacity-0 rotate-180"
                        : "scale-100 opacity-100 rotate-0"
                    }`}
                  />
                  <X
                    className={`absolute inset-0 m-auto size-6 transition duration-200 ${
                      menuState
                        ? "scale-100 opacity-100 rotate-0"
                        : "scale-0 opacity-0 -rotate-180"
                    }`}
                  />
                  {/* Notification Badge */}
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-red-500 rounded-full">
                      {notificationCount}
                    </span>
                  )}
                </div>
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index} className="relative">
                    <Link
                      href={item.href}
                      className="flex items-center text-muted-foreground hover:text-accent-foreground duration-150"
                    >
                      {item.icon}
                      <span>{item.name}</span>

                      {item.count && (
                        <span className="ml-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-red-500 rounded-full">
                          {item.count}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index} className="relative">
                      <Link
                        href={item.href}
                        className="flex items-center text-muted-foreground hover:text-accent-foreground duration-150"
                      >
                        {item.icon}
                        <span>{item.name}</span>

                        {item.count && (
                          <span className="ml-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-red-500 rounded-full">
                            {item.count}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit items-center">
                <AvatarToggle userMenuItems={userMenuItems} />
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
