import { Either, left, right } from "fp-ts/Either";
import { isValidPostalCode } from "../validation/postalCode";
import { NonEmptyArray } from "fp-ts/NonEmptyArray";

interface PostalCodeBrand {
  readonly PostalCode: unique symbol;
}

export type PostalCode = string & PostalCodeBrand;

const isPostalCode = (s: string): s is PostalCode => isValidPostalCode(s);

export const makePostalCode = (
  postalCode: string
): Either<NonEmptyArray<string>, PostalCode> =>
  isPostalCode(postalCode) ? right(postalCode) : left(["Invalid postal code"]);
