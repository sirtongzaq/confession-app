"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { LogOut } from "lucide-react";

export interface UserMenuItem {
  name: string;
  href: string;
  icon?: React.ReactNode; // optional icon
}

interface AvatarToggleProps {
  userMenuItems: UserMenuItem[];
}

export function AvatarToggle({ userMenuItems }: AvatarToggleProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className="relative inline-flex items-center justify-center p-[2px] rounded-full 
                     bg-white/10 backdrop-blur-md border border-white/20 
                     hover:bg-white/20 transition-all duration-300 shadow-lg"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="https://github.com/evilrabbit.png"
              alt="@evilrabbit"
              className="rounded-full"
            />
            <AvatarFallback className="text-xs">ER</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 rounded-2xl border border-white/20 dark:border-black/40 
                   bg-white/10 dark:bg-black/20 backdrop-blur-xl shadow-xl p-2 
                   animate-in fade-in-0 zoom-in-95"
      >
        <DropdownMenuLabel className="px-3 py-2 text-sm font-semibold">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/20 dark:bg-black/40" />

        {userMenuItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            asChild
            className="rounded-xl px-3 py-2 text-sm hover:bg-white/20 dark:hover:bg-black/30
                     transition-colors cursor-pointer"
          >
            <Link href={item.href} className="flex items-center gap-2 w-full">
              {item.icon && <span>{item.icon}</span>}
              {item.name}
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator className="bg-white/20" />
        <DropdownMenuItem
          asChild
          className="rounded-xl px-3 py-2 text-sm hover:bg-white/20 dark:hover:bg-black/30 text-red-500 
                     transition-colors cursor-pointer"
        >
          <Link href="/login" className="flex items-center gap-2 w-full">
            <LogOut className="h-4 w-4" />
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
