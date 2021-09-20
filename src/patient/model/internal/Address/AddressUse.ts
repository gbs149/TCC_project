import { Either, left, right } from "fp-ts/Either";
import { NonEmptyArray } from "fp-ts/NonEmptyArray";
import { addressUses, AddressUseType } from "../../../fhir/internal/valueSets";

const isAddressUse = (s: string): s is AddressUseType =>
  addressUses.includes(s as AddressUseType);

export const makeAddressUse = (
  s: string
): Either<NonEmptyArray<string>, AddressUseType> =>
  isAddressUse(s) ? right(s) : left(["Invalid address use"]);
