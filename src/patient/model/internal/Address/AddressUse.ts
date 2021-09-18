import { Either, left, right } from "fp-ts/lib/Either";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import { addressUses, AddressUseType } from "../../../fhir/internal/valueSets";

export const makeAddressUse = (
  s: string
): Either<NonEmptyArray<string>, AddressUseType> =>
  addressUses.includes(s as AddressUseType)
    ? right(s as AddressUseType)
    : left(["Invalid address use"]);
