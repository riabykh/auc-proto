"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { AICharacter } from "@/lib/types";
import GradientButton from "@/components/ui/GradientButton";

interface MatchAnimationProps {
  show: boolean;
  character: AICharacter | null;
  onClose: () => void;
  onKeepSwiping: () => void;
}

function Particle({ delay, x, y, even }: { delay: number; x: number; y: number; even: boolean }) {
  return (
    <motion.div
      className="absolute h-2 w-2 rounded-full"
      style={{
        background: even
          ? "var(--accent-primary)"
          : "var(--accent-secondary)",
        left: "50%",
        top: "50%",
      }}
      initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      animate={{
        opacity: 0,
        scale: 0,
        x: x,
        y: y,
      }}
      transition={{
        duration: 1.2,
        delay: delay,
        ease: "easeOut",
      }}
    />
  );
}

export default function MatchAnimation({
  show,
  character,
  onClose,
  onKeepSwiping,
}: MatchAnimationProps) {
  if (!character) return null;

  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: (i % 6) * 0.05,
    x: Math.cos(i * 1.256) * 150,
    y: Math.sin(i * 0.942) * 150,
  }));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center px-8">
            {/* Particles */}
            {particles.map((p) => (
              <Particle key={p.id} delay={p.delay} x={p.x} y={p.y} even={p.id % 2 === 0} />
            ))}

            {/* Title */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="mb-8"
            >
              <h1 className="gradient-text font-heading text-5xl font-black tracking-tight">
                It&apos;s a Match!
              </h1>
            </motion.div>

            {/* Avatars */}
            <div className="mb-8 flex items-center gap-4">
              {/* User avatar */}
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
                className="h-24 w-24 overflow-hidden rounded-full border-2 border-[var(--accent-primary)] shadow-[0_0_20px_rgba(255,56,104,0.4)]"
              >
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--accent-primary)]/30 to-[var(--accent-secondary)]/30 text-3xl">
                  👤
                </div>
              </motion.div>

              {/* Heart */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="text-4xl"
              >
                💕
              </motion.div>

              {/* Character avatar */}
              <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
                className="h-24 w-24 overflow-hidden rounded-full border-2 border-[var(--accent-secondary)] shadow-[0_0_20px_rgba(124,92,255,0.4)]"
              >
                <Image
                  src={character.images[0]}
                  alt={character.name}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </div>

            {/* Character info */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-2 text-center text-lg text-[var(--text-secondary)]"
            >
              You and <span className="font-semibold text-white">{character.name}</span> liked each
              other
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mb-8 text-center text-sm text-[var(--text-muted)]"
            >
              Visit {character.platform} to start chatting!
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex w-full max-w-xs flex-col gap-3"
            >
              <GradientButton onClick={onClose} className="w-full">
                Visit on {character.platform}
              </GradientButton>
              <GradientButton
                onClick={onKeepSwiping}
                variant="ghost"
                className="w-full"
              >
                Keep Swiping
              </GradientButton>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
