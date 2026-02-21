"use client";

import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import Image from "next/image";
import { AICharacter } from "@/lib/types";
import Badge from "@/components/ui/Badge";
import CompatibilityRing from "@/components/ui/CompatibilityRing";
import SwipeOverlay from "./SwipeOverlay";
import { formatCount } from "@/lib/utils";

interface SwipeCardProps {
  character: AICharacter;
  isTop: boolean;
  onSwipe: (direction: "left" | "right" | "up") => void;
  onTap: () => void;
  drag?: boolean;
}

export default function SwipeCard({
  character,
  isTop,
  onSwipe,
  onTap,
  drag = true,
}: SwipeCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const likeOpacity = useTransform(x, [0, 80, 160], [0, 0.5, 1]);
  const nopeOpacity = useTransform(x, [0, -80, -160], [0, 0.5, 1]);
  const superLikeOpacity = useTransform(y, [0, -80, -160], [0, 0.5, 1]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = typeof window !== "undefined" ? window.innerWidth * 0.25 : 100;
    const yThreshold = 120;

    if (info.offset.y < -yThreshold && Math.abs(info.offset.x) < threshold) {
      onSwipe("up");
    } else if (info.offset.x > threshold) {
      onSwipe("right");
    } else if (info.offset.x < -threshold) {
      onSwipe("left");
    }
  };

  const personalityEmojis: Record<string, string> = {
    Romantic: "💜",
    Creative: "🎨",
    Empathetic: "💕",
    Intellectual: "🧠",
    Witty: "😏",
    Confident: "💪",
    Shy: "🥺",
    Sweet: "🍬",
    Caring: "💗",
    Bold: "🔥",
    Adventurous: "🌍",
    Charismatic: "✨",
    Funny: "😂",
    Chaotic: "🌪️",
    Mysterious: "🔮",
    Wise: "📿",
    Playful: "🎭",
    Chill: "😎",
    Energetic: "⚡",
    Determined: "🎯",
    Passionate: "💃",
    Warm: "☀️",
    Dramatic: "🎬",
    Wholesome: "🌸",
    Optimistic: "🌟",
    Deep: "🌊",
    Artistic: "🖤",
    Quirky: "🤪",
    Enthusiastic: "🚀",
    Protective: "🛡️",
    Honorable: "⚔️",
    Gentle: "🕊️",
    Bubbly: "💫",
    Affectionate: "💝",
    Sarcastic: "😈",
    Brilliant: "💎",
    Rebellious: "⚡",
    Curious: "🔍",
    Philosophical: "💭",
    Enigmatic: "🌀",
    Nurturing: "🌱",
    Stoic: "🏔️",
    Loyal: "🤝",
    Mischievous: "🧚",
    Kind: "🌈",
    Charming: "🎩",
    Resourceful: "🧰",
    Strategic: "♟️",
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{
        x,
        y,
        rotate,
        zIndex: isTop ? 10 : 0,
      }}
      drag={isTop && drag}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      initial={isTop ? { scale: 1 } : { scale: 0.95, y: 12 }}
      animate={isTop ? { scale: 1, y: 0 } : { scale: 0.95, y: 12 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.2 },
      }}
      whileTap={isTop ? { scale: 0.98 } : undefined}
      onClick={isTop ? onTap : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Card container */}
      <div className="relative h-full w-full overflow-hidden rounded-3xl bg-[var(--bg-card)] shadow-2xl">
        {/* Character image */}
        <div className="relative h-[68%] w-full">
          <Image
            src={character.images[0]}
            alt={character.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 420px"
            priority={isTop}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent" />

          {/* Badge */}
          {character.badge && (
            <div className="absolute left-4 top-4">
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
            </div>
          )}
        </div>

        {/* Info section */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          {/* Glass backdrop */}
          <div className="glass rounded-2xl p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-heading text-2xl font-bold text-white">
                    {character.name}
                  </h2>
                  <span className="text-lg text-[var(--text-secondary)]">
                    {character.age}
                  </span>
                </div>

                {/* Platform badge */}
                <div className="mt-1">
                  <Badge text={character.platform} variant="platform" />
                </div>

                {/* Personality tags */}
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {character.personality.slice(0, 3).map((trait) => (
                    <span
                      key={trait}
                      className="inline-flex items-center gap-0.5 rounded-full bg-white/5 px-2 py-0.5 text-xs text-[var(--text-secondary)]"
                    >
                      {personalityEmojis[trait] || "✦"} {trait}
                    </span>
                  ))}
                </div>

                {/* Tagline */}
                <p className="mt-2 text-sm italic text-[var(--text-muted)] line-clamp-1">
                  &ldquo;{character.tagline}&rdquo;
                </p>
              </div>

              {/* Compatibility ring */}
              <div className="ml-3 flex-shrink-0">
                <CompatibilityRing percentage={character.compatibility || 85} />
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-2 flex items-center gap-3 text-xs text-[var(--text-muted)]">
              <span>⭐ {character.rating}</span>
              <span>•</span>
              <span>{formatCount(character.matchCount)} matches</span>
              {character.voiceAvailable && (
                <>
                  <span>•</span>
                  <span>🎙️ Voice</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Swipe overlays */}
        {isTop && (
          <>
            <SwipeOverlay type="like" opacity={likeOpacity as unknown as number} />
            <SwipeOverlay type="nope" opacity={nopeOpacity as unknown as number} />
            <SwipeOverlay type="superlike" opacity={superLikeOpacity as unknown as number} />
          </>
        )}
      </div>
    </motion.div>
  );
}
