import {
  digits,
  sequenceOf,
  char,
  str,
  optionalWhitespace,
  between,
  possibly,
  choice,
} from "arcsecond";
import { TF2CurrencyInit } from "..";

const betweenOptionalWhitespace =
  between(optionalWhitespace)(optionalWhitespace);

const number = sequenceOf([
  digits,
  possibly(sequenceOf([char("."), digits])).map(
    (maybeDecimal) => maybeDecimal ?? [".", "0"],
  ),
]).map(([a, [b, c]]) => parseFloat(`${a}${b}${c}`));

const refCost = betweenOptionalWhitespace(
  sequenceOf([number, optionalWhitespace, str("ref")]).map(([ref]) => ref),
).map((refined) => ({ refined } as Partial<TF2CurrencyInit>));

const keysCost = betweenOptionalWhitespace(
  sequenceOf([number, optionalWhitespace, str("key"), possibly(char("s"))]).map(
    ([keys]) => keys,
  ),
).map((keys) => ({ keys } as Partial<TF2CurrencyInit>));

const keysAndRefCost = sequenceOf([keysCost, possibly(char(",")), refCost]).map(
  ([keys, , ref]) =>
    ({
      ...keys,
      ...ref,
    } as Partial<TF2CurrencyInit>),
);

export const costParser = choice([keysAndRefCost, keysCost, refCost]);
