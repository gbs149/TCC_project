import { Either, left, right } from "fp-ts/lib/Either";

export type AddressNumber = number | "s/n";

export const createAddressNumber = (
  value: AddressNumber
): Either<string, AddressNumber> =>
  typeof value === "number" && value >= 0
    ? right(value)
    : left("Number must be positive");
