import { Either, left, right } from "fp-ts/Either";
import { NonEmptyArray } from "fp-ts/NonEmptyArray";
import { isEmpty } from "fp-ts/string";
import { isNotEmpty, isShorterThan } from "../validation/boundedString";

interface CityBrand {
  readonly City: unique symbol;
}

export type City = string & CityBrand;

const isShorterThan50 = isShorterThan(50);

const isValidCity = (s: string): s is City =>
  s && isNotEmpty(s) && isShorterThan50(s);

// with more checks we can make the error messages more helpful
export const makeCity = (s?: string): Either<NonEmptyArray<string>, City> =>
  isValidCity(s)
    ? right(s)
    : s === undefined
    ? left(["City is required"])
    : isEmpty(s)
    ? left(["City name cannot be empty"])
    : left(["City name cannot be longer than 50 characters"]);
