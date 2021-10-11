import { left, right } from "fp-ts/Either";
import { isValidPostalCode } from "../validation/postalCode";
import { ValidationResult } from "../validation/ValidationResult";

interface PostalCodeBrand {
  readonly PostalCode: unique symbol;
}

export type PostalCode = string & PostalCodeBrand;

const isPostalCode = (s: string): s is PostalCode => isValidPostalCode(s);

export const makePostalCode = (
  postalCode: string
): ValidationResult<PostalCode> =>
  isPostalCode(postalCode) ? right(postalCode) : left(["Invalid postal code"]);
