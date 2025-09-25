"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className="relative inline-flex items-center justify-center p-2 rounded-full 
                     bg-white/10 backdrop-blur-md border border-white/20 
                     hover:bg-white/20 transition-all duration-300 shadow-lg"
        >
          <Sun
            className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 
                       transition-all text-yellow-400
                       dark:scale-0 dark:-rotate-90"
          />
          <Moon
            className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 
                       transition-all text-blue-400
                       dark:scale-100 dark:rotate-0"
          />
          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 rounded-2xl border border-white/20 dark:border-black/40 
                   bg-white/10 dark:bg-black/20 backdrop-blur-xl shadow-xl p-2 
                   animate-in fade-in-0 zoom-in-95"
      >
        <DropdownMenuLabel className="px-3 py-2 text-sm font-semibold">
          Theme
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/20 dark:bg-black/40" />

        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="rounded-xl px-3 py-2 text-sm hover:bg-white/20 dark:hover:bg-black/30
                     transition-colors cursor-pointer"
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="rounded-xl px-3 py-2 text-sm hover:bg-white/20 dark:hover:bg-black/30
                     transition-colors cursor-pointer"
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="rounded-xl px-3 py-2 text-sm hover:bg-white/20 dark:hover:bg-black/30
                     transition-colors cursor-pointer"
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
