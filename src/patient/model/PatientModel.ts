// First draft of a patient model with some requirements

import { Either, map, right } from "fp-ts/lib/Either";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import { pipe } from "fp-ts/lib/function";
import { sequenceT } from "fp-ts/lib/Apply";

import { makeGenderType } from "./GenderType";
import { CPF, makeCPF } from "./CPF";
import { Birthdate, makeBirthdate } from "./Birthdate";
import { Id } from "./Id";
import { makeName, Name } from "./Name";
import { makePhoneContact, PhoneContact } from "./Phone";
import { EmailContact, makeEmailContact } from "./Email";
import { Address, makeAddress } from "./Address/Address";
import { PatientDTO } from "./PatientDTO";
import { applicativeValidation } from "../../validation/applicativeValidation";
import { GenderType } from "../fhir/valueSets";

export interface PatientModel {
  id: Id;
  active: boolean;
  birthdate: Birthdate;
  cpf: CPF;
  email: EmailContact;
  gender: GenderType;
  name: Name;
  phone: PhoneContact;
  currentAddress: Address;
}

const toPatient = ([
  id,
  active,
  currentAddress,
  birthdate,
  cpf,
  email,
  gender,
  name,
  phone,
]: [
  Id,
  boolean,
  Address,
  Birthdate,
  CPF,
  EmailContact,
  GenderType,
  Name,
  PhoneContact
]): PatientModel => ({
  id,
  active,
  currentAddress,
  birthdate,
  cpf,
  email,
  gender,
  name,
  phone,
});

export const createPatient = ({
  active,
  birthdate,
  cpf,
  currentAddress,
  email,
  gender,
  id,
  name,
  phone,
}: PatientDTO): Either<NonEmptyArray<string>, PatientModel> =>
  pipe(
    sequenceT(applicativeValidation)(
      right(id),
      right(active),
      makeAddress(currentAddress),
      makeBirthdate(birthdate),
      makeCPF(cpf),
      makeEmailContact(email),
      makeGenderType(gender),
      makeName(name),
      makePhoneContact(phone)
    ),
    map(toPatient)
  );
