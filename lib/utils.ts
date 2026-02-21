import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function calculateCompatibility(
  userPrefs: string[],
  characterTraits: string[]
): number {
  if (!userPrefs.length) return getRandomInt(70, 98);
  const matches = characterTraits.filter((t) =>
    userPrefs.some((p) => p.toLowerCase() === t.toLowerCase())
  );
  const base = (matches.length / Math.max(userPrefs.length, 1)) * 100;
  return Math.min(98, Math.max(65, Math.round(base + getRandomInt(20, 40))));
}

export function formatCount(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}
