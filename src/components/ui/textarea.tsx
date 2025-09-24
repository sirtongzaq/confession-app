import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        `
        flex w-full min-h-16 rounded-lg px-3 py-2 text-base
        border border-border/30 bg-background/50 backdrop-blur-sm
        placeholder:text-muted-foreground text-foreground
        transition-all duration-200 shadow-sm
        focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary
        disabled:cursor-not-allowed disabled:opacity-50
        md:text-sm
        `,
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
