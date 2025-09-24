"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
}

export function FabButton({
  size = "md",
  className,
  ...props
}: FabButtonProps) {
  const sizeClasses = {
    sm: "h-10 w-10 text-sm",
    md: "h-12 w-12 text-base",
    lg: "h-14 w-14 text-lg",
  };

  return (
    <Button
      {...props}
      className={cn(
        "fixed bottom-6 right-6 xl:right-20 rounded-full flex items-center justify-center gap-0.5",
        "bg-white/10 backdrop-blur-md border border-white/20",
        "hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg",
        sizeClasses[size],
        className
      )}
    >
      <Plus className="h-5 w-5 text-foreground" />
    </Button>
  );
}
