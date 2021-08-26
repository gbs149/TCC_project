import { Either } from "fp-ts/lib/Either";

import { createPostalCode, PostalCode } from "./PostalCode";
import { AddressUse, validAdressUse } from "./AddressUse";
import { AddressNumber, createAddressNumber } from "./AddressNumber";
import { State, validState } from "./State";
import { createStreet, Street } from "./Street";
import { Complement, createComplement } from "./Complement";
import { AddressDTO } from "./AddressDTO";
import { Option } from "fp-ts/lib/Option";
import { City, createCity } from "./City";

export interface Address {
  city: Either<string, City>;
  complement: Option<Complement>;
  number: Either<string, AddressNumber>;
  postalCode: Either<string, PostalCode>;
  state: Either<string, State>;
  street: Either<string, Street>;
  use: Either<string, AddressUse>;
}

export const createAddress = ({
  city,
  complement,
  number,
  postalCode,
  state,
  street,
  use,
}: AddressDTO): Address => {
  return {
    city: createCity(city),
    complement: createComplement(complement),
    number: createAddressNumber(number),
    postalCode: createPostalCode(postalCode),
    state: validState(state),
    street: createStreet(street),
    use: validAdressUse(use),
  };
};
