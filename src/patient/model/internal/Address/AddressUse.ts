import { left, right } from "fp-ts/Either";
import {
  addressUses,
  AddressUseType,
} from "../../../fhir/internal/valueSets/addressUse";
import { ValidationResult } from "../validation/ValidationResult";

const isAddressUse = (s: string): s is AddressUseType =>
  addressUses.includes(s as AddressUseType);

export const makeAddressUse = (s: string): ValidationResult<AddressUseType> =>
  isAddressUse(s) ? right(s) : left(["Invalid address use"]);
