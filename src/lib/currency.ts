import type { Cents } from "@/types/data-type";

const euroFormatter = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(cents: Cents): string {
  return euroFormatter.format(cents / 100);
}