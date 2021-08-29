import { isValidString } from "../../../validation/boundedString";
import { Either, left, right } from "fp-ts/lib/Either";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";

interface StreetBrand {
  readonly Street: unique symbol;
}

export type Street = string & StreetBrand;

const isValidStreet = (s: string): s is Street => isValidString(s);

export const makeStreet = (s: string): Either<NonEmptyArray<string>, Street> =>
  isValidStreet(s) ? right(s) : left(["Invalid street name"]);
