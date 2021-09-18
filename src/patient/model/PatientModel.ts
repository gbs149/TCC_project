// First draft of a patient model with some requirements

import { sequenceT } from "fp-ts/lib/Apply";
import { Either, map, right } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import { Option } from "fp-ts/lib/Option";
import { GenderType } from "../fhir/valueSets";
import { applicativeValidation } from "../validation/applicativeValidation";
import { Address, makeAddress } from "./Address/Address";
import { Birthdate, makeBirthdate } from "./Birthdate";
import { CPF, makeCPF } from "./CPF";
import { EmailContact, makeEmailContact } from "./Email";
import { makeGenderType } from "./GenderType";
import { Id } from "./Id";
import { makeName, Name } from "./Name";
import { PatientDTO } from "./PatientDTO";
import { makeOptionPhoneContact, PhoneContact } from "./Phone";

// The data in the Resource covers the "who" information about the patient: its attributes are focused
// on the demographic information necessary to support the administrative, financial and logistic procedures.
// A Patient record is generally created and maintained by each organization providing care for a patient.
// A patient or animal receiving care at multiple organizations may therefore have its information present
// in multiple Patient Resources.

// http://hl7.org/fhir/patient.html

export interface PatientModel {
  id?: Id;
  active?: boolean;
  birthdate: Birthdate;
  cpf: CPF;
  email: EmailContact;
  gender: GenderType;
  name: Name;
  phone: Option<PhoneContact>;
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
  Option<PhoneContact>
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
      makeOptionPhoneContact(phone)
    ),
    map(toPatient)
  );
