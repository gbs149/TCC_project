import { Either, left, right } from "fp-ts/Either";
import { NonEmptyArray } from "fp-ts/NonEmptyArray";
import { GenderType, genderTypes } from "../../fhir/internal/valueSets/gender";

const isGender = (s: string): s is GenderType =>
  genderTypes.includes(s as GenderType);

export const makeGenderType = (
  s: string
): Either<NonEmptyArray<string>, GenderType> =>
  isGender(s) ? right(s) : left(["Invalid gender type"]);
