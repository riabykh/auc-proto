"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  strong?: boolean;
  onClick?: () => void;
}

export default function GlassCard({
  children,
  className,
  strong,
  onClick,
}: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        strong ? "glass-strong" : "glass",
        "rounded-3xl",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
