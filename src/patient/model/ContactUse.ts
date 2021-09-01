import { Either, left, right } from "fp-ts/lib/Either";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import { contactUses, ContactUseType } from "../fhir/useTypes";

export const makeContactUse = (
  s: string
): Either<NonEmptyArray<string>, ContactUseType> =>
  contactUses.includes(s as ContactUseType)
    ? right(s as ContactUseType)
    : left(["Invalid contact use"]);
