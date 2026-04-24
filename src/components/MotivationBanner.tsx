"use client";

import { useEffect, useState } from "react";
import { getGamblingFreeDays, getRemainingDebt, getProfile } from "@/lib/storage";

const quotes = [
  "You're not starting over. You're starting FROM EXPERIENCE.",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "Every dollar you don't gamble is a dollar that builds your future.",
  "Discipline is choosing between what you want NOW and what you want MOST.",
  "Your girlfriend didn't give up on you. Don't give up on yourself.",
  "6 months from now, you'll wish you started today.",
  "$72,000 a year. That's what quitting gambling is worth. Think about that.",
  "You make $7,500/month. You're one habit away from being unstoppable.",
  "The urge lasts 15 minutes. The regret lasts all night.",
  "You're an SDE at Amazon at 25. You're already ahead. Now stop sabotaging it.",
  "84kg → 68kg. 16kg of fat standing between you and the best version of yourself.",
  "Your GF stayed when she could've left. Honor that with action, not words.",
  "The house always wins. Always. The only winning move is not to play.",
  "Every morning you wake before 7am, you're beating yesterday's version of you.",
  "Debt-free by October. Say it until you believe it. Then prove it.",
];

export default function MotivationBanner() {
  const [quote, setQuote] = useState("");
  const [streak, setStreak] = useState(0);
  const [moneySaved, setMoneySaved] = useState(0);

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    const days = getGamblingFreeDays();
    setStreak(days);
    setMoneySaved(Math.round(days * 200));
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-gray-900 via-purple-900/30 to-gray-900 border border-purple-500/20 p-6">
      <div className="relative z-10">
        <p className="text-lg font-medium text-gray-200 italic leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
        {streak > 0 && (
          <div className="mt-3 flex gap-4">
            <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-sm text-emerald-400">
              &#128293; {streak} day streak
            </span>
            <span className="rounded-full bg-cyan-500/20 border border-cyan-500/30 px-3 py-1 text-sm text-cyan-400">
              &#128176; ${moneySaved.toLocaleString()} saved from gambling
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
