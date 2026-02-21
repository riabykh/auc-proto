"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useSwipeStore } from "@/lib/store";
import GradientButton from "@/components/ui/GradientButton";
import Tag from "@/components/ui/Tag";

const steps = [
  {
    title: "What personality attracts you?",
    key: "personality" as const,
    options: [
      { label: "Shy & Sweet", emoji: "🥺" },
      { label: "Bold & Confident", emoji: "💪" },
      { label: "Mysterious & Deep", emoji: "🔮" },
      { label: "Funny & Chaotic", emoji: "🌪️" },
      { label: "Intellectual & Wise", emoji: "🧠" },
      { label: "Warm & Caring", emoji: "☀️" },
    ],
  },
  {
    title: "What vibe are you looking for?",
    key: "vibe" as const,
    options: [
      { label: "Romantic", emoji: "💕" },
      { label: "Friendship", emoji: "🤝" },
      { label: "Adventure", emoji: "🌍" },
      { label: "Intellectual", emoji: "📚" },
      { label: "Comfort", emoji: "🧸" },
      { label: "Entertainment", emoji: "🎭" },
    ],
  },
  {
    title: "What style do you prefer?",
    key: "style" as const,
    options: [
      { label: "Anime", emoji: "🎨" },
      { label: "Realistic", emoji: "📷" },
      { label: "Fantasy", emoji: "🐉" },
      { label: "Mixed", emoji: "✨" },
    ],
  },
  {
    title: "Preferred language?",
    key: "language" as const,
    options: [
      { label: "English", emoji: "🇺🇸" },
      { label: "Japanese", emoji: "🇯🇵" },
      { label: "Korean", emoji: "🇰🇷" },
      { label: "Spanish", emoji: "🇪🇸" },
    ],
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { setPreferences, setOnboardingComplete } = useSwipeStore();
  const [currentStep, setCurrentStep] = useState(-1); // -1 = welcome screen
  const [selections, setSelections] = useState<Record<string, string[]>>({
    personality: [],
    vibe: [],
    style: [],
    language: [],
  });

  const handleToggle = (key: string, label: string) => {
    setSelections((prev) => ({
      ...prev,
      [key]: prev[key].includes(label)
        ? prev[key].filter((l) => l !== label)
        : [...prev[key], label],
    }));
  };

  const handleComplete = () => {
    setPreferences({
      personality: selections.personality,
      vibe: selections.vibe,
      style: selections.style,
      language: selections.language,
    });
    setOnboardingComplete(true);
    router.push("/");
  };

  const progress = currentStep >= 0 ? ((currentStep + 1) / steps.length) * 100 : 0;

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden bg-[var(--bg-primary)]">
      {/* Progress bar */}
      {currentStep >= 0 && (
        <div className="h-1 w-full bg-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {currentStep === -1 ? (
          /* Welcome Screen */
          <motion.div
            key="welcome"
            className="flex flex-1 flex-col items-center justify-center px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Background gradient animation */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute -left-1/2 -top-1/2 h-full w-full rounded-full opacity-20 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, var(--accent-primary) 0%, transparent 70%)",
                }}
                animate={{
                  x: [0, 100, -50, 0],
                  y: [0, -80, 60, 0],
                  scale: [1, 1.2, 0.9, 1],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-1/4 -right-1/4 h-3/4 w-3/4 rounded-full opacity-15 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)",
                }}
                animate={{
                  x: [0, -80, 40, 0],
                  y: [0, 60, -40, 0],
                  scale: [1, 0.8, 1.1, 1],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <motion.h1
                className="gradient-text font-heading text-5xl font-black tracking-tight"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                swipe.ai
              </motion.h1>
              <motion.p
                className="mt-3 text-center text-lg text-[var(--text-secondary)]"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Find your perfect AI companion
              </motion.p>

              <motion.div
                className="mt-12 flex w-full max-w-xs flex-col gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <GradientButton
                  onClick={() => setCurrentStep(0)}
                  size="lg"
                  className="w-full"
                >
                  Get Started
                </GradientButton>
                <GradientButton
                  onClick={() => router.push("/")}
                  variant="ghost"
                  size="lg"
                  className="w-full"
                >
                  I have an account
                </GradientButton>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          /* Quiz Steps */
          <motion.div
            key={`step-${currentStep}`}
            className="flex flex-1 flex-col px-6 pt-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-heading text-2xl font-bold text-white">
              {steps[currentStep].title}
            </h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">
              Select all that apply
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {steps[currentStep].options.map((opt) => (
                <Tag
                  key={opt.label}
                  label={opt.label}
                  emoji={opt.emoji}
                  selected={selections[steps[currentStep].key]?.includes(opt.label)}
                  onClick={() => handleToggle(steps[currentStep].key, opt.label)}
                  className="px-4 py-2.5 text-sm"
                />
              ))}
            </div>

            <div className="mt-auto pb-8">
              {currentStep < steps.length - 1 ? (
                <GradientButton
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="w-full"
                  size="lg"
                >
                  Next
                </GradientButton>
              ) : (
                <GradientButton
                  onClick={handleComplete}
                  className="w-full"
                  size="lg"
                >
                  Show me my matches →
                </GradientButton>
              )}
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="mt-3 w-full text-center text-sm text-[var(--text-muted)]"
                >
                  Back
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
