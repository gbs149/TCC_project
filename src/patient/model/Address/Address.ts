import { sequenceT } from "fp-ts/lib/Apply";
import { Either, map } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import { applicativeValidation } from "../../validation/applicativeValidation";
import { AddressUseType } from "../../fhir/valueSets";
import { AddressDTO } from "./AddressDTO";
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
