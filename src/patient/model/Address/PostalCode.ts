import { Either, left, right } from "fp-ts/lib/Either";

export type PostalCode = string;

export const createPostalCode = (
  postalCode: string
): Either<string, PostalCode> =>
  isValid(postalCode) ? right(postalCode) : left("Invalid postal code");

// 8 consecutive digits
const postalCodeRegex = /^\d{8}$/;

const isValid = (postalCode: string): boolean =>
  postalCodeRegex.test(postalCode);
