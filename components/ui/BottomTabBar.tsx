"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Flame, Compass, MessageCircle, Diamond, User } from "lucide-react";
import { useSwipeStore } from "@/lib/store";

const tabs = [
  { href: "/", label: "Discover", icon: Flame },
  { href: "/explore", label: "Explore", icon: Compass },
  { href: "/matches", label: "Matches", icon: MessageCircle },
  { href: "/premium", label: "Premium", icon: Diamond },
  { href: "/profile", label: "Profile", icon: User },
];

export default function BottomTabBar() {
  const pathname = usePathname();
  const matches = useSwipeStore((s) => s.matches);
  const unseenCount = matches.filter((m) => !m.seen).length;

  return (
    <nav className="glass-strong safe-bottom relative z-50 flex-shrink-0 border-t border-white/[0.06]">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const isActive =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1"
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                className="relative"
              >
                <Icon
                  size={24}
                  className={
                    isActive
                      ? "text-[var(--accent-primary)]"
                      : "text-[var(--text-muted)]"
                  }
                  fill={isActive ? "currentColor" : "none"}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
                {tab.label === "Matches" && unseenCount > 0 && (
                  <span className="absolute -right-1.5 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--accent-primary)] px-1 text-[10px] font-bold text-white">
                    {unseenCount}
                  </span>
                )}
                {tab.label === "Premium" && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[var(--accent-secondary)]"
                  />
                )}
              </motion.div>
              <span
                className={`text-[10px] font-medium ${
                  isActive
                    ? "text-[var(--accent-primary)]"
                    : "text-[var(--text-muted)]"
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-2 h-0.5 w-8 rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
