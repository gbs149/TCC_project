import { Either, left, right } from "fp-ts/lib/Either";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";

const addressUses = ["home", "work", "temp", "old", "billing"];

interface AddressUseBrand {
  readonly AdressUse: unique symbol;
}

export type AddressUse = string & AddressUseBrand;

const isAddressUse = (s: string): s is AddressUse => addressUses.includes(s);

export const makeAddressUse = (
  s: string
): Either<NonEmptyArray<string>, AddressUse> =>
  isAddressUse(s) ? right(s) : left(["Invalid address use"]);
