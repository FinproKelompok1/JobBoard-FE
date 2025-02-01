export function CurrencyFormatter(amount: number) {
  return new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
