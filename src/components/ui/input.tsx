import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  type?: string;
}

function Input({ className, type = "text", ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full min-w-0 h-9 px-3 py-1 rounded-md text-sm text-foreground placeholder:text-muted-foreground",
        "bg-white/30 dark:bg-input/30 backdrop-blur-md border border-border/30",
        "shadow-sm transition-all duration-200 ease-in-out",
        "focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
