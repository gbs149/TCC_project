import { Either, left, right } from "fp-ts/Either";
import { NonEmptyArray } from "fp-ts/NonEmptyArray";
import { contactUses, ContactUseType } from "../../fhir/internal/valueSets";

export const makeContactUse = (
  s: string
): Either<NonEmptyArray<string>, ContactUseType> =>
  contactUses.includes(s as ContactUseType)
    ? right(s as ContactUseType)
    : left(["Invalid contact use"]);
