"use client";
import * as React from "react";
import { Heart, HeartMinus, MessageCircle } from "lucide-react";

interface ReactionButtonsProps {
  likes: number;
  dislikes: number;
  comments: number;
}

export function ReactionModalButtons({
  likes,
  dislikes,
  comments,
}: ReactionButtonsProps) {
  return (
    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
      <button className="flex items-center gap-1 hover:text-primary transition-colors">
        <Heart className="h-4 w-4" /> {likes}
      </button>
      <button className="flex items-center gap-1 hover:text-destructive transition-colors">
        <HeartMinus className="h-4 w-4" /> {dislikes}
      </button>
      <button className="flex items-center gap-1 hover:text-accent transition-colors">
        <MessageCircle className="h-4 w-4" /> {comments}
      </button>
    </div>
  );
}
