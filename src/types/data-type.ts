export type Cents = number;

export type BudgetCategory = {
  id: string;
  name: string;
  plannedCents: Cents;
  transferredInCents: Cents;
  transferredOutCents: Cents;
  spentCents: Cents;
};

export type SavingsSummary = {
  targetCents: Cents;
  savedCents: Cents;
};

export type DashboardData = {
  rolloverCents: Cents;
  incomeReceivedCents: Cents;
  currency: "EUR";
  financialMonth: string;
  savingsSummary: SavingsSummary;
  categories: BudgetCategory[];
};

export type BudgetStatus =
| "on-track"
| "warning"
| "over-budget";

export type DashboardTotals = {
  totalPlannedCents: Cents;
  totalSpentCents: Cents;
  totalRemainingCents: Cents;
  totalFundsAvailableCents: Cents;
  availableFundsCents: Cents;
};