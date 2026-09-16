import type { DashboardData } from "@/types/data-type";

export const dashboardMock = {
  financialMonth: "2026-08",
  currency: "EUR",
  incomeReceivedCents: 250_000,
  rolloverCents: 14_000,

  savingsSummary: {
    targetCents: 30_000,
    savedCents: 15_000,
  },

  categories: [
    {
      id: "groceries",
      name: "Groceries",
      plannedCents: 30_000,
      transferredInCents: 0,
      transferredOutCents: 0,
      spentCents: 18_000,
    },
    {
      id: "transportation",
      name: "Transportation",
      plannedCents: 6_000,
      transferredInCents: 0,
      transferredOutCents: 0,
      spentCents: 4_500,
    },
    {
      id: "personal-care",
      name: "Personal care",
      plannedCents: 10_000,
      transferredInCents: 0,
      transferredOutCents: 0,
      spentCents: 8_000,
    },
    {
      id: "rent-and-bills",
      name: "Rent and bills",
      plannedCents: 90_000,
      transferredInCents: 0,
      transferredOutCents: 0,
      spentCents: 90_000,
    },
    {
      id: "family-support",
      name: "Family support",
      plannedCents: 30_000,
      transferredInCents: 0,
      transferredOutCents: 0,
      spentCents: 500,
    },
  ],
} satisfies DashboardData;