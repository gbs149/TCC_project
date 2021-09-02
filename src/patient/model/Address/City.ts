import { isValidString } from "../../validation/boundedString";
import { Either, left, right } from "fp-ts/lib/Either";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";

interface CityBrand {
  readonly City: unique symbol;
}

export type City = string & CityBrand;

const isValidCity = (s: string): s is City => isValidString(s);

export const makeCity = (s: string): Either<NonEmptyArray<string>, City> =>
  isValidCity(s) ? right(s) : left(["Invalid city name"]);
