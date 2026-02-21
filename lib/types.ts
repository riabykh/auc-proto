export interface AICharacter {
  id: string;
  name: string;
  age: number;
  tagline: string;
  bio: string;
  personality: string[];
  interests: string[];
  style: "anime" | "realistic" | "fantasy" | "mixed";
  platform: "character.ai" | "crushon" | "janitorai" | "candy.ai" | "chai";
  platformUrl: string;
  images: string[];
  rating: number;
  matchCount: number;
  voiceAvailable: boolean;
  firstMessage: string;
  compatibility?: number;
  badge?: "premium" | "new" | "trending";
  location?: string;
}

export interface UserPreferences {
  personality: string[];
  vibe: string[];
  style: string[];
  language: string[];
}

export interface Match {
  characterId: string;
  timestamp: number;
  seen: boolean;
}

export interface UserProfile {
  name: string;
  avatar?: string;
  membership: "free" | "gold" | "platinum";
  swipeCount: number;
  matchCount: number;
  superLikesLeft: number;
  preferences: UserPreferences;
}

export type SwipeDirection = "left" | "right" | "up";
