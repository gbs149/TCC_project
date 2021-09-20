import { sequenceT } from "fp-ts/Apply";
import { Either, map } from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { NonEmptyArray } from "fp-ts/NonEmptyArray";
import { AddressDTO } from "../../../DTOs/AddressDTO";
import { AddressUseType } from "../../../fhir/internal/valueSets/addressUse";
import { applicativeValidation } from "../validation/applicativeValidation";
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

export const makeAddress = ({
  city,
  lines,
  postalCode,
  state,
  use,
}: AddressDTO): Either<NonEmptyArray<string>, Address> =>
  pipe(
    sequenceT(applicativeValidation)(
      makeCity(city),
      makeLines(lines),
      makePostalCode(postalCode),
      makeState(state),
      makeAddressUse(use)
    ),
    map(toAddress)
  );
