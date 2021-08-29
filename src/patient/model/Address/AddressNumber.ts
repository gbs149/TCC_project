import { Either, left, right } from "fp-ts/lib/Either";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";

export type AddressNumber = number | "s/n";

export const makeAddressNumber = (
  value: AddressNumber
): Either<NonEmptyArray<string>, AddressNumber> =>
  typeof value === "number" && value >= 0
    ? right(value)
    : left(["Number must be positive"]);
