"use client";

import { useState, useEffect, useCallback } from "react";
import StatsCard from "@/components/StatsCard";
import DailyCheckIn from "@/components/DailyCheckIn";
import DebtTracker from "@/components/DebtTracker";
import WeeklyHeatmap from "@/components/WeeklyHeatmap";
import MotivationBanner from "@/components/MotivationBanner";
import HistoryLog from "@/components/HistoryLog";
import {
  getGamblingFreeDays,
  getRemainingDebt,
  getProfile,
  getLogs,
  getDaysSince,
} from "@/lib/storage";

export default function Home() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "checkin" | "debt">(
    "dashboard"
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  const refresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="text-2xl font-bold text-white animate-pulse">
          LIFE RESET
        </div>
      </div>
    );
  }

  const profile = getProfile();
  const streak = getGamblingFreeDays();
  const debt = getRemainingDebt();
  const logs = getLogs();
  const daysSinceStart = getDaysSince(profile.startDate);
  const moneySaved = streak * 200;

  const latestWeight =
    logs.find((l) => l.weight > 0)?.weight || profile.currentWeight;
  const weightLost = profile.currentWeight - latestWeight;
  const weightProgress =
    ((profile.currentWeight - latestWeight) /
      (profile.currentWeight - profile.targetWeight)) *
    100;

  const workoutsThisWeek = logs
    .filter((l) => {
      const logDate = new Date(l.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return logDate >= weekAgo;
    })
    .filter((l) => l.workoutDone).length;

  const avgScreenTime =
    logs.length > 0
      ? logs
          .filter((l) => l.screenTimeHours > 0)
          .reduce((sum, l) => sum + l.screenTimeHours, 0) /
        Math.max(1, logs.filter((l) => l.screenTimeHours > 0).length)
      : 0;

  return (
    <div className="min-h-screen bg-[#0a0a0a]" key={refreshKey}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-800 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                LIFE RESET
              </h1>
              <p className="text-xs text-gray-500">
                Day {daysSinceStart} of your transformation
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-sm font-bold text-emerald-400">
                {streak} days clean
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex gap-1 rounded-xl bg-gray-900 p-1">
            {(
              [
                { id: "dashboard", label: "Dashboard" },
                { id: "checkin", label: "Check In" },
                { id: "debt", label: "Debt" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-gray-800 text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-6 space-y-6">
        {activeTab === "dashboard" && (
          <>
            <MotivationBanner />

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <StatsCard
                title="Gambling-Free Streak"
                value={`${streak} days`}
                subtitle={`$${moneySaved.toLocaleString()} saved`}
                icon="&#127942;"
                color="green"
              />
              <StatsCard
                title="Debt Remaining"
                value={`$${debt.total.toLocaleString()}`}
                subtitle={`$${(profile.totalDebt - debt.total).toLocaleString()} paid off`}
                icon="&#128176;"
                color="red"
                progress={
                  ((profile.totalDebt - debt.total) / profile.totalDebt) * 100
                }
              />
              <StatsCard
                title="Weight"
                value={`${latestWeight} kg`}
                subtitle={`${weightLost > 0 ? "-" : ""}${weightLost.toFixed(1)} kg lost`}
                icon="&#9878;"
                color="blue"
                progress={weightProgress}
              />
              <StatsCard
                title="Workouts This Week"
                value={`${workoutsThisWeek}/5`}
                subtitle="Target: 5 per week"
                icon="&#128170;"
                color="purple"
                progress={(workoutsThisWeek / 5) * 100}
              />
              <StatsCard
                title="Avg Screen Time"
                value={avgScreenTime > 0 ? `${avgScreenTime.toFixed(1)}h` : "—"}
                subtitle="Target: under 4 hours"
                icon="&#128241;"
                color="orange"
                progress={
                  avgScreenTime > 0
                    ? Math.max(0, 100 - ((avgScreenTime - 4) / 7) * 100)
                    : 0
                }
              />
              <StatsCard
                title="Days Active"
                value={daysSinceStart}
                subtitle={`Since ${profile.startDate}`}
                icon="&#128197;"
                color="cyan"
              />
            </div>

            <WeeklyHeatmap />
            <HistoryLog />
          </>
        )}

        {activeTab === "checkin" && <DailyCheckIn onSave={refresh} />}

        {activeTab === "debt" && <DebtTracker onUpdate={refresh} />}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 text-center text-xs text-gray-600">
        LIFE RESET — Built for Hemanth. One day at a time.
      </footer>
    </div>
  );
}
