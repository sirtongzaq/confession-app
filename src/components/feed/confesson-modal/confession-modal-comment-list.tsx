"use client";
import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Comment {
  id: number;
  username: string;
  avatar: string;
  text: string;
}

interface ConfessionModalCommentListProps {
  commentList: Comment[];
}

export function ConfessionModalCommentList({
  commentList,
}: ConfessionModalCommentListProps) {
  return (
    <div className="mt-0 max-h-64 overflow-y-auto space-y-3 border-t border-border/40 pt-4">
      {commentList.map((c) => (
        <div key={c.id} className="flex items-start gap-2">
          <Avatar className="h-6 w-6 flex-shrink-0 ring-1 ring-border/30">
            <AvatarImage src={c.avatar} alt={c.username} />
            <AvatarFallback>{c.username[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-foreground">
              {c.username}
            </span>
            <span className="text-xs text-muted-foreground">{c.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
