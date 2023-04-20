export const roundToDecimals = (num: number, decimals: number): number => {
  const multiplier = 10 ** decimals;
  return Math.round(num * multiplier) / multiplier;
};
