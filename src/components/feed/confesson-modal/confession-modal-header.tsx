"use client";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ConfessionModalHeaderProps {
  username: string;
  avatar: string;
}

export function ConfessionModalHeader({
  username,
  avatar,
}: ConfessionModalHeaderProps) {
  return (
    <div className="flex items-center gap-2 p-3 border-b border-border/30">
      <Avatar className="h-8 w-8 ring-1 ring-border/30">
        <AvatarImage src={avatar} alt={username} />
        <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      <span className="font-semibold text-sm text-foreground">{username}</span>
    </div>
  );
}
