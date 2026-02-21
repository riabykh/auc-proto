"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  text: string;
  variant?: "platform" | "personality" | "status" | "premium";
  className?: string;
}

const variantStyles = {
  platform:
    "bg-white/10 text-white/80 border border-white/10",
  personality:
    "bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20",
  status:
    "bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20",
  premium:
    "bg-gradient-to-r from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 text-white border border-[var(--accent-secondary)]/30",
};

export default function Badge({ text, variant = "platform", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {text}
    </span>
  );
}
