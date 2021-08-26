import { Either, left, right } from "fp-ts/lib/Either";

export type BoundedString = string;

export const boundString =
  (lower: number, upper: number) =>
  (str: string): Either<string, BoundedString> =>
    str.trim().length < lower
      ? left(
          `String cannot shorter than ${lower} character${lower > 1 ? "s" : ""}`
        )
      : str.trim().length > upper
      ? left(`String cannot be longer than ${upper} characters`)
      : right(str);

export const string100 = boundString(1, 100);
