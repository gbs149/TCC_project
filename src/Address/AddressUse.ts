import { Either, left, right } from "fp-ts/lib/Either";

export const addressUses = ["home", "work", "temp", "old", "billing"];

export const validAdressUse = (val: string): Either<string, string> =>
  addressUses.includes(val) ? right(val) : left("Not a valid address use");
