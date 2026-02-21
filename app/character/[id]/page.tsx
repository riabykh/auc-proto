"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { characters } from "@/lib/data";
import { useSwipeStore } from "@/lib/store";
import { ArrowLeft, Star, Heart, X, ExternalLink, Play, ChevronRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import CompatibilityRing from "@/components/ui/CompatibilityRing";
import Tag from "@/components/ui/Tag";
import GradientButton from "@/components/ui/GradientButton";
import { formatCount } from "@/lib/utils";

export default function CharacterProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const swipe = useSwipeStore((s) => s.swipe);
  const character = characters.find((c) => c.id === id);
  const [activeImage, setActiveImage] = useState(0);

  if (!character) {
    return (
      <div className="flex h-[100dvh] items-center justify-center text-[var(--text-secondary)]">
        Character not found
      </div>
    );
  }

  // Deterministic scores derived from character id to avoid hydration mismatch
  const base = character.compatibility || 85;
  const idSum = character.id.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const personalityScore = Math.min(99, Math.max(60, base + ((idSum * 3) % 7) - 3));
  const interestScore = Math.min(99, Math.max(60, base - 5 + ((idSum * 7) % 5)));
  const vibeScore = Math.min(99, Math.max(60, base - 2 + ((idSum * 11) % 9) - 4));

  const reviews = [
    { user: "Alex M.", rating: 5, text: "Amazing conversations! So immersive." },
    { user: "Sam K.", rating: 4, text: `${character.name} feels so real and engaging.` },
    { user: "Jordan R.", rating: 5, text: "Best AI character I've ever chatted with." },
  ];

  return (
    <motion.div
      className="h-[100dvh] overflow-y-auto bg-[var(--bg-primary)] hide-scrollbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Sticky header */}
      <div className="sticky top-0 z-20 flex items-center gap-3 bg-[var(--bg-primary)]/80 px-4 py-3 backdrop-blur-xl">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5"
        >
          <ArrowLeft size={20} className="text-white" />
        </motion.button>
        <h1 className="font-heading text-lg font-bold text-white">
          {character.name}
        </h1>
      </div>

      {/* Hero image gallery */}
      <div className="relative h-[50vh] w-full">
        <Image
          src={character.images[activeImage]}
          alt={character.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />

        {/* Image dots */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-1.5">
          {character.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === activeImage
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Info section */}
      <div className="-mt-16 relative z-10 px-5 pb-32">
        {/* Name & basics */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-heading text-3xl font-bold text-white">
                {character.name}
              </h2>
              <span className="text-xl text-[var(--text-secondary)]">
                {character.age}
              </span>
            </div>
            {character.location && (
              <p className="mt-0.5 text-sm text-[var(--text-muted)]">
                📍 {character.location}
              </p>
            )}
          </div>
          <CompatibilityRing percentage={character.compatibility || 85} size={56} strokeWidth={4} />
        </div>

        {/* Platform badge */}
        <div className="mt-3 flex items-center gap-2">
          <Badge text={character.platform} variant="platform" />
          {character.badge && (
            <Badge
              text={
                character.badge === "trending"
                  ? "🔥 Trending"
                  : character.badge === "new"
                  ? "✨ New"
                  : "💎 Premium"
              }
              variant={character.badge === "premium" ? "premium" : "status"}
            />
          )}
          <span className="ml-auto text-xs text-[var(--text-muted)]">
            ⭐ {character.rating} · {formatCount(character.matchCount)} matches
          </span>
        </div>

        {/* Match breakdown */}
        <div className="mt-5 glass rounded-2xl p-4">
          <h3 className="mb-3 font-heading text-sm font-semibold text-[var(--text-secondary)]">
            Match Breakdown
          </h3>
          <div className="space-y-2.5">
            {[
              { label: "Personality", score: personalityScore },
              { label: "Interests", score: interestScore },
              { label: "Vibe", score: vibeScore },
            ].map(({ label, score }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="w-20 text-xs text-[var(--text-muted)]">{label}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                  />
                </div>
                <span className="w-10 text-right text-xs font-medium text-white">
                  {score}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="mt-5">
          <h3 className="mb-2 font-heading text-sm font-semibold text-[var(--text-secondary)]">
            About Me
          </h3>
          <p className="text-sm leading-relaxed text-[var(--text-primary)]/80">
            {character.bio}
          </p>
        </div>

        {/* Tags */}
        <div className="mt-5">
          <h3 className="mb-2 font-heading text-sm font-semibold text-[var(--text-secondary)]">
            Personality & Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {character.personality.map((trait) => (
              <Tag key={trait} label={trait} />
            ))}
            {character.interests.map((interest) => (
              <Tag key={interest} label={interest} emoji="✦" />
            ))}
          </div>
        </div>

        {/* First message preview */}
        <div className="mt-5">
          <h3 className="mb-2 font-heading text-sm font-semibold text-[var(--text-secondary)]">
            First Message Preview
          </h3>
          <div className="glass rounded-2xl p-4">
            <div className="flex gap-3">
              <div className="h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
                <Image
                  src={character.images[0]}
                  alt={character.name}
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-white">{character.name}</p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {character.firstMessage}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Voice preview */}
        {character.voiceAvailable && (
          <div className="mt-5">
            <h3 className="mb-2 font-heading text-sm font-semibold text-[var(--text-secondary)]">
              Voice Preview
            </h3>
            <button className="glass flex w-full items-center gap-3 rounded-2xl p-4 transition-all hover:bg-white/10">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-secondary)]">
                <Play size={18} fill="white" className="ml-0.5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-white">Listen to {character.name}</p>
                <p className="text-xs text-[var(--text-muted)]">0:15 voice sample</p>
              </div>
              <ChevronRight size={16} className="text-[var(--text-muted)]" />
            </button>
          </div>
        )}

        {/* Reviews */}
        <div className="mt-5">
          <h3 className="mb-2 font-heading text-sm font-semibold text-[var(--text-secondary)]">
            User Reviews
          </h3>
          <div className="space-y-3">
            {reviews.map((review, idx) => (
              <div key={idx} className="glass rounded-2xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white">{review.user}</span>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-white/10"
                        }
                        fill={i < review.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-1.5 text-xs text-[var(--text-secondary)]">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Visit platform */}
        <div className="mt-6">
          <GradientButton className="flex w-full items-center justify-center gap-2">
            <ExternalLink size={16} />
            Chat on {character.platform}
          </GradientButton>
        </div>
      </div>

      {/* Sticky bottom action bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 glass-strong safe-bottom border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-md items-center justify-center gap-4 px-6 py-3">
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => {
              swipe("left");
              router.back();
            }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-red-500/30 bg-[var(--bg-elevated)] text-red-400"
          >
            <X size={22} strokeWidth={3} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => {
              swipe("right");
              router.back();
            }}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[#FF6B8A] text-white shadow-[0_0_30px_rgba(255,56,104,0.4)]"
          >
            <Heart size={26} fill="white" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={() => {
              swipe("up");
              router.back();
            }}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--accent-secondary)]/40 bg-[var(--bg-elevated)] text-[var(--accent-secondary)]"
          >
            <Star size={20} fill="currentColor" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
