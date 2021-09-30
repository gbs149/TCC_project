import { pipe } from "fp-ts/function";
import { Ord } from "fp-ts/number";
import { gt } from "fp-ts/Ord";
import { not } from "fp-ts/Predicate";
import { isEmpty, size, trim } from "fp-ts/string";

type numberComparisonFunction = (first: number, second: number) => boolean;
const curriedOrd =
  (fn: numberComparisonFunction) => (first: number) => (second: number) =>
    fn(first, second);

const curriedGt = curriedOrd(gt(Ord));

export const isShorterThan =
  (n: number) =>
  (s: string): boolean =>
    s !== undefined && pipe(trim(s), size, curriedGt(n));

const isShorterThan100 = isShorterThan(100);

export const isNotEmpty = not(isEmpty);

export const isValidString = (s: string): boolean =>
  isShorterThan100(s) && isNotEmpty(s);
