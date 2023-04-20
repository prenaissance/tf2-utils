import { TF2CurrencyInit } from "@/common/types";
import { CurrencyConfig, TF2Currency } from "./tf2currency";

/**
 * The configuration for the global currency object.
 * The default values will not be actively updated, so it is recommended to set your own values.
 *
 * @example
 * import { config } from 'tf2currency';
 * config.keyUsdPrice = 1.9;
 */
export const config: CurrencyConfig = {
  keyRefinedPrice: 90,
  keyUsdPrice: 1.8,
};

export const getCurrencyFactory = (config: CurrencyConfig) => {
  const constructor = (currency: Partial<TF2CurrencyInit>) =>
    new TF2Currency(currency, config);
  constructor.fromRefined = (refined: number) =>
    new TF2Currency({ refined }, config);
  constructor.fromKeys = (keys: number) => new TF2Currency({ keys }, config);

  return constructor;
};

export default getCurrencyFactory(config);
