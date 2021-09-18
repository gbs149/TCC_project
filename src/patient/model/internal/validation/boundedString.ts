import { pipe } from "fp-ts/lib/function";
import { Ord } from "fp-ts/lib/number";
import { gt, lt } from "fp-ts/lib/Ord";
import { not } from "fp-ts/lib/Predicate";
import { isEmpty, size, trim } from "fp-ts/lib/string";

type numberComparisonFunction = (first: number, second: number) => boolean;
const curriedOrd =
  (fn: numberComparisonFunction) => (first: number) => (second: number) =>
    fn(first, second);

const curriedGt = curriedOrd(gt(Ord));
const curriedLt = curriedOrd(lt(Ord));

export const isLongerThan =
  (n: number) =>
  (s: string): boolean =>
    pipe(trim(s), size, curriedLt(n));

export const isShorterThan =
  (n: number) =>
  (s: string): boolean =>
    pipe(trim(s), size, curriedGt(n));

export const isNotEmpty = not(isEmpty);

const isShorterThan100 = isShorterThan(100);

export const isValidString = (s: string): boolean =>
  isShorterThan100(s) && isNotEmpty(s);
