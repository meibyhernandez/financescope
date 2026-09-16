import type {
  BudgetCategory,
  BudgetStatus,
  Cents,
  DashboardData,
  DashboardTotals,
  SavingsSummary,
} from "@/types/data-type";

export function getAdjustedBudgetCents(
  category: BudgetCategory,
): Cents {
  return (
    category.plannedCents +
    category.transferredInCents -
    category.transferredOutCents
  );
}

export function getRemainingBudgetCents(
  category: BudgetCategory,
): Cents {
  return (
    getAdjustedBudgetCents(category) -
    category.spentCents
  );
}

export function getSpentPercentage(
  category: BudgetCategory,
): number {
  const adjustedBudgetCents =
    getAdjustedBudgetCents(category);

  // Prevent NaN or Infinity when a category has no budget.
  if (adjustedBudgetCents === 0) {
    return category.spentCents === 0 ? 0 : 100;
  }

  return (
    category.spentCents /
    adjustedBudgetCents
  ) * 100;
}

export function getBudgetStatus(
  category: BudgetCategory,
): BudgetStatus {
  const remainingBudgetCents =
    getRemainingBudgetCents(category);

  // A negative balance takes priority over percentage thresholds.
  if (remainingBudgetCents < 0) {
    return "over-budget";
  }

  const spentPercentage =
    getSpentPercentage(category);

  if (spentPercentage >= 75) {
    return "warning";
  }

  return "on-track";
}

export function getSavingsPercentage(
  savingsSummary: SavingsSummary,
): number {
  // Prevent division by zero when no savings target exists.
  if (savingsSummary.targetCents === 0) {
    return savingsSummary.savedCents === 0 ? 0 : 100;
  }

  return (
    savingsSummary.savedCents /
    savingsSummary.targetCents
  ) * 100;
}

export function getDashboardTotals(
  data: DashboardData,
): DashboardTotals {
  let totalPlannedCents = 0;
  let totalSpentCents = 0;
  let totalRemainingCents = 0;

  for (const category of data.categories) {
    totalPlannedCents +=
      getAdjustedBudgetCents(category);

    totalSpentCents += category.spentCents;

    totalRemainingCents +=
      getRemainingBudgetCents(category);
  }

  const totalFundsAvailableCents =
    data.incomeReceivedCents + data.rolloverCents;

  // Savings targets are reserved funds, not available spending money.
  const availableFundsCents =
    totalFundsAvailableCents -
    totalPlannedCents -
    data.savingsSummary.targetCents;

  return {
    totalPlannedCents,
    totalSpentCents,
    totalRemainingCents,
    totalFundsAvailableCents,
    availableFundsCents,
  };
}