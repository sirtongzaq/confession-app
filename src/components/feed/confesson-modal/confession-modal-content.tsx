"use client";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { ReactionModalButtons } from "./reaction-modal-buttons";

interface ConfessionModalContentProps {
  text: string;
  tags: string[];
  likes: number;
  dislikes: number;
  comments: number;
}

export function ConfessionModalContent({
  text,
  tags,
  likes,
  dislikes,
  comments,
}: ConfessionModalContentProps) {
  return (
    <div className="p-4 flex flex-col gap-3">
      <p className="text-sm text-foreground/90 line-clamp-4">{text}</p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <Badge
            key={i}
            variant="secondary"
            className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/40 text-secondary-foreground/90 backdrop-blur-sm"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <ReactionModalButtons
        likes={likes}
        dislikes={dislikes}
        comments={comments}
      />
    </div>
  );
}
