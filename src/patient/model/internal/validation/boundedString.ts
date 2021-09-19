import { pipe } from "fp-ts/function";
import { Ord } from "fp-ts/number";
import { gt, lt } from "fp-ts/Ord";
import { not } from "fp-ts/Predicate";
import { isEmpty, size, trim } from "fp-ts/string";

type numberComparisonFunction = (first: number, second: number) => boolean;
const curriedOrd =
  (fn: numberComparisonFunction) => (first: number) => (second: number) =>
    fn(first, second);

const curriedGt = curriedOrd(gt(Ord));
const curriedLt = curriedOrd(lt(Ord));

export const isShorterThan =
  (n: number) =>
  (s: string): boolean =>
    pipe(trim(s), size, curriedGt(n));

export const isNotEmpty = not(isEmpty);

const isShorterThan100 = isShorterThan(100);

export const isValidString = (s: string): boolean =>
  isShorterThan100(s) && isNotEmpty(s);
