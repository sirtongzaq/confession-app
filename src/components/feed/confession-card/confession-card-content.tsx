"use client";
import * as React from "react";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReactionButtons } from "./reaction-buttons";

interface ConfessionCardContentProps {
  text: string;
  tags: string[];
  likes: number;
  dislikes: number;
  comments: number;
}

export function ConfessionCardContent({
  text,
  tags,
  likes,
  dislikes,
  comments,
}: ConfessionCardContentProps) {
  return (
    <CardContent className="p-4 flex flex-col gap-3">
      <div className="text-sm text-foreground/90 line-clamp-4" dangerouslySetInnerHTML={{ __html: text }} />

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

      <ReactionButtons likes={likes} dislikes={dislikes} comments={comments} />
    </CardContent>
  );
}
