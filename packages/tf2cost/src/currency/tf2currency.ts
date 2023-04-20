import { TF2CurrencyInit } from "@/common/types";
import { floorToDecimals } from "./utilities";

export type CurrencyConfig = {
  keyRefinedPrice: number;
  keyUsdPrice: number;
};

export class TF2Currency {
  private readonly _config: CurrencyConfig;
  readonly keys: number;
  readonly refined: number;
  readonly reclaimed: number;
  readonly scrap: number;
  readonly weapons: number;

  constructor(currency: Partial<TF2CurrencyInit>, config: CurrencyConfig) {
    this._config = config;
    const {
      keys = 0,
      refined = 0,
      reclaimed = 0,
      scrap = 0,
      weapons = 0,
    } = currency;
    // normalize the currency
    let totalWeapons =
      0.49 + // for rounding, might need a better solution
      weapons +
      scrap * 2 +
      reclaimed * 6 +
      refined * 18 +
      keys * config.keyRefinedPrice * 18;

    this.weapons = Math.round(totalWeapons % 2);
    totalWeapons -= this.weapons;
    this.scrap = Math.round((totalWeapons / 2) % 3);
    totalWeapons -= this.scrap * 2;
    this.reclaimed = Math.round((totalWeapons / 6) % 3);
    totalWeapons -= this.reclaimed * 6;
    this.refined = Math.round((totalWeapons / 18) % config.keyRefinedPrice);
    totalWeapons -= this.refined * 18;
    this.keys = Math.round(totalWeapons / (config.keyRefinedPrice * 18));
  }

  private getTotalWeapons(): number {
    const { keys, refined, reclaimed, scrap, weapons, _config } = this;
    return (
      weapons +
      scrap * 2 +
      reclaimed * 6 +
      refined * 18 +
      keys * _config.keyRefinedPrice * 18
    );
  }

  toUSD(): number {
    return floorToDecimals(this.toKeys() * this._config.keyUsdPrice, 2);
  }

  toRefined(): number {
    return this.getTotalWeapons() / 18;
  }

  toKeys(): number {
    return this.getTotalWeapons() / (this._config.keyRefinedPrice * 18);
  }

  /**
   * Shows the formatted tf2 currency, formatted up to 2 decimals, showing it in keys
   * if the value is greater than 1 key, otherwise it will show it in refined.
   * @example
   * config.keyRefinedPrice = 50;
   * const myCurrency = tf2cost({ keys: 1, refined: 5 });
   * myCurrency.toString(); // '1.1 keys'
   * const myCurrency2 = tf2cost({ refined: 1, scrap: 1 });
   * myCurrency2.toString(); // '1.33 ref'
   */
  toString(): string {
    const totalKeys = this.toKeys();
    if (totalKeys >= 1) {
      return `${floorToDecimals(totalKeys, 2)} key${
        floorToDecimals(totalKeys, 2) === 1 ? "" : "s"
      }`;
    }
    return `${floorToDecimals(this.toRefined(), 2)} ref`;
  }
}
