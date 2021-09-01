import { Either, left, right } from "fp-ts/Either";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import { GenderType, genderTypes } from "../fhir/useTypes";

export const makeGenderType = (
  s: string
): Either<NonEmptyArray<string>, GenderType> =>
  genderTypes.includes(s as GenderType)
    ? right(s as GenderType)
    : left(["Invalid gender type"]);
