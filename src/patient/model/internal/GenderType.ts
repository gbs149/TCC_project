import { Either, left, right } from "fp-ts/Either";
import { NonEmptyArray } from "fp-ts/NonEmptyArray";
import { GenderType, genderTypes } from "../../fhir/internal/valueSets";

export const makeGenderType = (
  s: string
): Either<NonEmptyArray<string>, GenderType> =>
  genderTypes.includes(s as GenderType)
    ? right(s as GenderType)
    : left(["Invalid gender type"]);
