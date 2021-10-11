import { sequenceT } from "fp-ts/Apply";
import { map } from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { AddressDTO } from "../../../DTOs/AddressDTO";
import { AddressUseType } from "../../../fhir/internal/valueSets/addressUse";
import { applicativeValidation } from "../validation/applicativeValidation";
import { ValidationResult } from "../validation/ValidationResult";
import { makeAddressUse } from "./AddressUse";
import { City, makeCity } from "./City";
import { Line, makeLines } from "./Line";

import { makePostalCode, PostalCode } from "./PostalCode";
import { makeState, State } from "./State";

export interface Address {
  city: City;
  lines: Line[];
  postalCode: PostalCode;
  state: State;
  use: AddressUseType;
}

const toAddress = ([city, lines, postalCode, state, use]: [
  City,
  Line[],
  PostalCode,
  State,
  AddressUseType
]) => ({ city, lines, postalCode, state, use });

export const makeAddress = (address?: AddressDTO): ValidationResult<Address> =>
  pipe(
    sequenceT(applicativeValidation)(
      makeCity(address?.city),
      makeLines(address?.lines),
      makePostalCode(address?.postalCode),
      makeState(address?.state),
      makeAddressUse(address?.use)
    ),
    map(toAddress)
  );
