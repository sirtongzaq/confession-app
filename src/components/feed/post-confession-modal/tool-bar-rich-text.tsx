"use client";

import {
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  UNDO_COMMAND,
  REDO_COMMAND,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  Bold,
  Italic,
  Strikethrough,
  Underline,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  RotateCcw,
  RotateCw,
  Highlighter,
  Subscript,
  Superscript,
} from "lucide-react";

export function Toolbar() {
  const [editor] = useLexicalComposerContext();
  const [align, setAlign] = React.useState<"left" | "center" | "right" | null>(
    null
  );

  const handleAlign = (value: "left" | "center" | "right") => {
    const newValue = align === value ? null : value;
    setAlign(newValue);
    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, newValue ?? "left");
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 p-2">
      {/* Left group: Text formatting */}
      <div className="flex flex-wrap gap-1">
        <Toggle
          value="bold"
          aria-label="Bold"
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          value="italic"
          aria-label="Italic"
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          value="underline"
          aria-label="Underline"
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")
          }
        >
          <Underline className="h-4 w-4" />
        </Toggle>
        <Toggle
          value="strikethrough"
          aria-label="Strikethrough"
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
          }
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>
        <Toggle
          value="highlight"
          aria-label="Highlight"
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "highlight")
          }
        >
          <Highlighter className="h-4 w-4" />
        </Toggle>
        <Toggle
          value="code"
          aria-label="Code"
          onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "code")}
        >
          <Code className="h-4 w-4" />
        </Toggle>
        <Toggle
          value="subscript"
          aria-label="Subscript"
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "subscript")
          }
        >
          <Subscript className="h-4 w-4" />
        </Toggle>
        <Toggle
          value="superscript"
          aria-label="Superscript"
          onClick={() =>
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "superscript")
          }
        >
          <Superscript className="h-4 w-4" />
        </Toggle>
      </div>

      {/* Center group: Alignment */}
      <div className="flex gap-1 mt-2 md:mt-0 md:flex-row justify-start md:justify-center">
        <Toggle
          value="left"
          aria-label="Align left"
          pressed={align === "left"}
          onClick={() => handleAlign("left")}
        >
          <AlignLeft className="h-4 w-4" />
        </Toggle>
        <Toggle
          value="center"
          aria-label="Align center"
          pressed={align === "center"}
          onClick={() => handleAlign("center")}
        >
          <AlignCenter className="h-4 w-4" />
        </Toggle>
        <Toggle
          value="right"
          aria-label="Align right"
          pressed={align === "right"}
          onClick={() => handleAlign("right")}
        >
          <AlignRight className="h-4 w-4" />
        </Toggle>
      </div>

      {/* Right group: Undo / Redo */}
      <div className="flex gap-1 mt-2 md:mt-0 md:flex-row justify-start md:justify-end">
        <Button
          className={
            "inline-flex items-center justify-center gap-2 rounded-xl font-medium text-accent-foreground transition-all " +
            "backdrop-blur-md bg-background/80 border border-border/30 dark:border-border shadow-md " +
            "hover:bg-background/60 hover:shadow-lg " +
            "focus:bg-accent focus:text-accent-foreground " +
            "disabled:pointer-events-none disabled:opacity-40 " +
            "focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-1 " +
            "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 " +
            "outline-none select-none"
          }
          aria-label="Undo"
          onClick={(e) => {
            e.currentTarget.blur();
            editor.dispatchCommand(REDO_COMMAND, undefined);
          }}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button
          className={
            "inline-flex items-center justify-center gap-2 rounded-xl font-medium text-accent-foreground transition-all " +
            "backdrop-blur-md bg-background/80 border border-border/30 dark:border-border shadow-md " +
            "hover:bg-background/60 hover:shadow-lg " +
            "focus:bg-accent focus:text-accent-foreground " +
            "disabled:pointer-events-none disabled:opacity-40 " +
            "focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-1 " +
            "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 " +
            "outline-none select-none"
          }
          aria-label="Redo"
          onClick={(e) => {
            e.currentTarget.blur();
            editor.dispatchCommand(UNDO_COMMAND, undefined);
          }}
        >
          <RotateCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
