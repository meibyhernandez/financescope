import { describe, expect, it } from "vitest";

import { formatFinancialMonth } from "./financial-month";

describe("formatFinancialMonth", () => {
  it("Valid August ", () => {
    const result = formatFinancialMonth("2026-08");

    expect(result).toBe("August 2026");
  });
  it("formats January 2026", () => {
    const result = formatFinancialMonth("2026-01");

    expect(result).toBe("January 2026");
  });
  it("formats December 2026", () => {
    const result = formatFinancialMonth("2026-12");

    expect(result).toBe("December 2026");
  });
  it("throws a RangeError when the month is outside the valid range", () => {
    expect(() => formatFinancialMonth("2026-13")).toThrow(RangeError);
  });
  it("throws a RangeError when the value does not follow YYYY-MM", () => {
    expect(() => formatFinancialMonth("August 2026")).toThrow(RangeError);
  });
});
