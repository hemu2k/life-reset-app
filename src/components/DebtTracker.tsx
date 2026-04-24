"use client";

import { useState } from "react";
import {
  getRemainingDebt,
  saveDebtPayment,
  getDebtPayments,
  getTodayString,
  getProfile,
} from "@/lib/storage";

interface DebtTrackerProps {
  onUpdate: () => void;
}

export default function DebtTracker({ onUpdate }: DebtTrackerProps) {
  const profile = getProfile();
  const debt = getRemainingDebt();
  const payments = getDebtPayments();
  const totalPaid = profile.totalDebt - debt.total;
  const progress = (totalPaid / profile.totalDebt) * 100;

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<"cc" | "splitwise" | "student">(
    "cc"
  );
  const [saved, setSaved] = useState(false);

  const handlePayment = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    saveDebtPayment({
      date: getTodayString(),
      amount: parseFloat(amount),
      category,
      note: "",
    });
    setAmount("");
    setSaved(true);
    onUpdate();
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-gray-800 bg-gray-900/50 p-6 backdrop-blur-sm">
      <h2 className="mb-6 text-xl font-bold text-white flex items-center gap-2">
        <span className="text-2xl">&#128176;</span> Debt Destroyer
      </h2>

      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">
            ${totalPaid.toLocaleString()} paid
          </span>
          <span className="text-gray-400">
            ${debt.total.toLocaleString()} remaining
          </span>
        </div>
        <div className="h-4 w-full rounded-full bg-gray-800">
          <div
            className="h-4 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-1 text-center text-sm font-bold text-emerald-400">
          {Math.round(progress)}% of ${profile.totalDebt.toLocaleString()} destroyed
        </p>
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div
          className={`rounded-xl p-3 text-center border ${
            debt.cc === 0
              ? "border-emerald-500/30 bg-emerald-500/10"
              : "border-red-500/30 bg-red-500/10"
          }`}
        >
          <p className="text-xs text-gray-400">Credit Cards</p>
          <p
            className={`text-lg font-bold ${
              debt.cc === 0 ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {debt.cc === 0 ? "PAID" : `$${debt.cc.toLocaleString()}`}
          </p>
        </div>
        <div
          className={`rounded-xl p-3 text-center border ${
            debt.splitwise === 0
              ? "border-emerald-500/30 bg-emerald-500/10"
              : "border-orange-500/30 bg-orange-500/10"
          }`}
        >
          <p className="text-xs text-gray-400">Splitwise</p>
          <p
            className={`text-lg font-bold ${
              debt.splitwise === 0 ? "text-emerald-400" : "text-orange-400"
            }`}
          >
            {debt.splitwise === 0
              ? "PAID"
              : `$${debt.splitwise.toLocaleString()}`}
          </p>
        </div>
        <div
          className={`rounded-xl p-3 text-center border ${
            debt.student === 0
              ? "border-emerald-500/30 bg-emerald-500/10"
              : "border-blue-500/30 bg-blue-500/10"
          }`}
        >
          <p className="text-xs text-gray-400">Student Loans</p>
          <p
            className={`text-lg font-bold ${
              debt.student === 0 ? "text-emerald-400" : "text-blue-400"
            }`}
          >
            {debt.student === 0
              ? "PAID"
              : `$${debt.student.toLocaleString()}`}
          </p>
        </div>
      </div>

      {/* Add Payment */}
      <div className="flex gap-2">
        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as "cc" | "splitwise" | "student")
          }
          className="rounded-lg bg-gray-800 px-3 py-2 text-white border border-gray-700 outline-none"
        >
          <option value="cc">Credit Card</option>
          <option value="splitwise">Splitwise</option>
          <option value="student">Student Loan</option>
        </select>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="flex-1 rounded-lg bg-gray-800 px-3 py-2 text-white border border-gray-700 outline-none focus:border-emerald-500"
        />
        <button
          onClick={handlePayment}
          className={`rounded-lg px-4 py-2 font-bold text-white transition-all ${
            saved
              ? "bg-emerald-600"
              : "bg-emerald-600 hover:bg-emerald-500"
          }`}
        >
          {saved ? "Added!" : "Pay"}
        </button>
      </div>

      {/* Recent Payments */}
      {payments.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-400 mb-2">Recent Payments</p>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {payments.slice(0, 5).map((p, i) => (
              <div
                key={i}
                className="flex justify-between rounded-lg bg-gray-800/50 px-3 py-2 text-sm"
              >
                <span className="text-gray-400">{p.date}</span>
                <span className="text-gray-300 capitalize">{p.category}</span>
                <span className="font-bold text-emerald-400">
                  -${p.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
