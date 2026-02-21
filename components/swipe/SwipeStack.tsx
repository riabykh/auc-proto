"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSwipeStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import SwipeCard from "./SwipeCard";
import ActionButtons from "./ActionButtons";
import MatchAnimation from "./MatchAnimation";
import { Flame, SlidersHorizontal, Bell } from "lucide-react";
import GradientButton from "@/components/ui/GradientButton";

export default function SwipeStack() {
  const router = useRouter();
  const {
    characters,
    currentIndex,
    swipe,
    undo,
    showMatch,
    lastMatchedCharacter,
    setShowMatch,
    resetDeck,
  } = useSwipeStore();

  const currentCharacter = characters[currentIndex];
  const nextCharacter = characters[currentIndex + 1];
  const isDeckEmpty = currentIndex >= characters.length;

  const handleSwipe = (direction: "left" | "right" | "up") => {
    swipe(direction);
  };

  const handleTap = () => {
    if (currentCharacter) {
      router.push(`/character/${currentCharacter.id}`);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3">
        <h1 className="gradient-text font-heading text-2xl font-black tracking-tight">
          swipe.ai
        </h1>
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5"
          >
            <SlidersHorizontal size={18} className="text-[var(--text-secondary)]" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/5"
          >
            <Bell size={18} className="text-[var(--text-secondary)]" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--accent-primary)]" />
          </motion.button>
        </div>
      </div>

      {/* Card stack area */}
      <div className="relative flex-1 px-4 pb-2">
        {isDeckEmpty ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="text-6xl"
            >
              <Flame className="h-16 w-16 text-[var(--accent-primary)]" />
            </motion.div>
            <h2 className="font-heading text-xl font-bold text-white">
              No more profiles!
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              You&apos;ve seen everyone. Check back later for new characters!
            </p>
            <GradientButton onClick={resetDeck} className="mt-2">
              Shuffle & Start Over
            </GradientButton>
          </div>
        ) : (
          <div className="relative h-full">
            <AnimatePresence mode="popLayout">
              {nextCharacter && (
                <SwipeCard
                  key={nextCharacter.id}
                  character={nextCharacter}
                  isTop={false}
                  onSwipe={() => {}}
                  onTap={() => {}}
                  drag={false}
                />
              )}
              {currentCharacter && (
                <SwipeCard
                  key={currentCharacter.id}
                  character={currentCharacter}
                  isTop={true}
                  onSwipe={handleSwipe}
                  onTap={handleTap}
                />
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Action buttons */}
      {!isDeckEmpty && (
        <ActionButtons
          onPass={() => handleSwipe("left")}
          onLike={() => handleSwipe("right")}
          onSuperLike={() => handleSwipe("up")}
          onUndo={undo}
        />
      )}

      {/* Match animation */}
      <MatchAnimation
        show={showMatch}
        character={lastMatchedCharacter}
        onClose={() => setShowMatch(false)}
        onKeepSwiping={() => setShowMatch(false)}
      />
    </div>
  );
}
