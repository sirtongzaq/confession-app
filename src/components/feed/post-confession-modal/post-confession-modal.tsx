"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { Toolbar } from "./tool-bar-rich-text";
import { EditorRichText } from "./editor-rich-text";

interface PostConfessionModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (text: string, tags?: string[]) => void;
}

export function PostConfessionModal({
  open,
  setOpen,
  onSubmit,
}: PostConfessionModalProps) {
  const [tags, setTags] = React.useState("");
  const [editorText, setEditorText] = React.useState("");

  const initialConfig = {
    namespace: "ConfessionEditor",
    onError: (error: Error) => {
      console.error(error);
    },
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode],
    theme: {
      // minimal example
      text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
        strikethrough: "line-through",
      },
    },
  };

  const handleSubmit = () => {
    if (!editorText.trim()) return;

    const tagList = tags
      .split(" ")
      .map((t) => t.trim())
      .filter(Boolean);

    onSubmit(editorText, tagList);
    setTags("");
    setEditorText("");
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl border border-border/50 bg-background/70 backdrop-blur-md shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-foreground ps-4 pt-4">
              Post a Confession
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-4 max-h-[80vh]">
            <LexicalComposer initialConfig={initialConfig}>
              {/* Toolbar */}
              <div className="flex gap-2 flex-wrap border-border/30 bg-background/20 sticky top-0 z-10">
                <Toolbar />
              </div>
              <EditorRichText setEditorText={setEditorText} />
            </LexicalComposer>

            {/* Tags */}
            <div className="">
              <Input
                placeholder="Tags (#แซ่บ #อร่อย #เริ่ด)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="text-foreground placeholder:text-muted-foreground 
                  rounded-none shadow-none 
                  focus:outline-none focus:border-accent focus:ring-0
                  p-2"
              />
              {/* Buttons */}
              <div className="flex justify-end gap-2 p-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>Post</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
