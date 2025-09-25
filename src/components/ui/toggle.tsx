"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all " +
    "backdrop-blur-md bg-background/80 border border-border/30 dark:border-border shadow-md " +
    "hover:bg-background/60 hover:shadow-lg " +
    "disabled:pointer-events-none disabled:opacity-40 " +
    "data-[state=on]:bg-accent data-[state=on]:text-accent-foreground " +
    "focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-1 " +
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 " +
    "outline-none select-none",
  {
    variants: {
      variant: {
        default: "",
        outline:
          "bg-transparent border border-border/50 hover:bg-background/50 hover:text-accent-foreground",
      },
      size: {
        sm: "h-8 px-2 min-w-8 text-xs",
        default: "h-9 px-3 min-w-9 text-sm",
        lg: "h-11 px-4 min-w-11 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
