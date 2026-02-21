"use client";

import BottomTabBar from "@/components/ui/BottomTabBar";
import SwipeStack from "@/components/swipe/SwipeStack";

export default function Home() {
  return (
    <>
      <main className="flex-1 overflow-hidden">
        <SwipeStack />
      </main>
      <BottomTabBar />
    </>
  );
}
