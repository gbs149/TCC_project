import { Either, map, right } from "fp-ts/lib/Either";

import { makePostalCode, PostalCode } from "./PostalCode";
import { makeAddressUse } from "./AddressUse";
import { AddressNumber, makeAddressNumber } from "./AddressNumber";
import { makeState, State } from "./State";
import { makeStreet, Street } from "./Street";
import { Complement, makeComplement } from "./Complement";
import { AddressDTO } from "./AddressDTO";
import { Option } from "fp-ts/lib/Option";
import { City, makeCity } from "./City";
import { pipe } from "fp-ts/lib/function";
import { sequenceT } from "fp-ts/lib/Apply";
import { applicativeValidation } from "../../../validation/applicativeValidation";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import { AddressUseType } from "../../fhir/valueSets";

export interface Address {
  city: City;
  complement: Option<Complement>;
  number: AddressNumber;
  postalCode: PostalCode;
  state: State;
  street: Street;
  use: AddressUseType;
}

const toAddress = ([city, complement, number, postalCode, state, street, use]: [
  City,
  Option<Complement>,
  AddressNumber,
  PostalCode,
  State,
  Street,
  AddressUseType
]) => ({ city, complement, number, postalCode, state, street, use });

export const makeAddress = ({
  city,
  complement,
  number,
  postalCode,
  state,
  street,
  use,
}: AddressDTO): Either<NonEmptyArray<string>, Address> =>
  pipe(
    sequenceT(applicativeValidation)(
      makeCity(city),
      right(makeComplement(complement)),
      makeAddressNumber(number),
      makePostalCode(postalCode),
      makeState(state),
      makeStreet(street),
      makeAddressUse(use)
    ),
    map(toAddress)
  );
