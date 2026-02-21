"use client";

import { motion } from "framer-motion";
import { Check, Diamond, Zap, Crown, Star } from "lucide-react";
import BottomTabBar from "@/components/ui/BottomTabBar";
import GradientButton from "@/components/ui/GradientButton";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    icon: Zap,
    color: "var(--text-muted)",
    features: [
      "10 swipes per day",
      "See character profiles",
      "3 super likes per day",
      "Basic matching",
    ],
    missing: [
      "Unlimited swipes",
      "Undo last swipe",
      "Priority matching",
      "See who likes you",
      "Ad-free experience",
    ],
    current: true,
  },
  {
    name: "Gold",
    price: "$9.99",
    period: "/month",
    icon: Star,
    color: "#FFD700",
    features: [
      "Unlimited swipes",
      "15 super likes per day",
      "Undo last swipe",
      "Priority matching",
      "See who likes you",
    ],
    missing: ["Exclusive characters", "Custom matchmaking AI"],
    popular: true,
  },
  {
    name: "Platinum",
    price: "$19.99",
    period: "/month",
    icon: Crown,
    color: "var(--accent-secondary)",
    features: [
      "Everything in Gold",
      "Unlimited super likes",
      "Exclusive premium characters",
      "AI-powered matchmaking",
      "Priority support",
      "Ad-free experience",
      "Custom preferences",
    ],
    missing: [],
  },
];

export default function PremiumPage() {
  return (
    <>
      <main className="flex-1 overflow-y-auto hide-scrollbar">
        {/* Header */}
        <div className="px-5 pt-6 pb-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Diamond className="mx-auto h-12 w-12 text-[var(--accent-secondary)]" />
          </motion.div>
          <h1 className="mt-3 font-heading text-2xl font-bold text-white">
            Upgrade to Premium
          </h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Unlock unlimited possibilities
          </p>
        </div>

        {/* Plans */}
        <div className="space-y-4 px-5 pb-8">
          {plans.map((plan, idx) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative overflow-hidden rounded-3xl border ${
                  plan.popular
                    ? "border-[var(--accent-primary)]/40"
                    : "border-white/[0.06]"
                } bg-[var(--bg-card)] p-5`}
              >
                {plan.popular && (
                  <div className="absolute right-4 top-4">
                    <span className="rounded-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] px-3 py-1 text-[10px] font-bold text-white">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${plan.color}20` }}
                  >
                    <Icon size={20} style={{ color: plan.color }} />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      <span className="text-xl font-bold text-white">{plan.price}</span>
                      {plan.period}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check size={14} className="text-[var(--success)]" />
                      <span className="text-sm text-[var(--text-secondary)]">{feature}</span>
                    </div>
                  ))}
                  {plan.missing?.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 opacity-40">
                      <Check size={14} className="text-[var(--text-muted)]" />
                      <span className="text-sm text-[var(--text-muted)] line-through">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5">
                  {plan.current ? (
                    <div className="rounded-2xl border border-white/10 py-3 text-center text-sm font-medium text-[var(--text-muted)]">
                      Current Plan
                    </div>
                  ) : (
                    <GradientButton
                      className="w-full"
                      variant={plan.popular ? "primary" : "outline"}
                    >
                      {plan.popular ? "Start Free Trial" : `Choose ${plan.name}`}
                    </GradientButton>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
      <BottomTabBar />
    </>
  );
}
