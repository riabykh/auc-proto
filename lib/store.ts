"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AICharacter, Match, UserPreferences, SwipeDirection } from "./types";
import { characters as allCharacters } from "./data";

interface SwipeState {
  characters: AICharacter[];
  currentIndex: number;
  matches: Match[];
  passed: string[];
  superLiked: string[];
  swipeCount: number;
  superLikesLeft: number;
  membership: "free" | "gold" | "platinum";
  preferences: UserPreferences;
  showMatch: boolean;
  lastMatchedCharacter: AICharacter | null;
  onboardingComplete: boolean;
  undoStack: { characterId: string; direction: SwipeDirection }[];

  // Actions
  swipe: (direction: SwipeDirection) => void;
  undo: () => void;
  setShowMatch: (show: boolean) => void;
  setPreferences: (prefs: UserPreferences) => void;
  setOnboardingComplete: (complete: boolean) => void;
  resetDeck: () => void;
  getMatchedCharacters: () => AICharacter[];
  isMatched: (characterId: string) => boolean;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const useSwipeStore = create<SwipeState>()(
  persist(
    (set, get) => ({
      characters: shuffleArray(allCharacters),
      currentIndex: 0,
      matches: [],
      passed: [],
      superLiked: [],
      swipeCount: 0,
      superLikesLeft: 3,
      membership: "free",
      preferences: {
        personality: [],
        vibe: [],
        style: [],
        language: ["English"],
      },
      showMatch: false,
      lastMatchedCharacter: null,
      onboardingComplete: false,
      undoStack: [],

      swipe: (direction: SwipeDirection) => {
        const state = get();
        const character = state.characters[state.currentIndex];
        if (!character) return;

        const newState: Partial<SwipeState> = {
          currentIndex: state.currentIndex + 1,
          swipeCount: state.swipeCount + 1,
          undoStack: [
            ...state.undoStack,
            { characterId: character.id, direction },
          ],
        };

        if (direction === "right") {
          // Simulate ~40% match rate for likes
          const isMatch = Math.random() < 0.4;
          if (isMatch) {
            newState.matches = [
              ...state.matches,
              {
                characterId: character.id,
                timestamp: Date.now(),
                seen: false,
              },
            ];
            newState.showMatch = true;
            newState.lastMatchedCharacter = character;
          }
        } else if (direction === "up") {
          // Super like — 80% match rate
          const isMatch = Math.random() < 0.8;
          newState.superLiked = [...state.superLiked, character.id];
          newState.superLikesLeft = Math.max(0, state.superLikesLeft - 1);
          if (isMatch) {
            newState.matches = [
              ...state.matches,
              {
                characterId: character.id,
                timestamp: Date.now(),
                seen: false,
              },
            ];
            newState.showMatch = true;
            newState.lastMatchedCharacter = character;
          }
        } else {
          newState.passed = [...state.passed, character.id];
        }

        set(newState);
      },

      undo: () => {
        const state = get();
        if (state.undoStack.length === 0 || state.currentIndex === 0) return;

        const lastAction = state.undoStack[state.undoStack.length - 1];
        const newMatches = state.matches.filter(
          (m) => m.characterId !== lastAction.characterId
        );
        const newPassed = state.passed.filter(
          (id) => id !== lastAction.characterId
        );
        const newSuperLiked = state.superLiked.filter(
          (id) => id !== lastAction.characterId
        );

        set({
          currentIndex: state.currentIndex - 1,
          undoStack: state.undoStack.slice(0, -1),
          matches: newMatches,
          passed: newPassed,
          superLiked: newSuperLiked,
          superLikesLeft:
            lastAction.direction === "up"
              ? state.superLikesLeft + 1
              : state.superLikesLeft,
        });
      },

      setShowMatch: (show: boolean) => set({ showMatch: show }),

      setPreferences: (prefs: UserPreferences) =>
        set({ preferences: prefs }),

      setOnboardingComplete: (complete: boolean) =>
        set({ onboardingComplete: complete }),

      resetDeck: () =>
        set({
          characters: shuffleArray(allCharacters),
          currentIndex: 0,
        }),

      getMatchedCharacters: () => {
        const state = get();
        return state.matches
          .map((m) => allCharacters.find((c) => c.id === m.characterId))
          .filter(Boolean) as AICharacter[];
      },

      isMatched: (characterId: string) => {
        return get().matches.some((m) => m.characterId === characterId);
      },
    }),
    {
      name: "swipe-ai-storage",
      partialize: (state) => ({
        matches: state.matches,
        passed: state.passed,
        superLiked: state.superLiked,
        swipeCount: state.swipeCount,
        superLikesLeft: state.superLikesLeft,
        membership: state.membership,
        preferences: state.preferences,
        onboardingComplete: state.onboardingComplete,
      }),
    }
  )
);
