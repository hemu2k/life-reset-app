"use client";

import { getLogs } from "@/lib/storage";

export default function HistoryLog() {
  const logs = getLogs();

  if (logs.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm text-center">
        <p className="text-gray-500">No logs yet. Start your first check-in above!</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
      <h2 className="mb-4 text-xl font-bold text-white flex items-center gap-2">
        <span className="text-2xl">&#128203;</span> History
      </h2>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {logs.slice(0, 14).map((log) => {
          const checks = [
            log.gamblingFree,
            log.workoutDone,
            log.proteinHit,
            !log.nap,
          ];
          const score = checks.filter(Boolean).length;

          return (
            <div
              key={log.date}
              className="flex items-center gap-4 rounded-xl bg-gray-800/50 px-4 py-3"
            >
              <div className="min-w-[80px]">
                <p className="text-sm font-medium text-gray-300">{log.date}</p>
              </div>
              <div className="flex gap-2">
                <span
                  title="Gambling free"
                  className={`rounded-md px-2 py-0.5 text-xs ${
                    log.gamblingFree
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {log.gamblingFree ? "No Bet" : "BET"}
                </span>
                <span
                  title="Workout"
                  className={`rounded-md px-2 py-0.5 text-xs ${
                    log.workoutDone
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-gray-700 text-gray-500"
                  }`}
                >
                  {log.workoutDone ? "Gym" : "Skip"}
                </span>
                <span
                  title="Protein"
                  className={`rounded-md px-2 py-0.5 text-xs ${
                    log.proteinHit
                      ? "bg-orange-500/20 text-orange-400"
                      : "bg-gray-700 text-gray-500"
                  }`}
                >
                  {log.proteinHit ? "Protein" : "Low"}
                </span>
              </div>
              {log.weight > 0 && (
                <span className="ml-auto text-sm text-gray-400">
                  {log.weight}kg
                </span>
              )}
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-400">
                  Mood: {log.mood}/10
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
