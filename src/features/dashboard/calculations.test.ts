import { describe, expect, it } from "vitest";

import type {
  BudgetCategory,
  SavingsSummary,
} from "@/types/data-type";
import { dashboardMock } from "@/data/dashboard-mock";

import {
  getAdjustedBudgetCents,
  getBudgetStatus,
  getDashboardTotals,
  getRemainingBudgetCents,
  getSavingsPercentage,
  getSpentPercentage,
} from "./calculations";

describe("getAdjustedBudgetCents", () => {
  it("applies incoming and outgoing transfers", () => {
    // Arrange
    const category: BudgetCategory = {
      id: "groceries",
      name: "Groceries",
      plannedCents: 30_000,
      transferredInCents: 5_000,
      transferredOutCents: 2_000,
      spentCents: 10_000,
    };

    // Act
    const result = getAdjustedBudgetCents(category);

    // Assert
    expect(result).toBe(33_000);
  });
});

describe("getRemainingBudgetCents", () => {
  it("subtracts spending from the adjusted budget", () => {
    const category: BudgetCategory = {
      id: "groceries",
      name: "Groceries",
      plannedCents: 30_000,
      transferredInCents: 5_000,
      transferredOutCents: 2_000,
      spentCents: 10_000,
    };

    const result = getRemainingBudgetCents(category);

    expect(result).toBe(23_000);
  });
});

describe("getSpentPercentage", () => {
  it("calculates the percentage of the adjusted budget spent", () => {
    const category: BudgetCategory = {
      id: "groceries",
      name: "Groceries",
      plannedCents: 30_000,
      transferredInCents: 0,
      transferredOutCents: 0,
      spentCents: 18_000,
    };
    const result = getSpentPercentage(category);

    expect(result).toBe(60);
  });

  it("returns 0 when both budget and spending are zero", () => {
    const category: BudgetCategory = {
      id: "groceries",
      name: "Groceries",
      plannedCents: 0,
      transferredInCents: 0,
      transferredOutCents: 0,
      spentCents: 0,
    };
    const result = getSpentPercentage(category);

    expect(result).toBe(0);
  });

  it("returns 100 when spending exists without a budget", () => {
    const category: BudgetCategory = {
      id: "groceries",
      name: "Groceries",
      plannedCents: 0,
      transferredInCents: 0,
      transferredOutCents: 0,
      spentCents: 500,
    };
    const result = getSpentPercentage(category);

    expect(result).toBe(100);
  });
});

describe("getBudgetStatus", () => {
  it("returns on-track below 75 percent", () => {
    const category: BudgetCategory = {
      id: "groceries",
      name: "Groceries",
      plannedCents: 10_000,
      transferredInCents: 0,
      transferredOutCents: 0,
      spentCents: 7_400,
    };
    const result = getBudgetStatus(category);

    expect(result).toBe("on-track");
  });

  it("returns warning at 75 percent", () => {
    const category: BudgetCategory = {
      id: "groceries",
      name: "Groceries",
      plannedCents: 10_000,
      transferredInCents: 0,
      transferredOutCents: 0,
      spentCents: 7_500,
    };
    const result = getBudgetStatus(category);

    expect(result).toBe("warning");
  });

  it("returns warning at 100 percent", () => {
    const category: BudgetCategory = {
      id: "groceries",
      name: "Groceries",
      plannedCents: 10_000,
      transferredInCents: 0,
      transferredOutCents: 0,
      spentCents: 10_000,
    };
    const result = getBudgetStatus(category);

    expect(result).toBe("warning");
  });

  it("returns over-budget when spending exceeds the budget", () => {
    const category: BudgetCategory = {
      id: "groceries",
      name: "Groceries",
      plannedCents: 10_000,
      transferredInCents: 0,
      transferredOutCents: 0,
      spentCents: 10_001,
    };
    const result = getBudgetStatus(category);

    expect(result).toBe("over-budget");
  });
});

describe("getSavingsPercentage", () => {
  it("calculates progress toward the savings target", () => {
    const savings: SavingsSummary = {
      targetCents: 30_000,
      savedCents: 15_000,
    };

    const result = getSavingsPercentage(savings);
    expect(result).toBe(50);
  });

  it("returns 0 when the target and saved amount are zero", () => {
    const savings: SavingsSummary = {
      targetCents: 0,
      savedCents: 0,
    };

    const result = getSavingsPercentage(savings);
    expect(result).toBe(0);
  });

  it("returns 100 when savings exist without a target", () => {
    const savings: SavingsSummary = {
      targetCents: 0,
      savedCents: 1_000,
    };

    const result = getSavingsPercentage(savings);
    expect(result).toBe(100);
  });
});

describe("getDashboardTotals", () => {
  it("calculates dashboard totals", () => {
    // Arrange
    const expectedResult = {
      totalPlannedCents: 166_000,
      totalSpentCents: 121_000,
      totalRemainingCents: 45_000,
      totalFundsAvailableCents: 264_000,
      availableFundsCents: 68_000,
    };
    const result = getDashboardTotals(dashboardMock);
      expect(result).toEqual(expectedResult);
  });
});
