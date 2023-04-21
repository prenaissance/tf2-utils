import { describe, expect, it, beforeEach } from "vitest";
import tf2cost, { config } from "@/.";
import { TF2CostParsingError } from "@/currency/errors";

describe("Parsing", () => {
  beforeEach(() => {
    config.keyRefinedPrice = 50;
    config.keyUsdPrice = 1.8;
  });

  it("should parse a ref only price", () => {
    const price = tf2cost.parse("3 ref");
    expect(price.toString()).toBe("3 ref");
  });

  it("should parse float ref values", () => {
    const price = tf2cost.parse("1.55 ref");
    expect(price.toString()).toBe("1.55 ref");
  });

  it("should parse a key only price", () => {
    const price = tf2cost.parse("1 key");
    expect(price.toString()).toBe("1 key");
  });

  it("should parse plural keys price", () => {
    const price = tf2cost.parse("2.13 keys");
    expect(price.toString()).toBe("2.13 keys");
  });

  it("should parse key & ref price separated by comma", () => {
    const price = tf2cost.parse("1 key, 3 ref");
    expect(price.toString()).toBe("1.06 keys");
  });

  it("should parse key & ref price separated by whitespace", () => {
    const price = tf2cost.parse("1 key 3 ref");
    expect(price.toString()).toBe("1.06 keys");
  });

  it("should parser price with many spaces between values", () => {
    const price = tf2cost.parse(" 1  key ,   3  ref   ");
    expect(price.toString()).toBe("1.06 keys");
  });

  it("should throw a 'TF2CostParsingError' when parsing invalid input", () => {
    expect(() => tf2cost.parse("2 dabloons, 1 hat")).toThrowError(
      TF2CostParsingError,
    );
  });
});
