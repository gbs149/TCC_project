import { Patient as FhirPatient } from "fhir/r4";
import { Either } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { NonEmptyArray } from "fp-ts/lib/NonEmptyArray";
import { PatientDTO } from "../model/PatientDTO";
import { createPatient, PatientModel } from "../model/PatientModel";
import { getCurrentAddress } from "./address";
import { getCpf } from "./cpf";
import { getName } from "./name";
import { getEmail, getPhone } from "./telecom";

export const fromFhir = (
  fhirPatient: FhirPatient
): Either<NonEmptyArray<string>, PatientModel> =>
  pipe(fromFhirToDTO(fhirPatient), createPatient);

const fromFhirToDTO = (fhirPatient: FhirPatient): PatientDTO => ({
  id: fhirPatient.id,
  active: fhirPatient.active,
  gender: fhirPatient.gender,
  birthdate: fhirPatient.birthDate,
  cpf: getCpf(fhirPatient),
  email: getEmail(fhirPatient),
  phone: getPhone(fhirPatient),
  name: getName(fhirPatient),
  currentAddress: getCurrentAddress(fhirPatient),
});
