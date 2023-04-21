import { describe, expect, it, beforeEach } from "vitest";
import tf2cost, { config } from "@/.";

describe("Parsing", () => {
  beforeEach(() => {
    config.keyRefinedPrice = 50;
    config.keyUsdPrice = 1.8;
  });

  it("should parse a ref only price", () => {
    const price = tf2cost.parse("3 ref");
    expect(price.toString()).toBe("3 ref");
  });
});
