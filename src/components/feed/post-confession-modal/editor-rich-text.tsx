"use client";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { $generateHtmlFromNodes } from "@lexical/html";
import { CONTROLLED_TEXT_INSERTION_COMMAND } from "lexical";
import React from "react";

export function EditorRichText({
  setEditorText,
}: {
  setEditorText: (html: string) => void;
}) {
  const [editor] = useLexicalComposerContext();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab") {
      event.preventDefault();
      editor.dispatchCommand(CONTROLLED_TEXT_INSERTION_COMMAND, "    "); // 4 space
    }
  };

  return (
    <div onKeyDown={handleKeyDown} className="relative border border-border/30 backdrop-blur-md bg-background/50 w-full flex-1 min-h-[150px] max-h-[70vh] overflow-y-auto rounded-md px-2.5 py-2">
      <RichTextPlugin
        contentEditable={<ContentEditable className="min-h-full w-full outline-none" />}
        placeholder={
          <div className="absolute top-2 left-3 text-muted-foreground select-none">
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
            setEditorText(html);
          });
        }}
      />
    </div>
  );
}
