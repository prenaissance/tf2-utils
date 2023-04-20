export const floorToDecimals = (num: number, decimals: number): number => {
  const multiplier = 10 ** decimals;
  return Math.floor(num * multiplier) / multiplier;
};
