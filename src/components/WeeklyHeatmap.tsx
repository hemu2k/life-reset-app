"use client";

import { getLogs } from "@/lib/storage";

export default function WeeklyHeatmap() {
  const logs = getLogs();
  const last7Days: { date: string; score: number; label: string }[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const dayLabel = date.toLocaleDateString("en-US", { weekday: "short" });
    const log = logs.find((l) => l.date === dateStr);

    if (log) {
      let score = 0;
      if (log.gamblingFree) score += 2;
      if (log.workoutDone) score += 1.5;
      if (log.proteinHit) score += 1;
      if (!log.nap) score += 1;
      if (log.screenTimeHours <= 4) score += 1;
      if (log.waterLiters >= 3) score += 0.5;
      if (log.weight > 0) score += 0.5;
      const sleepHour = parseInt(log.sleepTime.split(":")[0]);
      if (sleepHour >= 22 || sleepHour === 23) score += 1;
      const wakeHour = parseInt(log.wakeTime.split(":")[0]);
      if (wakeHour >= 5 && wakeHour <= 7) score += 0.5;
      last7Days.push({ date: dateStr, score: Math.min(10, score), label: dayLabel });
    } else {
      last7Days.push({ date: dateStr, score: -1, label: dayLabel });
    }
  }

  const getColor = (score: number) => {
    if (score === -1) return "bg-gray-800 border-gray-700";
    if (score >= 8) return "bg-emerald-500/30 border-emerald-500/50";
    if (score >= 6) return "bg-blue-500/30 border-blue-500/50";
    if (score >= 4) return "bg-yellow-500/30 border-yellow-500/50";
    if (score >= 2) return "bg-orange-500/30 border-orange-500/50";
    return "bg-red-500/30 border-red-500/50";
  };

  const getEmoji = (score: number) => {
    if (score === -1) return "—";
    if (score >= 8) return "&#128293;";
    if (score >= 6) return "&#128170;";
    if (score >= 4) return "&#128528;";
    if (score >= 2) return "&#128533;";
    return "&#128308;";
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
      <h2 className="mb-4 text-xl font-bold text-white flex items-center gap-2">
        <span className="text-2xl">&#128197;</span> This Week
      </h2>
      <div className="grid grid-cols-7 gap-2">
        {last7Days.map((day) => (
          <div key={day.date} className="text-center">
            <p className="text-xs text-gray-500 mb-1">{day.label}</p>
            <div
              className={`rounded-xl border p-3 ${getColor(day.score)} transition-all`}
            >
              <span
                className="text-xl"
                dangerouslySetInnerHTML={{ __html: getEmoji(day.score) }}
              />
              <p className="mt-1 text-xs font-bold text-gray-300">
                {day.score === -1 ? "—" : `${day.score}/10`}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-center gap-4 text-xs text-gray-500">
        <span>&#128308; Bad</span>
        <span>&#128528; OK</span>
        <span>&#128170; Good</span>
        <span>&#128293; Fire</span>
      </div>
    </div>
  );
}
