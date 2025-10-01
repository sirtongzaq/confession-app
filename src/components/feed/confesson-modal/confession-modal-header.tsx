"use client";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Confession } from "@/type";

interface ConfessionModalHeaderProps {
  username: Confession['username'];
  avatar: Confession['avatar'];
}

export function ConfessionModalHeader({
  username,
  avatar,
}: ConfessionModalHeaderProps) {
  return (
    <>
      <Avatar className="h-8 w-8 ring-2 ring-primary/30">
        <AvatarImage src={avatar} alt={username} />
        <AvatarFallback>{username[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      {username} Confession
    </>
  );
}
