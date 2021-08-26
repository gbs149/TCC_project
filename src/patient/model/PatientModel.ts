// First draft of a patient model with some requirements

import { Either } from "fp-ts/lib/Either";

import { GenderType, genderType } from "./GenderType";
import { CPF, createCPF } from "./CPF";
import { Birthdate, createBirthdate } from "./Birthdate";
import { Id } from "./Id";
import { Active } from "./Active";
import { createName, Name } from "./Name";
import { createPhone, Phone } from "./Phone";
import { createEmail, Email } from "./Email";
import { Address, createAddress } from "./Address/Address";
import { PatientDTO } from "./PatientDTO";
import { parseISO } from "date-fns";

export interface PatientModel {
  id: Id;
  active: Active;
  birthdate: Either<string, Birthdate>;
  cpf: Either<string, CPF>;
  email: Either<string, Email>;
  gender: Either<string, GenderType>;
  name: Name;
  phone: Either<string, Phone>[];
  currentAddress: Address;
}

export const createPatient = ({
  active,
  birthdate,
  cpf,
  currentAddress,
  email,
  gender,
  id,
  name: { first, last },
  phone,
}: PatientDTO): PatientModel => {
  return {
    id: {
      value: id,
    },
    active: { value: active },
    birthdate: createBirthdate(parseISO(birthdate)),
    cpf: createCPF(cpf),
    email: createEmail(email),
    gender: genderType(gender),
    name: createName({
      first: first,
      last: last,
    }),
    phone: phone.map(createPhone),
    currentAddress: createAddress(currentAddress),
  };
};
