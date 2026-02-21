"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export default function GradientButton({
  children,
  onClick,
  className,
  variant = "primary",
  size = "md",
  disabled,
}: GradientButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-[var(--accent-primary)] via-[#FF6B8A] to-[var(--accent-secondary)] text-white font-semibold glow-pink",
    ghost:
      "bg-transparent border border-white/10 text-white/80 hover:bg-white/5",
    outline:
      "bg-transparent text-white font-semibold gradient-border",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-2xl font-heading tracking-wide transition-all",
        sizeClasses[size],
        variantClasses[variant],
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      {children}
    </motion.button>
  );
}
