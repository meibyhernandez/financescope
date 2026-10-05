const financialMonthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

const FINANCIAL_MONTH_PATTERN = /^(\d{4})-(0[1-9]|1[0-2])$/;

export function formatFinancialMonth(financialMonth: string): string {
  const match = FINANCIAL_MONTH_PATTERN.exec(financialMonth);

  if (!match) {
    throw new RangeError(`Invalid financial month: ${financialMonth}`);
  }

  const year = Number(match[1]);
  const month = Number(match[2]);

  const date = new Date(Date.UTC(year, month - 1, 1));

  return financialMonthFormatter.format(date);
}
