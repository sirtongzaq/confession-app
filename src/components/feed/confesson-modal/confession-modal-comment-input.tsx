"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ConfessionModalCommentInputProps {
  newComment: string;
  setNewComment: (value: string) => void;
  handleAddComment: () => void;
}

export function ConfessionModalCommentInput({
  newComment,
  setNewComment,
  handleAddComment,
}: ConfessionModalCommentInputProps) {
  return (
    <div className="mt-4 flex flex-col gap-2">
      <Textarea
        placeholder="Write a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="resize-none bg-background/50 backdrop-blur-sm border border-border/30 rounded-lg text-foreground placeholder:text-muted-foreground"
        rows={3}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleAddComment();
          }
        }}
      />
      <Button
        onClick={handleAddComment}
        className="self-end rounded-full px-5 bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:bg-primary/90"
      >
        Send
      </Button>
    </div>
  );
}
