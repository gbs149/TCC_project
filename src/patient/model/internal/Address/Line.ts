import { every } from "fp-ts/Array";
import { Either, left, right } from "fp-ts/Either";
import { NonEmptyArray } from "fp-ts/NonEmptyArray";
import { isValidString } from "../validation/boundedString";

interface LineBrand {
  readonly Line: unique symbol;
}

export type Line = string & LineBrand;

const isValidLine = (s: string): s is Line => isValidString(s);

const isValidLines = (ss: string[]) =>
  ss !== undefined && every(isValidLine)(ss);

export const makeLines = (
  ss: string[]
): Either<NonEmptyArray<string>, Line[]> =>
  isValidLines(ss) ? right(ss as Line[]) : left(["Invalid lines"]);
