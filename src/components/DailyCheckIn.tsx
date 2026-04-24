"use client";

import { useState } from "react";
import { DailyLog } from "@/lib/types";
import { saveLog, getTodayString, getLogs } from "@/lib/storage";

interface DailyCheckInProps {
  onSave: () => void;
}

export default function DailyCheckIn({ onSave }: DailyCheckInProps) {
  const today = getTodayString();
  const existingLog = getLogs().find((l) => l.date === today);

  const [log, setLog] = useState<DailyLog>(
    existingLog || {
      date: today,
      gamblingFree: true,
      sleepTime: "23:00",
      wakeTime: "06:30",
      nap: false,
      workoutDone: false,
      workoutType: "",
      proteinHit: false,
      waterLiters: 0,
      screenTimeHours: 0,
      weight: 0,
      debtPayment: 0,
      mood: 5,
      urgeLevel: 0,
      notes: "",
    }
  );

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    saveLog(log);
    setSaved(true);
    onSave();
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
      <h2 className="mb-6 text-xl font-bold text-white flex items-center gap-2">
        <span className="text-2xl">&#9998;</span> Daily Check-In
        <span className="ml-auto text-sm font-normal text-gray-400">
          {today}
        </span>
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Gambling Free */}
        <label className="flex items-center gap-3 rounded-xl border border-gray-700 p-4 cursor-pointer hover:border-emerald-500/50 transition-colors">
          <input
            type="checkbox"
            checked={log.gamblingFree}
            onChange={(e) => setLog({ ...log, gamblingFree: e.target.checked })}
            className="h-5 w-5 rounded accent-emerald-500"
          />
          <div>
            <p className="font-medium text-white">Gambling Free Today</p>
            <p className="text-xs text-gray-500">No bets placed</p>
          </div>
        </label>

        {/* Workout */}
        <label className="flex items-center gap-3 rounded-xl border border-gray-700 p-4 cursor-pointer hover:border-blue-500/50 transition-colors">
          <input
            type="checkbox"
            checked={log.workoutDone}
            onChange={(e) => setLog({ ...log, workoutDone: e.target.checked })}
            className="h-5 w-5 rounded accent-blue-500"
          />
          <div>
            <p className="font-medium text-white">Workout Completed</p>
            <p className="text-xs text-gray-500">Gym, pickleball, or cardio</p>
          </div>
        </label>

        {/* Protein */}
        <label className="flex items-center gap-3 rounded-xl border border-gray-700 p-4 cursor-pointer hover:border-orange-500/50 transition-colors">
          <input
            type="checkbox"
            checked={log.proteinHit}
            onChange={(e) => setLog({ ...log, proteinHit: e.target.checked })}
            className="h-5 w-5 rounded accent-orange-500"
          />
          <div>
            <p className="font-medium text-white">150g Protein Hit</p>
            <p className="text-xs text-gray-500">Daily protein target</p>
          </div>
        </label>

        {/* No Nap */}
        <label className="flex items-center gap-3 rounded-xl border border-gray-700 p-4 cursor-pointer hover:border-purple-500/50 transition-colors">
          <input
            type="checkbox"
            checked={!log.nap}
            onChange={(e) => setLog({ ...log, nap: !e.target.checked })}
            className="h-5 w-5 rounded accent-purple-500"
          />
          <div>
            <p className="font-medium text-white">No Naps</p>
            <p className="text-xs text-gray-500">Stayed awake all day</p>
          </div>
        </label>

        {/* Sleep Time */}
        <div className="rounded-xl border border-gray-700 p-4">
          <label className="text-sm text-gray-400">Sleep Time</label>
          <input
            type="time"
            value={log.sleepTime}
            onChange={(e) => setLog({ ...log, sleepTime: e.target.value })}
            className="mt-1 w-full rounded-lg bg-gray-800 p-2 text-white border border-gray-700 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Wake Time */}
        <div className="rounded-xl border border-gray-700 p-4">
          <label className="text-sm text-gray-400">Wake Time</label>
          <input
            type="time"
            value={log.wakeTime}
            onChange={(e) => setLog({ ...log, wakeTime: e.target.value })}
            className="mt-1 w-full rounded-lg bg-gray-800 p-2 text-white border border-gray-700 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Weight */}
        <div className="rounded-xl border border-gray-700 p-4">
          <label className="text-sm text-gray-400">Weight (kg)</label>
          <input
            type="number"
            step="0.1"
            value={log.weight || ""}
            onChange={(e) =>
              setLog({ ...log, weight: parseFloat(e.target.value) || 0 })
            }
            placeholder="84.0"
            className="mt-1 w-full rounded-lg bg-gray-800 p-2 text-white border border-gray-700 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Screen Time */}
        <div className="rounded-xl border border-gray-700 p-4">
          <label className="text-sm text-gray-400">Screen Time (hours)</label>
          <input
            type="number"
            step="0.5"
            value={log.screenTimeHours || ""}
            onChange={(e) =>
              setLog({
                ...log,
                screenTimeHours: parseFloat(e.target.value) || 0,
              })
            }
            placeholder="4"
            className="mt-1 w-full rounded-lg bg-gray-800 p-2 text-white border border-gray-700 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Water */}
        <div className="rounded-xl border border-gray-700 p-4">
          <label className="text-sm text-gray-400">Water (liters)</label>
          <input
            type="number"
            step="0.5"
            value={log.waterLiters || ""}
            onChange={(e) =>
              setLog({
                ...log,
                waterLiters: parseFloat(e.target.value) || 0,
              })
            }
            placeholder="3"
            className="mt-1 w-full rounded-lg bg-gray-800 p-2 text-white border border-gray-700 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Mood */}
        <div className="rounded-xl border border-gray-700 p-4">
          <label className="text-sm text-gray-400">
            Mood (1-10): {log.mood}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={log.mood}
            onChange={(e) =>
              setLog({ ...log, mood: parseInt(e.target.value) })
            }
            className="mt-2 w-full accent-emerald-500"
          />
          <div className="flex justify-between text-xs text-gray-600">
            <span>Terrible</span>
            <span>Great</span>
          </div>
        </div>

        {/* Urge Level */}
        <div className="rounded-xl border border-gray-700 p-4">
          <label className="text-sm text-gray-400">
            Gambling Urge (0-10): {log.urgeLevel}
          </label>
          <input
            type="range"
            min="0"
            max="10"
            value={log.urgeLevel}
            onChange={(e) =>
              setLog({ ...log, urgeLevel: parseInt(e.target.value) })
            }
            className="mt-2 w-full accent-red-500"
          />
          <div className="flex justify-between text-xs text-gray-600">
            <span>None</span>
            <span>Intense</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="mt-4 rounded-xl border border-gray-700 p-4">
        <label className="text-sm text-gray-400">Notes</label>
        <textarea
          value={log.notes}
          onChange={(e) => setLog({ ...log, notes: e.target.value })}
          placeholder="How was your day? Any wins or struggles?"
          rows={3}
          className="mt-1 w-full rounded-lg bg-gray-800 p-2 text-white border border-gray-700 focus:border-blue-500 outline-none resize-none"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className={`mt-6 w-full rounded-xl py-3 font-bold text-white transition-all ${
          saved
            ? "bg-emerald-600"
            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
        }`}
      >
        {saved ? "Saved!" : existingLog ? "Update Today's Log" : "Save Today's Log"}
      </button>
    </div>
  );
}
