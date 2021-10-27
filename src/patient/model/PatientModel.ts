import { sequenceT } from "fp-ts/Apply";
import { map, right } from "fp-ts/Either";
import { pipe } from "fp-ts/function";
import { Option } from "fp-ts/Option";
import { PatientDTO } from "../DTOs/PatientDTO";
import { GenderType } from "../fhir/internal/valueSets/gender";
import { Address, makeAddress } from "./internal/Address/Address";
import { Birthdate, makeBirthdate } from "./internal/Birthdate";
import { CPF, makeCPF } from "./internal/CPF";
import { EmailContact, makeEmailContact } from "./internal/Email";
import { makeGenderType } from "./internal/GenderType";
import { Id, makeId } from "./internal/Id";
import { makeName, Name } from "./internal/Name";
import { makeOptionPhoneContact, PhoneContact } from "./internal/Phone";
import { applicativeValidation } from "./internal/validation/applicativeValidation";
import { ValidationResult } from "./internal/validation/ValidationResult";

// The data in the Resource covers the "who" information about the patient: its attributes are focused
// on the demographic information necessary to support the administrative, financial and logistic procedures.
// A Patient record is generally created and maintained by each organization providing care for a patient.
// A patient or animal receiving care at multiple organizations may therefore have its information present
// in multiple Patient Resources.

// http://hl7.org/fhir/patient.html

export interface PatientModel {
  id?: Id;
  active: boolean;
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

export const createPatientModel = ({
  active,
  birthdate,
  cpf,
  currentAddress,
  email,
  gender,
  id,
  name,
  phone,
}: PatientDTO): ValidationResult<PatientModel> =>
  pipe(
    sequenceT(applicativeValidation)(
      makeId(id),
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
