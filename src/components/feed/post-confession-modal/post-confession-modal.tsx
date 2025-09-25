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
      .split(",")
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
        <DialogContent className="w-full max-w-lg sm:max-w-2xl rounded-2xl border border-border/30 bg-background/70 backdrop-blur-md shadow-lg p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-foreground">
              Post a Confession
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-4 max-h-[80vh]">
            <LexicalComposer initialConfig={initialConfig}>
              {/* Toolbar */}
              <div className="flex gap-2 flex-wrap backdrop-blur-md border border-border/30 rounded-md bg-background/60 sticky top-0 z-10">
                <Toolbar />
              </div>

              <EditorRichText setEditorText={setEditorText} />

              {/* Editor */}
              {/* <div className="relative border border-border/30 backdrop-blur-md bg-background/50 w-full flex-1 min-h-[150px] max-h-[70vh] overflow-y-auto rounded-md p-2">
                <RichTextPlugin
                  contentEditable={
                    <ContentEditable className="min-h-full w-full outline-none" />
                  }
                  placeholder={
                    <div className="absolute top-2 left-3 text-muted-foreground pointer-events-none select-none">
                      Write your confession...
                    </div>
                  }
                  ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <ListPlugin />
                <OnChangePlugin
                  onChange={(editorState) => {
                    editorState.read(() => {
                      const html = $generateHtmlFromNodes(editor, null);
                      setEditorText(html); // เก็บเป็น HTML
                    });
                  }}
                />
              </div> */}
            </LexicalComposer>

            {/* Tags */}
            <Input
              placeholder="Tags (comma separated)"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="bg-background/50 backdrop-blur-sm border border-border/30 text-foreground placeholder:text-muted-foreground rounded-md p-2"
            />

            {/* Buttons */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Post</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
