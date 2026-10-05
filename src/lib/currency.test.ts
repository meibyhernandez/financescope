import { describe, expect, it } from "vitest";
import { formatCurrency } from "./currency";
describe("formatCurrency", () => {
  it("formats a large amount in euros", () => {
    const result = formatCurrency(250_000);

    expect(result).toBe("€2,500.00");
  });

  it("formats an amount containing cents", () => {
    const result = formatCurrency(2_550);

    expect(result).toBe("€25.50");
  });

  it("formats zero", () => {
    const result = formatCurrency(0);

    expect(result).toBe("€0.00");
  });

  it("formats a negative amount", () => {
    const result = formatCurrency(-500);

    expect(result).toBe("-€5.00");
  });
});
