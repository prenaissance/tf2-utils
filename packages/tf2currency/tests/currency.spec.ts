import { describe, expect, it, beforeEach } from "vitest";
import tf2currency, { config, getCurrencyFactory } from "@/.";

describe("Currency", () => {
  beforeEach(() => {
    config.keyRefinedPrice = 90;
    config.keyUsdPrice = 1.8;
  });

  it("should use the default config with global currency", () => {
    const price = tf2currency({ keys: 1, refined: 6 });
    expect(price.toString()).toBe("1.06 keys");
  });

  it("should use edited global config", () => {
    config.keyRefinedPrice = 50;
    const price = tf2currency({ keys: 1, refined: 5 });
    expect(price.toString()).toBe("1.1 keys");
  });

  it("should use instantiated currency maker", () => {
    const myCurrency = getCurrencyFactory({
      keyRefinedPrice: 50,
      keyUsdPrice: 1.9,
    });
    const price = myCurrency({ refined: 51, scrap: 2 });
    expect(price.toString()).toBe("1.02 keys");
    expect(price.scrap).toBe(2);
    expect(price.refined).toBe(1);
    expect(price.keys).toBe(1);
  });

  it("should normalize the currency to the lowest denominators", () => {
    config.keyRefinedPrice = 50;
    const { keys, refined, reclaimed, scrap } = tf2currency({
      refined: 49,
      reclaimed: 2,
      scrap: 4,
    });
    expect({
      keys,
      refined,
      reclaimed,
      scrap,
    }).toEqual({
      keys: 1,
      refined: 0,
      reclaimed: 0,
      scrap: 1,
    });
  });

  it("should convert to USD", () => {
    config.keyRefinedPrice = 50;
    config.keyUsdPrice = 2;

    const price = tf2currency({ keys: 1, refined: 6 });
    expect(price.toUSD()).toBeCloseTo(2.24);
  });

  it("should format the currency to keys", () => {
    config.keyRefinedPrice = 50;
    const price = tf2currency({ keys: 1, refined: 5 });
    expect(price.toString()).toBe("1.1 keys");

    const price2 = tf2currency({ keys: 1, refined: 5, reclaimed: 2 });
    expect(price2.toString()).toBe("1.11 keys");
  });

  it("should format the currency to refined", () => {
    const price = tf2currency({ refined: 1, reclaimed: 1 });
    expect(price.toString()).toBe("1.33 ref");

    const weaponAndScrap = tf2currency({ weapons: 1, scrap: 1 });
    expect(weaponAndScrap.toString()).toBe("0.16 ref");

    const almostRef = tf2currency({
      refined: 0,
      scrap: 2,
      reclaimed: 2,
    });
    expect(almostRef.toString()).toBe("0.88 ref");
  });

  it("should make currency from ref", () => {
    const twoReclaimed = tf2currency.fromRefined(0.66);
    expect(twoReclaimed.reclaimed).toBe(2);

    const oneRef = tf2currency.fromRefined(1);
    expect(oneRef.refined).toBe(1);

    const scrapAndWeapon = tf2currency.fromRefined(0.16);
    expect(scrapAndWeapon.toString()).toBe("0.16 ref");
  });

  it("should make currency from keys", () => {
    config.keyRefinedPrice = 90;
    const oneKey = tf2currency.fromKeys(1);
    expect(oneKey.keys).toBe(1);

    const price = tf2currency.fromKeys(1.11);
    expect(price.toString()).toBe("1.11 keys");
  });
});
