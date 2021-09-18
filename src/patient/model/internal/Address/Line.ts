import { every } from "fp-ts/lib/Array";
import { isValidString } from "../validation/boundedString";
import { Either, left, right } from "fp-ts/lib/Either";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";

interface LineBrand {
  readonly Line: unique symbol;
}

export type Line = string & LineBrand;

const isValidLine = (s: string): s is Line => isValidString(s);

export const makeLines = (
  ss: string[]
): Either<NonEmptyArray<string>, Line[]> =>
  every(isValidLine)(ss) ? right(ss as Line[]) : left(["Invalid lines"]);
