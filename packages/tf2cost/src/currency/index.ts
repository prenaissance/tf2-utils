import { TF2CurrencyInit } from "@/common/types";
import { CurrencyConfig, TF2Currency } from "./tf2currency";
import { costParser } from "@/parsing";
import { TF2CostParsingError } from "./errors";

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
  /**
   * Parses a string price into a currency object.
   * @throws {TF2CostParsingError}
   * If the string cannot be parsed.
   * @example
   * const currency = tf2cost.parse("1 key, 2.33 ref");
   * console.log(currency.toString()); // 1.02 keys
   */
  constructor.parse = (str: string) =>
    costParser.fork(
      str,
      (error) => {
        throw new TF2CostParsingError(error);
      },
      (currency) => new TF2Currency(currency, config),
    );
  constructor.fromRefined = (refined: number) =>
    new TF2Currency({ refined }, config);
  constructor.fromKeys = (keys: number) => new TF2Currency({ keys }, config);

  return constructor;
};

export default getCurrencyFactory(config);
