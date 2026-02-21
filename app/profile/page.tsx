"use client";

import { motion } from "framer-motion";
import { useSwipeStore } from "@/lib/store";
import {
  User,
  Heart,
  Zap,
  Star,
  Settings,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import BottomTabBar from "@/components/ui/BottomTabBar";
import Badge from "@/components/ui/Badge";

function StatCard({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string | number }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1 rounded-2xl bg-[var(--bg-card)] py-3">
      <Icon size={18} className="text-[var(--accent-primary)]" />
      <span className="font-heading text-lg font-bold text-white">{value}</span>
      <span className="text-[10px] text-[var(--text-muted)]">{label}</span>
    </div>
  );
}

function SettingsItem({
  icon: Icon,
  label,
  subtitle,
  onClick,
  danger,
}: {
  icon: LucideIcon;
  label: string;
  subtitle?: string;
  onClick?: () => void;
  danger?: boolean;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl bg-[var(--bg-card)] px-4 py-3 text-left"
    >
      <Icon
        size={20}
        className={danger ? "text-red-400" : "text-[var(--text-secondary)]"}
      />
      <div className="flex-1">
        <span
          className={`text-sm font-medium ${
            danger ? "text-red-400" : "text-white"
          }`}
        >
          {label}
        </span>
        {subtitle && (
          <p className="text-xs text-[var(--text-muted)]">{subtitle}</p>
        )}
      </div>
      <ChevronRight size={16} className="text-[var(--text-muted)]" />
    </motion.button>
  );
}

export default function ProfilePage() {
  const swipeCount = useSwipeStore((s) => s.swipeCount);
  const matches = useSwipeStore((s) => s.matches);
  const superLikesLeft = useSwipeStore((s) => s.superLikesLeft);
  const membership = useSwipeStore((s) => s.membership);

  return (
    <>
      <main className="flex-1 overflow-y-auto hide-scrollbar">
        {/* Profile header */}
        <div className="relative overflow-hidden px-5 pt-6 pb-6">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-primary)]/10 via-[var(--accent-secondary)]/5 to-transparent" />

          <div className="relative flex flex-col items-center">
            {/* Avatar */}
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 border-2 border-white/10">
                <User size={36} className="text-white/60" />
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-primary)] text-white"
              >
                <span className="text-xs">✏️</span>
              </motion.button>
            </div>

            <h2 className="mt-3 font-heading text-xl font-bold text-white">
              You
            </h2>
            <Badge
              text={
                membership === "free"
                  ? "Free Plan"
                  : membership === "gold"
                  ? "⭐ Gold"
                  : "👑 Platinum"
              }
              variant={membership === "free" ? "platform" : "premium"}
              className="mt-1"
            />
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-3 px-5 pb-6">
          <StatCard icon={Zap} label="Swipes" value={swipeCount} />
          <StatCard icon={Heart} label="Matches" value={matches.length} />
          <StatCard icon={Star} label="Super Likes" value={superLikesLeft} />
        </div>

        {/* Settings sections */}
        <div className="space-y-2 px-5 pb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Settings
          </p>
          <SettingsItem
            icon={Settings}
            label="My Preferences"
            subtitle="Edit your matchmaking quiz"
          />
          <SettingsItem
            icon={CreditCard}
            label="Subscription"
            subtitle={
              membership === "free"
                ? "Upgrade to Gold or Platinum"
                : `${membership.charAt(0).toUpperCase() + membership.slice(1)} plan`
            }
          />
          <SettingsItem icon={Bell} label="Notifications" subtitle="Push & email settings" />
          <SettingsItem icon={Shield} label="Privacy" subtitle="Data & visibility" />
          <SettingsItem icon={HelpCircle} label="Help & Support" />
          <SettingsItem icon={Info} label="About swipe.ai" subtitle="v1.0.0" />

          <div className="pt-4">
            <SettingsItem icon={LogOut} label="Sign Out" danger />
          </div>
        </div>
      </main>
      <BottomTabBar />
    </>
  );
}
