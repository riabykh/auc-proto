"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { characters, categories, collections } from "@/lib/data";
import BottomTabBar from "@/components/ui/BottomTabBar";
import Badge from "@/components/ui/Badge";
import { formatCount } from "@/lib/utils";

function CompactCard({
  character,
  onClick,
}: {
  character: (typeof characters)[0];
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex-shrink-0 overflow-hidden rounded-2xl bg-[var(--bg-card)]"
      style={{ width: 160, height: 220 }}
    >
      <div className="relative h-[65%] w-full">
        <Image
          src={character.images[0]}
          alt={character.name}
          fill
          className="object-cover"
          sizes="160px"
        />
        {character.badge && (
          <div className="absolute left-2 top-2">
            <Badge
              text={
                character.badge === "trending"
                  ? "🔥"
                  : character.badge === "new"
                  ? "✨"
                  : "💎"
              }
              variant="status"
              className="text-[10px] px-1.5 py-0"
            />
          </div>
        )}
      </div>
      <div className="p-2.5">
        <div className="flex items-center gap-1">
          <p className="truncate font-heading text-sm font-bold text-white">
            {character.name}
          </p>
          <span className="text-xs text-[var(--text-muted)]">{character.age}</span>
        </div>
        <p className="mt-0.5 truncate text-[10px] text-[var(--text-muted)]">
          {character.tagline}
        </p>
        <div className="mt-1 flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
          <span>⭐ {character.rating}</span>
          <span>·</span>
          <span>{formatCount(character.matchCount)}</span>
        </div>
      </div>
    </motion.button>
  );
}

function HorizontalSection({
  title,
  chars,
  onCharClick,
}: {
  title: string;
  chars: (typeof characters)[0][];
  onCharClick: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="mb-3 px-5 font-heading text-lg font-bold text-white">{title}</h2>
      <div className="flex gap-3 overflow-x-auto px-5 pb-2 hide-scrollbar">
        {chars.map((char) => (
          <CompactCard
            key={char.id}
            character={char}
            onClick={() => onCharClick(char.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default function ExplorePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const trending = characters.filter((c) => c.badge === "trending");
  const newChars = characters.filter((c) => c.badge === "new");
  const topRated = [...characters].sort((a, b) => b.rating - a.rating).slice(0, 8);

  const handleCharClick = (id: string) => {
    router.push(`/character/${id}`);
  };

  return (
    <>
      <main className="flex-1 overflow-y-auto hide-scrollbar pb-4">
        {/* Header */}
        <div className="px-5 pt-4 pb-2">
          <h1 className="font-heading text-2xl font-bold text-white">Explore</h1>
        </div>

        {/* Search bar */}
        <div className="px-5 pb-4">
          <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-3">
            <Search size={18} className="text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search characters..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-[var(--text-muted)] outline-none"
            />
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          <HorizontalSection
            title="Trending Now 🔥"
            chars={trending}
            onCharClick={handleCharClick}
          />

          <HorizontalSection
            title="New This Week ✨"
            chars={newChars}
            onCharClick={handleCharClick}
          />

          <HorizontalSection
            title="Top Rated ⭐"
            chars={topRated}
            onCharClick={handleCharClick}
          />

          {/* Categories */}
          <div>
            <h2 className="mb-3 px-5 font-heading text-lg font-bold text-white">
              Categories
            </h2>
            <div className="grid grid-cols-2 gap-3 px-5">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileTap={{ scale: 0.95 }}
                  className="relative h-28 overflow-hidden rounded-2xl"
                >
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-black/50" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-heading text-sm font-bold text-white">
                      {cat.name}
                    </span>
                    <span className="mt-0.5 text-xs text-white/60">
                      {cat.count} characters
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Collections */}
          <div className="pb-4">
            <h2 className="mb-3 px-5 font-heading text-lg font-bold text-white">
              Collections
            </h2>
            <div className="flex gap-3 overflow-x-auto px-5 pb-2 hide-scrollbar">
              {collections.map((col) => (
                <motion.button
                  key={col.id}
                  whileTap={{ scale: 0.95 }}
                  className="relative h-32 w-64 flex-shrink-0 overflow-hidden rounded-2xl"
                >
                  <Image
                    src={col.image}
                    alt={col.name}
                    fill
                    className="object-cover"
                    sizes="256px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="font-heading text-sm font-bold text-white">{col.name}</p>
                    <p className="mt-0.5 text-xs text-white/60">{col.description}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </main>
      <BottomTabBar />
    </>
  );
}
