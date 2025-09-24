"use client";

import * as React from "react";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: number;
  text: string;
}

interface NotificationToggleProps {
  notifications: Notification[];
}

export function NotificationToggle({ notifications }: NotificationToggleProps) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className="relative inline-flex items-center justify-center p-2 rounded-full 
                       bg-white/10 backdrop-blur-md border border-white/20 
                       hover:bg-white/20 transition-all duration-300 shadow-lg"
        >
          <Bell className="h-5 w-5 text-foreground" />
          {notifications.length > 0 && (
            <span
              className="absolute -top-1 -right-1 inline-flex items-center justify-center
                         px-2 py-0.5 text-xs font-bold leading-none
                         text-white bg-red-500 rounded-full shadow-md"
            >
              {notifications.length}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 md:w-96 rounded-2xl border border-white/20 dark:border-black/40 
                   bg-white/10 dark:bg-black/20 backdrop-blur-xl shadow-xl p-2 animate-in fade-in-0 zoom-in-95"
      >
        <DropdownMenuLabel className="px-3 py-2 text-sm font-semibold">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-white/20 dark:bg-black/40" />

        {notifications.length > 0 ? (
          notifications.map((n) => (
            <DropdownMenuItem
              key={n.id}
              className="text-sm rounded-xl px-3 py-2 hover:bg-white/20 dark:hover:bg-black/30
                         transition-colors cursor-pointer"
            >
              {n.text}
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem className="text-sm text-muted-foreground px-3 py-2">
            No new notifications
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
