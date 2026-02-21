"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSwipeStore } from "@/lib/store";
import { characters as allCharacters } from "@/lib/data";
import BottomTabBar from "@/components/ui/BottomTabBar";
import GradientButton from "@/components/ui/GradientButton";
import { Heart, ExternalLink } from "lucide-react";

export default function MatchesPage() {
  const router = useRouter();
  const matches = useSwipeStore((s) => s.matches);

  const matchedCharacters = matches
    .map((m) => ({
      ...allCharacters.find((c) => c.id === m.characterId)!,
      matchTimestamp: m.timestamp,
      seen: m.seen,
    }))
    .filter(Boolean)
    .reverse();

  const recentMatches = matchedCharacters.slice(0, 10);

  return (
    <>
      <main className="flex-1 overflow-y-auto hide-scrollbar">
        {/* Header */}
        <div className="px-5 pt-4 pb-3">
          <h1 className="font-heading text-2xl font-bold text-white">
            Your Matches
          </h1>
          {matchedCharacters.length > 0 && (
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              {matchedCharacters.length} match{matchedCharacters.length !== 1 ? "es" : ""}
            </p>
          )}
        </div>

        {matchedCharacters.length === 0 ? (
          /* Empty state */
          <div className="flex h-[60vh] flex-col items-center justify-center gap-4 px-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <Heart className="h-16 w-16 text-[var(--accent-primary)]/30" />
            </motion.div>
            <h2 className="font-heading text-xl font-bold text-white">
              No matches yet
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              Keep swiping to find your perfect AI companion!
            </p>
            <GradientButton onClick={() => router.push("/")} className="mt-2">
              Start Swiping
            </GradientButton>
          </div>
        ) : (
          <>
            {/* Recent matches row */}
            <div className="px-5 pb-4">
              <h3 className="mb-3 text-sm font-semibold text-[var(--text-secondary)]">
                Recent Matches
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                {recentMatches.map((char) => (
                  <motion.button
                    key={char.id}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => router.push(`/character/${char.id}`)}
                    className="flex flex-shrink-0 flex-col items-center gap-1.5"
                  >
                    <div
                      className={`h-16 w-16 overflow-hidden rounded-full p-[2px] ${
                        !char.seen
                          ? "bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)] animate-glow-ring"
                          : "bg-white/10"
                      }`}
                    >
                      <div className="h-full w-full overflow-hidden rounded-full">
                        <Image
                          src={char.images[0]}
                          alt={char.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <span className="text-[10px] text-[var(--text-secondary)]">
                      {char.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Match list */}
            <div className="px-5 space-y-2 pb-4">
              {matchedCharacters.map((char) => {
                const timeAgo = getTimeAgo(char.matchTimestamp);
                return (
                  <motion.button
                    key={char.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push(`/character/${char.id}`)}
                    className="flex w-full items-center gap-3 rounded-2xl bg-[var(--bg-card)] p-3 text-left transition-colors hover:bg-[var(--bg-elevated)]"
                  >
                    <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={char.images[0]}
                        alt={char.name}
                        width={56}
                        height={56}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-sm font-bold text-white">
                          {char.name}
                        </span>
                        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-[var(--text-muted)]">
                          {char.platform}
                        </span>
                      </div>
                      <p className="mt-0.5 flex items-center gap-1 text-xs text-[var(--accent-primary)]">
                        <ExternalLink size={10} />
                        Tap to visit on {char.platform}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] text-[var(--text-muted)]">
                        {timeAgo}
                      </span>
                      {!char.seen && (
                        <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </>
        )}
      </main>
      <BottomTabBar />
    </>
  );
}

function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
