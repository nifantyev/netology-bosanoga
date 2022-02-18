export function getCurrencySymbol(locale: string, currency: string) {
  return (0)
    .toLocaleString(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace(/\d/g, '')
    .trim();
}

export function formatCurrency(
  amount: number,
  locale: string,
  currency: string,
  fractionDigits: number,
  removeSymbol: boolean
) {
  let result = amount
    .toLocaleString(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    })
    .trim();
  if (removeSymbol) {
    result = result.replace(getCurrencySymbol(locale, currency), '');
  }
  return result.trim();
}
