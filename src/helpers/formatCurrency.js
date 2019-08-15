export const formatCurrency = x => {
  x = x.toLocaleString('en-US', {style : 'currency', currency : 'USD', minimumFractionDigits: 2});
  return x;
}