import { DailyLog, UserProfile, DebtPayment } from "./types";

const PROFILE_KEY = "lifereset_profile";
const LOGS_KEY = "lifereset_logs";
const DEBTS_KEY = "lifereset_debts";

const defaultProfile: UserProfile = {
  startDate: "2026-04-24",
  currentWeight: 84,
  targetWeight: 68,
  totalDebt: 26000,
  ccDebt: 4000,
  splitwiseDebt: 2000,
  studentLoanDebt: 20000,
  monthlyIncome: 7500,
  gamblingFreeDays: 0,
};

export function getProfile(): UserProfile {
  if (typeof window === "undefined") return defaultProfile;
  const stored = localStorage.getItem(PROFILE_KEY);
  return stored ? JSON.parse(stored) : defaultProfile;
}

export function saveProfile(profile: UserProfile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function getLogs(): DailyLog[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(LOGS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveLog(log: DailyLog) {
  const logs = getLogs();
  const existingIndex = logs.findIndex((l) => l.date === log.date);
  if (existingIndex >= 0) {
    logs[existingIndex] = log;
  } else {
    logs.push(log);
  }
  logs.sort((a, b) => b.date.localeCompare(a.date));
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
}

export function getDebtPayments(): DebtPayment[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(DEBTS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveDebtPayment(payment: DebtPayment) {
  const payments = getDebtPayments();
  payments.push(payment);
  payments.sort((a, b) => b.date.localeCompare(a.date));
  localStorage.setItem(DEBTS_KEY, JSON.stringify(payments));
}

export function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

export function getDaysSince(startDate: string): number {
  const start = new Date(startDate);
  const now = new Date();
  const diffTime = now.getTime() - start.getTime();
  return Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)));
}

export function getGamblingFreeDays(): number {
  const logs = getLogs();
  let streak = 0;
  const today = new Date();

  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const log = logs.find((l) => l.date === dateStr);

    if (log && log.gamblingFree) {
      streak++;
    } else if (log && !log.gamblingFree) {
      break;
    } else if (i === 0) {
      continue;
    } else {
      break;
    }
  }
  return streak;
}

export function getRemainingDebt(): {
  cc: number;
  splitwise: number;
  student: number;
  total: number;
} {
  const profile = getProfile();
  const payments = getDebtPayments();

  let ccPaid = 0;
  let splitwisePaid = 0;
  let studentPaid = 0;

  payments.forEach((p) => {
    if (p.category === "cc") ccPaid += p.amount;
    if (p.category === "splitwise") splitwisePaid += p.amount;
    if (p.category === "student") studentPaid += p.amount;
  });

  const cc = Math.max(0, profile.ccDebt - ccPaid);
  const splitwise = Math.max(0, profile.splitwiseDebt - splitwisePaid);
  const student = Math.max(0, profile.studentLoanDebt - studentPaid);

  return { cc, splitwise, student, total: cc + splitwise + student };
}
