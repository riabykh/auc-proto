"use client";

import { motion } from "framer-motion";

interface SwipeOverlayProps {
  type: "like" | "nope" | "superlike";
  opacity: number;
}

export default function SwipeOverlay({ type, opacity }: SwipeOverlayProps) {
  const config = {
    like: {
      text: "LIKE",
      color: "#00D48E",
      borderColor: "#00D48E",
      icon: "♥",
      rotation: -15,
    },
    nope: {
      text: "NOPE",
      color: "#FF4458",
      borderColor: "#FF4458",
      icon: "✕",
      rotation: 15,
    },
    superlike: {
      text: "SUPER",
      color: "#7C5CFF",
      borderColor: "#7C5CFF",
      icon: "⭐",
      rotation: 0,
    },
  };

  const { text, color, borderColor, icon, rotation } = config[type];

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-10 flex items-start justify-center pt-20"
      style={{ opacity }}
    >
      <div
        className="rounded-xl border-4 px-6 py-2"
        style={{
          borderColor,
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <div className="flex items-center gap-2">
          <span className="text-3xl">{icon}</span>
          <span
            className="text-3xl font-black tracking-wider font-heading"
            style={{ color }}
          >
            {text}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
