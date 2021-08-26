import { Either, left, right } from "fp-ts/lib/Either";

const addressUses = ["home", "work", "temp", "old", "billing"];

export type AddressUse = string;

export const validAdressUse = (val: string): Either<string, AddressUse> =>
  addressUses.includes(val) ? right(val) : left("Not a valid address use");
