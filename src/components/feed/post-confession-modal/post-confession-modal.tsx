"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface PostConfessionModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (text: string, tags?: string[]) => void;
}

export function PostConfessionModal({ open, setOpen, onSubmit }: PostConfessionModalProps) {
  const [text, setText] = React.useState("");
  const [tags, setTags] = React.useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    onSubmit(text, tagList);
    setText("");
    setTags("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg rounded-2xl border border-border/30 bg-background/70 backdrop-blur-md shadow-lg p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-foreground">
            Post a Confession
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <Textarea
            placeholder="Write your secret..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            className="bg-background/50 backdrop-blur-sm border border-border/30 text-foreground placeholder:text-muted-foreground resize-none rounded-md p-3"
          />

          <Input
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="bg-background/50 backdrop-blur-sm border border-border/30 text-foreground placeholder:text-muted-foreground rounded-md p-2"
          />

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="glass-button"
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="glass-button">
              Post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
