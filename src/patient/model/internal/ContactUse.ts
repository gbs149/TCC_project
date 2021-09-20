import { Either, left, right } from "fp-ts/Either";
import { NonEmptyArray } from "fp-ts/NonEmptyArray";
import { contactUses, ContactUseType } from "../../fhir/internal/valueSets";

const isContactUse = (s: string): s is ContactUseType =>
  contactUses.includes(s as ContactUseType);

export const makeContactUse = (
  s: string
): Either<NonEmptyArray<string>, ContactUseType> =>
  isContactUse(s) ? right(s) : left(["Invalid contact use"]);
