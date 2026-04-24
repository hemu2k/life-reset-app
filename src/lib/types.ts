export interface DailyLog {
  date: string;
  gamblingFree: boolean;
  sleepTime: string;
  wakeTime: string;
  nap: boolean;
  workoutDone: boolean;
  workoutType: string;
  proteinHit: boolean;
  waterLiters: number;
  screenTimeHours: number;
  weight: number;
  debtPayment: number;
  mood: number;
  urgeLevel: number;
  notes: string;
}

export interface UserProfile {
  startDate: string;
  currentWeight: number;
  targetWeight: number;
  totalDebt: number;
  ccDebt: number;
  splitwiseDebt: number;
  studentLoanDebt: number;
  monthlyIncome: number;
  gamblingFreeDays: number;
}

export interface DebtPayment {
  date: string;
  amount: number;
  category: "cc" | "splitwise" | "student";
  note: string;
}
