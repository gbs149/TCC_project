import { Patient as FhirPatient } from "fhir/r4";
import { pipe } from "fp-ts/function";
import { toNullable } from "fp-ts/Option";
import { orElse } from "../../helpers/fp-helpers";
import { emptyContactDTO } from "../DTOs/ContactDTO";
import { PatientDTO } from "../DTOs/PatientDTO";
import { ValidationResult } from "../model/internal/validation/ValidationResult";
import { createPatient, PatientModel } from "../model/PatientModel";
import { getCurrentAddress } from "./internal/address";
import { getCpf } from "./internal/cpf";
import { getName } from "./internal/name";
import { getEmail, getPhone } from "./internal/telecom";

export const fromFhir = (
  fhirPatient: FhirPatient
): ValidationResult<PatientModel> =>
  pipe(fhirToDTO(fhirPatient), createPatient);

const fhirToDTO = (fhirPatient: FhirPatient): PatientDTO => ({
  id: fhirPatient.id,
  active: fhirPatient.active,
  gender: fhirPatient.gender,
  birthdate: fhirPatient.birthDate,
  cpf: pipe(getCpf(fhirPatient), orElse("")),
  email: pipe(getEmail(fhirPatient), orElse(emptyContactDTO)),
  phone: pipe(getPhone(fhirPatient), toNullable),
  name: getName(fhirPatient),
  currentAddress: getCurrentAddress(fhirPatient),
});
