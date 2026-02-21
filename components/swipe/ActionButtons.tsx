"use client";

import { motion } from "framer-motion";
import { X, Star, Heart, RotateCcw, Lock } from "lucide-react";
import { useSwipeStore } from "@/lib/store";

interface ActionButtonsProps {
  onPass: () => void;
  onLike: () => void;
  onSuperLike: () => void;
  onUndo: () => void;
}

export default function ActionButtons({
  onPass,
  onLike,
  onSuperLike,
  onUndo,
}: ActionButtonsProps) {
  const membership = useSwipeStore((s) => s.membership);
  const superLikesLeft = useSwipeStore((s) => s.superLikesLeft);
  const undoStack = useSwipeStore((s) => s.undoStack);

  return (
    <div className="flex items-center justify-center gap-4 px-4 py-4">
      {/* Undo */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.08 }}
        onClick={onUndo}
        disabled={membership === "free" || undoStack.length === 0}
        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[var(--bg-elevated)] text-yellow-400 disabled:opacity-30"
      >
        <RotateCcw size={18} />
        {membership === "free" && (
          <Lock size={8} className="absolute -bottom-0.5 -right-0.5 text-[var(--text-muted)]" />
        )}
      </motion.button>

      {/* Nope / Pass */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.05 }}
        onClick={onPass}
        className="flex h-14 w-14 items-center justify-center rounded-full border border-red-500/30 bg-[var(--bg-elevated)] text-red-400 transition-shadow hover:shadow-[0_0_20px_rgba(255,68,88,0.3)]"
      >
        <X size={26} strokeWidth={3} />
      </motion.button>

      {/* Super Like */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.08 }}
        onClick={onSuperLike}
        disabled={superLikesLeft === 0}
        className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[var(--accent-secondary)]/40 bg-[var(--bg-elevated)] text-[var(--accent-secondary)] transition-shadow hover:shadow-[0_0_20px_rgba(124,92,255,0.4)] disabled:opacity-30"
      >
        <Star size={20} fill="currentColor" />
        {superLikesLeft > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent-secondary)] text-[9px] font-bold text-white">
            {superLikesLeft}
          </span>
        )}
      </motion.button>

      {/* Like */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        whileHover={{ scale: 1.05 }}
        onClick={onLike}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[#FF6B8A] text-white shadow-[0_0_30px_rgba(255,56,104,0.4)] transition-shadow hover:shadow-[0_0_40px_rgba(255,56,104,0.6)]"
      >
        <Heart size={30} fill="white" />
      </motion.button>
    </div>
  );
}
