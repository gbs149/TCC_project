import { Either, left, right } from "fp-ts/lib/Either";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";

const contactUses = ["home", "work", "temp", "old", "mobile"];

export const makeContactUse = (
  s: string
): Either<NonEmptyArray<string>, string> =>
  contactUses.includes(s) ? right(s) : left(["Invalid contact use"]);
