export function numberWithCommas(num: number | string) {
  const numberString = num.toString();
  const parts = numberString.split(".");
  const integerPart = parts[0];
  if (parts.length > 1) {
    return `${integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${parts[1]}`;
  }
  return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
