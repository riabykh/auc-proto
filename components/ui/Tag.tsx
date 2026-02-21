"use client";

import { cn } from "@/lib/utils";

interface TagProps {
  label: string;
  emoji?: string;
  className?: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function Tag({ label, emoji, className, selected, onClick }: TagProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
        selected
          ? "bg-gradient-to-r from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 border border-[var(--accent-primary)]/40 text-white"
          : "bg-white/5 border border-white/10 text-[var(--text-secondary)] hover:bg-white/10",
        onClick && "cursor-pointer",
        className
      )}
    >
      {emoji && <span>{emoji}</span>}
      {label}
    </button>
  );
}
