import { Either, left, right } from "fp-ts/Either";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";

const genderTypes = ["male", "female", "other", "unknown"];

export type GenderType = string;

export const makeGenderType = (
  val: string
): Either<NonEmptyArray<string>, GenderType> =>
  genderTypes.includes(val) ? right(val) : left(["Invalid gender type"]);
